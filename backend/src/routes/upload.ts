import express from 'express';
import { supabaseAdmin } from '../lib/supabaseAdmin';

const router = express.Router();

router.post('/upload-pdf', async (req, res) => {
  try {
    // Check if file exists
    if (!req.files || !req.files.pdf) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    const file = req.files.pdf as any;
    
    // Validate it's a PDF
    if (file.mimetype !== 'application/pdf') {
      return res.status(400).json({ error: 'Only PDF files are allowed' });
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `pdfs/${fileName}`;

    // Upload directly from buffer (no temp file needed)
    const { data, error } = await supabaseAdmin.storage
      .from('pdfs')
      .upload(filePath, file.data, {
        contentType: 'application/pdf',
        upsert: false,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return res.status(500).json({ error: error.message });
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('pdfs')
      .getPublicUrl(filePath);

    res.json({
      success: true,
      url: publicUrl,
      path: filePath,
    });

  } catch (err: any) {
    console.error('Upload route error:', err);
    res.status(500).json({ error: err.message || 'Upload failed' });
  }
});

export default router;