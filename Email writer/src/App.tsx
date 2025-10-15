import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { HowToUse } from './components/HowToUse';
import { EmailGenerator } from './components/EmailGenerator';
import { EmailHistory } from './components/EmailHistory';
import { Footer } from './components/Footer';
import { Toaster } from 'react-hot-toast';
import ClerkProvider from './providers/ClerkProvider';
import { fetchEmails, createEmail, deleteEmail, toggleEmailFavorite } from './services/supabaseEmailService';
import type { Email as DatabaseEmail, EmailTemplate } from './types/database';

// Local interface for backward compatibility with components
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

function App() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [currentView, setCurrentView] = useState<'generator' | 'history'>('generator');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Convert DatabaseEmail to local Email format
  const convertDatabaseEmailToLocal = (dbEmail: DatabaseEmail): Email => ({
    id: dbEmail.id,
    subject: dbEmail.subject,
    content: dbEmail.content,
    recipient: dbEmail.recipient,
    category: dbEmail.category,
    tags: dbEmail.tags,
    createdAt: new Date(dbEmail.created_at),
    isFavorite: dbEmail.is_favorite
  });

  // Monitor authentication state
  useEffect(() => {
    const checkAuthState = () => {
      const clerkUserId = window.localStorage.getItem('clerk_user_id');
      setUserId(clerkUserId);
      console.log('Authentication state check - User ID:', clerkUserId);
    };

    // Check immediately
    checkAuthState();

    // Set up an interval to check for auth changes
    const interval = setInterval(checkAuthState, 2000);

    // Listen for storage changes (from other tabs)
    const handleStorageChange = () => {
      checkAuthState();
    };
    
    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Load emails from Supabase when user ID changes
  useEffect(() => {
    if (!userId) {
      console.log('No user ID available, skipping email fetch');
      setLoading(false);
      return;
    }

    const loadEmails = async () => {
      console.log('Loading emails for user:', userId);
      setLoading(true);
      try {
        const fetchedEmails = await fetchEmails();
        console.log('Fetched emails:', fetchedEmails.length);
        setEmails(fetchedEmails.map(convertDatabaseEmailToLocal));
      } catch (error) {
        console.error('Failed to load emails:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEmails();
  }, [userId]);

  const addEmail = async (email: Omit<Email, 'id' | 'createdAt'>) => {
    console.log('Adding email:', email);
    
    if (!userId) {
      console.error('Cannot add email: User not authenticated');
      return;
    }

    try {
      const dbEmail = await createEmail({
        subject: email.subject,
        content: email.content,
        recipient: email.recipient,
        category: email.category,
        tags: email.tags,
        is_favorite: email.isFavorite
      });
      
      if (dbEmail) {
        console.log('Email created successfully:', dbEmail.id);
        setEmails(prev => [convertDatabaseEmailToLocal(dbEmail), ...prev]);
      } else {
        console.error('Failed to create email: No data returned');
      }
    } catch (error) {
      console.error('Failed to create email:', error);
    }
  };

  const handleDeleteEmail = async (id: string) => {
    try {
      const success = await deleteEmail(id);
      if (success) {
        setEmails(prev => prev.filter(email => email.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete email:', error);
    }
  };

  const handleToggleFavorite = async (id: string) => {
    try {
      const email = emails.find(e => e.id === id);
      if (email) {
        const updatedDbEmail = await toggleEmailFavorite(id, !email.isFavorite);
        if (updatedDbEmail) {
          setEmails(prev =>
            prev.map(e =>
              e.id === id ? convertDatabaseEmailToLocal(updatedDbEmail) : e
            )
          );
        }
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  return (
    <ClerkProvider>
      <div className="min-h-screen bg-background text-foreground font-sans">
        <Navigation
          currentView={currentView}
          onViewChange={setCurrentView}
          emailCount={emails.length}
        />
        
        <HeroSection />
        <HowToUse />
        
        <main className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="flex flex-col justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-muted-foreground">Loading your emails...</p>
              {!userId && (
                <p className="text-sm text-destructive mt-2">Please log in to view your email history</p>
              )}
            </div>
          ) : !userId ? (
            <div className="flex flex-col justify-center items-center py-12">
              <p className="text-destructive mb-4">Please log in to save and view your email history</p>
              <p className="text-sm text-muted-foreground">Authentication is required for this feature</p>
            </div>
          ) : currentView === 'generator' ? (
            <EmailGenerator
              onEmailGenerated={addEmail}
            />
          ) : (
            <EmailHistory
              emails={emails}
              onDeleteEmail={handleDeleteEmail}
              onToggleFavorite={handleToggleFavorite}
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
