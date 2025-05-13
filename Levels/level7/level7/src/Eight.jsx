import React, { useState, useEffect } from "react";
import useDebounce from "./useDebounce";

function Eight() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      console.log("Searching for:", debouncedQuery);
      // Perform API call or any other search logic here
    }
  }, [debouncedQuery]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Debounced Search</h2>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />
      <p>Searching for: {debouncedQuery}</p>
    </div>
  );
}

export default Eight;
