/**
 * Create 'pdfs' Storage Bucket in Supabase (Using Service Role Key)
 * This script creates the required storage bucket for PDF uploads
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required in backend/.env');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createPdfsBucket() {
  console.log('🚀 Creating "pdfs" storage bucket in Supabase (with admin privileges)...\n');

  try {
    // Check if bucket already exists
    const { data: existingBuckets, error: listError } = await supabaseAdmin.storage.listBuckets();

    if (listError) {
      console.error('❌ Failed to connect to Supabase:', listError.message);
      return;
    }

    console.log(`📦 Currently found ${existingBuckets.length} bucket(s):`);
    existingBuckets.forEach(b => console.log(`   - ${b.name} (${b.public ? 'Public' : 'Private'})`));
    console.log('');

    const pdfsBucket = existingBuckets.find(b => b.name === 'pdfs');

    if (pdfsBucket) {
      console.log('✅ "pdfs" bucket already exists!');
      console.log(`   - Public: ${pdfsBucket.public ? 'Yes' : 'No'}`);
      console.log('\n✅ No action needed!');
      return;
    }

    // Create the bucket
    console.log('Creating "pdfs" bucket...');
    const { data, error } = await supabaseAdmin.storage.createBucket('pdfs', {
      public: true,
      fileSizeLimit: 10485760, // 10MB
      allowedMimeTypes: ['application/pdf'],
    });

    if (error) {
      console.error('❌ Failed to create bucket:', error.message);
      console.log('\n📝 Please create the bucket manually:');
      console.log('   1. Go to https://supabase.com/dashboard');
      console.log('   2. Select your project');
      console.log('   3. Navigate to Storage');
      console.log('   4. Click "Create bucket"');
      console.log('   5. Name it "pdfs"');
      console.log('   6. Make it PUBLIC');
      return;
    }

    console.log('✅ Successfully created "pdfs" bucket!');
    console.log('\n📦 Bucket configuration:');
    console.log('   - Name: pdfs');
    console.log('   - Public: Yes');
    console.log('   - File size limit: 10MB');
    console.log('   - Allowed types: PDF only');
    console.log('\n🎉 Setup complete! You can now upload PDFs from the landing page.');
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    console.error(error);
  }
}

createPdfsBucket();
