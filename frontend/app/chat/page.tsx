"use client";

import { useChat } from "@/hooks/use-chat";
import ChatContainer from "@/components/chat/chat-container";
import ChatInput from "@/components/chat/chat-input";
import ChatHeader from "@/components/chat/chat-header";
import ChatSidebar from "@/components/chat/chat-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

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

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
      <ChatSidebar
        sessions={sessions}
        currentSession={currentSession}
        onNewSession={createNewSession}
        onSwitchSession={switchSession}
        onDeleteSession={deleteSession}
        onUpdateTitle={updateSessionTitle}
      />
      <div className="flex-1 flex flex-col glass-morphism">
        <ChatHeader />
        <div className="flex-1 overflow-hidden flex flex-col">
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