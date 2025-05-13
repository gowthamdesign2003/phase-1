import { useEffect, useState } from "react";

function Mount(){
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      console.log("Timer is running...");
    }, 1000);

    return () => {
      clearInterval(intervalId);
      console.log("Timer stopped.");
    };
  }, [isRunning]);

  return (
    <div>
      <p>Check the console to see the timer messages.</p>
      <button onClick={() => setIsRunning(false)}>Stop Timer</button>
    </div>
  );
};

export default Mount;
