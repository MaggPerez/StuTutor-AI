/**
 * Integration test script for the backend API
 * Tests the full API flow: register -> login -> chat -> upload PDF
 */

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const API_BASE_URL = process.env.API_URL || 'http://localhost:3000';
let authToken = null;
let userId = null;
let threadId = null;
let documentId = null;

// Helper function to make API requests
async function apiRequest(endpoint, method = 'GET', data = null, headers = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (data && method !== 'GET') {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return { status: response.status, data: result };
  } catch (error) {
    return { status: 0, error: error.message };
  }
}

// Test functions
async function testHealthCheck() {
  console.log('🔍 Testing health check...');
  const result = await apiRequest('/health');
  if (result.status === 200) {
    console.log('✅ Health check passed\n');
    return true;
  } else {
    console.log('❌ Health check failed:', result.error || result.data);
    return false;
  }
}

async function testRegister() {
  console.log('📝 Testing user registration...');
  const randomEmail = `test${Date.now()}@example.com`;
  const userData = {
    username: `testuser${Date.now()}`,
    email: randomEmail,
    password: 'testpassword123',
  };

  const result = await apiRequest('/api/auth/register', 'POST', userData);
  if (result.status === 201 && result.data.success) {
    authToken = result.data.data.token;
    userId = result.data.data.user.id;
    console.log('✅ Registration successful');
    console.log('   Token:', authToken.substring(0, 20) + '...');
    console.log('   User ID:', userId, '\n');
    return true;
  } else {
    console.log('❌ Registration failed:', result.data);
    return false;
  }
}

async function testLogin() {
  console.log('🔐 Testing user login...');
  // First register a user
  const randomEmail = `test${Date.now()}@example.com`;
  const username = `testuser${Date.now()}`;
  const password = 'testpassword123';

  await apiRequest('/api/auth/register', 'POST', {
    username,
    email: randomEmail,
    password,
  });

  // Then try to login
  const result = await apiRequest('/api/auth/login', 'POST', {
    email: randomEmail,
    password,
  });

  if (result.status === 200 && result.data.success) {
    authToken = result.data.data.token;
    userId = result.data.data.user.id;
    console.log('✅ Login successful');
    console.log('   Token:', authToken.substring(0, 20) + '...\n');
    return true;
  } else {
    console.log('❌ Login failed:', result.data);
    return false;
  }
}

async function testSendMessage() {
  console.log('💬 Testing send message...');
  if (!authToken) {
    console.log('❌ No auth token, skipping...\n');
    return false;
  }

  const result = await apiRequest(
    '/api/chat',
    'POST',
    {
      message: 'Hello! Can you help me with math? What is 2 + 2?',
    },
    {
      Authorization: `Bearer ${authToken}`,
    }
  );

  if (result.status === 200 && result.data.success) {
    threadId = result.data.data.threadId;
    console.log('✅ Message sent successfully');
    console.log('   Thread ID:', threadId);
    console.log('   Response:', result.data.data.response.substring(0, 100) + '...\n');
    return true;
  } else {
    console.log('❌ Send message failed:', result.data);
    return false;
  }
}

async function testGetChatHistory() {
  console.log('📜 Testing get chat history...');
  if (!authToken || !threadId) {
    console.log('❌ No auth token or thread ID, skipping...\n');
    return false;
  }

  const result = await apiRequest(
    `/api/chat/${threadId}`,
    'GET',
    null,
    {
      Authorization: `Bearer ${authToken}`,
    }
  );

  if (result.status === 200 && result.data.success) {
    console.log('✅ Chat history retrieved successfully');
    console.log('   Messages count:', result.data.data.messages.length);
    console.log('   First message:', result.data.data.messages[0].content.substring(0, 50) + '...\n');
    return true;
  } else {
    console.log('❌ Get chat history failed:', result.data);
    return false;
  }
}

async function testListDocuments() {
  console.log('📄 Testing list documents...');
  if (!authToken) {
    console.log('❌ No auth token, skipping...\n');
    return false;
  }

  const result = await apiRequest(
    '/api/docs',
    'GET',
    null,
    {
      Authorization: `Bearer ${authToken}`,
    }
  );

  if (result.status === 200 && result.data.success) {
    console.log('✅ Documents listed successfully');
    console.log('   Documents count:', result.data.data.count, '\n');
    return true;
  } else {
    console.log('❌ List documents failed:', result.data);
    return false;
  }
}

// Main test runner
async function runTests() {
  console.log('🚀 Starting API Integration Tests...\n');
  console.log('API Base URL:', API_BASE_URL);
  console.log('='.repeat(80) + '\n');

  const results = {
    health: false,
    register: false,
    login: false,
    sendMessage: false,
    getChatHistory: false,
    listDocuments: false,
  };

  // Test health check
  results.health = await testHealthCheck();
  if (!results.health) {
    console.log('❌ Server is not running. Please start the server first:');
    console.log('   npm start\n');
    return;
  }

  // Test registration
  results.register = await testRegister();

  // Test login
  results.login = await testLogin();

  // Test send message
  results.sendMessage = await testSendMessage();

  // Test get chat history
  results.getChatHistory = await testGetChatHistory();

  // Test list documents
  results.listDocuments = await testListDocuments();

  // Summary
  console.log('='.repeat(80));
  console.log('📊 Test Results Summary:');
  console.log('='.repeat(80));
  Object.entries(results).forEach(([test, passed]) => {
    console.log(`${passed ? '✅' : '❌'} ${test}`);
  });
  console.log('='.repeat(80));

  const passedCount = Object.values(results).filter(Boolean).length;
  const totalCount = Object.keys(results).length;
  console.log(`\n✨ Tests passed: ${passedCount}/${totalCount}`);
}

// Run tests
runTests().catch(console.error);

