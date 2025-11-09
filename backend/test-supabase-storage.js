/**
 * Test script to verify Supabase Storage configuration
 * Run with: node test-supabase-storage.js
 */

import { supabase } from './src/supabaseClient.js';

async function testSupabaseStorage() {
  console.log('🔍 Testing Supabase Storage Configuration...\n');

  try {
    // Test 1: Check if client is initialized
    console.log('✓ Supabase client initialized');

    // Test 2: List buckets
    console.log('\n📦 Checking storage buckets...');
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error('❌ Error listing buckets:', bucketsError.message);
      return;
    }

    console.log('Available buckets:', buckets.map(b => b.name).join(', '));
    
    const pdfsBucket = buckets.find(b => b.name === 'pdfs');
    if (!pdfsBucket) {
      console.error('\n❌ ERROR: "pdfs" bucket not found!');
      console.log('📝 Create a bucket named "pdfs" in your Supabase dashboard:');
      console.log('   Storage → New bucket → Name: "pdfs" → Public: Yes');
      return;
    }

    console.log('✓ "pdfs" bucket exists');
    console.log('  - Public:', pdfsBucket.public);
    console.log('  - ID:', pdfsBucket.id);

    // Test 3: Check if we can access the pdfs bucket
    console.log('\n📁 Testing access to "pdfs" bucket...');
    const { data: files, error: listError } = await supabase.storage
      .from('pdfs')
      .list('', { limit: 1 });

    if (listError) {
      console.error('❌ Error accessing pdfs bucket:', listError.message);
      console.log('📝 Check bucket permissions in Supabase dashboard');
      return;
    }

    console.log('✓ Successfully accessed "pdfs" bucket');
    console.log(`  - Files in bucket: ${files.length}`);

    // Test 4: Check database table
    console.log('\n🗄️  Checking conversations table...');
    const { data: tableInfo, error: tableError } = await supabase
      .from('conversations')
      .select('pdf_file_name, pdf_storage_url')
      .limit(1);

    if (tableError) {
      if (tableError.message.includes('column') && tableError.message.includes('does not exist')) {
        console.error('\n❌ ERROR: PDF columns not added to conversations table!');
        console.log('📝 Run the migration SQL in your Supabase SQL Editor:');
        console.log('   backend/migrations/add_pdf_storage.sql');
        return;
      }
      console.error('❌ Error querying conversations:', tableError.message);
      return;
    }

    console.log('✓ Conversations table has PDF columns');

    console.log('\n✅ All tests passed! Supabase Storage is configured correctly.');
    console.log('\n💡 If you\'re still having issues:');
    console.log('   1. Check backend console for errors when uploading');
    console.log('   2. Check browser console for network errors');
    console.log('   3. Verify SUPABASE_URL and SUPABASE_ANON_KEY in backend/.env');

  } catch (error) {
    console.error('\n❌ Unexpected error:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

testSupabaseStorage();

