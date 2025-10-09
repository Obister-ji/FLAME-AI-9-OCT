import React, { useEffect } from 'react';
import { Mail, Sparkles, Users, Zap, Shield, ArrowRight, CheckCircle } from 'lucide-react';

export function AboutSection() {
  useEffect(() => {
    // Scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    // Observe all elements with reveal class
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate professional emails in seconds, not hours"
    },
    {
      icon: Users,
      title: "User-Friendly",
      description: "Intuitive interface designed for everyone, no technical skills required"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is secure and never shared with third parties"
    },
    {
      icon: Sparkles,
      title: "AI-Powered",
      description: "Advanced AI technology that understands your intent and context"
    }
  ];

  const benefits = [
    "Save hours of writing time every week",
    "Improve email communication quality",
    "Maintain consistent professional tone",
    "Increase response rates with better emails",
    "Reduce stress and email anxiety"
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background via-primary/10 to-accent/10 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute top-32 left-10 w-32 h-32 rounded-full bg-accent/10 float"></div>
      <div className="absolute bottom-20 right-16 w-24 h-24 rounded-full bg-secondary/20 float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-32 w-16 h-16 rounded-full bg-primary/10 float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-20 right-1/4 w-12 h-12 rounded-full bg-accent/20 float" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-32 left-1/4 w-20 h-20 rounded-full bg-primary/5 float" style={{ animationDelay: '4s' }}></div>
      <div className="absolute top-1/4 left-1/3 w-14 h-14 rounded-full bg-secondary/15 float" style={{ animationDelay: '2.5s' }}></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-6 backdrop-blur-sm">
            <Mail className="w-4 h-4 mr-2" />
            About Email Writer
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
            Revolutionizing Email <span className="text-accent">Communication</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your email experience with AI-powered writing that saves time, enhances professionalism, and delivers results.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-20 reveal">
          <div className="bg-gradient-to-br from-primary via-accent/20 to-secondary/20 rounded-2xl p-12 shadow-xl border border-secondary/20 relative overflow-hidden">
            {/* Floating Elements Inside */}
            <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-accent/10 float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-primary/10 float" style={{ animationDelay: '2s' }}></div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/20 text-accent font-medium text-sm mb-6 backdrop-blur-sm">
                🎯 Our Purpose
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-primary mb-6">
                Our Mission: Making <span className="text-accent">AI Accessible</span> to Everyone
              </h3>
              <p className="text-xl leading-relaxed text-foreground/80 max-w-4xl mx-auto">
                We believe that powerful AI technology should be accessible to everyone, not just tech giants or enterprises. 
                Our Email Writer is designed to democratize professional communication, giving individuals and businesses the 
                ability to craft compelling emails that get results. We're breaking down barriers, making AI tools so intuitive 
                that anyone can enhance their communication skills instantly.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <div className="text-center mb-12 reveal">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 backdrop-blur-sm">
              ✨ Key Features
            </div>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-primary mb-6">
              Why Choose Our <span className="text-accent">Email Writer</span>
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card/50 backdrop-blur-sm rounded-xl p-6 text-center border border-secondary/20 hover:scale-105 transition-all duration-300 reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-bold text-xl text-primary mb-2">{feature.title}</h4>
                <p className="text-foreground/70 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="reveal">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-secondary/20">
              <h3 className="font-display text-2xl font-bold text-primary mb-6">
                Transform Your <span className="text-accent">Email Experience</span>
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Join thousands of professionals who have revolutionized their email communication with our AI-powered tool.
              </p>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-foreground/80">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="reveal">
            <div className="bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full -ml-12 -mb-12"></div>
              
              <div className="relative z-10">
                <h4 className="font-display text-2xl font-bold text-primary mb-4">
                  Built for <span className="text-accent">Everyone</span>
                </h4>
                <p className="text-foreground/80 mb-6">
                  Whether you're a business professional, freelancer, student, or anyone who writes emails, 
                  our tool adapts to your needs and helps you communicate more effectively.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">10K+</div>
                    <div className="text-sm text-muted-foreground">Emails Generated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent mb-1">95%</div>
                    <div className="text-sm text-muted-foreground">User Satisfaction</div>
                  </div>
                </div>
                
                <div className="bg-background/50 rounded-lg p-4">
                  <p className="text-sm text-foreground/80 italic">
                    "This tool has saved me hours every week and improved my email response rates significantly!"
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">- Sarah, Marketing Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center reveal">
          <div className="bg-gradient-to-br from-primary via-accent/10 to-secondary/10 rounded-2xl p-12 shadow-xl border border-secondary/20 relative overflow-hidden">
            <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-accent/10 float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-10 left-10 w-20 h-20 rounded-full bg-primary/10 float" style={{ animationDelay: '2s' }}></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-6 backdrop-blur-sm">
                🚀 Get Started
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-primary mb-6">
                Ready to <span className="text-accent">Transform</span> Your Workflow?
              </h3>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Start generating professional emails in seconds. Experience the power of AI-driven communication today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  Try Email Writer Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                <button
                  onClick={() => {
                    const element = document.querySelector('#how-to-use');
                    if (element) {
                      const top = element.getBoundingClientRect().top + window.pageYOffset - 100;
                      window.scrollTo({ top, behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center px-8 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium"
                >
                  Learn How It Works
                  <Mail className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}