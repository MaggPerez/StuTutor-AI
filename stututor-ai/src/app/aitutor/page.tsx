'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import {
    MessageSquare,
    FileText,
    Brain,
    PenTool,
    Calculator,
    Languages
} from 'lucide-react'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from '@/components/ui/card'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { SiteHeader } from '@/components/site-header'

export default function AITutorPage() {
    const router = useRouter()

    const features = [
        {
            title: "AI Chat Tutor",
            description: "Get instant help with your studies from our advanced AI tutor. Upload documents and ask questions.",
            icon: <MessageSquare className="h-8 w-8 text-primary" />,
            action: () => router.push('/aitutor'),
            active: true
        },
        {
            title: "Document Summarizer",
            description: "Upload lengthy documents and get concise summaries and key takeaways in seconds.",
            icon: <FileText className="h-8 w-8 text-muted-foreground" />,
            action: () => { }, // Placeholder
            active: false
        },
        {
            title: "Quiz Generator",
            description: "Create custom quizzes from your study materials to test your knowledge and prepare for exams.",
            icon: <Brain className="h-8 w-8 text-muted-foreground" />,
            action: () => { }, // Placeholder
            active: false
        },
        {
            title: "Essay Assistant",
            description: "Get feedback on your writing, structure suggestions, and help with brainstorming ideas.",
            icon: <PenTool className="h-8 w-8 text-muted-foreground" />,
            action: () => { }, // Placeholder
            active: false
        },
        {
            title: "Math Solver",
            description: "Step-by-step solutions for complex mathematical problems and equations.",
            icon: <Calculator className="h-8 w-8 text-muted-foreground" />,
            action: () => { }, // Placeholder
            active: false
        },
        {
            title: "Language Practice",
            description: "Practice conversation, grammar, and vocabulary in multiple languages.",
            icon: <Languages className="h-8 w-8 text-muted-foreground" />,
            action: () => { }, // Placeholder
            active: false
        }
    ]

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset className="bg-transparent">
                <SiteHeader />
                <div className="container mx-auto py-10 px-4 max-w-7xl">
                    <div className="mb-10 space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight">AI Study Tools</h1>
                        <p className="text-xl text-muted-foreground max-w-3xl">
                            Supercharge your learning with our suite of AI-powered tools designed to help you understand better, write faster, and study smarter.
                        </p>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className={`transition-all duration-200 hover:shadow-lg ${feature.active ? 'cursor-pointer hover:border-primary/50' : 'opacity-70 cursor-not-allowed bg-muted/30'}`}
                                onClick={feature.active ? feature.action : undefined}
                            >
                                <CardHeader>
                                    <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-secondary/20 p-3 w-fit">
                                        {feature.icon}
                                    </div>
                                    <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                                    <CardDescription className="text-base line-clamp-3">
                                        {feature.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className={`text-sm font-medium ${feature.active ? 'text-primary' : 'text-muted-foreground'}`}>
                                        {feature.active ? 'Try now →' : 'Coming soon'}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}