// MapPage.js
import React, { useState } from 'react';
import GoogleMaps from '../components/GoogleMaps';

const MapPage = () => {
  const [routeName, setRouteName] = useState('');

  const handleSaveRoute = async () => {
    const route = {
      name: routeName,
      // Additional data like start and end points can be added here
    };

    const response = await fetch('/api/routes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(route),
    });

    if (response.ok) {
      alert('Route saved!');
    } else {
      alert('Error saving route.');
    }
  };

  return (
    <div className="map-page">
      <h1>Map</h1>
      <GoogleMaps />
      <div className="route-form">
        <input
          type="text"
          placeholder="Route Name"
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
        />
        <button onClick={handleSaveRoute}>Save Route</button>
      </div>
    </div>
  );
};

export default MapPage;
