# 🔑 API Key Setup Guide

## Location
Your API key goes in: **`backend/.env`**

## Quick Setup

### Step 1: Open the `.env` file
```bash
cd backend
# Open .env in your editor
```

### Step 2: Find the API key section

#### For OpenAI:
```env
AI_PROVIDER=openai
OPENAI_API_KEY=your-api-key-here    # ← Replace this with your actual key
OPENAI_MODEL=gpt-3.5-turbo
```

#### For DeepSeek:
```env
AI_PROVIDER=deepseek
DEEPSEEK_API_KEY=your-api-key-here  # ← Replace this with your actual key
DEEPSEEK_MODEL=deepseek-chat
```

### Step 3: Replace `your-api-key-here` with your actual API key

**Example:**
```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-proj-abc123xyz789...  # Your real key here
OPENAI_MODEL=gpt-3.5-turbo
```

### Step 4: Save the file

### Step 5: Test it
```bash
npm run test:ai
```

## 🔍 How to Identify Your API Key

### OpenAI Key Format:
- Starts with `sk-`
- Example: `sk-proj-...` or `sk-...`
- Get it from: https://platform.openai.com/api-keys

### DeepSeek Key Format:
- Starts with `sk-`
- Example: `sk-...`
- Get it from: https://platform.deepseek.com/api_keys

## ✅ Verification

After adding your key, run:
```bash
npm run test:ai
```

You should see:
```
Current AI Provider: openai (or deepseek)
OpenAI API Key: Set ✅
✅ Response: [Actual AI response from the provider]
```

## 🚨 Important Notes

1. **Never commit `.env` to git** - It's already in `.gitignore`
2. **Keep your API key secret** - Don't share it publicly
3. **Restart the server** after changing `.env`:
   ```bash
   npm start
   ```

## 📝 Full .env Example

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/stututor

# JWT Configuration
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# AI Service Configuration
AI_PROVIDER=openai                    # Change to 'deepseek' if using DeepSeek

# OpenAI Configuration
OPENAI_API_KEY=sk-your-actual-key-here  # ← YOUR KEY GOES HERE
OPENAI_MODEL=gpt-3.5-turbo

# DeepSeek Configuration (if using DeepSeek instead)
# AI_PROVIDER=deepseek
# DEEPSEEK_API_KEY=sk-your-actual-key-here
# DEEPSEEK_MODEL=deepseek-chat
```

