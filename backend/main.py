from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load API key
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY is missing from .env file")

# Configure Google Gemini API
genai.configure(api_key=api_key)

# Create FastAPI app
app = FastAPI()

# Allow frontend requests (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (frontend)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Define request model
class Message(BaseModel):
    text: str

# Define chatbot endpoint
@app.post("/chat/")
async def chat(msg: Message):
    try:
        model = genai.GenerativeModel("gemini-2.0-flash")  # Ensure correct model
        prompt = (
            msg.text + "\n"
            "After reading the above question or statement, respond following these conditions:\n"
            "- Use Markdown formatting to highlight key points, steps, or summaries.\n"
            "- Use proper Markdown syntax for headings, subheadings, bullet points, and tables.\n"
            "- Ensure the response is structured, clear, and well-formatted.\n"
            "- If unsure about intent, ask clarifying questions before proceeding.\n"
            "- For comparative queries, present information in a table format.\n"
            "- Use simple English for easy understanding.\n"
            "- Keep responses concise, providing only the necessary information.\n"
        )
        response = model.generate_content(prompt)
        return {"reply": response.text}  # Return raw Markdown format for frontend rendering
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
