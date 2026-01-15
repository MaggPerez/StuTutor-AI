export interface Chat {
    id: string
    title: string
    date: Date
    chatMessages: ChatMessage[]
}

export interface ChatMessage {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
}

