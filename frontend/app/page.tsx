import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';
import { JSX, SVGProps } from 'react';

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
          Powered by state-of-the-art language models for precise and informative responses.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button asChild size="lg" className="gap-1">
            <Link href="/chat">
              Start Chatting
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link href="https://github.com/yourusername/ai-chat-app" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col p-6 bg-card rounded-lg border border-border">
              <feature.icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

const features = [
  {
    title: 'Intelligent Responses',
    description: 'Powered by advanced large language models to provide accurate and helpful answers to your questions.',
    icon: function MessageSquare(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    },
  },
  {
    title: 'Real-time Chat',
    description: 'Experience fluid conversation with instant responses and a modern, intuitive interface.',
    icon: function Zap(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    },
  },
  {
    title: 'Message History',
    description: 'Keep track of your conversation history to reference past questions and answers.',
    icon: function Clock(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    },
  },
];