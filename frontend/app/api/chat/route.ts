// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ChatPayload, ChatResponse } from '@/lib/types';

export const dynamic = 'force-dynamic'; // Ensure dynamic rendering

// This file provides a mock API endpoint for testing the frontend
// In production, the frontend should call the FastAPI backend at http://localhost:8000/ask
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ChatPayload;
    const { message } = body;

    // Mock delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create a mock response
    const response: ChatResponse = {
      response: generateMockResponse(message),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

// Helper function to generate mock responses for testing
function generateMockResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "Hello! I'm your AI assistant. How can I help you today?";
  }

  if (lowerMessage.includes('how are you')) {
    return "I'm functioning well, thank you for asking! I'm here to assist you with any questions or tasks.";
  }

  if (lowerMessage.includes('help')) {
    return "I'd be happy to help! I can answer questions, provide information, and assist with various tasks. Just let me know what you need.";
  }

  if (lowerMessage.includes('feature') || lowerMessage.includes('capabilities')) {
    return `Here are some things I can help with:

1. **Answer questions** about a wide range of topics
2. **Explain concepts** in simple, understandable terms
3. **Provide examples** of code, writing, or other content
4. **Offer suggestions** for problem-solving
5. **Have conversations** on various subjects

Feel free to ask me anything!`;
  }

  if (lowerMessage.includes('markdown')) {
    return `# Markdown Example

This is a demonstration of Markdown formatting that I can use in my responses.

## Formatting Options

- **Bold text** for emphasis
- *Italic text* for slight emphasis
- ~~Strikethrough~~ for deleted content

## Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}! Welcome to our AI chat.\`;
}

console.log(greet('User'));
\`\`\`

## Lists

1. Ordered item one
2. Ordered item two
3. Ordered item three

* Unordered item
* Another unordered item

> This is a blockquote that can be used for important notes or quotes.

Hope this demonstrates the markdown capabilities!`;
  }

  return `Thank you for your message: "${message}". This is a mock response from the API. In a production environment, this would be replaced with a response from a real AI language model via the FastAPI backend.`;
}