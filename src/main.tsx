import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import './index.css'
import { ChatPage } from '@/pages/ChatPage'
import { LandingPage } from '@/pages/LandingPage'
import { ChatProvider } from '@/context/ChatContext'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChatProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </ChatProvider>
  </StrictMode>,
)
