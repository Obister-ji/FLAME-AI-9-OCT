import React, { useEffect } from 'react';
import { ClerkProvider as ClerkReactProvider, useUser } from '@clerk/clerk-react';

// Get the publishable key from environment variables
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

interface ClerkProviderProps {
  children: React.ReactNode;
}

// Inner component to handle user state
const ClerkProviderWithUser: React.FC<ClerkProviderProps> = ({ children }) => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      // Store user ID in localStorage for Supabase operations
      localStorage.setItem('clerk_user_id', user.id);
    } else if (isLoaded && !user) {
      // Clear user ID when logged out
      localStorage.removeItem('clerk_user_id');
    }
  }, [user, isLoaded]);

  return <>{children}</>;
};

const ClerkProvider: React.FC<ClerkProviderProps> = ({ children }) => {
  // If no publishable key is provided, just render children without Clerk
  if (!publishableKey ||
      publishableKey === 'pk_live_your_actual_publishable_key_here' ||
      publishableKey === 'pk_test_YOUR_ACTUAL_CLERK_KEY_HERE') {
    console.warn('Email Writer: Clerk publishable key not properly configured. Please add your actual Clerk publishable key to .env file.');
    return <>{children}</>;
  }
  
  // Log that Clerk is properly configured (for debugging)
  console.log('Email Writer: Clerk is properly configured with publishable key:', publishableKey.substring(0, 10) + '...');

  return (
    <ClerkReactProvider
      publishableKey={publishableKey}
      appearance={{
        variables: {
          colorPrimary: '#ff6b35',
          colorBackground: '#faf8f3',
          colorInputBackground: '#ffffff',
          colorInputText: '#333333',
          fontFamily: 'Inter, system-ui, sans-serif',
          colorText: '#333333',
          colorTextSecondary: '#6b7280',
          colorDanger: '#ef4444',
          colorWarning: '#f59e0b',
          colorSuccess: '#10b981',
        },
        elements: {
          formButtonPrimary: 'bg-[#ff6b35] hover:bg-[#e55a2b] text-white font-medium shadow-lg',
          card: 'bg-[#faf8f3] border-[#e5e5e5] shadow-xl',
          headerTitle: 'text-[#333333] font-bold text-2xl',
          headerSubtitle: 'text-[#6b7280]',
          socialButtonsBlockButton: 'bg-[#ffffff] border-[#e5e5e5] hover:bg-[#f5f5f5] text-[#333333]',
          formFieldLabel: 'text-[#333333] font-medium',
          formFieldInput: 'bg-[#ffffff] border-[#e5e5e5] text-[#333333] focus:border-[#ff6b35]',
          footerActionLink: 'text-[#ff6b35] hover:text-[#e55a2b]',
          form: 'font-sans',
          dividerText: 'text-[#6b7280] text-sm bg-[#faf8f3]',
          identityPreviewText: 'text-[#333333]',
          formFieldHintText: 'text-[#6b7280] text-sm',
          formFieldErrorText: 'text-[#ef4444] text-sm',
          navbarButton: 'font-medium',
          alert: 'font-normal',
          header: 'bg-[#faf8f3] border-b border-[#e5e5e5]',
          footer: 'bg-[#faf8f3] border-t border-[#e5e5e5]',
          otpCodeInput: 'bg-[#ffffff] border-[#e5e5e5] text-[#333333]',
          userButtonPopoverCard: 'bg-[#faf8f3] border-[#e5e5e5]',
          userButtonPopoverActionButton: 'text-[#333333] hover:bg-[#f5f5f5]',
          userButtonPopoverActionButtonText: 'text-[#333333]',
          userButtonBox: 'border-[#ff6b35]',
          avatarImage: 'border-[#e5e5e5]',
          organizationPreview: 'bg-[#ffffff] border-[#e5e5e5]',
          organizationSwitcherTrigger: 'bg-[#ffffff] border-[#e5e5e5] hover:bg-[#f5f5f5]',
          singleSelectButton: 'bg-[#ffffff] border-[#e5e5e5] hover:bg-[#f5f5f5]',
          selectButton: 'bg-[#ffffff] border-[#e5e5e5] hover:bg-[#f5f5f5]',
          checkbox: 'bg-[#ffffff] border-[#e5e5e5]',
          radioButton: 'bg-[#ffffff] border-[#e5e5e5]',
          membersPage: 'bg-[#faf8f3]',
        },
      }}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/"
      afterSignUpUrl="/"
    >
      <ClerkProviderWithUser>
        {children}
      </ClerkProviderWithUser>
    </ClerkReactProvider>
  );
};

export default ClerkProvider;