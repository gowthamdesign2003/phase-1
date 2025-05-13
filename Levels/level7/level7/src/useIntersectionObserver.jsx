// useIntersectionObserver.js
import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = (callback, options) => {
  const observerRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting) {
        callback();
      }
    }, options);

    observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [callback, options]);

  return observerRef;
};

export default useIntersectionObserver;