# n8n Webhook Configuration Guide

## Issue Description

The error "Failed to connect to n8n webhook. Please check your configuration" indicates that the n8n webhook at `https://n8n.srv970139.hstgr.cloud/webhook/0dcd9b71-bf7f-4519-86bd-20304f600c4c` is not configured to accept POST requests.

## Step-by-Step Configuration

### 1. Access Your n8n Instance

1. Open your browser and go to: https://n8n.srv970139.hstgr.cloud
2. Login to your n8n account

### 2. Find the Workflow

1. Look for the workflow that contains the webhook with ID: `0dcd9b71-bf7f-4519-86bd-20304f600c4c`
2. Click on the workflow to open it for editing

### 3. Configure the Webhook Trigger Node

1. Find the **Webhook** trigger node (usually the first node in the workflow)
2. Click on the webhook node to open its settings
3. Look for **HTTP Method** or **Request Method** setting
4. Change it from **GET** to **POST**
5. Ensure **Response Mode** is set to **'Wait for response'** or **'Response node'**
6. Make sure **Path** is set to the webhook ID or a custom path

### 4. Configure the Webhook Response

1. Add a **Webhook Response** node at the end of your workflow
2. Connect the output of your AI processing node to the Webhook Response node
3. In the Webhook Response node settings:
   - Set **Response Mode** to **'Respond with JSON'**
   - In the **Response Body** field, add the JSON structure that the application expects:

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

### 5. Configure the AI Processing Node

1. Add your AI processing node (e.g., OpenAI, Claude) between the Webhook and Webhook Response nodes
2. Configure it to use the data from the webhook:
   - For the structured form, the node will receive:
     - `taskDescription`
     - `useCaseCategory`
     - `desiredOutputFormat`
     - `targetAIModel`
     - `contextBackground`
     - `industryDomain`
   - For the chat interface, the node will receive:
     - `prompt`
     - `conversationHistory`
     - `model`
     - `temperature`
     - `maxTokens`

### 6. Test the Webhook

1. Save and activate the workflow
2. Test by sending a POST request using curl:

```bash
curl -X POST "https://n8n.srv970139.hstgr.cloud/webhook/0dcd9b71-bf7f-4519-86bd-20304f600c4c" \
  -H "Content-Type: application/json" \
  -d '{
    "taskDescription": "Test prompt",
    "useCaseCategory": "Content Creation",
    "desiredOutputFormat": "Paragraph",
    "targetAIModel": "GPT-4",
    "contextBackground": "Test context",
    "industryDomain": "Technology"
  }'
```

3. You should receive a JSON response with the expected structure

### 7. Verify in the Application

1. Go to the Prompt Writer application at http://localhost:3000/
2. Navigate to the **Structured** tab
3. Fill in the form fields and click "Generate Prompt"
4. You should see the AI response in the chat section on the right

## Troubleshooting

### Common Issues

1. **404 Error**: Webhook is not configured for POST requests
   - Solution: Change HTTP Method to POST in the webhook trigger settings

2. **Timeout Error**: Webhook is taking too long to respond
   - Solution: Increase timeout settings in n8n or optimize your workflow

3. **Invalid Response Format**: Webhook is not returning the expected JSON structure
   - Solution: Ensure the Webhook Response node is configured correctly

4. **CORS Error**: Browser is blocking the request
   - Solution: n8n should handle CORS automatically, but check if there are any additional settings needed

### Checking Webhook Status

You can check the webhook status by running the test script:

```bash
cd "Prompt writer"
node test-webhook-status.js
```

This will show you whether the webhook accepts GET and POST requests.

## Expected Data Flow

```
Prompt Writer App → POST Request → n8n Webhook → AI Processing → Webhook Response → App Display
```

## Security Considerations

1. Keep your webhook URL private
2. Consider adding authentication to your webhook
3. Validate input data in your n8n workflow
4. Rate limit the webhook if necessary

## Need Additional Help?

If you're still having issues:

1. Check the n8n execution log for any errors
2. Verify all nodes are properly connected
3. Ensure the workflow is activated (turned on)
4. Check if there are any n8n service notifications

---

**Bottom Line**: The webhook needs to be configured to accept POST requests and return JSON in the expected format for the Prompt Writer application to work correctly.