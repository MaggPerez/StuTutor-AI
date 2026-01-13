const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function sendMessage(message: string) {
    const response = await fetch(`${baseUrl}/gemini/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    })
    if (!response.ok) {
        throw new Error('Failed to send message')
    }
    const data = await response.json()
    return data
}

export async function uploadPDF(file: File, question: string) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('question', question)
    
    const response = await fetch(`${baseUrl}/gemini/upload-pdf`, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formData,
    })
    if (!response.ok) {
        throw new Error('Failed to upload PDF')
    }
    const data = await response.json()
    return data
}