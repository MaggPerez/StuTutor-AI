# StuTutor-AI Backend

Backend API for StuTutor-AI built with Node.js, Express, and MongoDB.

## 📁 Project Structure

```
backend/
├── src/
│   ├── server.js          # Entry point
│   ├── app.js             # Express app setup
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── controllers/       # Route handlers
│   ├── routes/            # API routes
│   ├── middleware/        # Auth & error handling
│   ├── models/            # Mongoose models
│   ├── services/          # Business logic (AI, PDF)
│   └── utils/             # Helper functions
└── package.json
```

## 🚀 Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file:**
   ```env
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/stututor
   JWT_SECRET=your-secret-key-change-in-production
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   ```

3. **Start MongoDB:**
   Make sure MongoDB is running on your system.

4. **Run the server:**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Chat (Protected - requires JWT token)

- `POST /api/chat` - Send message and get AI response
  ```json
  {
    "message": "Hello, how can you help me?",
    "threadId": "optional-thread-id",
    "documentId": "optional-document-id"
  }
  ```

- `GET /api/chat/:threadId` - Get chat history

### PDF (Protected - requires JWT token)

- `POST /api/upload/pdf` - Upload and process PDF
  - Form data with `pdf` field (multipart/form-data)
  - Max file size: 10MB

- `GET /api/docs` - List user documents

## 🔒 Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## 📦 Response Format

All responses follow a standardized format:

**Success:**
```json
{
  "success": true,
  "data": {
    "message": "Operation successful",
    // ... other data
  }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message"
}
```

## 🛠️ Technologies

- Express.js - Web framework
- MongoDB + Mongoose - Database
- JWT - Authentication
- Multer - File uploads
- pdf-parse - PDF text extraction
- bcrypt - Password hashing

## 📝 Notes

- The AI service currently returns mock responses. To integrate with a real AI API, update `src/services/aiService.js`.
- Make sure to set a strong `JWT_SECRET` in production.
- Configure CORS appropriately for your frontend URL.

