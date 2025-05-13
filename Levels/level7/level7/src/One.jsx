

// ExampleComponent.js
import React from "react";
import useToggle from "./Usetoggle";

const One = () => {
  const [isVisible, toggleVisibility] = useToggle(false);

  return (
    <div>
      <button onClick={toggleVisibility}>Toggle Content</button>
      {isVisible && <p>This content appears and disappears!</p>}
    </div>
  );
};

export default One;
