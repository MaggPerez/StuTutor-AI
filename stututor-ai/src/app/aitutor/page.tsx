
import React from 'react'
import Link from 'next/link'
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
import { redirect } from 'next/navigation'
import { createChat } from '../../../lib/supabase/database'
import { createClient } from '../../../lib/supabase/server'


export default async function AITutorPage() {
    // Check if user is authenticated
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/dashboard')
    }

    const chat = await createChat()


    const features = [
        {
            title: "AI Chat Tutor",
            description: "Get instant help with your studies from our advanced AI tutor. Upload documents and ask questions.",
            icon: <MessageSquare className="h-8 w-8 text-primary" />,
            href: `/aitutor/chat/${chat.id}`,
            active: true
        },
        {
            title: "Quiz Generator",
            description: "Create custom quizzes from your study materials to test your knowledge and prepare for exams.",
            icon: <Brain className="h-8 w-8 text-muted-foreground" />,
            href: '/aitutor/quizgen',
            active: true
        },
        {
            title: "Document Summarizer",
            description: "Upload lengthy documents and get concise summaries and key takeaways in seconds.",
            icon: <FileText className="h-8 w-8 text-muted-foreground" />,
            href: null,
            active: false
        },
        {
            title: "Essay Assistant",
            description: "Get feedback on your writing, structure suggestions, and help with brainstorming ideas.",
            icon: <PenTool className="h-8 w-8 text-muted-foreground" />,
            href: null,
            active: false
        },
        {
            title: "Math Solver",
            description: "Step-by-step solutions for complex mathematical problems and equations.",
            icon: <Calculator className="h-8 w-8 text-muted-foreground" />,
            href: null,
            active: false
        },
        {
            title: "Language Practice",
            description: "Practice conversation, grammar, and vocabulary in multiple languages.",
            icon: <Languages className="h-8 w-8 text-muted-foreground" />,
            href: null,
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
                        {features.map((feature, index) => {
                            const cardContent = (
                                <>
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
                                </>
                            )

                            if (feature.active && feature.href) {
                                return (
                                    <Link key={index} href={feature.href}>
                                        <Card className="transition-all duration-200 hover:shadow-lg cursor-pointer hover:border-primary/50 h-full">
                                            {cardContent}
                                        </Card>
                                    </Link>
                                )
                            }

                            return (
                                <Card
                                    key={index}
                                    className="transition-all duration-200 opacity-70 cursor-not-allowed bg-muted/30"
                                >
                                    {cardContent}
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}