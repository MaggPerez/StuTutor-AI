'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'

export function SubmitButton({ label }: { label: string }) {
    const { pending } = useFormStatus()

    if (label === "Login") {
        return (
            <Button type="submit" disabled={pending} className="w-full">
                {pending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                    </>
                ) : (
                    "Login"
                )}
            </Button>
        )
    }
    else if (label === "Sign up") {
        return (
            <Button type="submit" disabled={pending} className="w-full">
                {pending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing up...
                    </>
                ) : (
                    "Sign up"
                )}
            </Button>
        )
    }
}