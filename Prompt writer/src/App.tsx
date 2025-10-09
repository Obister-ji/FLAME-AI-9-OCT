import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { PromptGenerator } from './components/PromptGenerator';
import { PromptHistory } from './components/PromptHistory';
import { Footer } from './components/Footer';
import { Toaster } from 'react-hot-toast';

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
  const [currentView, setCurrentView] = useState<'generator' | 'history'>('generator');

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

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navigation 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        promptCount={prompts.length}
      />
      
      <HeroSection />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'generator' ? (
          <PromptGenerator 
            onPromptGenerated={addPrompt}
            existingPrompts={prompts}
          />
        ) : (
          <PromptHistory 
            prompts={prompts}
            onDeletePrompt={deletePrompt}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;