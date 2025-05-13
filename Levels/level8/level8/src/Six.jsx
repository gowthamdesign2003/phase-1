import React, { useState, useEffect } from "react";
import axios from "axios";

const Six = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Async function to fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://api.example.com/data");
      // Update the state with fetched data
      setData(response.data);
    } catch (err) {
      // Handle any errors by setting the error state
      setError("An error occurred while fetching data");
    } finally {
      // Set loading state to false once the request is complete
      setLoading(false);
    }
  };

  // Call the fetchData function inside useEffect hook
  useEffect(() => {
    fetchData();
  }, []);

  // Render loading, error, or fetched data
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Fetched Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Six;
