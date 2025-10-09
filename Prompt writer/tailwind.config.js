/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Flame AI Brand Colors */
        'forest-green': 'hsl(140, 30%, 25%)',
        'sage-green': 'hsl(140, 30%, 75%)',
        'warm-coral': 'hsl(8, 65%, 65%)',
        'cream': 'hsl(45, 20%, 95%)',
        'charcoal': 'hsl(0, 0%, 20%)',
        /* Semantic Color System */
        background: 'hsl(45, 20%, 95%)',
        foreground: 'hsl(0, 0%, 20%)',
        card: 'hsl(0, 0%, 100%)',
        'card-foreground': 'hsl(0, 0%, 20%)',
        popover: 'hsl(0, 0%, 100%)',
        'popover-foreground': 'hsl(0, 0%, 20%)',
        primary: 'hsl(140, 30%, 25%)',
        'primary-foreground': 'hsl(0, 0%, 98%)',
        secondary: 'hsl(140, 30%, 75%)',
        'secondary-foreground': 'hsl(140, 30%, 25%)',
        muted: 'hsl(140, 15%, 88%)',
        'muted-foreground': 'hsl(0, 0%, 45%)',
        accent: 'hsl(8, 65%, 65%)',
        'accent-foreground': 'hsl(0, 0%, 98%)',
        destructive: 'hsl(0, 84.2%, 60.2%)',
        'destructive-foreground': 'hsl(210, 40%, 98%)',
        border: 'hsl(140, 15%, 85%)',
        input: 'hsl(140, 15%, 92%)',
        ring: 'hsl(140, 30%, 25%)',
      },
      fontFamily: {
        'display': ['Fraunces', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'lg': '0.75rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}