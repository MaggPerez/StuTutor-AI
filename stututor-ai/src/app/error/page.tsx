'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function ErrorPage() {
    const searchParams = useSearchParams()
    const message = searchParams.get('message')

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
                {message && (
                    <p className="text-red-600 mb-4">{message}</p>
                )}
                <p className="mb-4">Sorry, we encountered an error processing your request.</p>
                <Link href="/login" className="text-blue-600 hover:underline">
                    Back to Login
                </Link>
            </div>
        </div>
    )
}