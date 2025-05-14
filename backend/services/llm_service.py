import google.generativeai as genai
from dotenv import load_dotenv
import os
import asyncio

# Load environment variables
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

async def get_llm_response(query: str) -> str:
    """
    Send a query to the Gemini API and return the response.
    
    Args:
        query: The user's question
        
    Returns:
        The AI-generated response
        
    Raises:
        Exception: If the API request fails
    """
    if not GEMINI_API_KEY:
        raise Exception("Gemini API key not found in environment variables")

    # Configure Gemini API
    genai.configure(api_key=GEMINI_API_KEY)

    # Craft a prompt for better responses
    prompt = f"""
    You are a helpful AI assistant specializing in programming and technical questions. 
    Provide a clear, concise, and accurate answer to the following question. 
    Use markdown formatting for code snippets, lists, and headings if appropriate.
    
    Question: {query}
    
    Answer:
    """

    try:
        # Initialize the model (e.g., Gemini 1.5 Flash for free tier)
        model = genai.GenerativeModel("gemini-1.5-flash")

        # Make the API call (Gemini SDK is synchronous, so we wrap in asyncio)
        response = await asyncio.to_thread(model.generate_content, prompt)
        
        if not response.text:
            raise Exception("Empty response from Gemini API")
        
        return response.text.strip()
    except Exception as e:
        raise Exception(f"Failed to connect to Gemini API: {str(e)}")