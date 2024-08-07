// src/components/GoogleMaps.js
import React, { useState, useCallback, useEffect } from 'react'; // Add useEffect import
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 40.712776, // Default center (New York City)
  lng: -74.005974,
};

const GoogleMaps = () => {
  const [directions, setDirections] = useState(null);
  const [response, setResponse] = useState(null);

  const directionsCallback = useCallback((res) => {
    if (res !== null) {
      setDirections(res);
    }
  }, []);

  const handleCalculateRoute = () => {
    const origin = 'Central Park, NY';
    const destination = 'Times Square, NY';

    if (origin !== '' && destination !== '') {
      setResponse({
        origin,
        destination,
        travelMode: 'BICYCLING',
      });
    }
  };

  useEffect(() => { // Add useEffect hook
    console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  }, []);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {response !== null && (
          <DirectionsService options={response} callback={directionsCallback} />
        )}
        {directions !== null && (
          <DirectionsRenderer
            options={{
              directions: directions,
            }}
          />
        )}
      </GoogleMap>
      <button onClick={handleCalculateRoute}>Calculate Route</button>
    </LoadScript>
  );
};

export default GoogleMaps;
