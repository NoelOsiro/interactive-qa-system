import { useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Message } from "@/lib/types";
import ChatMessage from "./chat-message";
import ChatSkeleton from "./chat-skeleton";

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
}

export default function ChatContainer({ messages, isLoading }: ChatContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div 
      ref={containerRef} 
      className="flex-1 overflow-y-auto p-4 scroll-smooth"
    >
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center p-8">
          <div className="max-w-md space-y-4">
            <h2 className="text-2xl font-bold">Welcome to AI Knowledge Assistant</h2>
            <p className="text-muted-foreground">
              Ask me anything and I'll do my best to provide a helpful response. Your conversation history will appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6 max-w-3xl mx-auto">
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChatMessage message={message} />
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && <ChatSkeleton />}
        </div>
      )}
    </div>
  );
}