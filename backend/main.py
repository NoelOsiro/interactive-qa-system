from fastapi import FastAPI
from routes.ask import router as ask_router

app = FastAPI(
    title="Interactive Q&A System API",
    description="API for an interactive Q&A system with LLM integration",
    version="1.0.0"
)

# Include the ask router
app.include_router(ask_router, prefix="/api", tags=["Q&A"])

@app.get("/")
def read_root():
    return {"Hello": "World"}