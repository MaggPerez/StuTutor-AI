export async function generateStudyNotesWithTopic(topic: string, focus?: string) {
    const response = await fetch('/api/gemini/studynotes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, focus }),
    })
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    const data = await response.json()
    return { message: data.response }
}


export async function generateStudyNotesWithPDF(file: File, focus?: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('focus', focus || '');
    const response = await fetch('/api/gemini/studynotes', {
        method: 'POST',
        body: formData,
    })
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    const data = await response.json()
    return { message: data.response }
}