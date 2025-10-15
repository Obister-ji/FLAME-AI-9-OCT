import axios from 'axios';

const webhookUrl = 'https://n8n.srv970139.hstgr.cloud/webhook/0dcd9b71-bf7f-4519-86bd-20304f600c4c';

console.log('Testing webhook configuration...\n');

// Test 1: GET request (should work)
console.log('1. Testing GET request...');
axios.get(webhookUrl, { timeout: 5000 })
  .then(response => {
    console.log('✅ GET request successful');
    console.log('Status:', response.status);
    console.log('Response type:', typeof response.data);
  })
  .catch(error => {
    console.log('❌ GET request failed:', error.message);
  })
  .then(() => {
    // Test 2: POST request (should fail with 404)
    console.log('\n2. Testing POST request...');
    return axios.post(webhookUrl, {
      prompt: "Test prompt",
      model: "gpt-4"
    }, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000
    });
  })
  .then(response => {
    console.log('✅ POST request successful');
    console.log('Status:', response.status);
    console.log('Response:', response.data);
  })
  .catch(error => {
    if (error.response?.status === 404) {
      console.log('❌ POST request failed with 404 - Webhook not configured for POST requests');
      console.log('This is the issue causing the fallback to local optimization');
    } else {
      console.log('❌ POST request failed:', error.message);
    }
  })
  .then(() => {
    console.log('\n--- Summary ---');
    console.log('If GET works but POST fails with 404, the webhook needs to be');
    console.log('reconfigured in n8n to accept POST requests instead of GET only.');
  });