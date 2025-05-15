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

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col space-y-2 overflow-y-auto px-3 py-3 scroll-smooth min-h-0"
      role="log"
      aria-live="polite"
    >
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <div className="max-w-md space-y-3">
            <h2 className="text-xl font-bold">Welcome to AI Knowledge Assistant</h2>
            <p className="text-sm text-muted-foreground">
              Ask me anything, and I&apos;ll provide a helpful response. Your conversation history will appear here.
            </p>
          </div>
        </div>
      ) : (
        <AnimatePresence initial={false}>
          {messages.map((message, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChatMessage message={message} />
            </motion.div>
          ))}
          {isLoading && <ChatSkeleton />}
        </AnimatePresence>
      )}
    </div>
  );
}