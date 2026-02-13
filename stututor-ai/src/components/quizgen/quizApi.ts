export async function sendQuizWithTopicToGemini(topic: string, difficulty: string, numQuestions: number) {
    const response = await fetch('/api/gemini/quiz', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, difficulty, numQuestions }),
    })
    if (!response.ok) {
        throw new Error('Failed to send quiz with topic to Gemini')
    }
    const data = await response.json()
    return { message: data.response }
}


export async function sendQuizWithPDFToGemini(file: File, difficulty: string, numQuestions: number) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('difficulty', difficulty);
    formData.append('numQuestions', numQuestions.toString());
    const response = await fetch('/api/gemini/quiz', {
        method: 'POST',
        body: formData,
    })
    if (!response.ok) {
        throw new Error('Failed to send quiz with PDF to Gemini')
    }
    const data = await response.json()
    return { message: data.response }
}
