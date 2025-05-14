"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";

interface MarkdownProps {
  content: string;
  className?: string;
}

export function Markdown({ content, className }: MarkdownProps) {
  return (
    <ReactMarkdown
      className={cn("prose dark:prose-invert max-w-none break-words", className)}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={vscDarkPlus}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        // Adding styles for other markdown elements
        h1: ({ node, ...props }) => <h1 className="text-2xl font-bold my-4" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-xl font-bold my-3" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-lg font-bold my-2" {...props} />,
        p: ({ node, ...props }) => <p className="my-2" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc pl-6 my-2" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal pl-6 my-2" {...props} />,
        li: ({ node, ...props }) => <li className="my-1" {...props} />,
        a: ({ node, ...props }) => (
          <a className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-muted-foreground pl-4 italic my-2" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}