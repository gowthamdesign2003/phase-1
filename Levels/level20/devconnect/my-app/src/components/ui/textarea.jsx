import "./styles.css";

export function Textarea({ value, onChange, placeholder, className = "", rows = 4 }) {
  return (
    <textarea
      className={`textarea ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
    />
  );
}
