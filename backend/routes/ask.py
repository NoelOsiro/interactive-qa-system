from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.llm_service import get_llm_response

router = APIRouter()

# Pydantic model for request validation
class QueryRequest(BaseModel):
    query: str

# Pydantic model for response
class QueryResponse(BaseModel):
    response: str
    timestamp: str

@router.post("/ask", response_model=QueryResponse)
async def ask_question(request: QueryRequest):
    """
    Process a user query and return an AI-generated response.
    
    Args:
        request: QueryRequest containing the user's question
        
    Returns:
        QueryResponse with the AI response and timestamp
        
    Raises:
        HTTPException: If the query is empty or the LLM request fails
    """
    if not request.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")

    try:
        # Get LLM response
        response = await get_llm_response(request.query)
        from datetime import datetime
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        return QueryResponse(response=response, timestamp=timestamp)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process query: {str(e)}")