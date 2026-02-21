import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});


async function generateStudyNotesWithTopic(topic: string, focus?: string) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
            {
                text: topic
            },
            {
                text: focus
            }
        ],
        config: {
            responseMimeType: 'application/json',
            systemInstruction: `You are a helpful assistant that generates study notes from a topic based on the course and focus requested.
When you generate the study notes. If the user does not provide a focus, move on. It is very important that you always follow this format:
{
    "summary": "summary",
    "key_concepts": ["key_concept1", "key_concept2", "key_concept3"],
    "important_terms": ["important_term1", "important_term2", "important_term3"],
    "practice_questions": ["practice_question1", "practice_question2", "practice_question3"],
    "topic": "topic",
    "focus": "focus"
}
Respond with only valid JSON. Do not include any other text.`,
        }
    })
    return response.text;
}


async function generateStudyNotesWithPDF(file: File, focus?: string) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
            {
                inlineData: {
                    mimeType: file.type,
                    data: base64
                }
            },
            {
                text: focus
            }
        ],
        config: {
            responseMimeType: 'application/json',
            systemInstruction: `You are a helpful assistant that generates study notes from a PDF document based on the course and focus requested.
When you generate the study notes. If the user does not provide a focus, move on. It is very important that you always follow this format:
{
    "summary": "summary",
    "key_concepts": ["key_concept1", "key_concept2", "key_concept3"],
    "important_terms": ["important_term1", "important_term2", "important_term3"],
    "practice_questions": ["practice_question1", "practice_question2", "practice_question3"],
    "topic": "topic",
    "focus": "focus"
}
Respond with only valid JSON. Do not include any other text.`,
        }
    })
    return response.text;
}


export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const contentType = request.headers.get('Content-Type');
        if (contentType?.includes('multipart/form-data')) {
            const formData = await request.formData();
            const file = formData.get('file') as File;
            const focus = formData.get('focus') as string;
            const response = await generateStudyNotesWithPDF(file, focus);
            return NextResponse.json({ response });
        } else {
            const body = await request.json();
            const topic = body.topic as string;
            const focus = body.focus as string;
            const response = await generateStudyNotesWithTopic(topic, focus);
            return NextResponse.json({ response });
        }
    } catch (error) {
        console.error('Study Notes API error:', error);
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: "Failed to generate study notes", details: message }, { status: 500 });
    }
}