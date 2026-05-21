# NextJs-Styleguide

A modern, feature-rich Next.js website template with smooth scrolling, animations, contact forms, and production-ready styling. Perfect for building professional agency websites, portfolios, or marketing sites.

## 🎯 Features

- **Smooth Scrolling** - Lenis integration for fluid scroll experience
- **GSAP Animations** - Scroll-triggered animations and effects
- **Contact Form** - Email integration with Nodemailer
- **Responsive Design** - Mobile-first Tailwind CSS styling
- **Modern Stack** - Next.js 16, React 19, Tailwind CSS 4
- **Navigation & Footer** - Reusable layout components
- **Multiple Pages** - Home, About, Contact with consistent styling

## 🚀 Getting Started

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/pandey-sahil/NextJs-Styleguide.git
cd NextJs-Styleguide
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
Copy `.env.example` to `.env.local` and configure:
```bash
cp .env.example .env.local
```

4. **Run the development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.js              # Root layout with SmoothScrolling & Footer
│   ├── page.js                # Home page
│   ├── globals.css            # Global styles and Tailwind directives
│   ├── about/page.js          # About page
│   ├── contact/page.js        # Contact page with form
│   └── api/contact/route.js   # Contact form endpoint
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx         # Navigation with mobile menu
│   │   └── Footer.jsx         # Footer component
│   └── sections/
│       ├── Hero.jsx           # Hero section with CTA
│       └── ContactForm.jsx    # Reusable contact form
├── providers/
│   └── SmoothScrolling.jsx    # Lenis smooth scroll provider
└── animations/
    └── initAnimations.js      # GSAP animation setup
```

## 🛠️ Configuration

### Environment Variables

Create `.env.local` with:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
CONTACT_EMAIL=hello@example.com
```

### Tailwind Customization

Edit `tailwind.config.js` to customize:
- Color scheme (primary, secondary, background, foreground)
- Breakpoints (xsmall, small, medium, large, xlarge)
- Border radius and spacing

### Smooth Scrolling (Lenis)

Configured in `src/providers/SmoothScrolling.jsx`:
- Lerp: 0.08 (smoothness factor)
- Wheel multiplier: 1
- Global functions: `window.lenisCustomStart()` and `window.lenisCustomStop()`

### Animations (GSAP)

GSAP animations are initialized in `src/animations/initAnimations.js`:
- ScrollTrigger plugin enabled
- Ready for fade-in, slide, and scroll-based effects

## 📄 Pages

### Home (`/`)
- Hero section with call-to-action buttons
- Features showcase with smooth animations

### About (`/about`)
- Team and services overview
- Tech stack highlight
- Core values section

### Contact (`/contact`)
- Contact form with validation
- Contact information sidebar (email, phone, location)
- Social media links
- FAQ section with expandable answers

## 🎨 Using Components

### Navbar
```jsx
import Navbar from "@/components/layout/Navbar";

export default function Page() {
  return <Navbar />;
}
```
Features: Mobile responsive menu, smooth scroll locking, CTA button

### Footer
Already included in root layout (`src/app/layout.js`)

### ContactForm
```jsx
import ContactForm from "@/components/sections/ContactForm";

export default function Page() {
  return <ContactForm />;
}
```
Handles form submission, validation, and API calls to `/api/contact`

### Hero Section
```jsx
import Hero from "@/components/sections/Hero";

export default function Page() {
  return <Hero />;
}
```

## 📧 Contact Form Setup

1. Configure SMTP credentials in `.env.local`
2. Update `CONTACT_EMAIL` to your receiving email
3. Form automatically sends to your email via `/api/contact`
4. Success/error messages display to user

## 🎨 Styling

### Global Classes
- `.section-padding` - Vertical padding for sections
- `.padding-global` - Horizontal padding (5% on each side)
- `.container-{size}` - Responsive max-width containers
- `.heading-{h1-h6}` - Predefined heading styles
- `.text-body` - Body text styling
- `.button-primary` / `.button-secondary` - Button styles

### Custom Theme Variables
Edit in `src/app/globals.css` under `@theme`:
```css
@theme {
  --color-background: #ffffff;
  --color-primary: #111111;
  --color-secondary: #f3f3f3;
  --font-heading: "Arial", "Helvetica", sans-serif;
  --radius-default: 1rem;
}
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

```bash
vercel deploy
```

### Other Platforms

Build production bundle:
```bash
npm run build
npm run start
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lenis Documentation](https://lenis.studiofreight.com/)
- [GSAP Documentation](https://gsap.com/docs/)
- [Nodemailer Guide](https://nodemailer.com/about/)

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🤝 Contributing

Feel free to fork this project, make improvements, and submit pull requests!

## 📄 License

This project is open source and available under the MIT License.

---

**Happy building!** 🎉
