# Project Setup & Configuration Guide

## 🎉 What's New

### ✅ Complete 3-Page Setup
- **Home Page** (`/`) - Hero section with style guide
- **About Page** (`/about`) - Features, tech stack, and CTA
- **Contact Page** (`/contact`) - Contact form with email integration

### ✅ Improved Styling with Tailwind
- Better `globals.css` organization using Tailwind's `@apply`
- Proper `tailwind.config.js` configuration
- All custom utilities now properly integrated
- See [STYLING_GUIDE.md](./STYLING_GUIDE.md) for detailed info

### ✅ Contact Form with Email
- Modern contact form component
- Email submission to backend
- Automatic validation and error handling
- Confirmation emails to users

## 📋 Pages

### Home Page (`/src/app/page.js`)
Main landing page with hero section showcasing your style guide.

### About Page (`/src/app/about/page.js`)
Features section with tech stack and call-to-action.

**Sections:**
- Hero with subtitle
- Features grid (3 columns)
- Technology stack showcase
- CTA section

### Contact Page (`/src/app/contact/page.js`)
Complete contact page with form and FAQ.

**Sections:**
- Hero section
- Contact form (left) + contact info (right)
- Email, phone, location, social links
- FAQ with collapsible details

## 📧 Email Configuration

### Setup Instructions

The contact form uses **Nodemailer** for email sending. Choose one option:

#### Option 1: Testing with Ethereal Email (Recommended for Development)
No setup needed! Ethereal is Nodemailer's built-in testing service.
- When emails are sent, you'll get a preview URL in your console
- Perfect for testing before setting up a real service

#### Option 2: SendGrid (Production Ready)
1. Sign up at [SendGrid](https://sendgrid.com)
2. Get your API key
3. Add to `.env.local`:
```env
SENDGRID_API_KEY=your_api_key_here
```
4. Uncomment the SendGrid option in `/src/app/api/contact/route.js`

#### Option 3: Gmail
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password at https://myaccount.google.com/apppasswords
3. Add to `.env.local`:
```env
GMAIL_USER=your_email@gmail.com
GMAIL_PASSWORD=your_app_password
```
4. Uncomment the Gmail option in `/src/app/api/contact/route.js`

#### Option 4: Custom SMTP Server
If you have your own email server:
```env
SMTP_HOST=smtp.yourdomain.com
SMTP_PORT=587
SMTP_USER=your_email@yourdomain.com
SMTP_PASSWORD=your_password
```

### Required Environment Variables
```env
# Email configuration (required)
CONTACT_EMAIL=contact@nextjs-starter.com
SMTP_FROM_EMAIL=noreply@nextjs-starter.com

# Choose ONE email service and add its credentials
# See options above
```

### Testing the Form Locally
```bash
npm run dev
# Navigate to http://localhost:3000/contact
# Fill and submit the form
# Check terminal for Ethereal preview URL
```

## 🎨 Styling Improvements

### What Was Changed
- **Before**: Disconnected CSS variables and custom classes
- **After**: Tailwind-integrated system with proper theme config

### Key Files
- `globals.css` - Uses `@theme` and `@apply` directives
- `tailwind.config.js` - Theme customization with your design tokens
- `postcss.config.mjs` - PostCSS configuration

### Use Tailwind Utilities
```jsx
// ✅ Good
<div className="flex items-center gap-4 p-6 bg-secondary rounded-lg">
  
// ❌ Avoid custom CSS for simple layouts
<div className="custom-container">
```

See [STYLING_GUIDE.md](./STYLING_GUIDE.md) for detailed styling practices.

## 🚀 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css           # Global styles with Tailwind
│   ├── layout.js             # Root layout
│   ├── page.js               # Home page
│   ├── about/
│   │   └── page.js           # About page
│   ├── contact/
│   │   └── page.js           # Contact page
│   └── api/
│       └── contact/
│           └── route.js      # Email submission API
├── components/
│   ├── layout/
│   │   └── Navbar.jsx        # Navigation (updated with links)
│   │   └── Footer.jsx        # Footer component
│   └── sections/
│       ├── Hero.jsx          # Hero section
│       └── ContactForm.jsx   # Contact form component
├── providers/
│   └── SmoothScrolling.jsx   # Lenis integration
└── animations/
    └── initAnimations.js     # GSAP animations setup

tailwind.config.js            # Tailwind theme config (NEW)
STYLING_GUIDE.md              # Styling documentation (NEW)
.env.example                  # Environment variables example (NEW)
```

## ✨ Features

### Navigation
- ✅ Fixed header with responsive navigation
- ✅ Mobile hamburger menu
- ✅ Smooth scroll integration
- ✅ Updated links to all pages

### Contact Form
- ✅ Form validation
- ✅ Error handling
- ✅ Loading states
- ✅ Success/error messages
- ✅ Auto-clear after submission
- ✅ Email confirmation to users

### Design System
- ✅ Responsive typography (clamp-based sizing)
- ✅ Custom color palette
- ✅ Flexible layout utilities
- ✅ Button components (primary, secondary)
- ✅ Container sizes for different viewports
- ✅ Section padding utilities

## 🔧 Technologies

- **Next.js 16** - React framework
- **Tailwind CSS 4** - Utility-first CSS
- **GSAP** - Animations
- **Lenis** - Smooth scrolling
- **React 19** - UI library
- **Nodemailer** - Email sending (NEW)

## 🎯 Next Steps

1. **Configure Email Service**
   - Copy `.env.example` to `.env.local`
   - Choose and configure your email service
   - Test the contact form

2. **Customize Content**
   - Update email addresses in `.env.local`
   - Customize About page content
   - Update contact information

3. **Add Your Animation**
   - Check `src/animations/initAnimations.js`
   - Add GSAP animations as needed
   - Use `fd-animate` attributes on elements

4. **Extend the Design**
   - Add more pages as needed
   - Create reusable components
   - Use Tailwind utilities for consistent styling

## 📝 Notes

- All pages are responsive and mobile-friendly
- Contact form validation is built-in
- Email service defaults to Ethereal for testing
- Styling uses Tailwind v4 with custom CSS variables
- Perfect as a clonable template for new projects

## 💡 Tips

- For production, set up a real email service (SendGrid, Gmail, etc.)
- All custom classes are in `globals.css` - easy to modify
- Use `@apply` to create new utility classes
- Check browser console for Ethereal email preview URLs
- Restart dev server after `.env` changes

---

For more details on styling, see [STYLING_GUIDE.md](./STYLING_GUIDE.md)
