# 🚀 Interactive Q\&A System

An AI-powered, full-stack **Interactive Q\&A System** that allows users to ask questions and receive context-aware, markdown-formatted responses in real-time. Built with a responsive Next.js frontend and a FastAPI backend integrated with the Gemini LLM (free tier).

## 🎯 Assessment Objective

This project fulfills the pre-screening assessment to demonstrate proficiency in:

* **Full-Stack Development**: Modern technologies (Next.js, FastAPI, TailwindCSS).
* **AI/LLM Integration**: Seamless integration with Gemini LLM.
* **User-Friendly Interfaces**: Responsive, visually appealing UI/UX.
* **Clean Code**: Well-organized, maintainable code with proper error handling.
* **API Integrations**: Secure and structured API endpoints.
* **Decision-Making**: Effective use case selection and prompt engineering.

**Use Case**: A general-purpose Q\&A system where users can ask any question (e.g., "What documents do I need to travel from Kenya to Ireland?") and receive structured, markdown-formatted responses with relevant details, leveraging conversation history for context.

## ✨ Features

### 🖥️ Frontend

* Responsive web interface with TailwindCSS.
* Intuitive text area for user queries.
* Real-time, markdown-rendered responses (code snippets, lists, headings).
* Sidebar for viewing and managing query history (bonus feature).
* Mobile-friendly design.

### ⚙️ Backend API

* **FastAPI** endpoints (`/api/ask`) for secure query processing.
* Context-aware responses using conversation history.
* Swagger UI documentation at `/docs`.
* Environment variable management for API keys and URLs.

### 🤖 LLM Integration

* Gemini 1.5 Flash (free tier) for accurate, technical responses.
* Prompt engineering optimized for programming and general questions.

### 🛠️ UX Enhancements

* Input validation and API error handling.
* Loading indicators and user-friendly error messages.

## 🧰 Technical Stack

* **Frontend**: Next.js (App Router), TypeScript, TailwindCSS, Lucide-React.
* **Backend**: Python, FastAPI, Pydantic, Google Generative AI SDK.
* **LLM**: Gemini 1.5 Flash.
* **Tools**: Nanoid, Tenacity (retry logic), Python-Dotenv.

## 🚀 Setup

### Prerequisites

* Node.js (v18+)
* Python (v3.9+)
* Git
* Gemini API Key (Google Cloud Console)

## 🚢 Deployment (Optional)

### Backend (Vercel)

* Runtime: Python 3.9+
* Build: `pip install -r requirements.txt`
* Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`
* Env: `GEMINI_API_KEY`
* https://backend-eight-liard-70.vercel.app/api/ask

### Frontend (Vercel)

* Connect GitHub repo
* Env: `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api/ask`
* Deploy
* https://interactive-qa-system.vercel.app/chat


### 🔧 Backend Setup

1. Clone repository:

   ```bash
   git clone https://github.com/NoelOsiro/interactive-qa-system.git
   cd interactive-qa-system/backend
   ```
2. Create virtual environment and activate:

   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```
3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```
4. Copy and configure `.env`:

   ```bash
   cp .env.example .env
   ```

   ```env
   GEMINI_API_KEY=your-gemini-api-key
   ```
5. Run the backend server:

   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

### 🖥️ Frontend Setup

1. Navigate to frontend:

   ```bash
   cd ../frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Copy and configure `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

   ```env
   NEXT_PUBLIC_FAST_API_URL=http://localhost:8000/api/ask
NEXT_PUBLIC_API_URL=http://localhost:3000/api/chat
   ```
4. Run the frontend:

   ```bash
   npm run dev
   ```
5. Open in browser: [http://localhost:3000](http://localhost:3000)

## 🧠 Prompt Engineering

```text
You are a helpful AI assistant specializing in programming and technical questions.
Provide clear, concise, and accurate answers, using markdown for formatting.
Include conversation history for context.
```

## 🔍 Example Interaction

**User**: "What documents do I need to travel from Kenya to Ireland?"

**Assistant**:

```markdown
To travel from Kenya to Ireland, you need:

- **Passport**: Valid for at least 6 months beyond departure.
- **Visa**: Short-stay (C) visa via Irish Embassy or VFS Global.
- **Additional Documents**:
  - Proof of accommodation.
  - Return flight tickets.
  - Bank statements (sufficient funds).

> Check for updates on [gov.ie](https://www.gov.ie) or the Irish Embassy in Nairobi.
```


## 📂 Repository & Submission

* **GitHub**: [https://github.com/NoelOsiro/interactive-qa-system](https://github.com/NoelOsiro/interactive-qa-system)
* **Structure**: `backend/` (FastAPI) & `frontend/` (Next.js)
* **README**: Includes setup, prompt docs, env templates
* **Ignored**: `.env`, `.env.local`

---

*Developed by Noel Osiro, passionate about AI-driven applications.*
