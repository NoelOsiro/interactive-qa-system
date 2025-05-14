import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap, Home } from "lucide-react";

export default function ChatHeader() {
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between h-16 px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
            <GraduationCap className="h-4 w-4 text-primary" />
          </div>
          <span className="font-heading font-bold">AI Knowledge Assistant</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon">
            <Link href="/">
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}