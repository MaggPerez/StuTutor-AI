'use client'
import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../ui/card'
import { QuizQuestion } from '@/types/QuizQuestion'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useQuiz } from '@/contexts/QuizContext'
import { Spinner } from '../ui/spinner'

export default function QuizQuestionsCard({ quizId }: { quizId: string }) {
    const { questions, isLoading } = useQuiz()

    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [score, setScore] = useState(0)
    const [quizFinished, setQuizFinished] = useState(false)

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <h1 className="text-2xl font-bold"><Spinner className="size-10 animate-spin" />Generating quiz...</h1>
            </div>
        )
    }

    const currentQuestion = questions[currentIndex] || null
    if (!currentQuestion) {
        return <div>No questions found</div>
    }

    function handleAnswer(choice: string) {
        if (selectedAnswer !== null) return // prevent changing answer once selected
        setSelectedAnswer(choice)
        const correct = choice === currentQuestion.answer
        setIsCorrect(correct)
        if (correct) setScore((prev) => prev + 1)
    }

    function handleNext() {
        if (currentIndex + 1 < questions.length) {
            setCurrentIndex((prev) => prev + 1)
            setSelectedAnswer(null)
            setIsCorrect(null)
        } else {
            setQuizFinished(true)
        }
    }

    if (quizFinished) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <Card className="max-w-2xl w-full">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Quiz Complete!</CardTitle>
                    </CardHeader>
                    <CardContent>

                        <div className="flex flex-col gap-2">
                            <p className="text-lg">You scored {score} out of {questions.length}</p>

                            <div className="flex flex-row gap-2">
                                <Link href="/aitutor/quizgen" className="w-full">
                                    <Button className="w-full" variant="outline">View Results</Button>
                                </Link>
                                <Link href="/aitutor/quizgen/{quizId}" className="w-full">
                                    <Button className="w-full" variant="secondary">Retake Quiz</Button>
                                </Link>
                                <Link href="/aitutor/quizgen" className="w-full">
                                    <Button className="w-full">Exit Quiz</Button>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                <p className="text-sm text-muted-foreground mb-4">
                    Question {currentIndex + 1} of {questions.length}
                </p>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold mb-2">
                            {currentIndex + 1}. {currentQuestion.question}
                        </CardTitle>
                        <CardDescription>
                            {currentQuestion.difficulty} - {currentQuestion.topic}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-2">
                            {currentQuestion.choices.map((choice) => {
                                let variant: 'outline' | 'default' | 'destructive' = 'outline'
                                if (selectedAnswer !== null) {
                                    if (choice === currentQuestion.answer) {
                                        variant = 'default' // highlight correct answer green
                                    } else if (choice === selectedAnswer) {
                                        variant = 'destructive' // highlight wrong pick red
                                    }
                                }

                                return (
                                    <Button
                                        key={choice}
                                        variant={variant}
                                        className="w-full"
                                        disabled={selectedAnswer !== null}
                                        onClick={() => handleAnswer(choice)}
                                    >
                                        {choice}
                                    </Button>
                                )
                            })}

                            {isCorrect !== null && (
                                <p className={`text-lg font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                    {isCorrect ? 'Correct!' : `Incorrect — the answer is ${currentQuestion.answer}`}
                                </p>
                            )}

                            {selectedAnswer !== null && (
                                <Button className="mt-4" onClick={handleNext}>
                                    {currentIndex + 1 < questions.length ? 'Next Question' : 'See Results'}
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
