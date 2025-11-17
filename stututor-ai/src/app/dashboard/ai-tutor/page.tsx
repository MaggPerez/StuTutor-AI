"use client"

import { useState } from "react"
import { Send, Bot, User, Sparkles, Paperclip, BookOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hello! I'm your AI Tutor. I'm here to help you with any subject - from mathematics and physics to literature and history. What would you like to learn about today?",
    timestamp: new Date(),
  },
]

const suggestedPrompts = [
  "Explain quantum entanglement",
  "Help me solve this calculus problem",
  "What are the key themes in Macbeth?",
  "How does photosynthesis work?",
]

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content:
          "This is a placeholder response. In a real implementation, this would connect to an AI service to provide intelligent tutoring assistance based on your question.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt)
  }

  return (
    <div className="space-y-6 h-[calc(100vh-12rem)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Tutor</h1>
          <p className="text-muted-foreground">
            Get instant help with any subject, anytime
          </p>
        </div>
        <Badge variant="secondary" className="gap-2">
          <Sparkles className="h-4 w-4 text-yellow-500" />
          Premium AI
        </Badge>
      </div>

      {/* Main Chat Interface */}
      <div className="grid gap-6 lg:grid-cols-4 h-full">
        {/* Chat Area */}
        <Card className="lg:col-span-3 flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle>StuTutor AI</CardTitle>
                <CardDescription>Always ready to help</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback
                        className={
                          message.role === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
                        }
                      >
                        {message.role === "user" ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`flex flex-col gap-1 max-w-[80%] ${
                        message.role === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          message.role === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg px-4 py-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Ask me anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                  className="flex-1"
                />
                <Button onClick={handleSend} disabled={!input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Suggested Prompts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Suggested Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestedPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2 px-3"
                  onClick={() => handleSuggestedPrompt(prompt)}
                >
                  <span className="text-xs">{prompt}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Study Context */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Current Context</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">No active course</span>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Select Course
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Session Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Questions asked</span>
                <span className="font-medium">{Math.floor(messages.length / 2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Session time</span>
                <span className="font-medium">5 min</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
