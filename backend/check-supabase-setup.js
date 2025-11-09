/**
 * Supabase Setup Verification Script
 * Checks if the 'pdfs' bucket exists and has proper configuration
 */

import { supabase } from './src/supabaseClient.js';

async function checkSupabaseSetup() {
  console.log('🔍 Checking Supabase configuration...\n');

  try {
    // Check if we can connect to Supabase
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
      console.error('❌ Failed to connect to Supabase:', listError.message);
      return;
    }

    console.log('✅ Successfully connected to Supabase');
    console.log(`📦 Found ${buckets.length} storage bucket(s):\n`);

    buckets.forEach(bucket => {
      console.log(`   - ${bucket.name} (${bucket.public ? 'Public' : 'Private'})`);
    });

    // Check for 'pdfs' bucket
    const pdfsBucket = buckets.find(b => b.name === 'pdfs');

    if (!pdfsBucket) {
      console.log('\n⚠️  WARNING: "pdfs" bucket not found!');
      console.log('\n📝 To fix this:');
      console.log('   1. Go to your Supabase Dashboard');
      console.log('   2. Navigate to Storage');
      console.log('   3. Create a new bucket named "pdfs"');
      console.log('   4. Make it PUBLIC (or set appropriate RLS policies)');
      return;
    }

    console.log('\n✅ "pdfs" bucket exists!');
    console.log(`   - Public: ${pdfsBucket.public ? 'Yes' : 'No'}`);
    console.log(`   - ID: ${pdfsBucket.id}`);

    // Try to list files in the bucket
    const { data: files, error: filesError } = await supabase.storage
      .from('pdfs')
      .list('', { limit: 5 });

    if (filesError) {
      console.log(`\n⚠️  Cannot list files in "pdfs" bucket: ${filesError.message}`);
      console.log('   This might be a permissions issue.');
    } else {
      console.log(`\n📄 Found ${files.length} file(s) in "pdfs" bucket`);
    }

    console.log('\n✅ Supabase setup verification complete!');
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

checkSupabaseSetup();
