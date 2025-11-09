import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, FileText, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useChatContext } from '@/context/ChatContext';
import { uploadPDFToStorage } from '@/lib/api';
import { toast } from 'sonner';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const UploadSection = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { createNewConversation, setCurrentPDF, updateConversationPDFMetadata } = useChatContext();

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    if (file.type !== 'application/pdf') {
      return { valid: false, error: 'Please upload a PDF file' };
    }
    if (file.size > MAX_FILE_SIZE) {
      return { valid: false, error: 'File size must be less than 10MB' };
    }
    return { valid: true };
  };

  const handleFileUpload = useCallback(async (file: File) => {
    const validation = validateFile(file);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    setSelectedFile(file);
    setIsUploading(true);
    setUploadSuccess(false);

    try {
      // Create a new conversation
      const conversationId = await createNewConversation(`Chat about ${file.name}`);

      // Upload PDF to Supabase Storage
      const uploadResult = await uploadPDFToStorage(file, conversationId);

      if (!uploadResult.success) {
        throw new Error(uploadResult.error || 'Failed to upload PDF');
      }

      // Set the current PDF in context
      const fileUrl = URL.createObjectURL(file);
      setCurrentPDF({
        fileUrl,
        fileName: file.name,
      });

      // Update conversation with PDF metadata
      if (uploadResult.storageUrl && uploadResult.filePath) {
        await updateConversationPDFMetadata(conversationId, {
          fileName: file.name,
          fileSize: file.size,
          storageUrl: uploadResult.storageUrl,
          filePath: uploadResult.filePath,
        });
      }

      setUploadSuccess(true);
      toast.success('PDF uploaded successfully!');

      // Navigate to chat page after a brief delay
      setTimeout(() => {
        navigate('/chat');
      }, 1000);
    } catch (error) {
      console.error('Error uploading PDF:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to upload PDF');
      setSelectedFile(null);
    } finally {
      setIsUploading(false);
    }
  }, [createNewConversation, setCurrentPDF, updateConversationPDFMetadata, navigate]);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div id="upload-section" className="bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          {/* Section Header */}
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Upload Your PDF
            </h2>
            <p className="text-lg text-muted-foreground">
              Drag and drop your PDF or click to browse. We'll analyze it with AI instantly.
            </p>
          </div>

          {/* Upload Card */}
          <Card
            className={`relative overflow-hidden transition-all duration-200 ${
              isDragging
                ? 'border-primary bg-primary/5 shadow-lg'
                : 'border-dashed border-muted-foreground/30 hover:border-primary/50 hover:bg-accent/50'
            }`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="p-12">
              <div className="flex flex-col items-center justify-center text-center">
                {/* Upload Icon */}
                {isUploading ? (
                  <Loader2 className="mb-6 h-16 w-16 animate-spin text-primary" />
                ) : uploadSuccess ? (
                  <CheckCircle2 className="mb-6 h-16 w-16 text-green-500" />
                ) : (
                  <div className="mb-6 rounded-full bg-primary/10 p-4">
                    {selectedFile ? (
                      <FileText className="h-12 w-12 text-primary" />
                    ) : (
                      <Upload className="h-12 w-12 text-primary" />
                    )}
                  </div>
                )}

                {/* Upload Text */}
                {isUploading ? (
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-foreground">
                      Uploading {selectedFile?.name}...
                    </h3>
                    <p className="text-sm text-muted-foreground">Please wait while we process your PDF</p>
                  </div>
                ) : uploadSuccess ? (
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-green-600">
                      Upload Successful!
                    </h3>
                    <p className="text-sm text-muted-foreground">Redirecting to chat...</p>
                  </div>
                ) : (
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-foreground">
                      {isDragging ? 'Drop your PDF here' : 'Drag & drop your PDF here'}
                    </h3>
                    <p className="mb-6 text-sm text-muted-foreground">
                      or click the button below to browse
                    </p>

                    <Button
                      size="lg"
                      className="gap-2 px-8"
                      onClick={handleButtonClick}
                      disabled={isUploading}
                    >
                      <Upload className="h-5 w-5" />
                      Choose PDF File
                    </Button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                  </div>
                )}

                {/* File Info */}
                {!isUploading && !uploadSuccess && (
                  <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
                    <AlertCircle className="h-4 w-4" />
                    <span>Maximum file size: 10MB • PDF format only</span>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Quick Actions Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Once uploaded, you can ask questions, get summaries, create study notes, and generate practice questions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
