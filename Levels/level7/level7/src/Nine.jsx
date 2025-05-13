// Component for Infinite Scrolling
import React, { useState } from "react";
import useIntersectionObserver from "./useIntersectionObserver";

const Nine = () => {
  const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => i + 1));

  const loadMoreItems = () => {
    setTimeout(() => {
      setItems((prevItems) => [...prevItems, ...Array.from({ length: 10 }, (_, i) => prevItems.length + i + 1)]);
    }, 1000);
  };

  const observerRef = useIntersectionObserver(loadMoreItems, { threshold: 1.0 });

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Infinite Scrolling</h2>
      <ul>
        {items.map((item) => (
          <li key={item} style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
            Item {item}
          </li>
        ))}
      </ul>
      <div ref={observerRef} style={{ height: "20px" }}></div>
      <p>Loading more...</p>
    </div>
  );
};

export default Nine;
