'use client'

import React, { useState } from 'react'
import { Plus, Search, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import ChatItem from '@/components/aitutor/ChatItem'
import { useRouter } from 'next/navigation'
import { useChat } from '@/contexts/ChatContext'

export default function ChatHistory({ initialActiveChatId }: { initialActiveChatId: string }) {
    const [searchQuery, setSearchQuery] = useState('')
    const router = useRouter()
    const { chats, createNewChat, currentChatId } = useChat()

    // Filter chats based on search
    const filteredChats = chats.filter(chat =>
        chat.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Group chats by date
    const groupedChats = {
        today: filteredChats.filter(chat => isToday(chat.createdAt)),
        yesterday: filteredChats.filter(chat => isYesterday(chat.createdAt)),
        previous: filteredChats.filter(chat => !isToday(chat.createdAt) && !isYesterday(chat.createdAt))
    }

    function isToday(date: Date) {
        const today = new Date()
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
    }

    function isYesterday(date: Date) {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        return date.getDate() === yesterday.getDate() &&
            date.getMonth() === yesterday.getMonth() &&
            date.getFullYear() === yesterday.getFullYear()
    }

    async function handleNewChat() {
        const newChatId = await createNewChat()
        router.push(`/aitutor/${newChatId}`)
    }

    function handleChatClick(chatId: string) {
        router.push(`/aitutor/${chatId}`)
    }

    return (
        <div className='flex flex-col h-full w-full bg-background border-r'>
            {/* Header */}
            <div className='p-4 pb-2 space-y-4'>
                <div className="flex items-center justify-between">

                    {/* Back button */}
                    <Button
                        onClick={() => router.back()}
                        variant="outline"
                        size="sm"
                        className="h-8 px-2 cursor-pointer"
                    >
                        <ArrowLeft className='mr-2 size-4' />
                        Back
                    </Button>

                    {/* Title */}
                    <h2 className="text-lg font-semibold tracking-tight">Chats</h2>

                    {/* New Chat button */}
                    <Button
                        onClick={handleNewChat}
                        variant="outline"
                        size="sm"
                        className="h-8 px-2 cursor-pointer"
                    >
                        <Plus className='mr-2 size-4' />
                        New Chat
                    </Button>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search chats..."
                        className="pl-8 h-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <Separator className="my-2" />

            {/* Chat List */}
            <ScrollArea className="flex-1 px-3">
                <div className="space-y-4 pb-4">
                    {/* Today */}
                    {groupedChats.today.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-xs font-medium text-muted-foreground px-2 py-1">
                                Today
                            </h3>
                            {groupedChats.today.map((chat) => (
                                <ChatItem
                                    key={chat.id}
                                    chat={chat}
                                    isActive={currentChatId === chat.id}
                                    onClick={() => handleChatClick(chat.id)}
                                />
                            ))}
                        </div>
                    )}

                    {/* Yesterday */}
                    {groupedChats.yesterday.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-xs font-medium text-muted-foreground px-2 py-1">
                                Yesterday
                            </h3>
                            {groupedChats.yesterday.map((chat) => (
                                <ChatItem
                                    key={chat.id}
                                    chat={chat}
                                    isActive={currentChatId === chat.id}
                                    onClick={() => handleChatClick(chat.id)}
                                />
                            ))}
                        </div>
                    )}

                    {/* Previous */}
                    {groupedChats.previous.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-xs font-medium text-muted-foreground px-2 py-1">
                                Previous 7 Days
                            </h3>
                            {groupedChats.previous.map((chat) => (
                                <ChatItem
                                    key={chat.id}
                                    chat={chat}
                                    isActive={currentChatId === chat.id}
                                    onClick={() => handleChatClick(chat.id)}
                                />
                            ))}
                        </div>
                    )}

                    {/* No chats found */}
                    {filteredChats.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground text-sm">
                            No chats found
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    )
}

