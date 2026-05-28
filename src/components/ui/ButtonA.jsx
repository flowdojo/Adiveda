const variants = {
  primary: "button-primary",
  secondary: "button-secondary",
  nav: "button-nav",
};

export default function ButtonA({ text, variant = "primary", href, type = "button", className = "", ...props }) {
  const styles = `${variants[variant] ?? variants.primary} ${className}`.trim();

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
