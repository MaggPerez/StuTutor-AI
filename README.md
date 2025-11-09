# StuTutor-AI 📚
<img width="1800" height="1046" alt="Screenshot 2025-11-09 at 4 24 10 AM" src="https://github.com/user-attachments/assets/12492a58-a2e3-4f9e-ba8a-4012c11905dd" />


An intelligent AI-powered tutoring platform that helps students with their assignments by analyzing PDF documents and providing interactive study assistance.

## 🎯 Project Goal

StuTutor-AI is designed to be a comprehensive AI tutor that helps students understand and learn from their course materials. Students can upload PDF documents (textbooks, lecture notes, assignments) and engage in interactive conversations with an AI assistant that understands the content and provides personalized educational support.

### Key Features

- **PDF Document Upload**: Upload course materials, textbooks, or assignment documents
- **AI-Powered Chat**: Ask questions about uploaded PDFs and get intelligent, context-aware responses
- **Conversation Management**: Organize multiple study sessions with different documents
- **Real-time PDF Analysis**: Automatic text extraction and AI understanding of document content
- **Interactive Learning**: Get explanations, summaries, and practice questions based on your materials

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible component library
- **Sonner** - Toast notifications
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **Supabase** - Backend-as-a-Service (Database & Authentication)
- **OpenAI API** - AI language model integration
- **Multer** - File upload handling
- **pdf-parse** - PDF text extraction

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting
- **Nodemon** - Auto-restart development server

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key
- Supabase account and project

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd StuTutor-AI
```

### 2. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 3. Environment Configuration

**Frontend** (`.env` in root):
```env
VITE_API_URL=http://localhost:3000
VITE_PYTHON_API_URL=http://localhost:8000
```

**Backend** (`backend/.env`):
```env
PORT=3000
NODE_ENV=development

# Supabase Configuration
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# AI Service Configuration
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-3.5-turbo
```

### 4. Database Setup

Create the following tables in your Supabase project:

**conversations**
```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**messages**
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 5. Run the Application

**Frontend** (in root directory):
```bash
npm run dev
```

**Backend** (in backend directory):
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 📖 How to Use

1. **Upload a PDF**:
   - Go to the landing page
   - Drag and drop a PDF or click to browse
   - The PDF will be uploaded and analyzed automatically

2. **Start Chatting**:
   - You'll be redirected to the chat interface
   - Ask questions about your PDF document
   - Get AI-powered explanations and help

3. **Manage Conversations**:
   - View all your study sessions in the sidebar
   - Switch between different conversations
   - Each conversation retains the context of its uploaded PDF

## 🎨 Project Structure

```
StuTutor-AI/
├── src/                          # Frontend source code
│   ├── components/              # React components
│   │   ├── landing/            # Landing page components
│   │   └── ui/                 # shadcn/ui components
│   ├── context/                # React context providers
│   ├── lib/                    # API client and utilities
│   └── pages/                  # Page components
├── backend/                     # Backend source code
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   ├── services/           # Business logic
│   │   │   ├── aiService.js   # OpenAI integration
│   │   │   └── pdfService.js  # PDF processing
│   │   ├── routes/             # API routes
│   │   └── index.js            # Server entry point
│   └── package.json
└── README.md
```

## 🔑 Key API Endpoints

- `POST /api/conversations` - Create new conversation
- `GET /api/conversations` - Get all conversations
- `GET /api/conversations/:id/messages` - Get conversation messages
- `POST /api/chat/send` - Send message and get AI response
- `POST /api/upload/storage` - Upload PDF document
- `GET /api/conversations/:id/pdf` - Get PDF info for conversation
- `DELETE /api/conversations/:id` - Delete conversation

## 🐛 Troubleshooting

### PDF Upload Issues
- Ensure file size is under 10MB
- Only PDF files are accepted
- Check backend console for text extraction logs

### AI Response Issues
- Verify OpenAI API key is valid
- Check API usage limits
- Review backend logs for error messages

### Connection Issues
- Ensure both frontend and backend servers are running
- Check CORS configuration
- Verify environment variables are set correctly

## 📝 Notes

- **PDF Storage**: PDFs are currently stored in server memory and will be cleared on server restart
- **Token Limits**: PDF context is limited to first 4000 characters to avoid OpenAI token limits
- **Conversation History**: All conversations and messages are persisted in Supabase

## 🤝 Contributing

This is a student project. Feel free to fork and modify for your own learning purposes.

## 📄 License

ISC

---

Built with ❤️ to help students learn better
