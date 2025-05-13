import "./styles.css";

export function Card({ children }) {
  return <div className="card">{children}</div>;
}

export function CardContent({ children, className = "" }) {
  return <div className={`card-content ${className}`}>{children}</div>;
}
