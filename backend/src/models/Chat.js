/**
 * Chat model
 * Defines chat schema with userId, threadId, messages (role/content pairs), and timestamps
 */

import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    enum: ['user', 'assistant'],
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, { _id: false });

const chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  threadId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  messages: [messageSchema],
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
    default: null,
  },
}, {
  timestamps: true,
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;

