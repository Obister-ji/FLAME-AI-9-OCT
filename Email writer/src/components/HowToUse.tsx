import React, { useState } from 'react';
import { 
  User, 
  Target, 
  MessageSquare, 
  FileText, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  Play,
  CheckCircle,
  ArrowRight,
  Zap,
  Mail,
  Star
} from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Enter Recipient Details",
    description: "Start by entering the recipient's name and email address. This helps personalize your email.",
    icon: User,
    color: "from-blue-500 to-cyan-500",
    details: [
      "Enter the recipient's full name",
      "Add their email address (optional)",
      "The AI will use this for personalization"
    ]
  },
  {
    id: 2,
    title: "Define Email Purpose",
    description: "Select the purpose of your email from our comprehensive list of options.",
    icon: Target,
    color: "from-purple-500 to-pink-500",
    details: [
      "Choose from introduction, follow-up, proposal, etc.",
      "Each purpose is optimized for specific outcomes",
      "Helps the AI understand your intent"
    ]
  },
  {
    id: 3,
    title: "Set the Right Tone",
    description: "Select the appropriate tone for your email to match your relationship and context.",
    icon: MessageSquare,
    color: "from-green-500 to-emerald-500",
    details: [
      "Professional for formal communications",
      "Friendly for casual interactions",
      "Formal for official correspondence"
    ]
  },
  {
    id: 4,
    title: "Add Key Points",
    description: "List the main points you want to cover in your email for comprehensive coverage.",
    icon: FileText,
    color: "from-orange-500 to-red-500",
    details: [
      "Enter your main talking points",
      "Use bullet points for clarity",
      "Be specific about what you want to convey"
    ]
  },
  {
    id: 5,
    title: "Provide Context (Optional)",
    description: "Add any additional context or special instructions to refine your email further.",
    icon: MessageSquare,
    color: "from-indigo-500 to-purple-500",
    details: [
      "Background information",
      "Special requirements",
      "Specific details to include"
    ]
  },
  {
    id: 6,
    title: "Choose Email Length",
    description: "Select the desired length for your email based on your communication needs.",
    icon: Clock,
    color: "from-pink-500 to-rose-500",
    details: [
      "Short: Quick and concise messages",
      "Medium: Detailed but focused",
      "Long: Comprehensive and thorough"
    ]
  }
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate professional emails in seconds"
  },
  {
    icon: Star,
    title: "High Quality",
    description: "AI-powered for polished, professional results"
  },
  {
    icon: Mail,
    title: "Multiple Formats",
    description: "Support for various email types and purposes"
  }
];

export function HowToUse() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const goToStep = (index: number) => {
    setCurrentStep(index);
  };

  React.useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        nextStep();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay]);

  return (
    <section id="how-to-use" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-accent" />
            <span className="text-accent font-medium">How It Works</span>
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
            Master Email Generation in 6 Simple Steps
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our intuitive interface makes it easy to create professional emails. Follow these steps to craft the perfect message every time.
          </p>
        </div>

        {/* Features bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-primary">{feature.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Interactive Step Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column - Step Details */}
          <div className="order-2 lg:order-1">
            <div className="bg-card rounded-2xl p-8 shadow-xl border border-border relative overflow-hidden">
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${steps[currentStep].color}`} />
              
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 bg-gradient-to-br ${steps[currentStep].color} rounded-xl`}>
                  {React.createElement(steps[currentStep].icon, { className: "w-8 h-8 text-white" })}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">
                    Step {steps[currentStep].id}: {steps[currentStep].title}
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    {steps[currentStep].description}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-primary">What to do:</h4>
                <ul className="space-y-3">
                  {steps[currentStep].details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">Pro tip:</span> Take your time to provide detailed information for better results.
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Column - Step Navigation */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* Progress circle */}
              <div className="relative w-64 h-64 mx-auto mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full animate-pulse-slow" />
                <div className="relative bg-gradient-to-br from-primary to-accent rounded-full w-full h-full flex items-center justify-center">
                  <div className="bg-background rounded-full w-48 h-48 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">
                        {currentStep + 1}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        of {steps.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step dots */}
              <div className="flex justify-center gap-2 mb-8">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToStep(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentStep
                        ? 'bg-primary scale-125'
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>
              
              {/* Navigation controls */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={prevStep}
                  className="p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className={`p-3 rounded-lg transition-colors ${
                    isAutoPlay
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <Play className="w-5 h-5" />
                </button>
                
                <button
                  onClick={nextStep}
                  className="p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-border">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-primary mb-2">Quick Start Guide</h3>
            <p className="text-muted-foreground">Get started in under 2 minutes</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-background rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">1</span>
              </div>
              <h4 className="font-semibold text-primary mb-2">Fill the Form</h4>
              <p className="text-sm text-muted-foreground">Complete all required fields with your email details</p>
            </div>
            
            <div className="bg-background rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">2</span>
              </div>
              <h4 className="font-semibold text-primary mb-2">Generate Email</h4>
              <p className="text-sm text-muted-foreground">Click the generate button and watch AI work its magic</p>
            </div>
            
            <div className="bg-background rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">3</span>
              </div>
              <h4 className="font-semibold text-primary mb-2">Copy & Send</h4>
              <p className="text-sm text-muted-foreground">Download, copy to clipboard, or save to your history</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}