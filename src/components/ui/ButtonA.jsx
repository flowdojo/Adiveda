export default function ButtonA({ text, variant = "primary", href, type = "button", className = "", ...props }) {
  const styles = `${variant === "secondary" ? "button-secondary" : "button-primary"} ${className}`.trim();

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
