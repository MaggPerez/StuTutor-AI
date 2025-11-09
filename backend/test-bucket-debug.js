/**
 * Detailed bucket debugging
 */

import { supabase } from './src/supabaseClient.js';

async function debugBuckets() {
  console.log('🔍 Detailed Bucket Debugging\n');

  // Show what project we're connecting to
  const url = process.env.SUPABASE_URL;
  const projectId = url ? url.split('//')[1]?.split('.')[0] : 'unknown';
  console.log('📍 Connected to project:', projectId);
  console.log('🔗 URL:', url);
  console.log('🔑 API Key:', process.env.SUPABASE_ANON_KEY?.substring(0, 20) + '...\n');

  try {
    // Try to list buckets with detailed error
    console.log('Attempting to list storage buckets...');
    const { data, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error('\n❌ Error listing buckets:');
      console.error('   Message:', error.message);
      console.error('   Status:', error.status);
      console.error('   Details:', JSON.stringify(error, null, 2));
      return;
    }

    console.log('\n✓ Successfully called listBuckets()');
    console.log('📦 Number of buckets found:', data?.length || 0);
    
    if (data && data.length > 0) {
      console.log('\nBuckets in this project:');
      data.forEach(bucket => {
        console.log(`  - ${bucket.name} (${bucket.public ? 'Public' : 'Private'})`);
      });
    } else {
      console.log('\n⚠️  No buckets found in this project!');
      console.log('\n📝 Steps to create the bucket:');
      console.log('   1. Go to https://supabase.com/dashboard');
      console.log('   2. Select your project:', projectId);
      console.log('   3. Click "Storage" in the left menu');
      console.log('   4. Click "New bucket" button');
      console.log('   5. Enter name: "pdfs" (exactly, no quotes)');
      console.log('   6. Toggle "Public bucket" to ON');
      console.log('   7. Click "Create bucket"');
    }

    // Try to access the pdfs bucket anyway
    console.log('\n\nAttempting to access "pdfs" bucket directly...');
    const { data: files, error: listError } = await supabase.storage
      .from('pdfs')
      .list('', { limit: 1 });

    if (listError) {
      console.error('❌ Cannot access "pdfs" bucket:');
      console.error('   Message:', listError.message);
      console.error('   This confirms the bucket does not exist or is not accessible');
    } else {
      console.log('✓ Can access "pdfs" bucket!');
      console.log('   Files:', files?.length || 0);
    }

  } catch (error) {
    console.error('\n❌ Unexpected error:', error.message);
  }
}

debugBuckets();

