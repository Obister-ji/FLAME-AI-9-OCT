import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Download, 
  User, 
  Mail,
  FileText,
  MessageSquare,
  Clock,
  Plus,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';
import type { Email } from '../App';
import { apiService } from '../services/api';

interface EmailGeneratorProps {
  onEmailGenerated: (email: Omit<Email, 'id' | 'createdAt'>) => void;
}

const emailPurposes = [
  'introduction',
  'follow-up',
  'proposal',
  'inquiry',
  'thank you',
  'apology',
  'request',
  'announcement',
  'invitation',
  'other'
];

const emailTones = [
  'professional',
  'friendly',
  'formal',
  'casual',
  'enthusiastic',
  'empathetic',
  'urgent',
  'diplomatic'
];

const emailLengths = [
  'short',
  'medium',
  'long'
];

export function EmailGenerator({ onEmailGenerated }: EmailGeneratorProps) {
  const [recipientName, setRecipientName] = useState('');
  const [emailPurpose, setEmailPurpose] = useState('');
  const [tone, setTone] = useState('');
  const [keyPoints, setKeyPoints] = useState('');
  const [additionalContext, setAdditionalContext] = useState('');
  const [emailLength, setEmailLength] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [subject, setSubject] = useState('');
  const [recipient, setRecipient] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');

  const validateForm = (): boolean => {
    if (!recipientName.trim()) {
      toast.error('Recipient Name is required');
      return false;
    }
    if (!emailPurpose.trim()) {
      toast.error('Email Purpose is required');
      return false;
    }
    if (!tone.trim()) {
      toast.error('Tone is required');
      return false;
    }
    if (!keyPoints.trim()) {
      toast.error('Key Points to Cover is required');
      return false;
    }
    if (!emailLength.trim()) {
      toast.error('Email Length is required');
      return false;
    }
    return true;
  };

  const generateEmail = async () => {
    if (!validateForm()) {
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await apiService.generateOptimizedEmail({
        recipientName,
        emailPurpose,
        tone,
        keyPoints,
        additionalContext,
        emailLength
      });

      if (response.success && response.data) {
        setGeneratedEmail(response.data.email);
        
        // Try to extract subject from the generated email
        const subjectMatch = response.data.email.match(/Subject: (.+?)(?:\n\n|$)/);
        if (subjectMatch) {
          setSubject(subjectMatch[1]);
        } else {
          // Generate a default subject based on purpose
          setSubject(`${emailPurpose.charAt(0).toUpperCase() + emailPurpose.slice(1)} Email`);
        }
        
        toast.success('Email generated successfully!');
      } else {
        throw new Error(response.error || 'Failed to generate email');
      }
    } catch (error) {
      console.error('Email generation error:', error);
      toast.error('Failed to generate email. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const downloadEmail = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedEmail], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `email-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Email downloaded!');
  };

  const saveEmail = () => {
    if (!generatedEmail.trim() || !subject.trim()) {
      toast.error('Please generate an email and add a subject');
      return;
    }

    // Check if user is authenticated before saving
    const userId = window.localStorage.getItem('clerk_user_id');
    if (!userId) {
      toast.error('Please log in to save emails to your history');
      return;
    }

    console.log('Saving email with data:', {
      subject,
      content: generatedEmail.substring(0, 100) + '...',
      recipient,
      category: emailPurpose,
      tags,
      isFavorite: false,
      userId
    });

    onEmailGenerated({
      subject,
      content: generatedEmail,
      recipient,
      category: emailPurpose,
      tags,
      isFavorite: false
    });

    // Reset form
    setSubject('');
    setRecipient('');
    setTags([]);
    setGeneratedEmail('');
    setRecipientName('');
    setEmailPurpose('');
    setTone('');
    setKeyPoints('');
    setAdditionalContext('');
    setEmailLength('');
    
    toast.success('Email saved to history!');
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags(prev => [...prev, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Email Generation Form */}
      <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
          <Mail className="w-6 h-6" />
          Email Generator
        </h2>
        
        <div className="space-y-6">
          {/* Recipient Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Recipient Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Enter recipient's name..."
                className="w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Email Purpose */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email Purpose *
            </label>
            <select
              value={emailPurpose}
              onChange={(e) => setEmailPurpose(e.target.value)}
              className="w-full px-3 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select email purpose...</option>
              {emailPurposes.map(purpose => (
                <option key={purpose} value={purpose}>
                  {purpose.charAt(0).toUpperCase() + purpose.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Tone */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tone *
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-3 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select tone...</option>
              {emailTones.map(toneOption => (
                <option key={toneOption} value={toneOption}>
                  {toneOption.charAt(0).toUpperCase() + toneOption.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Key Points to Cover */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Key Points to Cover *
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
              <textarea
                value={keyPoints}
                onChange={(e) => setKeyPoints(e.target.value)}
                placeholder="Enter the main points to include in the email..."
                className="w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={4}
              />
            </div>
          </div>

          {/* Additional Context */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Additional Context (Optional)
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
              <textarea
                value={additionalContext}
                onChange={(e) => setAdditionalContext(e.target.value)}
                placeholder="Enter any supplementary information or special instructions..."
                className="w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={3}
              />
            </div>
          </div>

          {/* Email Length */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email Length *
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <select
                value={emailLength}
                onChange={(e) => setEmailLength(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
              >
                <option value="">Select email length...</option>
                {emailLengths.map(length => (
                  <option key={length} value={length}>
                    {length.charAt(0).toUpperCase() + length.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-center">
        <button
          onClick={generateEmail}
          disabled={isGenerating}
          className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <div className="spinner" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate Email
            </>
          )}
        </button>
      </div>

      {/* Generated Email */}
      {generatedEmail && (
        <div className="bg-card rounded-lg p-6 shadow-sm border border-border animate-slide-up">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-primary">Generated Email</h3>
            <div className="flex gap-2">
              <button
                onClick={() => copyToClipboard(generatedEmail)}
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                title="Copy to clipboard"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={downloadEmail}
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                title="Download email"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="email-text relative group">
            <pre className="whitespace-pre-wrap text-sm">{generatedEmail}</pre>
            <button
              onClick={() => copyToClipboard(generatedEmail)}
              className="copy-btn"
              title="Copy to clipboard"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Save Email Section */}
      {generatedEmail && (
        <div className="bg-card rounded-lg p-6 shadow-sm border border-border animate-slide-up">
          <h3 className="text-xl font-semibold text-primary mb-4">Save Email</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter email subject..."
                  className="w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Recipient Email
                </label>
                <input
                  type="email"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="recipient@example.com"
                  className="w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  placeholder="Add a tag..."
                  className="flex-1 p-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  onClick={addTag}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-accent-foreground/80"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={saveEmail}
              disabled={!subject.trim()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save to History
            </button>
          </div>
        </div>
      )}
    </div>
  );
}