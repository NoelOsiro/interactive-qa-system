# AI Chat Interface

A modern, responsive chat interface for interacting with AI language models.

## Features

- Clean, intuitive chat interface with real-time responses
- Responsive design optimized for all device sizes
- Elegant loading states and transitions during API requests
- Message history with persistent conversation context
- Markdown formatting support for AI responses
- Error handling with user-friendly notifications

## Tech Stack

- **Frontend**: Next.js 13, TypeScript, TailwindCSS, shadcn/ui
- **Backend**: FastAPI (required separately)

## Getting Started

### Prerequisites

- Node.js 16.8+ and npm/yarn
- Python 3.7+ (for the backend)

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-chat-interface.git
   cd ai-chat-interface
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

### Backend Setup

The frontend expects a FastAPI backend running at the URL specified in your environment variables. Follow these steps to set up the backend:

1. Create a new directory for your backend:
   ```bash
   mkdir ai-chat-backend
   cd ai-chat-backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install the required packages:
   ```bash
   pip install fastapi uvicorn python-dotenv langchain openai
   ```

4. Create a `.env` file with your API keys:
   ```
   OPENAI_API_KEY=your_openai_api_key
   ```

5. Create a `main.py` file with the following content:

```python
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="AI Chat API",
    description="API for interacting with AI language models",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, set this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define models
class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[Message]] = []

class ChatResponse(BaseModel):
    response: str

# Import LLM (OpenAI in this example)
# Note: You can replace this with any LLM integration
try:
    from openai import OpenAI
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    
    def generate_response(message: str, history: List[Message]) -> str:
        # Convert history to OpenAI format
        messages = [{"role": msg.role, "content": msg.content} for msg in history]
        # Add system message for context
        messages.insert(0, {
            "role": "system",
            "content": "You are a helpful, knowledgeable assistant. Provide clear, concise, and accurate responses."
        })
        # Add the latest user message
        messages.append({"role": "user", "content": message})
        
        try:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages,
                max_tokens=1000,
                temperature=0.7,
            )
            return response.choices[0].message.content
        except Exception as e:
            logger.error(f"OpenAI API error: {str(e)}")
            raise HTTPException(status_code=500, detail=f"AI model error: {str(e)}")
            
except ImportError:
    # Fallback if OpenAI package is not available
    logger.warning("OpenAI package not found. Using mock response.")
    
    def generate_response(message: str, history: List[Message]) -> str:
        return f"This is a mock response to: '{message}'. Please install the OpenAI package and set your API key to get real responses."

# Define API endpoints
@app.get("/")
def read_root():
    return {"message": "Welcome to the AI Chat API"}

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        logger.info(f"Received message: {request.message}")
        response = generate_response(request.message, request.history)
        return ChatResponse(response=response)
    except Exception as e:
        logger.error(f"Error generating response: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
```

6. Start the FastAPI server:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

7. The API will be available at `http://localhost:8000` and the Swagger documentation at `http://localhost:8000/docs`

## Environment Variables Template

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)
```
OPENAI_API_KEY=your_openai_api_key
```

## Deployment

For deployment, you can use platforms like Vercel for the frontend and services like Heroku, Railway, or a cloud provider (AWS, Azure, GCP) for the backend.

## License

MIT