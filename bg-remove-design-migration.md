# Design Migration Guide: Bg-remove to Format-mage

## Overview
This document extracts the complete design system from the Bg-remove website and provides implementation guidance for migrating these design elements to the format-mage project.

## Color Scheme

### Primary Colors
- **Forest Green (Primary)**: `hsl(140, 30%, 25%)` - `#2C5530`
  - Used for: Main brand color, buttons, links, highlights
  - Implementation: `--primary: 140 30% 25%`

- **Warm Coral (Accent)**: `hsl(8, 65%, 65%)` - `#E8756B`
  - Used for: Secondary actions, hover states, accents
  - Implementation: `--accent: 8 65% 65%`

### Secondary Colors
- **Sage Green (Secondary)**: `hsl(140, 30%, 75%)` - `#B8D4C2`
  - Used for: Supporting elements, secondary backgrounds
  - Implementation: `--secondary: 140 30% 75%`

### Background Colors
- **Cream (Main Background)**: `hsl(45, 20%, 95%)` - `#F5F2EA`
  - Used for: Main page background
  - Implementation: `--background: 45 20% 95%`

- **White (Card Background)**: `hsl(0, 0%, 100%)` - `#FFFFFF`
  - Used for: Cards, modals, content areas
  - Implementation: `--card: 0 0% 100%`

- **Gradient Background**: `linear-gradient(135deg, #5200ae, #4062bb)`
  - Used for: Alternative background (body override in index.css)
  - Note: This overrides the cream background in the current implementation

### Text Colors
- **Charcoal (Primary Text)**: `hsl(0, 0%, 20%)` - `#333333`
  - Used for: Main text, headings, body content
  - Implementation: `--foreground: 0 0% 20%`

- **White (Primary Foreground)**: `hsl(0, 0%, 98%)`
  - Used for: Text on primary/colored backgrounds
  - Implementation: `--primary-foreground: 0 0% 98%`

- **Muted Text**: `hsl(140, 15%, 88%)`
  - Used for: Subtle text, descriptions
  - Implementation: `--muted: 140 15% 88%`

- **Muted Foreground**: `hsl(0, 0%, 45%)`
  - Used for: Secondary text, captions
  - Implementation: `--muted-foreground: 0 0% 45%`

### Border and Divider Colors
- **Light Border**: `hsl(140, 15%, 85%)`
  - Used for: Element borders, dividers
  - Implementation: `--border: 140 15% 85%`

- **Input Border**: `hsl(140, 15%, 92%)`
  - Used for: Input fields, form elements
  - Implementation: `--input: 140 15% 92%`

- **Gray Border (Images Component)**: `border-gray-200`, `border-gray-100`
  - Used for: Image cards, buttons
  - Note: These are hardcoded Tailwind colors

### Special Colors
- **Destructive/Error**: `hsl(0, 84.2%, 60.2%)`
  - Used for: Error states, destructive actions
  - Implementation: `--destructive: 0 84.2% 60.2%`

- **Ring/Focus**: `hsl(140, 30%, 25%)`
  - Used for: Focus states, outlines
  - Implementation: `--ring: 140 30% 25%`

## Typography

### Font Families
- **Display Font (Headings)**: 'Fraunces', serif
  - Used for: H1-H6 headings
  - Implementation: `font-family: 'Fraunces', serif`

- **UI/Body Font**: 'Inter', sans-serif
  - Used for: Body text, buttons, UI elements
  - Implementation: `font-family: 'Inter', sans-serif`

### Font Import
```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;700&family=Inter:wght@400;700&display=swap');
```

## Design Elements

### Shadows
- **Card Shadow**: `shadow-lg`, `shadow-md`
  - Used for: Cards, images, elevated elements
  - Implementation: Standard Tailwind shadows

- **Button Shadow**: None (flat design)
  - Used for: Buttons, interactive elements

### Border Radius
- **Default Radius**: `0.75rem` (12px)
  - Used for: Cards, buttons, input fields
  - Implementation: `--radius: 0.75rem`

### Transitions
- **Standard Transition**: `transition-colors duration-300`
  - Used for: Hover states, color changes
  - Implementation: `transition-all duration-300 ease-in-out`

