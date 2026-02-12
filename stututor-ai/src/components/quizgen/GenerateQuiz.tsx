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

export default function GenerateQuiz() {
    const [difficulty, setDifficulty] = useState<string>('Easy')
    const [numQuestions, setNumQuestions] = useState<number>(10)
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
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate Quiz</DialogTitle>
                </DialogHeader>
                <form action="">
                    <div className="flex flex-col gap-6">

                        {/* Describe your topic */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="topic">Describe your topic</Label>
                            <Input id="topic" name="topic" placeholder="e.g. 'Quiz me on cellular respiration'" />
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
                        <DialogClose asChild>
                            <Button type="submit">Generate Quiz</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
