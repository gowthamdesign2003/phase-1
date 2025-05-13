import axios from "axios";
import React from "react";

const cache = new Map();
async function useAxios(url, forceRefresh = false) {
  if (!forceRefresh && cache.has(url)) {
    console.log("Returning Cached Data:", cache.get(url));
    return cache.get(url);
  }
  try {
    const response = await axios.get(url);
    cache.set(url, response.data);
    console.log("Fetched Data (With Caching):", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

useAxios("https://jsonplaceholder.typicode.com/posts");
