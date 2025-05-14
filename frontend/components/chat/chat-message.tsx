// components/ChatMessage.js
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
        "flex items-start gap-4 px-4 py-3 w-fit max-w-[80%]",
        isUser ? "flex-row-reverse ml-auto bg-primary/10 rounded-l-lg rounded-r-sm" : "mr-auto bg-muted/50 rounded-r-lg rounded-l-sm"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 rounded-full p-2",
          isUser ? "bg-primary" : "bg-accent"
        )}
      >
        {isUser ? (
          <UserIcon className="h-4 w-4 text-primary-foreground" />
        ) : (
          <BotIcon className="h-4 w-4 text-accent-foreground" />
        )}
      </div>
      <div
        className={cn(
          "min-w-0",
          isUser ? "text-right" : "text-left"
        )}
      >
        <p className="text-sm font-medium mb-1">
          {isUser ? "You" : "AI Assistant"}
        </p>
        <div
          className={cn(
            "prose prose-sm dark:prose-invert max-w-none break-words inline-block",
            isUser ? "text-right" : "text-left"
          )}
        >
          {isUser ? (
            <p>{message.content}</p>
          ) : (
            <Markdown content={message.content} />
          )}
        </div>
      </div>
    </div>
  );
}