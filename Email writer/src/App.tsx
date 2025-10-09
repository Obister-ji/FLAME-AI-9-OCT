import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { HowToUse } from './components/HowToUse';
import { EmailGenerator } from './components/EmailGenerator';
import { EmailHistory } from './components/EmailHistory';
import { Footer } from './components/Footer';
import { Toaster } from 'react-hot-toast';

export interface Email {
  id: string;
  subject: string;
  content: string;
  recipient: string;
  category: string;
  tags: string[];
  createdAt: Date;
  isFavorite: boolean;
}

export interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  template: string;
  variables: string[];
}

function App() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [currentView, setCurrentView] = useState<'generator' | 'history'>('generator');

  const addEmail = (email: Omit<Email, 'id' | 'createdAt'>) => {
    const newEmail: Email = {
      ...email,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setEmails(prev => [newEmail, ...prev]);
  };

  const deleteEmail = (id: string) => {
    setEmails(prev => prev.filter(email => email.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setEmails(prev => 
      prev.map(email => 
        email.id === id 
          ? { ...email, isFavorite: !email.isFavorite }
          : email
      )
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navigation 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        emailCount={emails.length}
      />
      
      <HeroSection />
      <HowToUse />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'generator' ? (
          <EmailGenerator
            onEmailGenerated={addEmail}
          />
        ) : (
          <EmailHistory 
            emails={emails}
            onDeleteEmail={deleteEmail}
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
