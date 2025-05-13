import React from "react";
import useWindowResize from "./useWindowResize";

const Seven = () => {
  const { width, height } = useWindowResize();

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Window Size</h2>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
    </div>
  );
};

export default Seven;
