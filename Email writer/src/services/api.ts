import axios from 'axios';
import toast from 'react-hot-toast';

// n8n webhook endpoint for email writer
const N8N_WEBHOOK_URL = 'https://n8n.srv970139.hstgr.cloud/webhook/email-writer';

export interface EmailGenerationRequest {
  recipientName: string;
  emailPurpose: string;
  tone: string;
  keyPoints: string;
  additionalContext?: string;
  emailLength: string;
}

export interface EmailGenerationResponse {
  success: boolean;
  data?: {
    email: string;
  };
  error?: string;
}

class ApiService {
  private baseURL = N8N_WEBHOOK_URL;

  async generateOptimizedEmail(request: EmailGenerationRequest): Promise<EmailGenerationResponse> {
    try {
      console.log('Sending request to n8n webhook:', request);
      
      // Send request to n8n webhook
      const response = await axios.post(N8N_WEBHOOK_URL, request, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000, // 30 second timeout
      });
      
      console.log('Response from n8n webhook:', response);
      console.log('Response data:', response.data);
      
      // Handle the response structure from n8n webhook
      // The webhook returns an array with objects containing an "email" field
      let emailData;
      if (Array.isArray(response.data) && response.data.length > 0) {
        emailData = response.data[0];
      } else {
        emailData = response.data;
      }
      
      return {
        success: true,
        data: emailData
      };
    } catch (error) {
      console.error('API Error:', error);
      
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          message: error.message,
          code: error.code,
          response: error.response?.data,
          status: error.response?.status
        });
        
        const errorMessage = error.response?.data?.error || error.message;
        toast.error(`API Error: ${errorMessage}`);
        return {
          success: false,
          error: errorMessage
        };
      }
      
      toast.error('Failed to generate email. Please try again.');
      return {
        success: false,
        error: 'Unknown error occurred'
      };
    }
  }

}

// Export singleton instance
export const apiService = new ApiService();


// Utility function to check if n8n webhook service is available
export async function checkN8nAvailability(): Promise<boolean> {
  try {
    // Check if the n8n webhook endpoint is accessible
    const response = await axios.get(N8N_WEBHOOK_URL, {
      timeout: 5000,
      validateStatus: (status) => status < 500 // Accept any response except server errors
    });
    
    // If we get any response that isn't a server error, consider it available
    return true;
  } catch (error) {
    // If it's a timeout or connection error, service is not available
    if (axios.isAxiosError(error) && (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK')) {
      return false;
    }
    // For other errors, the service is available
    return true;
  }
}