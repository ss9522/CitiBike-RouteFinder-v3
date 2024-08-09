import React from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import GoogleMaps from '../components/GoogleMaps';
import './MapPage.css'; 

const MapPage = () => {
  const handleMapLoad = () => {
    console.log('Maps API has loaded.');
  };

  return (
    <div className="page-content">
      <div className="map-page">
        <div className="page-content" style={{ textAlign: 'center' }}>
          <h1>Map</h1>
          <p>This map shows the location of every single CitiBike docking station in New York City.</p>
          <APIProvider 
            apiKey={"YOUR_API_KEY"} 
            onLoad={handleMapLoad}
          >
            <GoogleMaps />
          </APIProvider>
        </div>
      </div>
    </div>
  );
};

export default MapPage;