import { db } from '../lib/firebase/admin'

async function testFirebase() {
  try {
    console.log('Attempting to write test document...')
    
    const testDoc = {
      test_field: 'test value',
      created_at: new Date(),
      updated_at: new Date()
    }

    const docRef = await db.collection('test_collection').add(testDoc)
    console.log('Successfully created document with ID:', docRef.id)

    // Try to read it back
    const doc = await docRef.get()
    console.log('Read back document data:', doc.data())

    // Clean up
    await docRef.delete()
    console.log('Successfully deleted test document')

  } catch (error) {
    console.error('Error testing Firebase:', error)
  }
}

testFirebase() 