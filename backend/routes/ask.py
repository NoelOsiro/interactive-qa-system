from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from services.llm_service import get_llm_response
from datetime import datetime
from models import Message  # Import shared Message model

router = APIRouter()

# Pydantic model for request
class QueryRequest(BaseModel):
    query: str
    history: List[Message] = []

# Pydantic model for response
class QueryResponse(BaseModel):
    response: str
    timestamp: str

@router.post("/ask", response_model=QueryResponse)
async def ask_question(request: QueryRequest):
    """
    Process a user query with conversation history and return an AI-generated response.
    
    Args:
        request: QueryRequest containing the user's question and conversation history
        
    Returns:
        QueryResponse with the AI response and timestamp
        
    Raises:
        HTTPException: If the query is empty or the LLM request fails
    """
    if not request.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")

    try:
        # Pass both query and history to LLM
        response = await get_llm_response(request.query, request.history)
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        return QueryResponse(response=response, timestamp=timestamp)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process query: {str(e)}")