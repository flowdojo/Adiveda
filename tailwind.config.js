/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-primary": "var(--color-brand-primary, #890808)",
        "brand-secondary": "var(--color-brand-secondary, #c24a00)",
        "brand-bg-primary": "var(--color-brand-bg-primary, #fcf6f6)",
        "brand-bg-secondary": "var(--color-brand-bg-secondary, #f6f1e7)",
        "brand-bg-tertiary": "var(--color-brand-bg-tertiary, #890808)",
        "brand-text-dark": "var(--color-brand-text-dark, #000000)",
        "brand-text-light": "var(--color-brand-text-light, #ffffff)",
        background: "var(--color-background, #fcf6f6)",
        "background-secondary": "var(--color-background-secondary, #f6f1e7)",
        "background-tertiary": "var(--color-background-tertiary, #890808)",
        foreground: "var(--color-foreground, #000000)",
        primary: "var(--color-primary, #890808)",
        secondary: "var(--color-secondary, #c24a00)",
        tertiary: "var(--color-background-tertiary, #890808)",
        "text-dark": "var(--color-text-dark, #000000)",
        "text-light": "var(--color-text-light, #ffffff)",
      },
      fontFamily: {
        heading: "var(--font-heading, Arial, Helvetica, sans-serif)",
        body: "var(--font-body, Arial, Helvetica, sans-serif)",
      },
      borderRadius: {
        DEFAULT: "var(--radius-default, 1rem)",
      },
      screens: {
        xsmall: "480px",
        small: "768px",
        medium: "992px",
        large: "1200px",
        xlarge: "1440px",
      },
      spacing: {
        "safe-x": "5%",
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
