'use client'
import React, { useRef, useState } from 'react'
import { Button } from '../ui/button'
import { CheckCircle, File, Upload } from 'lucide-react'
import { useStudyNotes } from '@/contexts/StudyNotesContext'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'


export default function InputNotes() {
    const [isDragActive, setIsDragActive] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { setFile } = useStudyNotes()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
        }
    }
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
        }
    }


    return (
        <div className="space-y-4 ">
            <h1 className="text-2xl font-bold">Upload your study notes</h1>
            <p className="text-lg text-muted-foreground">Upload a PDF file or just use the chat to generate study notes</p>

            <form className="flex flex-col gap-4">

                {/* If a file is selected, show the file details and the clear selection button */}
                {selectedFile ? (
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center justify-center gap-3 p-8 border-2  rounded-lg bg-muted/30">
                            <CheckCircle className="h-10 w-10 text-green-600" />
                            <div className="text-center">
                                <p className="text-sm font-medium">{selectedFile.name}</p>
                                <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                            </div>
                            <Button variant="outline" onClick={() => setSelectedFile(null)}>Clear Selection</Button>
                        </div>

                        {/* Course selection */}
                        <div className="flex flex-col gap-8">
                            <div>
                                <p className="text-lg font-bold">For what course are these notes for? (Skip if not applicable)</p>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a course" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="history-101">History 101</SelectItem>
                                        <SelectItem value="math-101">Math 101</SelectItem>
                                        <SelectItem value="science-101">Science 101</SelectItem>
                                        <SelectItem value="english-101">English 101</SelectItem>
                                        <SelectItem value="art-101">Art 101</SelectItem>
                                        <SelectItem value="music-101">Music 101</SelectItem>
                                        <SelectItem value="pe-101">PE 101</SelectItem>
                                        <SelectItem value="social-studies-101">Social Studies 101</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Focus on specifically (Optional) */}
                            <div className="flex flex-col gap-2">
                                <p className="text-lg font-bold">(Optional) What do you want to focus on specifically?</p>
                                <Input type="text" placeholder="I want to focus on..." />
                            </div>

                            {/* Generate Notes button */}
                            <Button type="submit">Generate Notes</Button>
                        </div>
                    </div>
                ) : (
                    // If no file is selected, show the drag and drop area
                    <div className="flex flex-col gap-4">
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

                        {/* Topic selection */}
                        <div className="flex flex-col gap-8">
                            <div>
                                <p className="text-lg font-bold">Enter your topic</p>
                                <Input type="text" placeholder="e.g. 'Generate me notes on the Constitution'" required />
                            </div>


                            {/* Course selection */}
                            <div>
                                <p className="text-lg font-bold">These notes are for what course? (Skip if not applicable)</p>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a course" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="history-101">History 101</SelectItem>
                                        <SelectItem value="math-101">Math 101</SelectItem>
                                        <SelectItem value="science-101">Science 101</SelectItem>
                                        <SelectItem value="english-101">English 101</SelectItem>
                                        <SelectItem value="art-101">Art 101</SelectItem>
                                        <SelectItem value="music-101">Music 101</SelectItem>
                                        <SelectItem value="pe-101">PE 101</SelectItem>
                                        <SelectItem value="social-studies-101">Social Studies 101</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Focus on specifically (Optional) */}
                            <div className="flex flex-col gap-2">
                                <p className="text-lg font-bold">(Optional) What do you want to focus on specifically?</p>
                                <Input type="text" placeholder="I want to focus on..." />
                            </div>

                            {/* Generate Notes button */}
                            <Button type="submit">Generate Notes</Button>
                        </div>
                    </div>
                )}

            </form>
        </div>
    )
}
