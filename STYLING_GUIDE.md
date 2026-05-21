# Styling Setup & Tailwind Integration Guide

## Overview

This project uses **Tailwind CSS v4** with custom utility classes for a scalable, maintainable design system. The styling has been reorganized to leverage Tailwind's utility-first approach while maintaining custom design tokens.

## What Was Fixed ✅

### Before
- `@import "tailwindcss"` with disconnected CSS variables
- Custom classes mixed with raw CSS
- No proper Tailwind config for theme integration
- Custom breakpoints not integrated with Tailwind

### After
- ✅ Proper `@theme` configuration in Tailwind
- ✅ Custom classes use `@apply` for better integration
- ✅ `tailwind.config.js` properly configured with custom tokens
- ✅ All custom breakpoints registered in config
- ✅ Better CSS organization with Tailwind utilities

## File Structure

### `/src/app/globals.css`
Main stylesheet with:
- `@theme` for CSS variables (Tailwind v4)
- Utility classes using `@apply` directives
- Reset styles and global element styling
- Lenis smooth scroll integration

### `/tailwind.config.js`
Configuration extending default Tailwind theme with:
- Custom color palette
- Custom font families
- Custom breakpoints (xsmall, small, medium, large, xlarge)
- Custom spacing scale

## Available Utility Classes

### Typography
```jsx
<h1 className="heading-h1">Main Title</h1>
<h2 className="heading-h2">Subtitle</h2>
<h3 className="heading-h3">Section Title</h3>
<h4 className="heading-h4">Subsection</h4>
<h5 className="heading-h5">Card Title</h5>
<h6 className="heading-h6">Small Title</h6>
<p className="text-body">Regular paragraph</p>
<p className="eyebrow">Small uppercase label</p>
```

### Layout
```jsx
<div className="padding-global">/* 5% horizontal padding */</div>
<div className="container-xlarge">/* Max 1440px */</div>
<div className="container-large">/* Max 1200px */</div>
<div className="container-medium">/* Max 992px */</div>
<div className="container-small">/* Max 768px */</div>
<div className="container-xsmall">/* Max 480px */</div>
<section className="section-padding">/* 8rem vertical padding */</section>
```

### Buttons
```jsx
<button className="button-primary">Primary Button</button>
<button className="button-secondary">Secondary Button</button>
```

## Styling Best Practices

### 1. Use Tailwind Utilities First
```jsx
// ✅ Good - Use Tailwind utilities
<div className="flex items-center gap-4 p-6 bg-secondary rounded-lg">
  <img src="..." className="w-12 h-12 rounded-full" />
  <div>Content</div>
</div>

// ❌ Avoid - Writing custom CSS when Tailwind can do it
<div className="custom-card">
  <img src="..." className="custom-image" />
  <div>Content</div>
</div>
```

### 2. Responsive Design with Tailwind Breakpoints
```jsx
// ✅ Good - Use Tailwind responsive prefixes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <div key={item.id}>{item}</div>)}
</div>

// Custom breakpoints available:
// - small (768px)
// - medium (992px)
// - large (1200px)
// - xlarge (1440px)
```

### 3. Color System
```jsx
// ✅ Use semantic color classes
<button className="bg-primary text-white">Primary</button>
<div className="bg-secondary text-foreground">Secondary</div>
<p className="text-primary">Primary text</p>
<p className="text-foreground">Foreground text</p>

// Colors defined in tailwind.config.js:
// primary: #111111
// secondary: #f3f3f3
// foreground: #171717
// background: #ffffff
```

### 4. Custom Classes for Complex Components
```jsx
// When you need to combine multiple utilities into a class:
// Add to globals.css using @apply

.card {
  @apply p-6 border-2 border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow;
}

// Then use:
<div className="card">Content</div>
```

### 5. Adding New Design Tokens

To add new colors, fonts, or sizes:

1. **Update CSS Variables** in `globals.css`:
```css
@theme {
  --color-accent: #yourcolor;
}
```

2. **Update Tailwind Config** in `tailwind.config.js`:
```js
extend: {
  colors: {
    accent: "var(--color-accent, #yourcolor)",
  },
}
```

3. **Use in JSX**:
```jsx
<button className="bg-accent">Button</button>
```

## Common Issues & Solutions

### Issue: Custom classes not applying
**Solution**: Make sure you've:
1. Restarted the dev server (`npm run dev`)
2. Imported `globals.css` in `layout.js`
3. Used correct class names (check for typos)

### Issue: Colors not matching
**Solution**: 
1. Check CSS variables in `@theme` block in `globals.css`
2. Verify color values in `tailwind.config.js`
3. Use dev tools to inspect computed styles

### Issue: Responsive classes not working
**Solution**:
1. Use Tailwind breakpoint prefixes: `md:`, `lg:`, etc.
2. Make sure Tailwind's JIT compiler is running
3. Rebuild the project: `npm run build`

## Extending the Setup

### Adding Custom Utilities
```css
/* In globals.css */
.button-outline {
  @apply border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white transition-all;
}
```

### Adding Custom Components
```jsx
// Create reusable components in /src/components
// Example: /src/components/ui/Card.jsx

export default function Card({ children, className = "" }) {
  return (
    <div className={`p-6 border-2 border-gray-200 rounded-lg ${className}`}>
      {children}
    </div>
  );
}
```

### Adding CSS Animations
```css
/* In globals.css */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in {
  animation: slideIn 0.3s ease-out;
}
```

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS v4 Guide](https://tailwindcss.com/docs/upgrade-guide)
- [PostCSS Documentation](https://postcss.org/)

## Configuration Files

- **`globals.css`**: Global styles and utility classes
- **`tailwind.config.js`**: Tailwind theme configuration
- **`postcss.config.mjs`**: PostCSS configuration (includes Tailwind)
