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

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export function Markdown({ content, className }: MarkdownProps) {
  return (
    <ReactMarkdown
      className={cn(
        "prose prose-sm dark:prose-invert max-w-none break-words",
        className
      )}
      components={{
        code({ node, inline, className, children, ...props }: CodeProps) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <div className="w-full rounded-md">
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                customStyle={{
                  margin: 0,
                  padding: "0.75rem",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  lineHeight: "1.5",
                  maxWidth: "100%",
                  overflowX: "auto",
                }}
                wrapLines={true}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code
              className={cn(
                "bg-muted px-1 py-0.5 rounded text-sm",
                className
              )}
              {...props}
            >
              {children}
            </code>
          );
        },
        h1: ({ node, ...props }) => (
          <h1 className="text-lg font-bold mt-2 mb-1" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-base font-bold mt-2 mb-1" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-sm font-bold mt-2 mb-1" {...props} />
        ),
        p: ({ node, ...props }) => <p className="my-1 text-sm" {...props} />,
        ul: ({ node, ...props }) => (
          <ul className="list-disc pl-4 my-1 text-sm" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal pl-4 my-1 text-sm" {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="my-0.5 text-sm" {...props} />
        ),
        a: ({ node, ...props }) => (
          <a
            className="text-primary hover:underline text-sm"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="border-l-4 border-muted-foreground pl-3 italic my-1 text-sm"
            {...props}
          />
        ),
        pre: ({ node, ...props }) => (
          <pre className="my-1 p-0" {...props} />
        ),
        table: ({ node, ...props }) => (
          <div className="w-full my-1">
            <table
              className="border-collapse border border-border w-full text-sm"
              {...props}
            />
          </div>
        ),
        th: ({ node, ...props }) => (
          <th
            className="border border-border px-2 py-1 bg-muted text-sm"
            {...props}
          />
        ),
        td: ({ node, ...props }) => (
          <td
            className="border border-border px-2 py-1 text-sm"
            {...props}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}