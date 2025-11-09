/**
 * Document model
 * Defines document schema with userId, title, parsed content, and upload date
 */

import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: [true, 'Document title is required'],
    trim: true,
  },
  originalFilename: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    default: 0,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const Document = mongoose.model('Document', documentSchema);

export default Document;

