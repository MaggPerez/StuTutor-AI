import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { supabase } from './supabaseClient.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend + Supabase OK!' });
});

app.get('/api/tutors', async (req, res) => {
  const { data, error } = await supabase.from('tutors').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data || []);
});

app.listen(PORT, () => {
  console.log(`Backend live → http://localhost:${PORT}`);
});