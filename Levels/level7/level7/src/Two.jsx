import React from "react";
import useCounter from "./Usecounter";

const Two = () => {
  const { count, increment, decrement, reset } = useCounter(0, 1); // Start at 10, step of 2

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Counter: {count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Two;
