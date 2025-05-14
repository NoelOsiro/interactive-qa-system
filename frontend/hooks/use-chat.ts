"use client";

import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Message, ChatSession } from "@/lib/types";
import { API_URL } from "@/lib/config";

export function useChat() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load sessions from localStorage on mount
  useEffect(() => {
    const savedSessions = localStorage.getItem("chatSessions");
    if (savedSessions) {
      const parsed = JSON.parse(savedSessions);
      setSessions(parsed);
      
      // Set current session to most recent if none selected
      if (!currentSession && parsed.length > 0) {
        setCurrentSession(parsed[0].id);
        setMessages(parsed[0].messages);
      }
    }
  }, []);

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("chatSessions", JSON.stringify(sessions));
  }, [sessions]);

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: nanoid(),
      title: "New Chat",
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSession(newSession.id);
    setMessages([]);
  };

  const switchSession = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSession(sessionId);
      setMessages(session.messages);
    }
  };

  const deleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (currentSession === sessionId) {
      const remaining = sessions.filter(s => s.id !== sessionId);
      if (remaining.length > 0) {
        switchSession(remaining[0].id);
      } else {
        setCurrentSession(null);
        setMessages([]);
      }
    }
  };

  const updateSessionTitle = (sessionId: string, title: string) => {
    setSessions(prev => prev.map(s => 
      s.id === sessionId ? { ...s, title, updatedAt: Date.now() } : s
    ));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    // Create new session if none exists
    if (!currentSession) {
      createNewSession();
    }
    
    setError(null);
    
    const userMessage: Message = {
      role: "user",
      content: input.trim(),
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);
    setInput("");
    
    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      const aiMessage: Message = {
        role: "assistant",
        content: data.response,
      };
      
      const newMessages = [...updatedMessages, aiMessage];
      setMessages(newMessages);
      
      // Update session with new messages
      setSessions(prev => prev.map(s => 
        s.id === currentSession 
          ? { 
              ...s, 
              messages: newMessages,
              title: s.title === "New Chat" ? userMessage.content : s.title,
              updatedAt: Date.now()
            } 
          : s
      ));
      
    } catch (err) {
      console.error("Error sending message:", err);
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setIsLoading(false);
    }
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
    currentSession,
    createNewSession,
    switchSession,
    deleteSession,
    updateSessionTitle,
  };
}