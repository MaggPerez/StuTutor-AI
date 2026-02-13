'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Brain, FileText } from 'lucide-react'
import { useQuiz } from '@/contexts/QuizContext'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Spinner } from '../ui/spinner'

export default function GenerateQuiz() {
    const { difficulty, setDifficulty, numQuestions, setNumQuestions, topic, setTopic, generateQuiz, isLoading } = useQuiz()
    const router = useRouter()
    async function handleGenerateQuiz(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (topic && difficulty && numQuestions) {
            const id = await generateQuiz()
            if (id) {
                router.push(`/aitutor/quizgen/${id}`)
            } else {
                toast.error('Failed to generate quiz')
            }
        } else {
            toast.error('Please fill in all fields')
        }
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Brain className="h-8 w-8 text-muted-foreground" /> Generate Quiz</CardTitle>
                        <CardDescription>
                            Generate a quiz based on your topic of choice.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading && <div className="flex items-center justify-center">
                            <Spinner className="size-10 animate-spin" /> Generating quiz...
                        </div>}
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate Quiz</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleGenerateQuiz}>  
                    <div className="flex flex-col gap-6">

                        {/* Describe your topic */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="topic">Describe your topic</Label>
                            <Input id="topic" name="topic" placeholder="e.g. 'Quiz me on cellular respiration'" value={topic} onChange={(e) => setTopic(e.target.value)} />
                        </div>

                        {/* Difficulty */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="difficulty">Difficulty</Label>

                            <div className="flex justify-start items-center">
                                <ToggleGroup type="single" spacing={4} value={difficulty} onValueChange={(value) => setDifficulty(value)}>
                                    <ToggleGroupItem value="Easy">Easy</ToggleGroupItem>
                                    <ToggleGroupItem value="Medium">Medium</ToggleGroupItem>
                                    <ToggleGroupItem value="Hard">Hard</ToggleGroupItem>
                                </ToggleGroup>
                            </div>
                        </div>

                        {/* Number of Questions */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="numQuestions">Number of Questions</Label>
                            <Select value={numQuestions.toString()} onValueChange={(value) => setNumQuestions(Number(value))}>
                                <SelectTrigger className="w-fit">
                                    <SelectValue placeholder="Select the number of questions" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="15">15</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild disabled={!topic}>
                            <Button type="submit">Generate Quiz</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
