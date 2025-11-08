/**
 * AI service
 * Handles external AI API calls (OpenAI, Claude, DeepSeek, etc.)
 * Supports multiple AI providers with fallback to mock responses
 */

/**
 * Get AI response using OpenAI API
 */
const getOpenAIResponse = async (userMessage, conversationHistory = [], documentContext = null) => {
  // Dynamic import to avoid requiring the package if not used
  const { default: OpenAI } = await import('openai');
  
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const messages = [
    {
      role: 'system',
      content: documentContext
        ? `You are a helpful tutor. Use the following document context to answer questions: ${documentContext.substring(0, 3000)}`
        : 'You are a helpful tutor. Answer questions clearly and concisely.'
    },
    ...conversationHistory.map(msg => ({
      role: msg.role,
      content: msg.content
    })),
    {
      role: 'user',
      content: userMessage
    }
  ];

  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
    messages: messages,
    temperature: 0.7,
    max_tokens: 1000,
  });

  return completion.choices[0].message.content;
};

/**
 * Get AI response using DeepSeek API
 */
const getDeepSeekResponse = async (userMessage, conversationHistory = [], documentContext = null) => {
  // DeepSeek uses OpenAI-compatible API
  const { default: OpenAI } = await import('openai');
  
  const openai = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: 'https://api.deepseek.com',
  });

  const messages = [
    {
      role: 'system',
      content: documentContext
        ? `You are a helpful tutor. Use the following document context to answer questions: ${documentContext.substring(0, 3000)}`
        : 'You are a helpful tutor. Answer questions clearly and concisely.'
    },
    ...conversationHistory.map(msg => ({
      role: msg.role,
      content: msg.content
    })),
    {
      role: 'user',
      content: userMessage
    }
  ];

  const completion = await openai.chat.completions.create({
    model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
    messages: messages,
    temperature: 0.7,
    max_tokens: 1000,
  });

  return completion.choices[0].message.content;
};

/**
 * Get mock AI response (fallback)
 */
const getMockResponse = async (userMessage, conversationHistory = [], documentContext = null) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return `This is a mock AI response to your message: "${userMessage}". 
${documentContext ? 'I have access to your document for context.' : ''}
In production, set OPENAI_API_KEY or DEEPSEEK_API_KEY in your .env file to use real AI models.`;
};

/**
 * Get AI response for user message
 * @param {string} userMessage - User's message
 * @param {Array} conversationHistory - Previous messages in the conversation
 * @param {string} documentContext - Optional document content for context
 * @returns {Promise<string>} AI response
 */
export const getAIResponse = async (userMessage, conversationHistory = [], documentContext = null) => {
  try {
    const aiProvider = process.env.AI_PROVIDER || 'mock';
    
    switch (aiProvider.toLowerCase()) {
      case 'openai':
        if (!process.env.OPENAI_API_KEY) {
          console.warn('OPENAI_API_KEY not set, falling back to mock response');
          return getMockResponse(userMessage, conversationHistory, documentContext);
        }
        return await getOpenAIResponse(userMessage, conversationHistory, documentContext);
        
      case 'deepseek':
        if (!process.env.DEEPSEEK_API_KEY) {
          console.warn('DEEPSEEK_API_KEY not set, falling back to mock response');
          return getMockResponse(userMessage, conversationHistory, documentContext);
        }
        return await getDeepSeekResponse(userMessage, conversationHistory, documentContext);
        
      case 'mock':
      default:
        return getMockResponse(userMessage, conversationHistory, documentContext);
    }
  } catch (error) {
    console.error('AI Service Error:', error);
    // Fallback to mock on error
    console.warn('Falling back to mock response due to error');
    return getMockResponse(userMessage, conversationHistory, documentContext);
  }
};

