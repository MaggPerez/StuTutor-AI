from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from models.schemas import PDFQuestionResponse, PDFAnalysisResponse
from services.gemini_service import gemini_service
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

# Maximum file size: 10MB
MAX_FILE_SIZE = 10 * 1024 * 1024


@router.get("/hello")
async def hello():
    """Example endpoint"""
    return {"message": "Hello from FastAPI!"}


@router.post("/pdf/ask", response_model=PDFQuestionResponse)
async def ask_pdf_question(
    pdf: UploadFile = File(..., description="PDF file to analyze"),
    question: str = Form(..., description="Question about the PDF")
):
    """
    Upload a PDF and ask a question about its content.
    Gemini AI will read the PDF and provide an answer.

    Args:
        pdf: The PDF file to analyze
        question: The question to ask about the PDF

    Returns:
        PDFQuestionResponse with the AI's answer
    """
    try:
        # Validate file type
        if pdf.content_type != "application/pdf":
            raise HTTPException(
                status_code=400,
                detail="Only PDF files are allowed"
            )

        # Validate question
        if not question or not question.strip():
            raise HTTPException(
                status_code=400,
                detail="Question is required"
            )

        # Read file content
        pdf_content = await pdf.read()

        # Validate file size
        if len(pdf_content) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=400,
                detail=f"File size exceeds maximum allowed size of {MAX_FILE_SIZE / 1024 / 1024}MB"
            )

        logger.info(f"Processing PDF question: {question[:50]}...")

        # Process with Gemini
        answer = await gemini_service.process_pdf_question(
            pdf_bytes=pdf_content,
            question=question.strip()
        )

        return PDFQuestionResponse(answer=answer)

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing PDF question: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to process PDF: {str(e)}"
        )


@router.post("/pdf/analyze", response_model=PDFAnalysisResponse)
async def analyze_pdf(
    pdf: UploadFile = File(..., description="PDF file to analyze")
):
    """
    Upload a PDF and get a comprehensive summary of its content.

    Args:
        pdf: The PDF file to analyze

    Returns:
        PDFAnalysisResponse with a summary of the PDF
    """
    try:
        # Validate file type
        if pdf.content_type != "application/pdf":
            raise HTTPException(
                status_code=400,
                detail="Only PDF files are allowed"
            )

        # Read file content
        pdf_content = await pdf.read()

        # Validate file size
        if len(pdf_content) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=400,
                detail=f"File size exceeds maximum allowed size of {MAX_FILE_SIZE / 1024 / 1024}MB"
            )

        logger.info("Analyzing PDF content...")

        # Process with Gemini
        summary = await gemini_service.analyze_pdf_content(pdf_bytes=pdf_content)

        return PDFAnalysisResponse(summary=summary)

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error analyzing PDF: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to analyze PDF: {str(e)}"
        )

