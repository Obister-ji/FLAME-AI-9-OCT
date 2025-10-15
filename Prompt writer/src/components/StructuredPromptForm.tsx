import React, { useState, useRef } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Copy, 
  RefreshCw, 
  Save,
  Trash2,
  Download,
  Sparkles,
  Target,
  FileText,
  Cpu,
  Globe,
  Building
} from 'lucide-react';
import toast from 'react-hot-toast';

export interface StructuredPromptData {
  taskDescription: string;
  useCaseCategory: string;
  desiredOutputFormat: string;
  targetAIModel: string;
  contextBackground: string;
  industryDomain: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isOptimized?: boolean;
  structuredData?: StructuredPromptData;
}

interface StructuredPromptFormProps {
  onConversationSave?: (messages: ChatMessage[], title: string) => void;
}

const useCaseCategories = [
  'Content Creation',
  'Data Analysis',
  'Customer Support',
  'Code Generation',
  'Research',
  'Marketing',
  'Education',
  'Business Strategy',
  'Creative Writing',
  'Technical Documentation',
  'Other'
];

const outputFormats = [
  'Paragraph',
  'Bullet Points',
  'Numbered List',
  'Table',
  'JSON',
  'Code',
  'Step-by-Step Instructions',
  'Q&A Format',
  'Summary',
  'Detailed Report'
];

const aiModels = [
  'GPT-4',
  'GPT-3.5',
  'Claude',
  'Gemini',
  'LLaMA',
  'Other'
];

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Marketing',
  'Retail',
  'Manufacturing',
  'Consulting',
  'Media',
  'Government',
  'Non-Profit',
  'Other'
];

