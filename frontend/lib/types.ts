export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface ChatPayload {
  message: string;
  history: Message[];
}

export interface ChatResponse {
  response: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}