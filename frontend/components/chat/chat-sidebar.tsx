"use client";

import React from "react";
import { ChatSession } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, MessageSquare, Trash2, Edit2, Check, X } from "lucide-react";
import { format } from "date-fns";

interface ChatSidebarProps {
  sessions: ChatSession[];
  currentSession: string | null;
  onNewSession: () => void;
  onSwitchSession: (id: string) => void;
  onDeleteSession: (id: string) => void;
  onUpdateTitle: (id: string, title: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatSidebar({
  sessions,
  currentSession,
  onNewSession,
  onSwitchSession,
  onDeleteSession,
  onUpdateTitle,
  isOpen,
  onClose,
}: ChatSidebarProps) {
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editTitle, setEditTitle] = React.useState("");

  const startEditing = (session: ChatSession) => {
    setEditingId(session.id);
    setEditTitle(session.title);
  };

  const saveEdit = (id: string) => {
    onUpdateTitle(id, editTitle.trim() || "New Chat");
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
  };

  return (
    <aside
    className={`
      fixed inset-y-0 left-0 w-80 bg-white shadow-lg transform transition-transform z-50
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      md:relative md:translate-x-0 md:flex md:flex-col
    `}
  >
    <div className="p-4 border-b flex items-center justify-between">
      <Button onClick={onNewSession} variant="secondary" className="flex-1 gap-2">
        <PlusCircle className="h-4 w-4" />
        New Chat
      </Button>
      <button
        onClick={onClose}
        className="md:hidden p-2 rounded-md hover:bg-gray-200 ml-2"
        aria-label="Close sidebar"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`group flex items-center gap-2 p-3 rounded-lg transition-colors
                ${session.id === currentSession ? "bg-secondary/30" : "hover:bg-secondary/10"}`}
            >
              <button
                onClick={() => { onSwitchSession(session.id); onClose(); }}
                className="flex-1 flex items-center gap-3 min-w-0 text-left"
              >
                <MessageSquare className="h-4 w-4 flex-shrink-0 text-white" />
                {editingId === session.id ? (
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="flex-1 bg-transparent border-none focus:outline-none"
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <div className="flex-1 truncate">
                    <div className="font-medium truncate">{session.title}</div>
                    <div className="text-xs text-muted-background">
                      {format(session.updatedAt, "MMM d, yyyy")}
                    </div>
                  </div>
                )}
              </button>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {editingId === session.id ? (
                  <>
                    <Button variant="ghost" size="icon" onClick={() => saveEdit(session.id)}>
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={cancelEdit}>
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="icon" onClick={() => startEditing(session)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDeleteSession(session.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
