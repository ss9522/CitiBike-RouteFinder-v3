import React, { useEffect, useState } from 'react';
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 40.712776,
  lng: -74.005974,
};

const GoogleMaps = () => {
  const [directions, setDirections] = useState(null);
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: 'Central Park, NY',
        destination: 'Times Square, NY',
        travelMode: window.google.maps.TravelMode.BICYCLING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`Error fetching directions ${result}`);
        }
      }
    );
  }, [map]);

  useEffect(() => {
    if (directions && map) {
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
      directionsRenderer.setDirections(directions);
    }
  }, [directions, map]);

  return null;
};

const MapPage = () => (
  <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
    <div style={containerStyle}>
      <Map center={center} zoom={12}>
        <GoogleMaps />
      </Map>
    </div>
  </APIProvider>
);

export default MapPage;