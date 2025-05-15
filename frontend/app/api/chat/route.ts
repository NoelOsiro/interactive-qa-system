// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ChatPayload, ChatResponse } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ChatPayload;
    const apiUrl = process.env.NEXT_PUBLIC_FAST_API_URL;

    if (!apiUrl) {
      throw new Error('NEXT_PUBLIC_FAST_API_URL is not defined');
    }

    // FastAPI expects { query: string }
    const fastApiRequest = {
      query: body.message,
    };

    const response = await fetch(`${apiUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fastApiRequest),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    // Wrap response to match ChatResponse type
    const result: ChatResponse = {
      response: data.response,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
