import { cva } from "class-variance-authority";

const buttonVariants = cva("inline-flex items-center justify-center rounded-full font-normal transition-colors duration-300", {
  variants: {
    variant: {
      primary: "button-primary",
      secondary: "button-secondary",
      nav: "button-nav",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export default function ButtonA({ text, variant = "primary", href, type = "button", className = "", ...props }) {
  const styles = buttonVariants({ variant, className });

  if (href) {
    return (
      <a href={href} className={styles} {...props}>
        {text}
      </a>
    );
  }

  return (
    <button type={type} className={styles} {...props}>
      {text}
    </button>
  );
}
