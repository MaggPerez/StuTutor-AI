# Quick Start Guide

## ⚠️ IMPORTANT: Before You Start

You MUST run the SQL schema in Supabase before the application will work!

## Step 1: Setup Supabase Database (REQUIRED)

1. Open [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Copy the entire contents of `backend/supabase-schema.sql`
5. Paste into the SQL Editor
6. Click **Run** or press Cmd+Enter (Mac) / Ctrl+Enter (Windows)
7. Verify tables created: Go to **Table Editor** → should see `conversations` and `messages` tables

## Step 2: Start the Backend

```bash
cd backend
npm run dev
```

Expected output:
```
Backend live → http://localhost:3000
```

## Step 3: Start the Frontend

Open a new terminal:

```bash
# From project root (not backend folder)
npm run dev
```

Expected output:
```
  VITE v... ready in ...ms

  ➜  Local:   http://localhost:5173/
```

## Step 4: Test It!

1. Open http://localhost:5173 in your browser
2. The app should load and show the chat interface
3. Type a message like "Hello, what can you help me with?"
4. Press Enter
5. You should see:
   - Your message appear
   - A typing indicator ("AI is typing...")
   - An AI response from OpenAI

## Troubleshooting

### "Failed to get AI response"
- Check that you ran the SQL schema in Supabase
- Verify your OpenAI API key in `backend/.env`
- Check backend terminal for error messages

### "Cannot connect to backend"
- Make sure backend is running on http://localhost:3000
- Check that `.env` in project root has `VITE_API_URL=http://localhost:3000`
- Restart the frontend after changing .env

### Backend won't start
- Make sure you're in the `backend` folder
- Run `npm install` to install dependencies
- Check that `backend/.env` exists and has all required variables

### Tables not found in Supabase
- **You forgot to run the SQL schema!** Go back to Step 1

## Verify Everything Works

### Backend Health Check:
```bash
curl http://localhost:3000/api/health
```

Expected: `{"message":"Backend + Supabase OK!"}`

### Check Database:
1. Go to Supabase → Table Editor
2. After sending a message, refresh the tables
3. `conversations` should have 1 row
4. `messages` should have 2 rows (your message + AI response)

## What's Next?

Once it's working:
- Send multiple messages to test conversation history
- Refresh the page - your messages should still be there
- Click "New Chat" to create another conversation
- Read `IMPLEMENTATION_SUMMARY.md` for technical details
- Read `SETUP_INSTRUCTIONS.md` for advanced configuration

## Quick Reference

| What | Where | Port |
|------|-------|------|
| Frontend | http://localhost:5173 | 5173 |
| Backend API | http://localhost:3000 | 3000 |
| Supabase Dashboard | https://supabase.com/dashboard | - |

## Environment Variables

### Backend (.env in `backend/` folder):
```env
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
OPENAI_API_KEY=your_key
OPENAI_MODEL=gpt-3.5-turbo
PORT=3000
```

### Frontend (.env in project root):
```env
VITE_API_URL=http://localhost:3000
```

---

**Need help?** Check the full `SETUP_INSTRUCTIONS.md` for detailed troubleshooting.