export function StructuredPromptForm({ onConversationSave }: StructuredPromptFormProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationTitle, setConversationTitle] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [formData, setFormData] = useState<StructuredPromptData>({
    taskDescription: '',
    useCaseCategory: '',
    desiredOutputFormat: '',
    targetAIModel: 'GPT-4',
    contextBackground: '',
    industryDomain: ''
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (field: keyof StructuredPromptData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generatePromptFromStructuredData = (data: StructuredPromptData): string => {
    let prompt = `Task: ${data.taskDescription}\n\n`;
    
    if (data.useCaseCategory) {
      prompt += `Use Case Category: ${data.useCaseCategory}\n`;
    }
    
    if (data.contextBackground) {
      prompt += `Context/Background: ${data.contextBackground}\n`;
    }
    
    if (data.industryDomain) {
      prompt += `Industry/Domain: ${data.industryDomain}\n`;
    }
    
    prompt += `\nPlease provide the response in ${data.desiredOutputFormat || 'paragraph'} format`;
    
    if (data.targetAIModel) {
      prompt += ` (optimized for ${data.targetAIModel})`;
    }
    
    prompt += '.';
    
    return prompt;
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.taskDescription.trim()) {
      toast.error('Please enter a task description');
      return;
    }

    const generatedPrompt = generatePromptFromStructuredData(formData);
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: generatedPrompt,
      timestamp: new Date(),
      structuredData: formData
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send structured data to n8n webhook
      const response = await fetch('https://n8n.srv970139.hstgr.cloud/webhook/0dcd9b71-bf7f-4519-86bd-20304f600c4c', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskDescription: formData.taskDescription,
          useCaseCategory: formData.useCaseCategory,
          desiredOutputFormat: formData.desiredOutputFormat,
          targetModel: formData.targetAIModel,
          contextBackground: formData.contextBackground,
          industryDomain: formData.industryDomain
        })
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Raw response from n8n:', responseData);
        
        // Handle array wrapper from n8n
        const data = Array.isArray(responseData) ? responseData[0] : responseData;
        console.log('Processed response data:', data);
        
        const content = data.output || data.message || data.prompt || 'I\'ve processed your structured prompt request.';
        console.log('Extracted content:', content);
        
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: content,
          timestamp: new Date(),
          isOptimized: true
        };
        setMessages(prev => [...prev, assistantMessage]);
        toast.success('Prompt optimized with AI!');
      } else {
        toast.error('Failed to connect to n8n webhook. Please check your configuration.');
        console.error('Webhook responded with status:', response.status);
      }
    } catch (error) {
      console.error('Error submitting structured prompt:', error);
      toast.error('Failed to connect to n8n webhook. Please check your configuration.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateFallbackResponse = (prompt: string): string => {
    return `Here's your optimized prompt based on the structured inputs:\n\n**Optimized Prompt:**\n${prompt}\n\n**💡 Suggestions for Improvement:**\n• Consider adding more specific constraints\n• Include examples of desired output\n• Specify the tone and style\n• Define the target audience more clearly\n• Add success criteria for evaluation`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const clearForm = () => {
    setFormData({
      taskDescription: '',
      useCaseCategory: '',
      desiredOutputFormat: '',
      targetAIModel: 'GPT-4',
      contextBackground: '',
      industryDomain: ''
    });
  };

  const saveConversation = () => {
    if (!conversationTitle.trim()) {
      toast.error('Please enter a title for the conversation');
      return;
    }
    onConversationSave?.(messages, conversationTitle);
    setShowSaveDialog(false);
    setConversationTitle('');
    toast.success('Conversation saved!');
  };

  const downloadConversation = () => {
    const conversationText = messages
      .map(m => `${m.role === 'user' ? '👤 User' : '🤖 Assistant'} - ${m.timestamp.toLocaleString()}\n${m.content}\n`)
      .join('\n---\n\n');
    
    const blob = new Blob([conversationText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `structured-prompt-conversation-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Conversation downloaded!');
  };

  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Structured Prompt Writer</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={downloadConversation}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              title="Download conversation"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowSaveDialog(true)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              title="Save conversation"
            >
              <Save className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Form Section */}
        <div className="w-1/2 p-4 border-r border-border overflow-y-auto bg-muted/30">
          <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Structured Input
          </h3>
          
          <div className="space-y-4">
            {/* Task Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Task Description *
              </label>
              <textarea
                value={formData.taskDescription}
                onChange={(e) => handleInputChange('taskDescription', e.target.value)}
                placeholder="Describe what you want the AI to do..."
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                rows={3}
              />
            </div>

            {/* Use Case Category */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Use Case Category
              </label>
              <select
                value={formData.useCaseCategory}
                onChange={(e) => handleInputChange('useCaseCategory', e.target.value)}
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select a category</option>
                {useCaseCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Desired Output Format */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Desired Output Format
              </label>
              <select
                value={formData.desiredOutputFormat}
                onChange={(e) => handleInputChange('desiredOutputFormat', e.target.value)}
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select a format</option>
                {outputFormats.map(format => (
                  <option key={format} value={format}>{format}</option>
                ))}
              </select>
            </div>

            {/* Target AI Model */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                Target AI Model
              </label>
              <select
                value={formData.targetAIModel}
                onChange={(e) => handleInputChange('targetAIModel', e.target.value)}
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {aiModels.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>

            {/* Context/Background */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Context/Background
              </label>
              <textarea
                value={formData.contextBackground}
                onChange={(e) => handleInputChange('contextBackground', e.target.value)}
                placeholder="Provide any relevant context or background information..."
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                rows={3}
              />
            </div>

            {/* Industry/Domain */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Building className="w-4 h-4" />
                Industry/Domain
              </label>
              <select
                value={formData.industryDomain}
                onChange={(e) => handleInputChange('industryDomain', e.target.value)}
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select an industry</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <button
                onClick={handleSubmit}
                disabled={isLoading || !formData.taskDescription.trim()}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Generate Prompt
                  </>
                )}
              </button>
              <button
                onClick={clearForm}
                className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className="w-1/2 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Fill in the structured fields and click Generate to start</p>
                <p className="text-sm mt-2">Your optimized prompt will appear here</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  <div className={`max-w-[80%] ${message.role === 'user' ? 'order-first' : ''}`}>
                    <div
                      className={`p-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      {message.isOptimized && (
                        <div className="mt-2 text-xs opacity-70">
                          {message.role === 'assistant' && '✨ AI Optimized'}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1 px-1">
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                      <button
                        onClick={() => copyToClipboard(message.content)}
                        className="p-1 rounded hover:bg-muted/50 transition-colors"
                        title="Copy"
                      >
                        <Copy className="w-3 h-3 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                  {message.role === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Save Conversation</h3>
            <input
              type="text"
              value={conversationTitle}
              onChange={(e) => setConversationTitle(e.target.value)}
              placeholder="Enter conversation title..."
              className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-4"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveConversation}
                disabled={!conversationTitle.trim()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}