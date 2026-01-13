from google import genai
import os
import dotenv
from fastapi import APIRouter, UploadFile, File, Form
from google.genai import types
from pydantic import BaseModel


router = APIRouter()

dotenv.load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")


client = genai.Client(api_key=GEMINI_API_KEY)


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
async def chat(request: ChatRequest):
    response = client.models.generate_content(
        model="gemini-2.5-flash", contents=request.message
    )
    return {
        "message": response.text
    }


@router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...), question: str = Form(...)):
    if file.content_type != "application/pdf":
        return {"error": "Only PDF files are allowed"}
    
    if not question.strip():
        return {"error": "Question parameter is required"}
    
    file_content = await file.read()
    answer = readPDF(file_content, question)
    print(answer)
    return {"Gemini": answer}



def readPDF(file_content: bytes, user_question: str):
    client = genai.Client(api_key=os.getenv('GEMINI_API_KEY'))
    
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
            types.Part.from_bytes(
                data=file_content,
                mime_type='application/pdf',
            ),
            user_question
        ]
    )
    return response.text

