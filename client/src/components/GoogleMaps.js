import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Map, useMap, MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import './GoogleMaps.css';

const defaultCenter = {
  lat: 40.712776,
  lng: -74.005974,
};

const GoogleMaps = ({ origin = 'Central Park, NY', destination = 'Times Square, NY' }) => {
  const mapRef = useRef(null);
  const [directions, setDirections] = useState(null);
  const [route, setRoute] = useState(null);
  const [routeName, setRouteName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [mapZoom, setMapZoom] = useState(12);
  const map = useMap();

  
  useEffect(() => {
    if (window.google && mapRef.current) {
      new window.google.maps.Map(mapRef.current, {
        center: { lat: 40.712776, lng: -74.005974 },
        zoom: 12,});
      }
    
    if (!map) return;

    setIsLoading(true);
    setError(null);

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.BICYCLING,
      },
      (result, status) => {
        setIsLoading(false);
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          setRoute({
            start: result.routes[0].legs[0].start_address,
            end: result.routes[0].legs[0].end_address,
            distance: result.routes[0].legs[0].distance.text,
            duration: result.routes[0].legs[0].duration.text,
          });
        } else {
          console.error(`Error fetching directions: ${status}`);
          setError(`Error fetching directions: ${status}`);
        }
      }
    );
  }, [map, origin, destination]);

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
    return <div ref={mapRef} className="google-map" />;
  };

  const handleCameraChanged = useCallback((ev) => {
      const newCenter = ev.detail.center;
      const newZoom = ev.detail.zoom;
      
      setMapCenter(newCenter);
      setMapZoom(newZoom);
  
      console.log('Camera changed:', ev.detail);
      console.log('New center:', newCenter);
      console.log('New zoom:', newZoom);
  });
  
    return (
      <div style={containerStyle}>
        <Map 
          center={mapCenter} 
          zoom={mapZoom}
          onCameraChanged={handleCameraChanged}
        >
        {isLoading && <div>Loading directions...</div>}
        {error && <div>Error: {error}</div>}
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
      </Map>
    </div>
  );
};

export default GoogleMaps;