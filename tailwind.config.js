/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background, #ffffff)",
        foreground: "var(--color-foreground, #171717)",
        primary: "var(--color-primary, #111111)",
        secondary: "var(--color-secondary, #f3f3f3)",
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
