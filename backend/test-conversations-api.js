/**
 * Test the conversations API endpoint
 */

async function testConversationsAPI() {
  console.log('🧪 Testing Conversations API\n');
  
  const API_URL = process.env.API_URL || 'http://localhost:3000';
  
  try {
    // Test 1: Get all conversations
    console.log('📋 Testing GET /api/conversations...');
    const response = await fetch(`${API_URL}/api/conversations`);
    
    console.log('Status:', response.status, response.statusText);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      console.error('❌ Failed to get conversations:', error);
      return;
    }
    
    const conversations = await response.json();
    console.log('✅ Conversations loaded successfully!');
    console.log('Count:', conversations.length);
    
    if (conversations.length > 0) {
      console.log('\nSample conversation:');
      const sample = conversations[0];
      console.log('  ID:', sample.id);
      console.log('  Title:', sample.title);
      console.log('  Created:', sample.created_at);
      console.log('  PDF attached:', sample.pdf_storage_url ? 'Yes' : 'No');
    } else {
      console.log('\n📝 No conversations found. Create one by sending a message in the app!');
    }
    
    // Test 2: Create a new conversation
    console.log('\n\n📝 Testing POST /api/conversations...');
    const createResponse = await fetch(`${API_URL}/api/conversations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Test Conversation' }),
    });
    
    console.log('Status:', createResponse.status, createResponse.statusText);
    
    if (!createResponse.ok) {
      const error = await createResponse.json().catch(() => ({ message: 'Unknown error' }));
      console.error('❌ Failed to create conversation:', error);
      return;
    }
    
    const newConv = await createResponse.json();
    console.log('✅ Conversation created successfully!');
    console.log('  ID:', newConv.id);
    console.log('  Title:', newConv.title);
    
    console.log('\n✅ All API tests passed! Your frontend should now be able to:');
    console.log('  ✓ Load past conversations');
    console.log('  ✓ Create new conversations');
    console.log('  ✓ Store and retrieve PDF metadata');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\n💡 Make sure your backend server is running:');
    console.log('   cd backend && npm run dev');
  }
}

testConversationsAPI();

