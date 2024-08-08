import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Map, AdvancedMarker, useMap, Pin } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

const defaultCenter = {
  lat: 40.712776,
  lng: -74.005974,
};

const locations = [
  { key: 'location1', position: { lat: 40.712776, lng: -74.005974 } },
  { key: 'location2', position: { lat: 40.713776, lng: -74.006974 } },
];

const GoogleMaps = () => {
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [mapZoom, setMapZoom] = useState(12);
  const [markers, setMarkers] = useState({});
  const map = useMap();
  const clusterer = useRef(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = useCallback((marker, key) => {
    if (marker && !markers[key]) {
      setMarkers(prev => ({ ...prev, [key]: marker }));
    } else if (!marker && markers[key]) {
      setMarkers(prev => {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      });
    }
  }, [markers]);

  const handleMarkerClick = useCallback((event) => {
    if (!map || !event.latLng) return;
    console.log('Marker clicked:', event.latLng.toString());
    map.panTo(event.latLng);
  }, [map]);

  const handleCameraChanged = useCallback((ev) => {
    setMapCenter(ev.detail.center);
    setMapZoom(ev.detail.zoom);
    console.log('Camera changed:', ev.detail);
  }, []);

  return (
    <div className="google-maps-container">
      <Map
        center={mapCenter}
        zoom={mapZoom}
        onCameraChanged={handleCameraChanged}
      >
        {locations.map((location) => (
          <AdvancedMarker
            key={location.key}
            position={location.position}
            ref={(marker) => setMarkerRef(marker, location.key)}
            onClick={handleMarkerClick}
          >
            <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
          </AdvancedMarker>
        ))}
      </Map>
    </div>
  );
};

export default GoogleMaps;