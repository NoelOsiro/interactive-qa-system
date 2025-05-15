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
    <div className="border-t border-border bg-background px-2 sm:px-3 md:px-4 py-3 sm:py-4">
      <div className="w-full max-w-[90%] sm:max-w-[85%] md:max-w-[80%] mx-auto">
        <form 
          onSubmit={onSubmit}
          className="flex items-end gap-2 w-full"
        >
          <div className="relative flex-1 w-full">
            <Textarea
              value={input}
              onChange={onChange}
              onKeyDown={onKeyDown}
              placeholder="Type your message..."
              className="min-h-[40px] sm:min-h-[52px] resize-none pr-10 sm:pr-12 text-sm sm:text-base w-full"
              rows={rows}
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-1.5 sm:right-2 bottom-1 sm:bottom-1.5 h-7 w-7 sm:h-8 sm:w-8"
              disabled={!input.trim() || isLoading}
            >
              <SendIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </form>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Powered by AI Language Models • Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}