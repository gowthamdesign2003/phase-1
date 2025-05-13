import { useState } from "react";
import useDocumentTitle from "./useDocumentTitle";

function TitleUpdater() {
  const [count, setCount] = useState(0);

  useDocumentTitle(`Count: ${count}`);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default TitleUpdater;
