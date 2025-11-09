# StuTutor-AI Setup Instructions

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account
- OpenAI API key

## Setup Steps

### 1. Database Setup (Supabase)

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project (or create a new one)
3. Go to **SQL Editor** (left sidebar)
4. Copy the contents of `backend/supabase-schema.sql`
5. Paste and run the SQL to create the tables

**What this creates:**
- `conversations` table (stores chat conversations)
- `messages` table (stores all messages with role: user/assistant)
- Indexes for performance
- Auto-update triggers for timestamps

### 2. Backend Setup

```bash
cd backend

# Install dependencies (already done)
npm install

# Verify .env file has these variables:
# SUPABASE_URL=your_supabase_url
# SUPABASE_ANON_KEY=your_supabase_anon_key
# OPENAI_API_KEY=your_openai_api_key
# OPENAI_MODEL=gpt-3.5-turbo
# PORT=3000

# Start the backend server
npm run dev
```

The backend will start on http://localhost:3000

### 3. Frontend Setup

```bash
# From project root
cd ..

# Install dependencies (if not already done)
npm install

# Verify .env file exists with:
# VITE_API_URL=http://localhost:3000

# Start the frontend
npm run dev
```

The frontend will start on http://localhost:5173

## Testing the Integration

### 1. Start Both Servers

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
npm run dev
```

### 2. Verify Backend is Running

Visit: http://localhost:3000/api/health

You should see: `{"message":"Backend + Supabase OK!"}`

### 3. Test the Chat Flow

1. Open http://localhost:5173 in your browser
2. Click "New Chat" button (or one will be created automatically)
3. Type a message and press Enter
4. You should see:
   - Your message appear immediately
   - A typing indicator
   - An AI response from OpenAI (gpt-3.5-turbo)

### 4. Verify Database Persistence

1. Check Supabase dashboard → Table Editor → `conversations` table
   - Should see your conversation with a title
2. Check `messages` table
   - Should see your user messages and AI responses

### 5. Test Conversation Persistence

1. Refresh the page
2. Your conversation should still be there
3. Click on it to load the message history

## API Endpoints

### Backend Endpoints:

- `GET /api/health` - Health check
- `POST /api/conversations` - Create new conversation
- `GET /api/conversations` - Get all conversations
- `GET /api/conversations/:id/messages` - Get messages for a conversation
- `POST /api/chat/send` - Send message and get AI response
- `DELETE /api/conversations/:id` - Delete a conversation

## Troubleshooting

### Backend won't start:
- Check that port 3000 is not in use
- Verify all environment variables are set in `backend/.env`
- Run `npm install` in the backend directory

### Frontend can't connect to backend:
- Verify backend is running on http://localhost:3000
- Check `.env` file in root has `VITE_API_URL=http://localhost:3000`
- Restart the frontend dev server after changing .env

### OpenAI errors:
- Verify your OpenAI API key is valid
- Check you have credits in your OpenAI account
- Ensure `OPENAI_MODEL=gpt-3.5-turbo` in backend/.env

### Supabase errors:
- Verify your Supabase URL and anon key are correct
- Make sure you ran the SQL schema in Supabase SQL Editor
- Check Supabase project is active

### Messages not persisting:
- Check Supabase dashboard → Table Editor
- Verify tables were created correctly
- Check browser console for API errors
- Check backend terminal for error logs

## Architecture Overview

```
User types message
    ↓
Frontend (ChatArea.tsx)
    ↓
chatService.ts → calls API
    ↓
Backend (index.ts) → /api/chat/send
    ↓
1. Saves user message to Supabase
2. Calls OpenAI API (aiService.js)
3. Saves AI response to Supabase
    ↓
Returns both messages to frontend
    ↓
Frontend displays AI response
```

## Next Steps (Future Enhancements)

1. **Add Authentication**
   - User sign-up/login
   - Row Level Security in Supabase
   - User-specific conversations

2. **PDF Upload**
   - Store PDFs in Supabase Storage
   - Extract text and send to AI as context
   - Display PDF attachments in chat

3. **Streaming Responses**
   - Use OpenAI streaming API
   - Show AI response as it's being generated

4. **Better Error Handling**
   - Retry logic for failed requests
   - Better error messages to user
   - Offline support

5. **UI Improvements**
   - Markdown support in messages
   - Code syntax highlighting
   - Message editing/deletion
   - Conversation search
