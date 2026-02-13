import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});


async function sendMessageToGemini(message: string) {
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: message,
    });
    return response.text;
}

async function sendPDFToGemini(file: File, question: string) {
    // Convert file to buffer
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
            question
        ]
    });
    return response.text;
}


export async function POST(request: NextRequest) {
    try {
        const contentType = request.headers.get('Content-Type');
        if (contentType?.includes('multipart/form-data')) {
            const formData = await request.formData();
            const file = formData.get('file') as File;
            const question = formData.get('question') as string;
            const response = await sendPDFToGemini(file, question);
            return NextResponse.json({ response });
        } else {
            const body = await request.json();
            const response = await sendMessageToGemini(body.message);
            return NextResponse.json({ response });
        }
    } catch (error) {
        return NextResponse.json({ error: "Failed to get response" }, { status: 500 });
    }
}