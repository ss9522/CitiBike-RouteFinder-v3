import React from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import GoogleMaps from '../components/GoogleMaps';

const MapPage = () => {
  const handleMapLoad = () => {
    console.log('Maps API has loaded.');
  };

  return (
    <div className="page-content">
      <div className="map-page">
        <h1>Map</h1>
        <APIProvider 
          apiKey={"AIzaSyCPpQ44Ra5k-x_mjUTv2o3XtSjbIIkfbUA"} 
          onLoad={handleMapLoad}
        >
          <GoogleMaps />
        </APIProvider>
      </div>
    </div>
  );
};

export default MapPage;