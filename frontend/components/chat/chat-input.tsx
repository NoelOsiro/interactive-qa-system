"use client";

import { useState } from "react";
import { SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export default function ChatInput({ 
  input, 
  setInput,
  handleInputChange, 
  handleSubmit, 
  isLoading 
}: ChatInputProps) {
  // Track text area height to allow for auto-expanding input
  const [rows, setRows] = useState(1);

  // Handle form submission
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      handleSubmit(e);
      setRows(1); // Reset rows after sending
    }
  };

  // Handle input changes, including monitoring for newlines
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    
    // Calculate rows based on content
    const lineCount = (e.target.value.match(/\n/g) || []).length + 1;
    setRows(Math.min(5, Math.max(1, lineCount)));
  };

  // Handle pressing Enter without Shift to submit
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <div className="border-t border-border bg-background p-4">
      <form 
        onSubmit={onSubmit}
        className="flex items-end gap-2 max-w-3xl mx-auto"
      >
        <div className="relative flex-1">
          <Textarea
            value={input}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder="Type your message..."
            className="min-h-[52px] resize-none pr-12"
            rows={rows}
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-2 bottom-1.5"
            disabled={!input.trim() || isLoading}
          >
            <SendIcon className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </form>
      <p className="text-xs text-muted-foreground text-center mt-2">
        Powered by AI Language Models • Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );
}