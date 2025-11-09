/**
 * API Client for StuTutor-AI Backend
 * Handles all HTTP requests to the backend server
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface Message {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface SendMessageResponse {
  userMessage: Message;
  aiMessage: Message;
}

interface ConversationHistoryItem {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Generic fetch wrapper with error handling
 */
async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.error || `Request failed with status ${response.status}`,
      };
    }

    return { data };
  } catch (error) {
    console.error('API Fetch Error:', error);
    return {
      error: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}

/**
 * Create a new conversation
 */
export async function createConversation(
  title?: string
): Promise<ApiResponse<Conversation>> {
  return apiFetch<Conversation>('/api/conversations', {
    method: 'POST',
    body: JSON.stringify({ title: title || 'New Conversation' }),
  });
}

/**
 * Get all conversations
 */
export async function getConversations(): Promise<ApiResponse<Conversation[]>> {
  return apiFetch<Conversation[]>('/api/conversations');
}

/**
 * Get messages for a specific conversation
 */
export async function getMessages(
  conversationId: string
): Promise<ApiResponse<Message[]>> {
  return apiFetch<Message[]>(`/api/conversations/${conversationId}/messages`);
}

/**
 * Send a message and get AI response
 */
export async function sendMessage(
  conversationId: string,
  message: string,
  conversationHistory: ConversationHistoryItem[] = []
): Promise<ApiResponse<SendMessageResponse>> {
  return apiFetch<SendMessageResponse>('/api/chat/send', {
    method: 'POST',
    body: JSON.stringify({
      conversationId,
      message,
      conversationHistory,
    }),
  });
}

/**
 * Delete a conversation
 */
export async function deleteConversation(
  conversationId: string
): Promise<ApiResponse<{ message: string }>> {
  return apiFetch<{ message: string }>(`/api/conversations/${conversationId}`, {
    method: 'DELETE',
  });
}

/**
 * Health check
 */
export async function healthCheck(): Promise<ApiResponse<{ message: string }>> {
  return apiFetch<{ message: string }>('/api/health');
}

// Export types for use in other files
export type {
  Conversation,
  Message,
  SendMessageResponse,
  ConversationHistoryItem,
  ApiResponse,
};
