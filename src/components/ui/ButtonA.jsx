import { cva } from "class-variance-authority";

const buttonVariants = cva("inline-flex items-center justify-center rounded-full font-normal transition-colors duration-300 px-4 py-2", {
  variants: {
    variant: {
      primary: "gap-2  bg-primary border border-secondary hover:bg-secondary",
      secondary: "gap-2 bg-secondary border border-secondary hover:bg-primary",
      nav: "bg-secondary border border-secondary hover:bg-primary text-white",
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
