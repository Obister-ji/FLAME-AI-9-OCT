# Structured Input Prompt Writer - Documentation

## Overview

The Structured Input Prompt Writer is a new feature that allows users to provide detailed, structured inputs to the n8n workflow for more precise and context-aware prompt generation. This interface collects specific fields that the n8n workflow expects, ensuring better AI-generated outputs.

## Structured Input Fields

The form collects the following fields that are sent directly to the n8n webhook:

### 1. Task Description (Required)
- **Purpose**: Describe what you want the AI to do
- **Example**: "Create a marketing email for a new product launch"
- **Validation**: Must be filled out before submission

### 2. Use Case Category
- **Purpose**: Categorize the type of task for better context
- **Options**: 
  - Content Creation
  - Data Analysis
  - Customer Support
  - Code Generation
  - Research
  - Marketing
  - Education
  - Business Strategy
  - Creative Writing
  - Technical Documentation
  - Other

### 3. Desired Output Format
- **Purpose**: Specify how you want the response formatted
- **Options**:
  - Paragraph
  - Bullet Points
  - Numbered List
  - Table
  - JSON
  - Code
  - Step-by-Step Instructions
  - Q&A Format
  - Summary
  - Detailed Report

### 4. Target AI Model
- **Purpose**: Optimize the prompt for a specific AI model
- **Options**:
  - GPT-4 (default)
  - GPT-3.5
  - Claude
  - Gemini
  - LLaMA
  - Other

### 5. Context/Background
- **Purpose**: Provide additional context or background information
- **Example**: "Our company is a B2B SaaS startup targeting small businesses"
- **Validation**: Optional textarea field

### 6. Industry/Domain
- **Purpose**: Specify the industry or domain for specialized terminology
- **Options**:
  - Technology
  - Healthcare
  - Finance
  - Education
  - Marketing
  - Retail
  - Manufacturing
  - Consulting
  - Media
  - Government
  - Non-Profit
  - Other

## How It Works

### Step 1: Fill in the Form
1. Navigate to the **Structured** tab in the navigation
2. Fill in the Task Description (required)
3. Select appropriate options for other fields
4. Add context and industry information if relevant

### Step 2: Generate Prompt
1. Click the "Generate Prompt" button
2. The system compiles all inputs into a structured prompt
3. The structured data is sent to the n8n webhook
4. The AI processes the request and returns an optimized prompt

### Step 3: Review and Refine
1. The generated prompt appears in the chat section on the right
2. You can copy the prompt or regenerate if needed
3. Save the conversation for future reference

## Data Structure Sent to n8n

The form sends the following JSON structure to the webhook:

```json
{
  "taskDescription": "Create a marketing email for a new product launch",
  "useCaseCategory": "Marketing",
  "desiredOutputFormat": "Paragraph",
  "targetAIModel": "GPT-4",
  "contextBackground": "Our company is a B2B SaaS startup",
  "industryDomain": "Technology",
  "conversationHistory": [
    // Previous messages for context (last 5)
  ]
}
```

## Generated Prompt Format

The system combines all inputs into a structured prompt:

```
Task: Create a marketing email for a new product launch

Use Case Category: Marketing
Context/Background: Our company is a B2B SaaS startup
Industry/Domain: Technology

Please provide the response in Paragraph format (optimized for GPT-4).
```

## User Interface

### Left Panel - Form Input
- Organized form fields with labels and placeholders
- Dropdown selects for categorical options
- Textareas for detailed descriptions
- Clear and Generate buttons
- Form validation

### Right Panel - Chat Interface
- Displays generated prompts and AI responses
- Shows timestamp for each message
- Copy button for each message
- Loading indicators during processing
- Scrollable message history

## Benefits of Structured Input

1. **Better Context**: AI receives comprehensive information about the task
2. **Consistent Format**: Standardized input structure ensures reliable outputs
3. **Industry-Specific**: Domain-specific terminology and context
4. **Format Control**: Specify exactly how you want the output formatted
5. **Model Optimization**: Prompts are optimized for specific AI models
6. **Conversation Context**: Maintains context across multiple interactions

## Use Cases

### Content Marketing
- Task: "Create a blog post about remote work benefits"
- Category: "Content Creation"
- Format: "Paragraph"
- Industry: "Technology"

### Customer Support
- Task: "Generate a response template for billing inquiries"
- Category: "Customer Support"
- Format: "Step-by-Step Instructions"
- Industry: "Finance"

### Technical Documentation
- Task: "Write API documentation for user authentication"
- Category: "Technical Documentation"
- Format: "Code"
- Industry: "Technology"

## Comparison with Chat Interface

| Feature | Chat Interface | Structured Interface |
|---------|----------------|---------------------|
| Input Method | Natural conversation | Form fields |
| Context Gathering | Implicit from conversation | Explicit structured fields |
| Consistency | Variable | High |
| Learning Curve | Low | Medium |
| Best For | Quick ideation | Precise, structured requests |

## Integration with n8n

The structured interface is specifically designed to work with n8n workflows that expect:
- Specific field names
- Structured data format
- Context information
- Industry/domain specialization

## Future Enhancements

1. **Template Presets**: Save and reuse common form configurations
2. **Field Validation**: Advanced validation rules for specific industries
3. **Bulk Processing**: Process multiple structured requests
4. **Integration Options**: Connect to other workflow systems
5. **Custom Fields**: Add organization-specific fields

## Troubleshooting

### Form Not Submitting
- Ensure Task Description is filled out
- Check network connection
- Verify webhook endpoint is accessible

### Poor AI Response
- Provide more detailed context
- Select appropriate industry/domain
- Try different output format
- Adjust target AI model

### Webhook Errors
- Check n8n workflow configuration
- Verify webhook accepts POST requests
- Ensure all required fields are present