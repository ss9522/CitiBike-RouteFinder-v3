import React from 'react';
import GoogleMaps from '../components/GoogleMaps';

const MapPage = () => {
  return (
    <div className="page-content">
      <div className="map-page">
        <h1>Map</h1>
        <GoogleMaps />
      </div>
    </div>
  );
};

export default MapPage;