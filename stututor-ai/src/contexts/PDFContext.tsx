"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { createClient } from "../../lib/supabase/client"
import { createPDFDocument, getPDFDocument, updateChat, getChatById, storePDF, getPDFUrl } from "../../lib/supabase/database-client"
import { useChat } from "./ChatContext"
import { Chat } from "../types/Messages"

interface PDFContextType {
    currentPDFUrl: string | null
    currentPDF: File | Blob | null
    setCurrentPDF: (pdf: File) => void
}

const PDFContext = createContext<PDFContextType | undefined>(undefined)

export function PDFProvider({ children }: { children: React.ReactNode }) {
    const { currentChatId } = useChat()
    const [currentPDFUrl, setCurrentPDFUrl] = useState<string | null>(null)
    const [currentPDF, setCurrentPDF] = useState<File | null>(null)
    const [loading, setLoading] = useState(true)

    


    //if user has not uploaded a file, fetch the PDF from the database
    useEffect(() => {
        async function fetchPDFUrl() {
            try {
                const file = await getPDFUrl(currentChatId)
                if (file) {
                    setCurrentPDF(file as File)
                    // Create URL for the PDF blob
                    const url = URL.createObjectURL(file)
                    setCurrentPDFUrl(url)
                }
            } catch (error) {
                console.error('Error fetching PDF:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchPDFUrl()
    }, []) 

    //if user uploads a file, store it in the database
    useEffect(() => {
        async function storePDFDocument() {
            try {
            if (currentPDF) {
                const pdfDocumentId = await createPDFDocument(
                    currentPDF.name,      // fileName
                    currentPDF.size,      // fileSize  
                    currentPDF.name,      // storagePath
                    {}                    // metadata (optional)
                )
                    const updates: Partial<Chat> = {
                        title: currentPDF.name as string,
                        pdfDocumentId: pdfDocumentId.id,
                        pdfDocumentName: currentPDF.name as string,
                        pdfDocumentUrl: pdfDocumentId.publicUrl
                    }
                    await updateChat(currentChatId ?? "", updates)
                    await storePDF(currentPDF)
                }
                else {
                    return
                }
            } catch (error) {
                console.error('Error storing PDF document:', error)
                if (error instanceof Error) {
                    throw new Error('Error storing PDF document: ' + error.message)
                }
                throw error
            }
        }
        storePDFDocument()
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