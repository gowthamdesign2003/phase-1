import "./styles.css";

export function Avatar({ children }) {
  return <div className="avatar">{children}</div>;
}

export function AvatarImage({ src, alt }) {
  return <img className="avatar" src={src} alt={alt} />;
}

export function AvatarFallback({ children }) {
  return <div className="avatar">{children}</div>;
}
