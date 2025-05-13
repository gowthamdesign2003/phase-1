// Component to Display Geolocation Data
import React from "react";
import useGeolocation from "./useGeolocation";

const Ten = () => {
  const { location, error } = useGeolocation();

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Geolocation</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : location ? (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      ) : (
        <p>Getting location...</p>
      )}
    </div>
  );
};

export default Ten;