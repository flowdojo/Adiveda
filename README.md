# adiveda-practice

A modern Next.js project with smooth scrolling, GSAP-ready animations, responsive Tailwind CSS styling, and reusable layout primitives.

## Features

- Smooth scrolling with Lenis
- GSAP-ready animation setup
- Mobile-first Tailwind CSS 4 styling
- Next.js 16 and React 19
- Reusable Navbar, Footer, Hero, and Button components
- Home and About routes

## Getting Started

Install dependencies:
```bash
npm install
```

Create local env config only if needed:
```bash
cp .env.example .env.local
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── app/
│   ├── layout.js              # Root layout with SmoothScrolling & Footer
│   ├── page.js                # Home page
│   ├── globals.css            # Global styles and Tailwind directives
│   └── about/page.js          # About page
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx         # Navigation with mobile menu
│   │   └── Footer.jsx         # Footer component
│   └── sections/
│       └── Hero.jsx           # Hero section with CTA
├── providers/
│   └── SmoothScrolling.jsx    # Lenis smooth scroll provider
└── animations/
    └── initAnimations.js      # GSAP animation setup
```

## Pages

- `/` - Home page with hero section
- `/about` - About page

## Components

### Navbar

```jsx
import Navbar from "@/components/layout/Navbar";

export default function Page() {
  return <Navbar />;
}
```

The root layout already includes `Footer`, so pages only need to render their page-specific content and any page-level navigation.

### Hero

```jsx
import Hero from "@/components/sections/Hero";

export default function Page() {
  return <Hero />;
}
```

## Global Utilities

- `.section-padding` - Vertical padding for sections
- `.padding-global` - Horizontal padding
- `.container-{size}` - Responsive max-width containers
- `.heading-{h1-h6}` - Predefined heading styles
- `.text-body` - Body text styling
- `.eyebrow` - Small uppercase label
- `.button-primary` / `.button-secondary` - Button styles

<details>
<summary>Setup And Configuration</summary>

### Environment Variables

Create `.env.local` only when you add environment-specific values:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Tailwind

Tailwind CSS 4 is configured through:

- `src/app/globals.css` for `@theme`, custom utilities, resets, and Lenis styles
- `tailwind.config.js` for colors, fonts, breakpoints, radius, and spacing
- `postcss.config.mjs` for the Tailwind PostCSS plugin

### Smooth Scrolling

Lenis is configured in `src/providers/SmoothScrolling.jsx` with:

- `lerp: 0.08`
- `smoothTouch: false`
- `normalizeWheel: true`
- `window.lenisCustomStart()`
- `window.lenisCustomStop()`

### Animations

GSAP animation setup lives in `src/animations/initAnimations.js`. Add `fd-animate` attributes to elements when wiring scroll or entrance animations.

</details>

<details>
<summary>Styling Guide</summary>

### Theme Variables

Edit in `src/app/globals.css` under `@theme`:

```css
@theme {
  --color-primary: #890808;
  --color-secondary: #c24a00;
  --color-background: #fcf6f6;
  --color-background-secondary: #f6f1e7;
  --color-background-tertiary: var(--color-primary);
  --color-text-dark: #000000;
  --color-text-light: #ffffff;
  --color-foreground: var(--color-text-dark);
  --font-heading: "Arial", "Helvetica", sans-serif;
  --radius-default: 1rem;
}
```

### Typography

```jsx
<h1 className="heading-h1">Main Title</h1>
<h2 className="heading-h2">Section Title</h2>
<p className="text-body">Regular paragraph</p>
<p className="eyebrow">Small uppercase label</p>
```

### Layout

```jsx
<section className="section-padding">
  <div className="padding-global">
    <div className="container-xlarge">Content</div>
  </div>
</section>
```

### Buttons

```jsx
<button className="button-primary">Primary Button</button>
<button className="button-secondary">Secondary Button</button>
```

### Best Practices

- Use Tailwind utilities first for one-off layout and spacing.
- Use semantic color classes like `bg-primary`, `bg-secondary`, `bg-background-secondary`, `bg-tertiary`, `text-dark`, and `text-light`.
- Add reusable composed classes in `globals.css` with `@apply` only when the pattern repeats.
- Keep new design tokens mirrored between `@theme` in `globals.css` and `theme.extend` in `tailwind.config.js`.

</details>

<details>
<summary>Deployment</summary>

### Vercel

1. Push code to GitHub.
2. Connect the repository to Vercel.
3. Add any required environment variables in the Vercel dashboard.
4. Deploy automatically on push.

```bash
vercel deploy
```

### Other Platforms

Build and start the production server:

```bash
npm run build
npm run start
```

</details>

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lenis Documentation](https://lenis.studiofreight.com/)
- [GSAP Documentation](https://gsap.com/docs/)
