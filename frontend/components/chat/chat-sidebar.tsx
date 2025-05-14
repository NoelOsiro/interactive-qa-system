"use client";

import { useState } from "react";
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
}

export default function ChatSidebar({
  sessions,
  currentSession,
  onNewSession,
  onSwitchSession,
  onDeleteSession,
  onUpdateTitle,
}: ChatSidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

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
    <div className="w-80 h-screen flex flex-col sidebar-glass rounded-r-lg">
      <div className="p-4 border-b border-border">
        <Button
          onClick={onNewSession}
          className="w-full gap-2"
          variant="secondary"
        >
          <PlusCircle className="h-4 w-4" />
          New Chat
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`group flex items-center gap-2 p-3 rounded-lg transition-colors ${
                session.id === currentSession
                  ? "bg-secondary/30"
                  : "hover:bg-secondary/10"
              }`}
            >
              <button
                onClick={() => onSwitchSession(session.id)}
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
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => saveEdit(session.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={cancelEdit}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => startEditing(session)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteSession(session.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}