- **Smooth Transition**: `cubic-bezier(0.4, 0, 0.2, 1)`
  - Used for: Complex animations
  - Implementation: `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

## Component-Specific Styles

### Navigation Bar
- **Background**: `bg-background/95 backdrop-blur-md`
- **Shadow**: `shadow-lg`
- **Height**: `py-4` padding
- **Logo Height**: `h-8 w-8`

### Hero Section
- **Height**: `min-h-[60vh]`
- **Padding**: `pt-24 pb-12`
- **Title Size**: `text-4xl md:text-5xl`
- **Subtitle Size**: `text-2xl md:text-3xl`

### Image Uploader
- **Border**: `border-2 border-dashed`
- **Border Color**: `border-border` (changes on drag states)
- **Padding**: `p-8`
- **Border Radius**: `rounded-lg`

### Buttons
- **Primary**: `bg-primary text-primary-foreground`
- **Secondary**: `bg-secondary text-secondary-foreground`
- **Outline**: `bg-white border border-gray-200`
- **Hover**: `hover:bg-primary/5` or `hover:bg-gray-50`

### Cards
- **Background**: `bg-white`
- **Border**: `border border-gray-200`
- **Shadow**: `shadow-md`
- **Padding**: `p-3` to `p-6`
- **Border Radius**: `rounded-lg`

### Modal
- **Overlay**: `bg-black bg-opacity-50`
- **Background**: `bg-white`
- **Max Width**: `max-w-2xl`
- **Padding**: `p-6`
- **Border Radius**: `rounded-lg`

## Interactive States

### Hover States
- **Primary Elements**: `hover:text-primary`
- **Buttons**: `hover:bg-primary/5` or `hover:bg-gray-50`
- **Cards**: `hover:border-primary/50`
- **Links**: `hover:text-primary transition-colors duration-300`

### Active States
- **Buttons**: Standard button active states
- **Drag States**: 
  - Accept: `border-primary bg-primary/10`
  - Reject: `border-destructive bg-destructive/10`
  - Active: `border-accent bg-accent/10`

### Focus States
- **Ring Color**: `ring: 140 30% 25%`
- **Implementation**: `focus:ring-2 focus:ring-primary`

## Implementation for Format-mage

### 1. Update CSS Variables
Replace the existing color variables in `src/index.css` with the Bg-remove color scheme:

```css
:root {
  /* Flame AI Brand Colors */
  --forest-green: 140 30% 25%;        /* Deep Forest Green #2C5530 */
  --sage-green: 140 30% 75%;          /* Soft Sage #B8D4C2 */
  --warm-coral: 8 65% 65%;            /* Warm Coral #E8756B */
  --cream: 45 20% 95%;                /* Cream #F5F2EA */
  --charcoal: 0 0% 20%;               /* Charcoal #333333 */
  
  /* Semantic Color System */
  --background: 45 20% 95%;           /* Cream background */
  --foreground: 0 0% 20%;             /* Charcoal text */
  --card: 0 0% 100%;
  --card-foreground: 0 0% 20%;
  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 20%;
  --primary: 140 30% 25%;             /* Forest Green */
  --primary-foreground: 0 0% 98%;
  --secondary: 140 30% 75%;           /* Sage Green */
  --secondary-foreground: 140 30% 25%;
  --muted: 140 15% 88%;
  --muted-foreground: 0 0% 45%;
  --accent: 8 65% 65%;                /* Warm Coral */
  --accent-foreground: 0 0% 98%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 140 15% 85%;
  --input: 140 15% 92%;
  --ring: 140 30% 25%;
  --radius: 0.75rem;
}
```

### 2. Update Font Families
Add the font imports and update font families:

```css
/* Import fonts */
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;700&family=Inter:wght@400;700&display=swap');

@layer base {
  body {
    font-family: 'Inter', 'Fraunces', serif, sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Fraunces', serif;
    color: hsl(var(--primary));
  }
}
```

### 3. Update Tailwind Config
Update the font families in `tailwind.config.ts`:

```typescript
fontFamily: {
  'display': ['Fraunces', 'serif'],
  'ui': ['Inter', 'sans-serif'],
  'sans': ['Inter', 'sans-serif'],
},
```

### 4. Component Updates
Update the ImageConverter component to match the Bg-remove design patterns:

- Replace gradient backgrounds with cream color
- Update button styles to match Bg-remove button designs
- Update card styles to use white backgrounds with subtle borders
- Update text colors to use the new color scheme
- Add proper hover states and transitions

### 5. Navigation Bar
Consider adding a navigation bar similar to Bg-remove:

```jsx
<nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md shadow-lg">
  <div className="container mx-auto px-4 py-4 flex justify-between items-center">
    <div className="flex items-center space-x-2">
      <img src="/logo.png" alt="Format Mage Logo" className="h-8 w-8 object-contain" />
      <span className="font-display text-2xl font-bold text-primary">Format Mage</span>
    </div>
    {/* Navigation items */}
  </div>
</nav>
```

### 6. Hero Section
Update the hero section to match Bg-remove styling:

```jsx
<section className="relative min-h-[60vh] flex items-center justify-center pt-24 pb-12">
  <div className="relative z-10 container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* Content */}
    </div>
  </div>
</section>
```

## Additional Notes

1. **Gradient Background**: The Bg-remove site has a gradient background override in the CSS that conflicts with the cream color. Decide whether to keep the cream background or the gradient.

2. **Checkered Pattern**: The Bg-remove site uses a checkered pattern for transparent backgrounds. This could be useful for image conversion previews.

3. **Animation Classes**: Consider adding the animation classes from Bg-remove for smooth transitions and hover effects.

4. **Mobile Optimization**: The Bg-remove site has specific mobile optimizations, including a special redirect for mobile Safari.

5. **Dark Mode**: The Bg-remove site doesn't have a dark mode, but format-mage does. Consider how the color scheme will adapt to dark mode or whether to disable it.

## Implementation Priority

1. **High Priority**: Update color variables and font families
2. **Medium Priority**: Update component styles and layouts
3. **Low Priority**: Add navigation bar, hero section, and animations

This migration guide provides all the necessary design elements to transform format-mage to match the Bg-remove website's design language.