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
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 w-60 sidebar-glass border-r border-border shadow-lg transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:w-64
        `}
      >
        <div className="p-3 border-b flex items-center justify-between">
          <Button onClick={onNewSession} variant="secondary" className="flex-1 gap-2 text-sm">
            <PlusCircle className="h-4 w-4" />
            New Chat
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="md:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <ScrollArea className="flex-1 p-3">
          <div className="space-y-1">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`group flex items-center gap-2 p-2 rounded-lg transition-colors
                  ${session.id === currentSession ? "bg-secondary/20" : "hover:bg-secondary/10"}`}
              >
                <button
                  onClick={() => {
                    onSwitchSession(session.id);
                    onClose();
                  }}
                  className="flex-1 flex items-center gap-2 min-w-0 text-left"
                >
                  <MessageSquare className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  {editingId === session.id ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="flex-1 bg-transparent border border-border rounded px-2 py-1 text-sm"
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <div className="flex-1 truncate">
                      <div className="font-medium truncate text-sm">{session.title}</div>
                      <div className="text-xs text-muted-foreground">
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
    </>
  );
}