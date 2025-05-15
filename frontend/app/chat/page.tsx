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

  // Sidebar toggle state - closed on mobile, open on desktop
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handle window resize to manage sidebar state
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Show error toast
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
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
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
      <div className="flex-1 flex flex-col min-w-0">
        <ChatHeader onToggleSidebar={() => setSidebarOpen((v) => !v)} />
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
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