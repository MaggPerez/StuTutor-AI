'use client'
import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { FileText, Upload, CheckCircle2 } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useQuiz } from '@/contexts/QuizContext'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'



export default function UploadPDFQuiz() {
    const [isDragActive, setIsDragActive] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const { generateQuizFromPDF, setFile, numQuestions, setNumQuestions, difficulty, setDifficulty } = useQuiz()
    const router = useRouter()

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragActive(true)
        } else if (e.type === 'dragleave') {
            setIsDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragActive(false)
        const file = e.dataTransfer.files[0]
        if (file) {
            setSelectedFile(file)
            setFile(file)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            setFile(file)
        }
    }

    const handleCancel = () => {
        setSelectedFile(null)
        setFile(null as unknown as File)
    }

    const handleGenerateQuiz = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (selectedFile && numQuestions && difficulty) {
            const id = crypto.randomUUID()
            generateQuizFromPDF(id).then((result) => {
                if (!result) {
                    toast.error('Failed to generate quiz')
                }
            })
            router.push(`/aitutor/quizgen/${id}`)
        } else {
            toast.error('Please fill in all fields')
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                        {/* Card title */}
                        <CardTitle className="flex items-center gap-2"><FileText className="h-8 w-8 text-muted-foreground" /> Upload a PDF</CardTitle>

                        {/* Card description */}
                        <CardDescription>
                            Upload a PDF to get started.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload a PDF</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleGenerateQuiz} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="pdf-upload" className="text-sm font-medium">PDF Document</Label>

                        {/* If a file is selected, show the file details and the number of questions and difficulty */}
                        {selectedFile ? (
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col items-center justify-center gap-3 p-8 border-2  rounded-lg bg-muted/30">
                                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                                    <div className="text-center">
                                        <p className="text-sm font-medium">{selectedFile.name}</p>
                                        <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                                    </div>

                                    {/* Clear selection button */}
                                    <Button type="button" variant="outline" onClick={handleCancel}>Clear Selection</Button>
                                </div>

                                {/* Number of questions and difficulty */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col gap-2 ">
                                        <Label htmlFor="numQuestions">Number of Questions</Label>
                                        <Select value={numQuestions.toString()} onValueChange={(value) => setNumQuestions(Number(value))}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select the number of questions" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="5">5</SelectItem>
                                                <SelectItem value="10">10</SelectItem>
                                                <SelectItem value="15">15</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="difficulty">Difficulty</Label>
                                        <Select value={difficulty} onValueChange={(value) => setDifficulty(value)}>
                                            <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select the difficulty" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Easy">Easy</SelectItem>
                                            <SelectItem value="Medium">Medium</SelectItem>
                                            <SelectItem value="Hard">Hard</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    </div>
                                </div>

                            </div>


                        ) : (
                            // If no file is selected, show the drag and drop area
                            <div>
                                {/* Drag and drop area */}
                                <label
                                    htmlFor="pdf-upload"
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    className={`flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDragActive
                                        ? 'border-primary bg-primary/5'
                                        : 'border-muted-foreground/25 hover:border-primary/50 bg-muted/30'
                                        }`}
                                >
                                    <Upload className="h-10 w-10 text-muted-foreground" />
                                    <div className="text-center">
                                        <p className="text-sm font-medium">Drag and drop your PDF here</p>
                                        <p className="text-xs text-muted-foreground">or click to browse</p>
                                    </div>

                                    {/* Hidden input to trigger file upload */}
                                    <Input
                                        type="file"
                                        accept="application/pdf"
                                        id="pdf-upload"
                                        name="pdf-upload"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </label>
                            </div>
                        )}


                    </div>

                    <DialogFooter>
                        {/* Cancel button */}
                        <DialogClose asChild>
                            <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
                        </DialogClose>

                        {/* Upload button */}
                        <DialogClose asChild disabled={!selectedFile}>
                            <Button type="submit">Generate Quiz</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
