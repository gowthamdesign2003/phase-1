import React, { useState } from "react";
import "./App.css";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [operator, setOperator] = useState(null);
  const [previousInput, setPreviousInput] = useState("");
  const [result, setResult] = useState(null);
  const handleNumberClick = (num) => {
    setInput(input + num);
  };

  const handleOperatorClick = (op) => {
    if (input === "") return;
    setPreviousInput(input);
    setOperator(op);
    setInput("");
  };

  const calculateResult = () => {
    if (input === "" || previousInput === "" || !operator) return;
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(input);
    let newResult;

    switch (operator) {
      case "+":
        newResult = num1 + num2;
        break;
      case "-":
        newResult = num1 - num2;
        break;
      case "*":
        newResult = num1 * num2;
        break;
      case "/":
        newResult = num2 !== 0 ? num1 / num2 : "Error"; 
        break;
      default:
        return;
    }

    setResult(newResult);
    setInput(newResult.toString());
    setPreviousInput("");
    setOperator(null);
  };

  const clearCalculator = () => {
    setInput("");
    setPreviousInput("");
    setOperator(null);
    setResult(null);
  };

  return (
    <div className="calculator">
      <div className="display">{result !== null ? result : input || "0"}</div>
      <div className="buttons">
        {["7", "8", "9", "/"].map((btn) => (
          <button key={btn} onClick={() => (isNaN(btn) ? handleOperatorClick(btn) : handleNumberClick(btn))}>
            {btn}
          </button>
        ))}
        {["4", "5", "6", "*"].map((btn) => (
          <button key={btn} onClick={() => (isNaN(btn) ? handleOperatorClick(btn) : handleNumberClick(btn))}>
            {btn}
          </button>
        ))}
        {["1", "2", "3", "-"].map((btn) => (
          <button key={btn} onClick={() => (isNaN(btn) ? handleOperatorClick(btn) : handleNumberClick(btn))}>
            {btn}
          </button>
        ))}
        {["0", "C", "=", "+"].map((btn) => (
          <button
            key={btn}
            onClick={() => {
              if (btn === "C") clearCalculator();
              else if (btn === "=") calculateResult();
              else if (isNaN(btn)) handleOperatorClick(btn);
              else handleNumberClick(btn);
            }}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
