from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.ask import router as ask_router

app = FastAPI(
    title="Interactive Q&A System API",
    description="API for an interactive Q&A system with LLM integration",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Include the ask router
app.include_router(ask_router, prefix="/api", tags=["Q&A"])

@app.get("/")
def read_root():
    return {"Hello": "World"}