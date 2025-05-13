import React from "react";
import useLocalStorage from "./useLocalStorage";

function App() {
  const [name, setName] = useLocalStorage("name", "");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Persisting State with Local Storage</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        style={{ padding: "10px", fontSize: "16px" }}
      />
      <p style={{ fontSize: "18px", marginTop: "20px" }}>
        {name ? `Hello, ${name}!` : "Please enter your name."}
      </p>
    </div>
  );
}

export default App;
