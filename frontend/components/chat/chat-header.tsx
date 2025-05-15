"use client";

import Link from "next/link";
import { GraduationCap, Home, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onToggleSidebar: () => void;
}

export default function ChatHeader({ onToggleSidebar }: ChatHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between h-14 px-3 sm:px-4">
        {/* Mobile menu toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5">
          <div className="flex items-center justify-center h-7 w-7 rounded-full bg-primary/10">
            <GraduationCap className="h-4 w-4 text-primary" />
          </div>
          <span className="font-heading font-bold text-sm sm:text-base truncate">
            AI Knowledge Assistant
          </span>
        </Link>

        {/* Home Button */}
        <Button asChild variant="ghost" size="icon" className="ml-auto md:ml-0">
          <Link href="/">
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}