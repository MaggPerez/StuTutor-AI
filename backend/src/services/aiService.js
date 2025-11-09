/**
 * AI service
 * Handles external AI API calls (OpenAI, Claude, DeepSeek, etc.)
 */

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Get AI response for user message
 * @param {string} userMessage - User's message
 * @param {Array} conversationHistory - Previous messages in the conversation
 * @param {string} documentContext - Optional document content for context
 * @returns {Promise<string>} AI response
 */
export const getAIResponse = async (userMessage, conversationHistory = [], documentContext = null) => {
  try {
    // Build messages array for OpenAI
    const messages = [];

    // Add system message with document context if provided
    if (documentContext) {
      // Limit context to avoid token limits (keep first 4000 chars for gpt-3.5-turbo)
      const contextLimit = 4000;
      const truncatedContext = documentContext.length > contextLimit
        ? documentContext.substring(0, contextLimit) + '...[truncated]'
        : documentContext;

      messages.push({
        role: 'system',
        content: `You are a helpful AI tutor analyzing a PDF document. Use the following document content to answer questions accurately and helpfully.\n\nDocument Content:\n${truncatedContext}\n\nProvide detailed answers based on this document. If a question cannot be answered from the document, let the user know.`
      });
    } else {
      messages.push({
        role: 'system',
        content: 'You are a helpful AI tutor. Provide clear, concise, and educational responses to student questions.'
      });
    }

    // Add conversation history
    conversationHistory.forEach(msg => {
      messages.push({
        role: msg.role,
        content: msg.content
      });
    });

    // Add current user message
    messages.push({
      role: 'user',
      content: userMessage
    });

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('AI Service Error:', error);

    // Provide more specific error messages
    if (error.status === 401) {
      throw new Error('Invalid OpenAI API key. Please check your configuration.');
    } else if (error.status === 429) {
      throw new Error('OpenAI rate limit exceeded. Please try again later.');
    } else if (error.status === 500) {
      throw new Error('OpenAI service error. Please try again later.');
    }

    throw new Error('Failed to get AI response. Please try again.');
  }
};

