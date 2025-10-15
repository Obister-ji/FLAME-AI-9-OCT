import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { PromptGenerator } from './components/PromptGenerator';
import { PromptHistory } from './components/PromptHistory';
import { PromptChat } from './components/PromptChat';
import { ConversationHistory, SavedConversation } from './components/ConversationHistory';
import { StructuredPromptForm } from './components/StructuredPromptForm';
import { Footer } from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { ChatMessage } from './components/PromptChat';
import ClerkProvider from './providers/ClerkProvider';

export interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: Date;
  isFavorite: boolean;
}

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  template: string;
  variables: string[];
}

function App() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [conversations, setConversations] = useState<SavedConversation[]>([]);
  const [currentView, setCurrentView] = useState<'generator' | 'history' | 'chat' | 'conversations' | 'structured'>('structured');
  const [currentConversation, setCurrentConversation] = useState<ChatMessage[]>([]);

  // Load conversations from localStorage on mount
  React.useEffect(() => {
    const savedConversations = localStorage.getItem('prompt-conversations');
    if (savedConversations) {
      try {
        const parsed = JSON.parse(savedConversations);
        setConversations(parsed.map((conv: any) => ({
          ...conv,
          createdAt: new Date(conv.createdAt),
          updatedAt: new Date(conv.updatedAt),
          messages: conv.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        })));
      } catch (error) {
        console.error('Error loading conversations:', error);
      }
    }
  }, []);

  // Save conversations to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('prompt-conversations', JSON.stringify(conversations));
  }, [conversations]);

  const addPrompt = (prompt: Omit<Prompt, 'id' | 'createdAt'>) => {
    const newPrompt: Prompt = {
      ...prompt,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setPrompts(prev => [newPrompt, ...prev]);
  };

  const deletePrompt = (id: string) => {
    setPrompts(prev => prev.filter(prompt => prompt.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setPrompts(prev =>
      prev.map(prompt =>
        prompt.id === id
          ? { ...prompt, isFavorite: !prompt.isFavorite }
          : prompt
      )
    );
  };

  const saveConversation = (messages: ChatMessage[], title: string) => {
    const newConversation: SavedConversation = {
      id: Date.now().toString(),
      title,
      messages,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setConversations(prev => [newConversation, ...prev]);
  };

  const loadConversation = (conversation: SavedConversation) => {
    setCurrentConversation(conversation.messages);
    setCurrentView('chat');
  };

  const deleteConversation = (id: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== id));
  };

  return (
    <ClerkProvider>
      <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
        <Navigation
          currentView={currentView}
          onViewChange={setCurrentView}
          promptCount={prompts.length}
          conversationCount={conversations.length}
        />
        
        {currentView === 'chat' && <HeroSection />}
        
        <main className={`container mx-auto px-4 py-8 flex-1 ${currentView === 'chat' ? 'h-[calc(100vh-200px)]' : ''}`}>
          {currentView === 'generator' ? (
            <PromptGenerator
              onPromptGenerated={addPrompt}
              existingPrompts={prompts}
            />
          ) : currentView === 'history' ? (
            <PromptHistory
              prompts={prompts}
              onDeletePrompt={deletePrompt}
              onToggleFavorite={toggleFavorite}
            />
          ) : currentView === 'chat' ? (
            <div className="h-full">
              <PromptChat
                onConversationSave={saveConversation}
              />
            </div>
          ) : currentView === 'structured' ? (
            <div className="h-full">
              <StructuredPromptForm
                onConversationSave={saveConversation}
              />
            </div>
          ) : (
            <ConversationHistory
              conversations={conversations}
              onLoadConversation={loadConversation}
              onDeleteConversation={deleteConversation}
            />
          )}
        </main>
        
        <Footer />
        <Toaster />
      </div>
    </ClerkProvider>
  );
}

export default App;