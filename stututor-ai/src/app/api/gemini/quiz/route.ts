import { NextRequest, NextResponse } from "next/server"
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});


async function generateQuizFromTopic(topic: string, difficulty: string, numQuestions: number) {
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
            {
                text: topic
            },
            {
                text: difficulty
            },
            {
                text: numQuestions.toString()
            }
        ],
        config: {
            responseMimeType: 'application/json',
            systemInstruction: `You are a helpful assistant that generates quizzes from a topic based on the difficulty and number of questions requested.
When you generate the quiz, it must always follow this format:
{
    "questions": [
        {
            "id": "1",
            "question": "question",
            "answer": "answer",
            "choices": ["choice1", "choice2", "choice3", "choice4"],
            "difficulty": "difficulty",
            "topic": "topic"
        }
    ]
}
Respond with only valid JSON. Do not include any other text.`,
        }
    })
    return response.text;
}


async function generateQuizFromPDF(file: File, difficulty: string, numQuestions: number) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
            {
                inlineData: {
                    mimeType: file.type,
                    data: base64
                }
            },
            {
                text: difficulty
            },
            {
                text: numQuestions.toString()
            }
        ],
        config: {
            responseMimeType: 'application/json',
            systemInstruction: `You are a helpful assistant that generates quizzes from a PDF document based on the difficulty and number of questions requested.
When you generate the quiz, it must always follow this format:
{
    "questions": [
        {
            "id": "1",
            "question": "question",
            "answer": "answer",
            "choices": ["choice1", "choice2", "choice3", "choice4"],
            "difficulty": "difficulty",
            "topic": "topic"
        }
    ]
}
Respond with only valid JSON. Do not include any other text.`,
        }
    });
    return response.text;
}



export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const contentType = request.headers.get('Content-Type');
        if (contentType?.includes('multipart/form-data')) {
            const formData = await request.formData();
            const file = formData.get('file') as File;
            const difficulty = formData.get('difficulty') as string;
            const numQuestions = parseInt(formData.get('numQuestions') as string);
            const response = await generateQuizFromPDF(file, difficulty, numQuestions);
            return NextResponse.json({ response });
        } else {
            const body = await request.json();
            const topic = body.topic as string;
            const difficulty = body.difficulty as string;
            const numQuestions = parseInt(body.numQuestions as string);
            const response = await generateQuizFromTopic(topic, difficulty, numQuestions);
            return NextResponse.json({ response });
        }
    } catch (error) {
        return NextResponse.json({ error: "Failed to generate quiz" }, { status: 500 });
    }
}
