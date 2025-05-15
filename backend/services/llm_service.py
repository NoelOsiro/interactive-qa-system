import google.generativeai as genai
from dotenv import load_dotenv
import os
import asyncio
import logging
from typing import List
from models import Message  # Import shared Message model

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

async def get_llm_response(query: str, history: List[Message] = []) -> str:
    """
    Send a query with conversation history to the Gemini API and return the response.
    
    Args:
        query: The user's current question
        history: List of previous messages (Pydantic Message objects)
        
    Returns:
        The AI-generated response
        
    Raises:
        Exception: If the API request fails or input is invalid
    """
    # Validate API key
    if not GEMINI_API_KEY:
        logger.error("Gemini API key not found in environment variables")
        raise Exception("Gemini API key not found")

    # Validate query
    if not query or not isinstance(query, str):
        logger.error("Invalid query: must be a non-empty string")
        raise Exception("Query must be a non-empty string")

    # Validate history
    for message in history:
        if not isinstance(message, Message):
            logger.error(f"Invalid history entry: {message}")
            raise Exception("History contains invalid entries")
        if message.role not in ["user", "assistant"]:
            logger.error(f"Invalid role in history: {message.role}")
            raise Exception(f"Invalid role: {message.role}")
        if not isinstance(message.content, str):
            logger.error(f"Invalid content in history: {message.content}")
            raise Exception("History content must be a string")

    # Limit history to avoid token limit issues (last 10 messages)
    history = history[-10:]
    logger.info(f"Processing query: {query}")
    logger.info(f"History length: {len(history)}")

    # Configure Gemini API
    try:
        genai.configure(api_key=GEMINI_API_KEY)
    except Exception as e:
        logger.error(f"Failed to configure Gemini API: {str(e)}")
        raise Exception(f"Failed to configure Gemini API: {str(e)}")

    # Format conversation history for the prompt
    history_text = ""
    for message in history:
        role = "User" if message.role == "user" else "Assistant"
        history_text += f"{role}: {message.content}\n\n"

    # Craft a prompt
    prompt = f"""
You are a helpful AI assistant specializing in programming and technical questions.
Provide a clear, concise, and accurate answer to the current question, taking into account the conversation history.
Use markdown formatting for code snippets, lists, and headings if appropriate.

### Conversation History
{history_text}

### Current Question
{query}

### Answer
"""

    logger.info("Sending prompt to Gemini API")
    try:
        # Initialize the model
        model = genai.GenerativeModel("gemini-1.5-flash")

        # Make the API call
        response = await asyncio.to_thread(model.generate_content, prompt)
        
        # Check for valid response
        if not hasattr(response, "text") or not response.text:
            logger.error("Empty or invalid response from Gemini API")
            raise Exception("Empty response from Gemini API")
        
        logger.info("Received response from Gemini API")
        return response.text.strip()
    except Exception as e:
        logger.error(f"Gemini API error: {str(e)}")
        raise Exception(f"Failed to connect to Gemini API: {str(e)}")