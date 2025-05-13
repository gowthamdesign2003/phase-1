import React from "react";
import useInput from "./useInput";

const Form = () => {
  const name = useInput("");
  const email = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", name.value);
    console.log("Email:", email.value);
    name.reset();
    email.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" {...name} />
      <input type="email" placeholder="Email" {...email} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
