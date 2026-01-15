"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { createClient } from "../../lib/supabase/client"

interface PDFContextType {
    currentPDFUrl: string | null
    currentPDF: File | null
    setCurrentPDF: (pdf: File) => void
}

const PDFContext = createContext<PDFContextType | undefined>(undefined)

export function PDFProvider({ children }: { children: React.ReactNode }) {
    const [currentPDFUrl, setCurrentPDFUrl] = useState<string | null>(null)
    const [currentPDF, setCurrentPDF] = useState<File | null>(null)
    const [loading, setLoading] = useState(true)


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