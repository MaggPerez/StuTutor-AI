import React from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Brain, FileText } from 'lucide-react'
import GenerateQuiz from '@/components/quizgen/GenerateQuiz'

export default function QuizGenerator() {
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
                        <h1 className="text-4xl font-bold">Quiz Generator</h1>
                        <p className="text-xl text-muted-foreground max-w-3xl">
                            Create custom quizzes based on your topic of choice or upload a PDF to get started.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        <GenerateQuiz />

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><FileText className="h-8 w-8 text-muted-foreground" /> Upload a PDF</CardTitle>
                                <CardDescription>
                                    Upload a PDF to get started.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
