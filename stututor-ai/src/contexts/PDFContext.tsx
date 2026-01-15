"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { createClient } from "../../lib/supabase/client"
import { storePDF, getPDFUrl } from "../components/aitutor/actions"

interface PDFContextType {
    currentPDFUrl: string | null
    currentPDF: File | Blob | null
    setCurrentPDF: (pdf: File | Blob) => void
}

const PDFContext = createContext<PDFContextType | undefined>(undefined)

export function PDFProvider({ children }: { children: React.ReactNode }) {
    const [currentPDFUrl, setCurrentPDFUrl] = useState<string | null>(null)
    const [currentPDF, setCurrentPDF] = useState<File | Blob | null>(null)
    const [loading, setLoading] = useState(true)

    //if user has not uploaded a file, fetch the PDF from the database
    // useEffect(() => {
    //     async function fetchPDFUrl() {
    //         try {
    //             const file = await getPDFUrl("")
    //             if (file) {
    //                 setCurrentPDF(file)
    //                 // Create URL for the PDF blob
    //                 const url = URL.createObjectURL(file)
    //                 setCurrentPDFUrl(url)
    //             }
    //         } catch (error) {
    //             console.error('Error fetching PDF:', error)
    //         } finally {
    //             setLoading(false)
    //         }
    //     }
    //     fetchPDFUrl()
    // }, []) 

    //if user uploads a file, store it in the database
    useEffect(() => {
        if (currentPDF) {
            storePDF(currentPDF as File)
        }
    }, [currentPDF])


    return (
        <PDFContext.Provider value={{ currentPDFUrl, currentPDF, setCurrentPDF }}>
            {children}
        </PDFContext.Provider>
    )
}

export function usePDF() {
    const context = useContext(PDFContext)
    if (context === undefined) {
        throw new Error("usePDF must be used within a PDFProvider")
    }
    return context
}