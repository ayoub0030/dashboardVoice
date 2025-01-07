import React from 'react';
import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { Wrapper } from '@googlemaps/react-wrapper';

const MapComponent = ({ center = { lat: 31.7917, lng: -7.0926 }, zoom = 6 }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize the map
    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
      styles: [
        {
          featureType: "all",
          elementType: "labels",
          stylers: [{ visibility: "on" }]
        }
      ]
    });
  }, [center, zoom]);

  return (
    <Box
      ref={mapRef}
      sx={{
        width: '100%',
        height: '100%',
        minHeight: '500px'
      }}
    />
  );
};

const Map = (props) => {
  return (
    <Wrapper
      apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      version="beta"
      libraries={['marker']}
    >
      <MapComponent {...props} />
    </Wrapper>
  );
};

export default Map;
