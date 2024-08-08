import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Map, Marker, useMap } from '@vis.gl/react-google-maps';
import './GoogleMaps.css';

const defaultCenter = {
  lat: 40.712776,
  lng: -74.005974,
};

const GoogleMaps = ({ origin = 'Riverside Park, NY', destination = 'Battery Park, NY' }) => {
  const mapRef = useRef(null);
  const [pointA, setPointA] = useState(null);
  const [pointB, setPointB] = useState(null);
  const [directions, setDirections] = useState(null);
  const [route, setRoute] = useState(null);
  const [routeName, setRouteName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [mapZoom, setMapZoom] = useState(12);
  const map = useMap();

  const handleMapClick = useCallback((e) => {
    const clickedLat = e.detail.latLng.lat;
    const clickedLng = e.detail.latLng.lng;
    
    if (!pointA) {
      setPointA({ lat: clickedLat, lng: clickedLng });
    } else if (!pointB) {
      setPointB({ lat: clickedLat, lng: clickedLng });
    } else {
      // Reset points if both are already set
      setPointA({ lat: clickedLat, lng: clickedLng });
      setPointB(null);
      setDirections(null);
      setRoute(null);
    }
  }, [pointA, pointB]);

  useEffect(() => {
    if (directions && map) {
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
      directionsRenderer.setDirections(directions);
    }
  }, [directions, map]);

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
      distance: route.distance,
      duration: route.duration,
    };

    try {
      const response = await fetch('http://localhost:3000/api/routes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(routeData),
      });

      if (response.ok) {
        alert('Route saved successfully!');
        setRouteName('');
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

  const handleCameraChanged = useCallback((ev) => {
    const newCenter = ev.detail.center;
    const newZoom = ev.detail.zoom;
    
    setMapCenter(newCenter);
    setMapZoom(newZoom);

    console.log('Camera changed:', ev.detail);
    console.log('New center:', newCenter);
    console.log('New zoom:', newZoom);
  }, []);
  
  return (
    <div className="google-maps-container">
      <div className="map-container">
        <Map
          center={mapCenter}
          zoom={mapZoom}
          onClick={handleMapClick}
          onCameraChanged={handleCameraChanged}
          style={{ width: '100%', height: '100%' }}
        >
          {isLoading && <div>Loading directions...</div>}
          {error && <div>Error: {error}</div>}
          {pointA && (
            <Marker position={pointA} />
          )}
          {pointB && (
            <Marker position={pointB} />
          )}
        </Map>
      </div>
      <div className="selected-points">
        {pointA && (
          <p>Point A: {pointA.lat.toFixed(6)}, {pointA.lng.toFixed(6)}</p>
        )}
        {pointB && (
          <p>Point B: {pointB.lat.toFixed(6)}, {pointB.lng.toFixed(6)}</p>
        )}
      </div>      
      <div className="info-and-controls">
        {route && (
          <div className="route-info">
            <p>Distance: {route.distance}</p>
            <p>Duration: {route.duration}</p>
          </div>
        )}
        <div className="route-form">
          <input
            type="text"
            placeholder="Route Name"
            value={routeName}
            onChange={(e) => setRouteName(e.target.value)}
          />
          <button onClick={handleSaveRoute} disabled={isSaving || !route || isLoading}>
            {isSaving ? 'Saving...' : 'Save Route'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoogleMaps;