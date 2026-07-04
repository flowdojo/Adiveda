export default function Eyebrow({as: Component = "p", className = "", children}) {
  const classes = ["eyebrow", className].filter(Boolean).join(" ");

  return <Component className={classes}>{children}</Component>;
}
