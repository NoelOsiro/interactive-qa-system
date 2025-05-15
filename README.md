# 🌐 Interactive Q\&A System

An AI-powered, full-stack Interactive Q\&A System that allows users to ask questions and receive context-aware, markdown-formatted responses in real-time. Built with a responsive Next.js frontend and a FastAPI backend integrated with the Gemini LLM (free tier).

## 🚀 Live Demo

> Visit the deployed app here: [https://interactive-qa.vercel.app](https://interactive-qa.vercel.app)
> 
> Visit the deployed backend here : [https://backend-eight-liard-70.vercel.app/docs](https://backend-eight-liard-70.vercel.app/docs)

A fully hosted, working version of the system is available on Vercel. It demonstrates the Q\&A interaction, markdown formatting, loading feedback, and conversation history feature.


## ✨ Features

* 📟 **Responsive Web Interface**:

  * Intuitive text area for user queries.
  * Real-time, markdown-rendered responses with code snippets, lists, and headings.
  * Sidebar for viewing and managing query history (bonus feature).
  * Mobile-friendly design with TailwindCSS.
* 🔙 **Backend API**:

  * FastAPI endpoints (`/api/ask`) for secure query processing.
  * Context-aware responses using conversation history.
  * Swagger UI documentation at `/docs`.
  * Environment variable management for API keys and URLs.
* 🧠 **LLM Integration**:

  * Gemini 1.5 Flash (free tier) for accurate, technical responses.
  * Prompt engineering optimized for programming and general questions.
* ⚠️ **Error Handling & Loading States**:

  * Input validation and API error handling.
  * Loading indicators and user-friendly error messages in the UI.

## 🛠️ Technical Stack

* **Frontend**: Next.js (latest, App Router), TailwindCSS, Lucide-React (icons).
* **Backend**: Python, FastAPI, Pydantic, Google Generative AI SDK.
* **LLM**: Gemini 1.5 Flash (free tier).
* **Tools**: Nanoid (unique IDs), Tenacity (retry logic), Python-Dotenv (env management).

## 📁 Folder Structure

```
interactive-qa-system/
├── backend/                 # FastAPI backend
│   ├── main.py              # FastAPI app with routes and middleware
│   ├── models.py            # Pydantic models for request/response
│   ├── services/
│   │   └── llm_service.py   # Gemini integration + retry logic
│   ├── .env.example         # Env variable template
│   └── requirements.txt     # Backend dependencies
├── frontend/                # Next.js frontend
│   ├── app/                 # App Router structure
│   ├── components/          # UI components
│   ├── lib/                 # Utility functions
│   ├── styles/              # TailwindCSS config
│   ├── .env.example         # Env variable template
│   └── package.json         # Frontend dependencies
└── README.md                # Project documentation
```

## ⚙️ Setup

### 📋 Prerequisites

* Node.js (v18+)
* Python (v3.9+)
* Git
* Gemini API Key ([Google Cloud Console](https://console.cloud.google.com/))

### 🔧 Backend Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/NoelOsiro/interactive-qa-system
   cd interactive-qa-system/backend
   ```
2. **Create a Virtual Environment**:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. **Install Dependencies**:

   ```bash
   pip install -r requirements.txt
   ```
4. **Set Up Environment Variables**:

   ```bash
   cp .env.example .env
   ```

   Add your Gemini API key to `.env`:

   ```env
   GEMINI_API_KEY=your-gemini-api-key
   ```
5. **Run the Backend**:

   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```
6. **Access the API**:

   * Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
   * Test Endpoint (POST `/api/ask`):

     ```json
     {
       "query": "What is Python?",
       "history": [
         {"role": "user", "content": "Hello"},
         {"role": "assistant", "content": "Hi! How can I help?"}
       ]
     }
     ```

### 🎨 Frontend Setup

1. **Navigate to Frontend Directory**:

   ```bash
   cd ../frontend
   ```
2. **Install Dependencies**:

   ```bash
   npm install
   ```
3. **Set Up Environment Variables**:

   ```bash
   cp .env.example .env.local
   ```

   Add the backend API URL to `.env.local`:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api/ask
   ```
4. **Run the Frontend**:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.


## 🚀 Live Demo

> Visit the deployed app here: [https://interactive-qa.vercel.app](https://interactive-qa.vercel.app)

A fully hosted, working version of the system is available on Vercel. It demonstrates the Q\&A interaction, markdown formatting, loading feedback, and conversation history feature.
