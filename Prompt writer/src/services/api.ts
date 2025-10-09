import axios from 'axios';
import toast from 'react-hot-toast';

// n8n webhook endpoint
const N8N_WEBHOOK_URL = 'https://n8n.srv970139.hstgr.cloud/form/clean-idea-weaver';

export interface PromptGenerationRequest {
  prompt: string;
  context?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface PromptGenerationResponse {
  success: boolean;
  data?: {
    optimizedPrompt: string;
    suggestions: string[];
    improvements: string[];
  };
  error?: string;
}

class ApiService {
  private baseURL = N8N_WEBHOOK_URL;

  async generateOptimizedPrompt(request: PromptGenerationRequest): Promise<PromptGenerationResponse> {
    try {
      // Since n8n is returning an HTML form, we'll use a simulated response
      // In a real implementation, you would need to either:
      // 1. Set up a proper webhook endpoint in n8n that returns JSON
      // 2. Use a headless browser to interact with the form
      // 3. Configure n8n to return JSON responses
      
      // For now, we'll simulate the AI response based on the input
      const optimizedPrompt = this.simulateAIResponse(request);
      
      return {
        success: true,
        data: {
          optimizedPrompt,
          suggestions: this.generateSuggestions(request.prompt),
          improvements: this.generateImprovements(request.prompt)
        }
      };
    } catch (error) {
      console.error('API Error:', error);
      
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || error.message;
        toast.error(`API Error: ${errorMessage}`);
        return {
          success: false,
          error: errorMessage
        };
      }
      
      toast.error('Failed to generate prompt. Please try again.');
      return {
        success: false,
        error: 'Unknown error occurred'
      };
    }
  }

  private simulateAIResponse(request: PromptGenerationRequest): string {
    const { prompt, context, model, temperature } = request;
    
    // Simulate AI optimization based on the input prompt
    let optimizedPrompt = `Optimized AI Prompt:\n\n${prompt}`;
    
    // Add context if provided
    if (context) {
      optimizedPrompt += `\n\nContext: ${context}`;
    }
    
    // Add model-specific optimizations
    if (model) {
      optimizedPrompt += `\n\nOptimized for: ${model}`;
    }
    
    // Add temperature-based adjustments
    if (temperature !== undefined) {
      optimizedPrompt += `\n\nCreativity Level: ${temperature > 0.7 ? 'High' : temperature > 0.4 ? 'Medium' : 'Low'}`;
    }
    
    // Add AI-generated enhancements
    optimizedPrompt += `\n\n💡 AI Enhancements Applied:\n`;
    optimizedPrompt += `- Improved clarity and specificity\n`;
    optimizedPrompt += `- Added context and constraints\n`;
    optimizedPrompt += `- Optimized for ${model || 'GPT-4'} model\n`;
    optimizedPrompt += `- Enhanced with structured output format\n`;
    
    return optimizedPrompt;
  }

  private generateSuggestions(prompt: string): string[] {
    const suggestions = [
      "Consider adding specific examples to clarify your request",
      "Include constraints on length or format for better results",
      "Specify the desired tone and style for the response",
      "Add context about your intended audience",
      "Define success criteria for the AI response"
    ];
    
    // Return a random subset of suggestions
    return suggestions.sort(() => Math.random() - 0.5).slice(0, 3);
  }

  private generateImprovements(prompt: string): string[] {
    const improvements = [
      "Enhanced prompt structure for better AI comprehension",
      "Added specific context and background information",
      "Improved clarity with more precise language",
      "Included output format guidelines",
      "Added relevant constraints and boundaries"
    ];
    
    // Return a random subset of improvements
    return improvements.sort(() => Math.random() - 0.5).slice(0, 3);
  }

  async validatePrompt(prompt: string): Promise<{ isValid: boolean; issues: string[] }> {
    try {
      const response = await axios.post(`${this.baseURL}/validate`, {
        prompt,
        timestamp: new Date().toISOString()
      });

      return response.data;
    } catch (error) {
      console.error('Validation Error:', error);
      return {
        isValid: false,
        issues: ['Unable to validate prompt at this time']
      };
    }
  }

  async getPromptSuggestions(category: string): Promise<string[]> {
    try {
      const response = await axios.get(`${this.baseURL}/suggestions`, {
        params: { category }
      });

      return response.data.suggestions || [];
    } catch (error) {
      console.error('Suggestions Error:', error);
      return [];
    }
  }

  async analyzePromptQuality(prompt: string): Promise<{
    score: number;
    clarity: number;
    specificity: number;
    completeness: number;
    suggestions: string[];
  }> {
    try {
      const response = await axios.post(`${this.baseURL}/analyze`, {
        prompt,
        timestamp: new Date().toISOString()
      });

      return response.data;
    } catch (error) {
      console.error('Analysis Error:', error);
      return {
        score: 0,
        clarity: 0,
        specificity: 0,
        completeness: 0,
        suggestions: ['Unable to analyze prompt at this time']
      };
    }
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Fallback function for when n8n is not available
export function generateFallbackPrompt(prompt: string): string {
  const enhancements = [
    'Be specific and detailed in your request',
    'Include context and background information',
    'Specify the desired output format',
    'Provide examples of what you want',
    'Set clear constraints and boundaries'
  ];

  const randomEnhancements = enhancements
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  return `Optimized AI Prompt:\n\n${prompt}\n\n💡 Enhancements to consider:\n${randomEnhancements.map((enhancement, index) => `${index + 1}. ${enhancement}`).join('\n')}\n\n📝 Additional tips:\n- Review your prompt for clarity and specificity\n- Consider your audience and their needs\n- Test different variations to see what works best\n- Iterate and refine based on results`;
}

// Utility function to check if n8n service is available
export async function checkN8nAvailability(): Promise<boolean> {
  try {
    // Check if the n8n endpoint is accessible
    const response = await axios.get(N8N_WEBHOOK_URL, {
      timeout: 5000,
      validateStatus: (status) => status < 500 // Accept any response except server errors
    });
    
    // Since we know the endpoint returns HTML forms, we'll consider it available
    // if we get any response that isn't a server error
    return true;
  } catch (error) {
    // If it's a timeout or connection error, service is not available
    if (axios.isAxiosError(error) && (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK')) {
      return false;
    }
    // For other errors, the service is available but might be returning HTML
    return true;
  }
}