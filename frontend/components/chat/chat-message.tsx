"use client";

import { cn } from "@/lib/utils";
import { Message } from "@/lib/types";
import { BotIcon, UserIcon } from "lucide-react";
import { Markdown } from "@/components/ui/markdown";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex items-start gap-2 py-2 max-w-[85%]",
        isUser ? "flex-row-reverse ml-auto" : "flex-row mr-auto"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 rounded-full p-1.5",
          isUser ? "bg-primary" : "bg-accent"
        )}
      >
        {isUser ? (
          <UserIcon className="h-4 w-4 text-primary-foreground" />
        ) : (
          <BotIcon className="h-4 w-4 text-accent-foreground" />
        )}
      </div>

      {/* Text block */}
      <div
        className={cn(
          "flex-1 min-w-0",
          isUser ? "text-right" : "text-left"
        )}
      >
        {/* Label */}
        <p className="text-xs font-medium mb-0.5">
          {isUser ? "You" : "AI Assistant"}
        </p>

        {/* Bubble */}
        <div
          className={cn(
            "inline-block px-2 py-1.5 rounded-lg max-w-full",
            isUser
              ? "bg-primary/10 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm"
              : "bg-muted/50 rounded-tr-lg rounded-br-sm rounded-bl-lg rounded-tl-sm"
          )}
        >
          {isUser ? (
            <p className="text-sm">{message.content}</p>
          ) : (
            <Markdown
              content={message.content}
              className="max-w-full text-sm"
            />
          )}
        </div>
      </div>
    </div>
  );
}