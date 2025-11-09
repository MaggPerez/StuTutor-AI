/**
 * Create 'pdfs' Storage Bucket in Supabase
 * This script creates the required storage bucket for PDF uploads
 */

import { supabase } from './src/supabaseClient.js';

async function createPdfsBucket() {
  console.log('🚀 Creating "pdfs" storage bucket in Supabase...\n');

  try {
    // Check if bucket already exists
    const { data: existingBuckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
      console.error('❌ Failed to connect to Supabase:', listError.message);
      console.log('\n💡 Make sure SUPABASE_URL and SUPABASE_ANON_KEY are set in backend/.env');
      return;
    }

    const pdfsBucket = existingBuckets.find(b => b.name === 'pdfs');

    if (pdfsBucket) {
      console.log('ℹ️  "pdfs" bucket already exists!');
      console.log(`   - Public: ${pdfsBucket.public ? 'Yes' : 'No'}`);
      console.log('\n✅ No action needed!');
      return;
    }

    // Create the bucket
    const { data, error } = await supabase.storage.createBucket('pdfs', {
      public: true,
      fileSizeLimit: 10485760, // 10MB
      allowedMimeTypes: ['application/pdf'],
    });

    if (error) {
      console.error('❌ Failed to create bucket:', error.message);
      console.log('\n⚠️  You may need to use the SUPABASE_SERVICE_ROLE_KEY instead of SUPABASE_ANON_KEY');
      console.log('   Or create the bucket manually in Supabase Dashboard:');
      console.log('   1. Go to https://supabase.com/dashboard');
      console.log('   2. Select your project');
      console.log('   3. Navigate to Storage');
      console.log('   4. Click "Create bucket"');
      console.log('   5. Name it "pdfs"');
      console.log('   6. Make it PUBLIC');
      console.log('   7. Set file size limit to 10MB');
      console.log('   8. Add allowed MIME type: application/pdf');
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
  }
}

createPdfsBucket();
