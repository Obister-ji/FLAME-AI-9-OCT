# n8n Webhook Setup Guide

## Current Issue

The Prompt Writer application is currently using local optimization because the n8n webhook is not properly configured to handle POST requests. The webhook returns a 404 error when attempting to send POST requests.

## Solution

To properly connect the Prompt Writer to your n8n workflow, you need to configure the webhook in n8n to accept POST requests. Here's how:

### Option 1: Configure the Existing Webhook for POST Requests

1. Open your n8n instance at: https://n8n.srv970139.hstgr.cloud
2. Find the workflow associated with the webhook: `0dcd9b71-bf7f-4519-86bd-20304f600c4c`
3. Edit the Webhook trigger node
4. Change the HTTP Method from GET to POST
5. Ensure the "Response" node is configured to return JSON
6. Save and activate the workflow

### Option 2: Create a New Webhook Endpoint

1. Create a new workflow in n8n
2. Add a Webhook trigger node with these settings:
   - HTTP Method: POST
   - Path: /prompt-writer (or your preferred path)
   - Response Mode: response node
3. Add your AI processing nodes (OpenAI, Claude, etc.)
4. Add a Webhook Response node that returns JSON in this format:
   ```json
   {
     "success": true,
     "data": {
       "optimizedPrompt": "Your optimized prompt here",
       "suggestions": ["Suggestion 1", "Suggestion 2"],
       "improvements": ["Improvement 1", "Improvement 2"]
     }
   }
   ```
5. Save and activate the workflow
6. Update the webhook URL in `src/services/api.ts`

### Expected Webhook Response Format

The application expects the webhook to return JSON in this format:

```json
{
  "success": true,
  "data": {
    "optimizedPrompt": "The AI-optimized version of the prompt",
    "suggestions": [
      "Consider adding specific examples",
      "Include constraints on length or format"
    ],
    "improvements": [
      "Enhanced prompt structure",
      "Added specific context"
    ]
  }
}
```

### Testing the Webhook

After configuring the webhook, you can test it using curl:

```bash
curl -X POST "https://n8n.srv970139.hstgr.cloud/webhook/0dcd9b71-bf7f-4519-86bd-20304f600c4c" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Test prompt for optimization",
    "context": "This is a test",
    "model": "gpt-4",
    "temperature": 0.7,
    "maxTokens": 1000
  }'
```

## Current Application Behavior

Until the webhook is properly configured, the application will:
1. Attempt to connect to the webhook
2. Detect that it's not configured for POST requests
3. Fall back to local simulation
4. Display "Prompt generated with local optimization!" message

This ensures the application remains fully functional even without a properly configured webhook.