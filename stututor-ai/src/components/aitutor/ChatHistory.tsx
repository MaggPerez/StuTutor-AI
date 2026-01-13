'use client'

import React, { useState } from 'react'
import {
    Plus,
    MessageSquare,
    Search,
    MoreHorizontal,
    Trash2,
    Pencil,
    Archive
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import ChatItem from '@/components/aitutor/ChatItem'

// Dummy data for UI demonstration
const MOCK_CHATS = [
    { id: '1', title: 'Calculus Derivatives Help', date: new Date() },
    { id: '2', title: 'Physics: Newton\'s Laws', date: new Date() },
    { id: '3', title: 'Essay Brainstorming', date: new Date(Date.now() - 86400000) }, // Yesterday
    { id: '4', title: 'History of Rome', date: new Date(Date.now() - 172800000) }, // 2 days ago
    { id: '5', title: 'Linear Algebra Notes', date: new Date(Date.now() - 604800000) }, // 1 week ago
]

export default function ChatHistory() {
    const [searchQuery, setSearchQuery] = useState('')
    const [activeChatId, setActiveChatId] = useState<string | null>('1')

    // Simple filtering based on search
    const filteredChats = MOCK_CHATS.filter(chat => 
        chat.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Grouping chats by date categories
    const groupedChats = {
        today: filteredChats.filter(chat => isToday(chat.date)),
        yesterday: filteredChats.filter(chat => isYesterday(chat.date)),
        previous: filteredChats.filter(chat => !isToday(chat.date) && !isYesterday(chat.date))
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

    return (
        <div className='flex flex-col h-full w-full bg-background border-r'>
            {/* Header */}
            <div className='p-4 pb-2 space-y-4'>
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold tracking-tight">Chats</h2>
                    <Button 
                        onClick={() => {}}
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
                                    isActive={activeChatId === chat.id} 
                                    onClick={() => setActiveChatId(chat.id)}
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
                                    isActive={activeChatId === chat.id} 
                                    onClick={() => setActiveChatId(chat.id)}
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
                                    isActive={activeChatId === chat.id} 
                                    onClick={() => setActiveChatId(chat.id)}
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

