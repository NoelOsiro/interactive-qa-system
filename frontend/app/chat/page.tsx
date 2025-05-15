"use client";

import { useState, useEffect } from "react";
import { useChat } from "@/hooks/use-chat";
import ChatContainer from "@/components/chat/chat-container";
import ChatInput from "@/components/chat/chat-input";
import ChatHeader from "@/components/chat/chat-header";
import ChatSidebar from "@/components/chat/chat-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

export default function ChatPage() {
  const { toast } = useToast();
  const {
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
  } = useChat();

  // Sidebar toggle state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
      {/* Sidebar Drawer */}
      <ChatSidebar
        sessions={sessions}
        currentSession={currentSession}
        onNewSession={createNewSession}
        onSwitchSession={switchSession}
        onDeleteSession={deleteSession}
        onUpdateTitle={updateSessionTitle}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-80">
        <ChatHeader onToggleSidebar={() => setSidebarOpen((v) => !v)} />

        {/* Chat history + input */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ChatContainer messages={messages} isLoading={isLoading} />
          <ChatInput
            input={input}
            setInput={setInput}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>

      <Toaster />
    </div>
  );
}
