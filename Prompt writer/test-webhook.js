import axios from 'axios';

// Test the webhook connection
async function testWebhook() {
  const webhookUrl = 'https://n8n.srv970139.hstgr.cloud/webhook/0dcd9b71-bf7f-4519-86bd-20304f600c4c';
  
  console.log('Testing webhook connection to:', webhookUrl);
  
  try {
    // First try a GET request to check if the webhook is accessible
    console.log('Trying GET request first...');
    const getResponse = await axios.get(webhookUrl, {
      timeout: 10000
    });
    
    console.log('✅ GET request successful!');
    console.log('Response status:', getResponse.status);
    console.log('Response data:', getResponse.data);
    
    // Now try a POST request with test data
    console.log('\nTrying POST request with test data...');
    const postResponse = await axios.post(webhookUrl, {
      prompt: "Test prompt for optimization",
      context: "This is a test to verify the webhook connection",
      model: "gpt-4",
      temperature: 0.7,
      maxTokens: 1000
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
    
    console.log('✅ POST request successful!');
    console.log('Response status:', postResponse.status);
    console.log('Response data:', postResponse.data);
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('❌ Webhook connection failed:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
    } else {
      console.error('❌ Unexpected error:', error);
    }
  }
}

testWebhook();