import React, { useEffect, useState } from 'react';
import './GoogleMaps.css';

function GoogleMaps() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Initialise Google Map
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 40.7128, lng: -74.0060 }, // Centered on New York City
      zoom: 12,
      disableDefaultUI: true,
      styles: []
    });

    setMap(map);

    // Fetch CitiBike station info
    fetch('https://gbfs.lyft.com/gbfs/2.3/bkn/en/station_information.json')
      .then(response => response.json())
      .then(data => {
        const stations = data.data.stations;
        plotStationsOnMap(map, stations);
      })
      .catch(error => console.error('Error fetching station data:', error));
  }, []);

  const plotStationsOnMap = (map, stations) => {
    stations.forEach(station => {
      new window.google.maps.Marker({
        position: { lat: station.lat, lng: station.lon },
        map: map,
        title: station.name
      });
    });
  };

  return (
    <div className="google-maps-container">
      <div className="map-container" id="map" />
      <div className="info-and-controls">
        {/* Placeholder for additional controls, info, or buttons */}
      </div>
    </div>
  );
}

export default GoogleMaps;