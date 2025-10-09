import React from 'react';
import { Sparkles, Zap, Shield, Mail } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 -z-10" />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Content */}
          <div className="text-center md:text-left animate-fade-in">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-accent" />
              <span className="text-accent font-medium">Powered by Advanced AI</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight hero-title">
              AI Email Writer
            </h1>
            
            <h2 className="font-display text-2xl md:text-3xl text-secondary-foreground mb-6 hero-subtitle">
              Generate Professional Emails, Instantly
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Create compelling professional emails with our intelligent email writer. 
              Powered by advanced AI technology, designed for maximum impact and efficiency.
            </p>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4 text-accent" />
                <span>Lightning Fast</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-accent" />
                <span>Privacy First</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Visual */}
          <div className="order-1 md:order-2 relative">
            <div className="relative">
              {/* Gradient orb effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl transform scale-110 -z-10" />
              
              {/* Hero image or illustration */}
              <div className="relative bg-card rounded-lg shadow-xl p-8 border border-border">
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Mail className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse-slow" />
                    <p className="text-primary font-display text-xl font-semibold">
                      AI-Powered
                    </p>
                    <p className="text-muted-foreground">
                      Email Generation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}