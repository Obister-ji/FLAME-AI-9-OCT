# AI Prompt Writer Chat - Flame AI

A professional AI Prompt Writer web application with chat-based and structured input interfaces for iterative prompt refinement, powered by n8n workflows.

## Features

- 🎯 **Structured Input Interface** - Provide detailed, structured inputs for precise AI responses
- 💬 **Interactive Chat Interface** - Have conversations with AI to refine your prompts
- 🔄 **Iterative Refinement** - Improve prompts through multiple rounds of feedback
- 📚 **Conversation History** - Save and manage multiple prompt conversations
- 🔍 **Search Conversations** - Find specific conversations quickly
- 📝 **Template System** - Pre-built templates for various use cases (Generator view)
- 📋 **Prompt History** - Traditional prompt management (History view)
- 📱 **Responsive Design** - Works perfectly on all devices
- 🔄 **n8n Integration** - Backend processing through n8n workflows
- 💾 **Export Options** - Download conversations and prompts in various formats

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: n8n workflows (AI processing)
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **State Management**: Zustand
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- n8n instance (for AI processing)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "Prompt writer"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## n8n Backend Setup

### Prerequisites

- n8n instance (cloud or self-hosted)
- OpenAI API key (or other AI provider)

### Setup Instructions

1. **Current n8n Integration Status**:
   - The provided n8n endpoint (`https://n8n.srv970139.hstgr.cloud/webhook/0dcd9b71-bf7f-4519-86bd-20304f600c4c`) is configured as a webhook trigger
   - This endpoint is connected to the prompt writer workflow
   - The application uses this endpoint to process prompt optimization requests through n8n

2. **For Full n8n Integration**:
   - Create a new n8n workflow with a Webhook trigger that returns JSON
   - Add an OpenAI node (or your preferred AI provider) for prompt optimization
   - Configure the workflow to return structured JSON responses
   - Update the endpoint URL in `src/services/api.ts`

3. **Current Implementation**:
   - The app is now fully connected to the n8n webhook endpoint
   - It sends prompt optimization requests to the n8n workflow
   - The application processes the responses from the n8n workflow
   - This provides a complete user experience with real AI-powered prompt optimization

4. **Testing the Integration**:
   - The application is fully functional with the connected n8n backend
   - You can test all features: prompt generation, templates, history, etc.
   - The webhook endpoint is configured to process prompt optimization requests

### Example n8n Workflow

```json
{
  "name": "AI Prompt Generator",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "prompt-generator",
        "options": {}
      },
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "position": [240, 300]
    },
    {
      "parameters": {
        "resource": "chat",
        "operation": "create",
        "model": "gpt-4",
        "messages": {
          "values": [
            {
              "role": "system",
              "content": "You are an AI prompt optimization expert. Your task is to improve the given prompt to be more effective, specific, and clear."
            },
            {
              "role": "user",
              "content": "={{ $json.prompt }}"
            }
          ]
        }
      },
      "name": "OpenAI",
      "type": "n8n-nodes-base.openAi",
      "position": [460, 300]
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={{ $json }}"
      },
      "name": "Webhook Response",
      "type": "n8n-nodes-base.webhookResponse",
      "position": [680, 300]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [
        [
          {
            "node": "OpenAI",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "OpenAI": {
      "main": [
        [
          {
            "node": "Webhook Response",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

## Project Structure

```
Prompt writer/
├── src/
│   ├── components/
│   │   ├── Navigation.tsx          # Main navigation with chat support
│   │   ├── HeroSection.tsx         # Hero section (chat-focused)
│   │   ├── PromptChat.tsx          # Chat-based prompt interface
│   │   ├── ConversationHistory.tsx # Conversation management
│   │   ├── PromptGenerator.tsx     # Template-based prompt generator
│   │   ├── PromptHistory.tsx       # Traditional prompt history
│   │   └── Footer.tsx              # Footer component
│   ├── services/
│   │   └── api.ts                  # n8n API integration
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Global styles
├── public/                         # Static assets
├── package.json                    # Dependencies
├── tailwind.config.js              # Tailwind configuration
├── vite.config.ts                  # Vite configuration
└── README.md                       # This file
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Customization

### Colors and Theme

The application uses the Flame AI design system. You can customize colors in `tailwind.config.js` and `src/index.css`.

### Prompt Templates

Add new templates in `src/components/PromptGenerator.tsx` in the `promptTemplates` array.

### API Configuration

Update the n8n webhook URL in `src/services/api.ts`.

## Deployment

### Frontend

1. Build the application:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting provider (Vercel, Netlify, etc.)

### Backend

1. Deploy your n8n workflow
2. Update the webhook URL in the deployed frontend
3. Ensure your AI provider API keys are configured in n8n

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Contact the Flame AI team

---

Built with ❤️ by the Flame AI team