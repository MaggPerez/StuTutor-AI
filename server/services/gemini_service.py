"""
Gemini AI Service
Handles PDF processing and question answering using Google Gemini AI
"""

from google import genai
from google.genai import types
from config.settings import settings
import logging

# Configure logging
logger = logging.getLogger(__name__)


class GeminiService:
    """Service for interacting with Google Gemini AI"""

    def __init__(self):
        """Initialize Gemini client with API key"""
        self.client = genai.Client(api_key=settings.gemini_api_key)
        self.model_name = "gemini-2.0-flash-exp"

    async def process_pdf_question(
        self,
        pdf_bytes: bytes,
        question: str,
        mime_type: str = "application/pdf"
    ) -> str:
        """
        Process a PDF document and answer a question about it using Gemini AI

        Args:
            pdf_bytes: The PDF file content as bytes
            question: The user's question about the PDF
            mime_type: MIME type of the file (default: application/pdf)

        Returns:
            str: The AI's response to the question

        Raises:
            Exception: If there's an error processing the PDF or generating response
        """
        try:
            logger.info(f"Processing PDF question with Gemini model: {self.model_name}")

            # Create the PDF part from bytes
            pdf_part = types.Part.from_bytes(
                data=pdf_bytes,
                mime_type=mime_type
            )

            # Generate content with Gemini
            # The model receives both the PDF and the question
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=[
                    pdf_part,
                    question
                ]
            )

            logger.info("Successfully generated response from Gemini")
            return response.text

        except Exception as e:
            logger.error(f"Error processing PDF with Gemini: {str(e)}")
            raise Exception(f"Failed to process PDF with Gemini AI: {str(e)}")

    async def analyze_pdf_content(self, pdf_bytes: bytes) -> str:
        """
        Analyze a PDF document and provide a summary

        Args:
            pdf_bytes: The PDF file content as bytes

        Returns:
            str: A summary of the PDF content
        """
        default_prompt = "Please provide a comprehensive summary of this document, including the main topics, key points, and any important information."
        return await self.process_pdf_question(pdf_bytes, default_prompt)


# Create a singleton instance
gemini_service = GeminiService()
