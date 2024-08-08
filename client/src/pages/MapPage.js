import React, { useState, useCallback } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import GoogleMaps from '../components/GoogleMaps';
// import { API_ROUTES } from '../config';

const API_ROUTES = 'http://localhost:3000/api/routes';

const MapPage = () => {
  const [routeName, setRouteName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [route, setRoute] = useState(null);

  const onRouteChange = useCallback((newRoute) => {
    setRoute(newRoute);
  }, []);

  const handleSaveRoute = async () => {
    if (!routeName.trim() || !route) {
      alert('Please enter a route name and ensure a route is selected.');
      return;
    }

    setIsSaving(true);
    const routeData = {
      name: routeName,
      startLocation: route.start,
      endLocation: route.end,
      waypoints: route.waypoints,
      distance: route.distance,
      duration: route.duration,
    };

    try {
      const response = await fetch(API_ROUTES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(routeData),
      });

      if (response.ok) {
        alert('Route saved successfully!');
        setRouteName('');
        setRoute(null);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error saving route.');
      }
    } catch (error) {
      console.error('Failed to save route:', error);
      alert(`Error saving route: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="page-content">
      <div className="map-page">
        <h1>Map</h1>
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <Map
            defaultCenter={{ lat: 40.712776, lng: -74.005974 }}
            defaultZoom={12}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
          >
            <GoogleMaps onRouteChange={onRouteChange} />
          </Map>
        </APIProvider>
        <div className="route-form">
          <input
            type="text"
            placeholder="Route Name"
            value={routeName}
            onChange={(e) => setRouteName(e.target.value)}
          />
          <button onClick={handleSaveRoute} disabled={isSaving || !route}>
            {isSaving ? 'Saving...' : 'Save Route'}
          </button>
        </div>
        {route && (
          <div className="route-info">
            <p>Distance: {route.distance}</p>
            <p>Duration: {route.duration}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPage;