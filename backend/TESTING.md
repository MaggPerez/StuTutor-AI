# Testing Guide

## AI Service Testing

### Test Mock AI Service

The AI service works out of the box with mock responses. Test it:

```bash
npm run test:ai
```

### Test with Real AI Providers

#### Option 1: OpenAI

1. Get an API key from [OpenAI](https://platform.openai.com/api-keys)
2. Add to `.env`:
   ```env
   AI_PROVIDER=openai
   OPENAI_API_KEY=sk-your-api-key-here
   OPENAI_MODEL=gpt-3.5-turbo
   ```
3. Run the test:
   ```bash
   npm run test:ai
   ```

#### Option 2: DeepSeek (Cheaper Alternative)

1. Get an API key from [DeepSeek](https://platform.deepseek.com/api_keys)
2. Add to `.env`:
   ```env
   AI_PROVIDER=deepseek
   DEEPSEEK_API_KEY=sk-your-api-key-here
   DEEPSEEK_MODEL=deepseek-chat
   ```
3. Run the test:
   ```bash
   npm run test:ai
   ```

### Expected Output

With mock provider:
```
🤖 Testing AI Service...
Current AI Provider: mock
✅ Response: This is a mock AI response to your message: "Hello! Can you help me with math?".
```

With real AI provider:
```
🤖 Testing AI Service...
Current AI Provider: openai
✅ Response: [Actual AI response from OpenAI]
```

## API Integration Testing

### Prerequisites

1. Start MongoDB:
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   # Update MONGODB_URI in .env
   ```

2. Start the server:
   ```bash
   npm start
   # Server should be running on http://localhost:3000
   ```

3. Run API tests:
   ```bash
   npm run test:api
   ```

### Manual Testing with cURL

#### 1. Register a user
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### 2. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### 3. Send a chat message (replace TOKEN with token from login)
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "message": "Hello! What is 2 + 2?"
  }'
```

#### 4. Get chat history (replace TOKEN and THREAD_ID)
```bash
curl -X GET http://localhost:3000/api/chat/THREAD_ID \
  -H "Authorization: Bearer TOKEN"
```

#### 5. List documents
```bash
curl -X GET http://localhost:3000/api/docs \
  -H "Authorization: Bearer TOKEN"
```

## Testing Checklist

- [ ] Mock AI service works (`npm run test:ai`)
- [ ] Server starts without errors (`npm start`)
- [ ] MongoDB connection works
- [ ] User registration works
- [ ] User login works
- [ ] JWT authentication works
- [ ] Chat endpoint works (with mock AI)
- [ ] Chat history retrieval works
- [ ] Real AI provider works (if API key is set)
- [ ] PDF upload works (if testing file uploads)

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check `MONGODB_URI` in `.env`
- For local MongoDB: `mongodb://localhost:27017/stututor`
- For MongoDB Atlas: Use connection string from Atlas dashboard

### AI Service Not Working
- Check `AI_PROVIDER` in `.env` (should be `openai`, `deepseek`, or `mock`)
- Verify API key is set correctly
- Check API key has credits/usage available
- Look for error messages in console

### Authentication Errors
- Make sure token is included in `Authorization: Bearer <token>` header
- Check token hasn't expired (default: 7 days)
- Verify user exists in database

### Port Already in Use
- Change `PORT` in `.env`
- Or kill the process using port 3000:
  ```bash
  lsof -ti:3000 | xargs kill
  ```

