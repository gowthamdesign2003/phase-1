import React, { createContext, useContext, useState } from "react";


const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export const useTheme = () => {
  return useContext(ThemeContext);
};


const Theme = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{
      backgroundColor: theme === "light" ? "#fff" : "#333",
      color: theme === "light" ? "#000" : "#fff",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }}>
      <h1>{theme.charAt(0).toUpperCase() + theme.slice(1)} Mode</h1>
      <button onClick={toggleTheme} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
        Toggle Theme
      </button>
    </div>
  );
};


export default Theme;