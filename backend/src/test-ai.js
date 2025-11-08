/**
 * Test script for AI service
 * Tests the AI service with different providers
 */

import dotenv from 'dotenv';
import { getAIResponse } from './services/aiService.js';

// Load environment variables
dotenv.config();

async function testAI() {
  console.log('🤖 Testing AI Service...\n');
  console.log('Current AI Provider:', process.env.AI_PROVIDER || 'mock');
  console.log('OpenAI API Key:', process.env.OPENAI_API_KEY ? 'Set ✅' : 'Not set ❌');
  console.log('DeepSeek API Key:', process.env.DEEPSEEK_API_KEY ? 'Set ✅' : 'Not set ❌');
  console.log('\n');

  const testMessages = [
    'Hello! Can you help me with math?',
    'What is 2 + 2?',
    'Explain the Pythagorean theorem.',
  ];

  for (let i = 0; i < testMessages.length; i++) {
    const message = testMessages[i];
    console.log(`📤 Test ${i + 1}: "${message}"`);
    console.log('⏳ Waiting for response...\n');

    try {
      const startTime = Date.now();
      const response = await getAIResponse(message, [], null);
      const endTime = Date.now();
      const duration = ((endTime - startTime) / 1000).toFixed(2);

      console.log(`✅ Response (${duration}s):`);
      console.log(response);
      console.log('\n' + '─'.repeat(80) + '\n');
    } catch (error) {
      console.error('❌ Error:', error.message);
      console.log('\n' + '─'.repeat(80) + '\n');
    }
  }

  // Test with conversation history
  console.log('📝 Testing with conversation history...\n');
  const conversationHistory = [
    { role: 'user', content: 'My name is John' },
    { role: 'assistant', content: 'Nice to meet you, John! How can I help you today?' },
  ];

  try {
    const response = await getAIResponse(
      'What is my name?',
      conversationHistory,
      null
    );
    console.log('✅ Response with history:');
    console.log(response);
    console.log('\n');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  // Test with document context
  console.log('📄 Testing with document context...\n');
  const documentContext = 'The Pythagorean theorem states that in a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides: a² + b² = c²';

  try {
    const response = await getAIResponse(
      'What is the Pythagorean theorem?',
      [],
      documentContext
    );
    console.log('✅ Response with document context:');
    console.log(response);
    console.log('\n');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  console.log('✨ Testing complete!');
}

// Run tests
testAI().catch(console.error);

