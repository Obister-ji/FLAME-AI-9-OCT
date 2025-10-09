# AI Prompt Writer - Flame AI

A professional AI Prompt Writer web application with a clean frontend inspired by Remove.bg design system and backend processing handled through n8n workflows.

## Features

- 🎨 **Clean, Modern UI** - Inspired by Remove.bg with Flame AI branding
- 🚀 **AI-Powered Prompt Generation** - Generate optimized prompts using advanced AI
- 📝 **Template System** - Pre-built templates for various use cases
- 📚 **Prompt History** - Save, organize, and manage your prompts
- 🔍 **Search & Filter** - Find prompts quickly with advanced search
- ⭐ **Favorites** - Mark your best prompts for easy access
- 📱 **Responsive Design** - Works perfectly on all devices
- 🔄 **n8n Integration** - Backend processing through n8n workflows
- 💾 **Export Options** - Download prompts in various formats

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
   - The provided n8n endpoint (`https://n8n.srv970139.hstgr.cloud/form/clean-idea-weaver`) is configured as a form trigger
   - This endpoint returns an HTML form interface rather than a JSON API
   - The application currently uses a simulated AI response that mimics what the n8n workflow would return

2. **For Full n8n Integration**:
   - Create a new n8n workflow with a Webhook trigger that returns JSON
   - Add an OpenAI node (or your preferred AI provider) for prompt optimization
   - Configure the workflow to return structured JSON responses
   - Update the endpoint URL in `src/services/api.ts`

3. **Current Implementation**:
   - The app simulates AI prompt optimization based on the input
   - It generates realistic suggestions and improvements
   - The UI and functionality work exactly as they would with a real n8n backend
   - This provides a complete user experience while the n8n backend is being configured

4. **Testing the Integration**:
   - The application is fully functional with the simulated responses
   - You can test all features: prompt generation, templates, history, etc.
   - When the n8n workflow is properly configured, simply update the API service to use the real endpoint

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
│   │   ├── Navigation.tsx          # Main navigation
│   │   ├── HeroSection.tsx         # Hero section
│   │   ├── PromptGenerator.tsx     # Main prompt generator
│   │   ├── PromptHistory.tsx       # Prompt history management
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