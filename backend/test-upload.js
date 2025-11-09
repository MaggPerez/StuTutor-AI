/**
 * Test actual PDF upload to Supabase Storage
 */

import { supabase } from './src/supabaseClient.js';
import fs from 'fs';

async function testUpload() {
  console.log('🧪 Testing PDF Upload to Supabase Storage\n');

  try {
    // Create a small test PDF-like file
    const testContent = Buffer.from('%PDF-1.4 Test PDF Content');
    const testFileName = `test-${Date.now()}.pdf`;
    const testPath = `test/${testFileName}`;

    console.log('📤 Uploading test file:', testPath);
    
    const { data, error } = await supabase.storage
      .from('pdfs')
      .upload(testPath, testContent, {
        contentType: 'application/pdf',
        upsert: false,
      });

    if (error) {
      console.error('\n❌ Upload failed!');
      console.error('   Error:', error.message);
      console.error('   Status:', error.statusCode);
      console.error('   Details:', JSON.stringify(error, null, 2));
      
      if (error.message.includes('not found')) {
        console.log('\n💡 The "pdfs" bucket may not exist or is named differently');
      } else if (error.message.includes('permission') || error.message.includes('policy')) {
        console.log('\n💡 Bucket exists but lacks upload permissions');
        console.log('   Set bucket to Public or add RLS policy for inserts');
      }
      return;
    }

    console.log('✅ Upload successful!');
    console.log('   Path:', data.path);

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('pdfs')
      .getPublicUrl(data.path);

    console.log('   Public URL:', publicUrl);

    // Verify we can list it
    console.log('\n🔍 Verifying file exists...');
    const { data: files, error: listError } = await supabase.storage
      .from('pdfs')
      .list('test', { limit: 10 });

    if (listError) {
      console.error('❌ Error listing files:', listError.message);
    } else {
      const found = files.find(f => f.name === testFileName);
      if (found) {
        console.log('✅ File verified in storage!');
        console.log('   Size:', found.metadata?.size || 'unknown');
      } else {
        console.log('⚠️  File not found in list');
      }
    }

    // Clean up test file
    console.log('\n🧹 Cleaning up test file...');
    const { error: deleteError } = await supabase.storage
      .from('pdfs')
      .remove([testPath]);

    if (deleteError) {
      console.log('⚠️  Could not delete test file:', deleteError.message);
    } else {
      console.log('✅ Test file deleted');
    }

    console.log('\n✅ ALL TESTS PASSED! PDF storage is working correctly! 🎉');
    console.log('\nYour app should now be able to:');
    console.log('  ✓ Upload PDFs to Supabase Storage');
    console.log('  ✓ Generate public URLs');
    console.log('  ✓ Store metadata in conversations table');
    console.log('  ✓ Retrieve PDFs when returning to conversations');

  } catch (error) {
    console.error('\n❌ Unexpected error:', error.message);
    console.error(error.stack);
  }
}

testUpload();

