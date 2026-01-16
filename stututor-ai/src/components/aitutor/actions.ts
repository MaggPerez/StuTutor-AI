import { createClient } from '../../../lib/supabase/client'
import { getChatById } from '../../../lib/supabase/database-client'
const supabase = createClient()

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
        body: formData,
    })
    if (!response.ok) {
        throw new Error('Failed to upload PDF')
    }
    const data = await response.json()
    return data
}


export async function storePDF(file: File) {
    const { data, error } = await supabase.storage.from('pdf-documents').upload(file.name, file, {
        upsert: true,
    })
    if (error) {
        throw new Error('Failed to store PDF: ' + error.message)
    }
    return data
}


export async function getPDFDocumentName(chatId: string | null) {
    const { data, error } = await supabase.from('chats').select('*').eq('id', chatId).single()
    if (error) {
        console.error('Failed to get PDF document name:', error.message)
        return null
    }
    return data
}


export async function getPDFUrl(chatId: string | null) {    
    const chat = await getPDFDocumentName(chatId)
    if (!chat) {
        console.error('Chat not found')
        return null
    }
    const fileName = chat.pdfDocumentName
    

    if (!fileName) {
        // console.error('PDF document name not found')
        return null
    }
    
    const { data, error } = await supabase.storage.from('pdf-documents').download(fileName)
    
    if (error) {
        console.error('Failed to download PDF:', error.message)
        return null
    }
    return data
}



// export async function getPDFUrlTest() {
//     // Check if user is authenticated
//     const { data: { user } } = await supabase.auth.getUser()
//     if (!user) {
//         console.error('User not authenticated')
//         return null
//     }

//     const { data, error } = await supabase.storage.from('pdf-documents').download("")
//     if (error) {
//         console.error('Failed to download PDF:', error.message)
//         return null
//     }
//     return data
// }


export async function isExists(fileName: string) {
    const { data, error } = await supabase.storage.from('pdf-documents').exists(fileName)

    if (data) {
        return true
    } else {
        return false
    }
}