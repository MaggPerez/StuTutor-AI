from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class BaseResponse(BaseModel):
    """Base response model"""
    success: bool
    message: str
    data: Optional[dict] = None

class ErrorResponse(BaseModel):
    """Error response model"""
    success: bool = False
    error: str
    detail: Optional[str] = None


# PDF-related models
class PDFQuestionResponse(BaseModel):
    """Response model for PDF question answering"""
    success: bool = True
    answer: str
    model_used: str = "gemini-2.0-flash-exp"
    timestamp: datetime = Field(default_factory=datetime.now)


class PDFAnalysisResponse(BaseModel):
    """Response model for PDF analysis/summary"""
    success: bool = True
    summary: str
    model_used: str = "gemini-2.0-flash-exp"
    timestamp: datetime = Field(default_factory=datetime.now)


class PDFErrorResponse(BaseModel):
    """Error response specific to PDF operations"""
    success: bool = False
    error: str
    detail: Optional[str] = None
    error_type: str = "pdf_processing_error"

