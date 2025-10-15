import React, { useState } from 'react';
import { 
  MessageSquare, 
  Calendar, 
  Search, 
  Trash2, 
  Download,
  Eye,
  Bot
} from 'lucide-react';
import toast from 'react-hot-toast';
import { ChatMessage } from './PromptChat';

export interface SavedConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

interface ConversationHistoryProps {
  conversations: SavedConversation[];
  onLoadConversation: (conversation: SavedConversation) => void;
  onDeleteConversation: (id: string) => void;
}

export function ConversationHistory({ 
  conversations, 
  onLoadConversation, 
  onDeleteConversation 
}: ConversationHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedConversation, setExpandedConversation] = useState<string | null>(null);

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.messages.some(msg => msg.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDeleteConversation = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      onDeleteConversation(id);
      toast.success('Conversation deleted!');
    }
  };

  const handleDownloadConversation = (conversation: SavedConversation) => {
    const conversationText = `Title: ${conversation.title}\nCreated: ${conversation.createdAt.toLocaleString()}\nLast Updated: ${conversation.updatedAt.toLocaleString()}\n\n${conversation.messages.map(m => `${m.role === 'user' ? '👤 User' : '🤖 Assistant'} - ${m.timestamp.toLocaleString()}\n${m.content}\n`).join('\n---\n\n')}`;
    
    const blob = new Blob([conversationText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${conversation.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Conversation downloaded!');
  };

  const getMessagePreview = (messages: ChatMessage[]) => {
    const userMessages = messages.filter(m => m.role === 'user');
    if (userMessages.length === 0) return 'No messages';
    return userMessages[0].content.length > 100 
      ? userMessages[0].content.substring(0, 100) + '...' 
      : userMessages[0].content;
  };

  const formatDuration = (messages: ChatMessage[]) => {
    if (messages.length < 2) return '1 message';
    const first = messages[0].timestamp;
    const last = messages[messages.length - 1].timestamp;
    const diffMs = last.getTime() - first.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    return `${messages.length} messages • ${diffMins} min`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-card rounded-lg shadow-sm border border-border">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
              <MessageSquare className="w-6 h-6" />
              Conversation History
            </h2>
            <div className="text-sm text-muted-foreground">
              {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="divide-y divide-border">
          {filteredConversations.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>
                {searchTerm 
                  ? 'No conversations found matching your search' 
                  : 'No saved conversations yet'
                }
              </p>
              <p className="text-sm mt-2">
                {searchTerm 
                  ? 'Try a different search term' 
                  : 'Start a new conversation and save it to see it here'
                }
              </p>
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <div key={conversation.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">{conversation.title}</h3>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        {formatDuration(conversation.messages)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {getMessagePreview(conversation.messages)}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {conversation.createdAt.toLocaleDateString()}
                      </div>
                      {conversation.updatedAt.getTime() !== conversation.createdAt.getTime() && (
                        <span>Updated {conversation.updatedAt.toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => setExpandedConversation(
                        expandedConversation === conversation.id ? null : conversation.id
                      )}
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                      title="Preview conversation"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDownloadConversation(conversation)}
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                      title="Download conversation"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onLoadConversation(conversation)}
                      className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      title="Load conversation"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteConversation(conversation.id, conversation.title)}
                      className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                      title="Delete conversation"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Expanded Preview */}
                {expandedConversation === conversation.id && (
                  <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-border">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Bot className="w-4 h-4" />
                      Conversation Preview
                    </h4>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {conversation.messages.map((message, index) => (
                        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] p-2 rounded-lg text-sm ${
                            message.role === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-background border border-border'
                          }`}>
                            <p className="whitespace-pre-wrap">{message.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}