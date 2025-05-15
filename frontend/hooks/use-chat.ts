// hooks/use-chat.ts
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { nanoid } from "nanoid";
import { Message, ChatSession } from "@/lib/types";
import { API_URL } from "@/lib/config";

const STORAGE_KEY = "chatSessions";

export function useChat() {
  const didMount = useRef(false);

  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1) Load sessions from localStorage once on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as ChatSession[];
      setSessions(parsed);
      if (parsed.length) {
        const first = parsed[0];
        setCurrentSessionId(first.id);
        setMessages(first.messages);
      }
    }
  }, []);

  // 2) Persist sessions whenever they change (skip first render)
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  }, [sessions]);

  // 3) Sync messages when switching sessions
  useEffect(() => {
    if (currentSessionId) {
      const session = sessions.find((s) => s.id === currentSessionId);
      setMessages(session ? session.messages : []);
    }
  }, [currentSessionId, sessions]);

  // Upsert helper: put updated session at front
  const upsertSession = useCallback((session: ChatSession) => {
    setSessions((prev) => [session, ...prev.filter((s) => s.id !== session.id)]);
  }, []);

  // Create a new session (returns it for immediate use)
  const createSession = useCallback((): ChatSession => {
    const ns: ChatSession = {
      id: nanoid(),
      title: "New Chat",
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    upsertSession(ns);
    setCurrentSessionId(ns.id);
    setMessages([]);
    return ns;
  }, [upsertSession]);

  const createNewSession = useCallback(() => {
    createSession();
  }, [createSession]);

  const switchSession = useCallback((id: string) => {
    setCurrentSessionId(id);
  }, []);

  const deleteSession = useCallback(
    (id: string) => {
      setSessions((prev) => prev.filter((s) => s.id !== id));
      if (id === currentSessionId) {
        const remaining = sessions.filter((s) => s.id !== id);
        if (remaining.length) {
          setCurrentSessionId(remaining[0].id);
        } else {
          setCurrentSessionId(null);
          setMessages([]);
        }
      }
    },
    [currentSessionId, sessions]
  );

  const updateSessionTitle = useCallback(
    (id: string, title: string) => {
      const session = sessions.find((s) => s.id === id);
      if (!session) return;
      const updated = { ...session, title, updatedAt: Date.now() };
      upsertSession(updated);
    },
    [sessions, upsertSession]
  );

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (!input.trim() || isLoading) return;

      setError(null);
      setIsLoading(true);

      // Get or create session
      let session = sessions.find((s) => s.id === currentSessionId);
      if (!session) {
        session = createSession();
      }

      // Add user message
      const userMsg: Message = { role: "user", content: input.trim() };
      const history = [...session.messages, userMsg];
      setMessages(history);
      setInput("");

      try {
        const res = await fetch(`${API_URL}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMsg.content, history }),
        });
        if (!res.ok) throw new Error(`API ${res.status}`);

        const { response: aiContent } = await res.json();
        const aiMsg: Message = { role: "assistant", content: aiContent };
        const fullHistory = [...history, aiMsg];

        // Update session
        const updatedSession: ChatSession = {
          ...session,
          messages: fullHistory,
          title: session.title === "New Chat" ? userMsg.content : session.title,
          updatedAt: Date.now(),
        };
        upsertSession(updatedSession);
        setMessages(fullHistory);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Failed to send");
      } finally {
        setIsLoading(false);
      }
    },
    [
      input,
      isLoading,
      currentSessionId,
      sessions,
      createSession,
      upsertSession,
    ]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  return {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    sessions,
    currentSession: currentSessionId,
    createNewSession,
    switchSession,
    deleteSession,
    updateSessionTitle,
  };
}
