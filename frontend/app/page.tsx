import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap, MessageSquare, Brain, Zap } from "lucide-react";
import { JSX, SVGProps } from "react";

// Define features array (replace with your actual features if different)
const features = [
  {
    title: "Instant Answers",
    description: "Get quick and accurate responses to your questions in real-time.",
    icon: MessageSquare,
  },
  {
    title: "Smart Insights",
    description: "Leverage advanced AI to gain deeper understanding and context.",
    icon: Brain,
  },
  {
    title: "Fast Performance",
    description: "Experience seamless interactions with optimized response times.",
    icon: Zap,
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="flex flex-col items-center justify-center max-w-3xl w-full text-center space-y-8">
        <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mb-4">
          <GraduationCap className="h-10 w-10 text-primary" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          AI Knowledge Assistant
        </h1>

        <p className="text-lg text-muted-foreground max-w-[42rem]">
          Get instant answers to all your questions with our advanced AI assistant.
          Powered by state-of-the-art language models for precise and informative
          responses.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button asChild size="lg" className="gap-1">
            <Link href="/chat">Start Chatting</Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link
              href="https://github.com/NoelOsiro/interactive-qa-system/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col p-6 bg-card rounded-lg border border-border"
            >
              <feature.icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Built by Section */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Built by{" "}
            <Link
              href="https://www.noleosiro.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
              aria-label="Noel Osiro's portfolio"
            >
              Noel Osiro
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}