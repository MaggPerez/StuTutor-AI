'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MessageSquare } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Pencil, Archive, Trash2, MoreHorizontal } from 'lucide-react'
import { Chat } from '@/types/Messages'
import { useChat } from '@/contexts/ChatContext'
import { useRouter } from 'next/navigation'


interface ChatItemProps {
    chat: Chat
    isActive: boolean
    onClick: () => void
}

export default function ChatItem({ chat, isActive, onClick }: ChatItemProps) {
    const router = useRouter()
    const { deleteChat, currentChatId } = useChat()

    const handleDelete = async () => {
        try {
            await deleteChat(chat.id)

            // If we deleted the current chat, navigate back to the main aitutor page
            if (currentChatId === chat.id) {
                router.push('/aitutor')
            }
        } catch (error) {
            console.error('Failed to delete chat:', error)
        }
    }

    return (
        <div className="group relative flex items-center">

            {/* Chat Item */}
            <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                    "w-full justify-start h-10 px-2 font-normal truncate cursor-pointer",
                    isActive && "bg-secondary"
                )}
                onClick={onClick}
            >
                <MessageSquare className="mr-2 h-4 w-4 shrink-0 opacity-70" />
                <span className="truncate">{chat.title}</span>
            </Button>

            {/* Dropdown Menu */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>

                    {/* Dropdown Menu Trigger */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "absolute right-1 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer",
                            isActive && "opacity-100"
                        )}
                    >
                        <MoreHorizontal className="h-3 w-3" />
                        <span className="sr-only">More</span>
                    </Button>
                </DropdownMenuTrigger>

                {/* Dropdown Menu Content (Right click menu) */}
                <DropdownMenuContent align="end" className="w-40">
                    {/* Rename */}
                    <DropdownMenuItem>
                        <Pencil className="mr-2 h-3.5 w-3.5" />
                        Rename
                    </DropdownMenuItem>

                    {/* Archive */}
                    <DropdownMenuItem>
                        <Archive className="mr-2 h-3.5 w-3.5" />
                        Archive
                    </DropdownMenuItem>

                    {/* Delete */}
                    <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={handleDelete}
                    >
                        <Trash2 className="mr-2 h-3.5 w-3.5" />
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}