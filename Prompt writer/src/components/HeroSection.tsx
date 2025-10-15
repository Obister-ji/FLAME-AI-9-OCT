import React from 'react';
import { Sparkles, Zap, Shield, MessageSquare, Bot } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[40vh] flex items-center justify-center pt-24 pb-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 -z-10" />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageSquare className="w-6 h-6 text-accent" />
            <span className="text-accent font-medium">Chat-Based AI Assistant</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
            AI Prompt Writer Chat
          </h1>
          
          <h2 className="font-display text-2xl md:text-3xl text-secondary-foreground mb-6">
            Refine Your Prompts Through Conversation
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            Have an interactive conversation with AI to perfect your prompts.
            Get iterative feedback, suggestions, and improvements in real-time.
          </p>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <MessageSquare className="w-4 h-4 text-accent" />
              <span>Interactive Chat</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Bot className="w-4 h-4 text-accent" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>Iterative Refinement</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}