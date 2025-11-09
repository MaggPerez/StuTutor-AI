import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Importing the main CSS file
import App from './App.tsx';
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
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
