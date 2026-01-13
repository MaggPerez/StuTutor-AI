'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Paperclip, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { sendMessage } from './actions'

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

// Mock initial messages
const INITIAL_MESSAGES: Message[] = [
    {
        id: '1',
        role: 'assistant',
        content: 'Hello! I am your AI Tutor. How can I help you with your studies today?',
        timestamp: new Date(Date.now() - 1000 * 60 * 5)
    }
]

export default function ChatBox() {
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
    const [input, setInput] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const [isLoading, setIsLoading] = useState(false)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])



    const handleSend = () => {
        if (!input.trim()) return

        const newMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, newMessage])
        setInput('')

        // Send message to AI and get response
        setTimeout(async () => {
            setIsLoading(true)
            try {
                // Send message to AI and get response
                const response = await sendMessage(input)

                // Create AI response message
                const aiResponse: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: response.message,
                    timestamp: new Date()
                }
                setMessages(prev => [...prev, aiResponse])
            } catch (error) {

                const aiResponse: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: 'Sorry, I encountered an error. Please try again.',
                    timestamp: new Date()
                }
                setMessages(prev => [...prev, aiResponse])
            }
            finally {
                setIsLoading(false)
            }

        }, 1000)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className='flex flex-col h-full w-full bg-background border-l overflow-y-auto'>
            {/* Header */}
            <div className='p-3 border-b flex items-center gap-2 shadow-sm z-10'>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div>
                    <h3 className='font-semibold text-sm'>Stututor AI</h3>
                    <p className='text-xs text-muted-foreground'>Online</p>
                </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className='flex-1 p-4'>
                <div className='space-y-4'>
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={cn(
                                "flex w-full gap-2 max-w-[90%]",
                                message.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                            )}
                        >

                            {/* Avatar */}
                            <Avatar className="h-8 w-8 shrink-0">
                                <AvatarFallback className={cn(
                                    "text-xs",
                                    message.role === 'assistant' ? "bg-primary text-primary-foreground" : "bg-muted"
                                )}>
                                    {message.role === 'assistant' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                                </AvatarFallback>
                            </Avatar>

                            {/* Message */}
                            <div
                                className={cn(
                                    "rounded-lg px-4 py-2 text-sm shadow-sm",
                                    message.role === 'assistant'
                                        ? "bg-white text-black border border-gray-100 dark:border-gray-800" // User requested specific AI style
                                        : "bg-secondary text-secondary-foreground" // Inferred User style (grayish/secondary)
                                )}
                            >
                                <p className="whitespace-pre-wrap">{message.content}</p>

                                {/* Timestamp */}
                                <span className="text-[10px] opacity-50 mt-1 block">
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    ))}

                    {/* Scroll to bottom */}
                    <div ref={messagesEndRef} />
                </div>
            </ScrollArea>

            {/* Input Area */}
            <div className='p-4 border-t bg-background/50 backdrop-blur-sm'>
                <div className='relative flex items-end gap-2 bg-secondary/30 p-2 rounded-xl border focus-within:ring-1 focus-within:ring-ring'>

                    {/* Attach file button */}
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground shrink-0 mb-1">
                        <Paperclip className="h-4 w-4" />
                    </Button>

                    {/* Input textarea */}
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask a question about the document..."
                        className="min-h-[40px] max-h-[120px] w-full resize-none border-0 bg-transparent p-1.5 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none scrollbar-hide"
                        rows={1}
                    />

                    {/* Send button */}
                    <Button
                        onClick={handleSend}
                        disabled={!input.trim()}
                        size="icon"
                        className={cn(
                            "h-8 w-8 shrink-0 mb-1 transition-all",
                            input.trim() ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted"
                        )}
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>

                {/* Disclaimer */}
                <div className="text-center mt-2">
                    <p className="text-[10px] text-muted-foreground">AI can make mistakes. Verify important information.</p>
                </div>
            </div>
        </div>
    )
}