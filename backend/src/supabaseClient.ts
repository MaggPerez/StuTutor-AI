import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// This fixes the .env loading issue on Windows + ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Now safely read the variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'SUPABASE_URL and SUPABASE_ANON_KEY are required in backend/.env\n' +
    'Make sure the file exists and has no VITE_ prefix!'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);