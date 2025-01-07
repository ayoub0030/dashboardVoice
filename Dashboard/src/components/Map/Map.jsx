import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { Wrapper } from '@googlemaps/react-wrapper';

const MapComponent = ({ center, zoom = 6, selectedCall }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize the map if it doesn't exist
    if (!mapInstanceRef.current) {
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
    } else {
      // Update map center and zoom if they change
      mapInstanceRef.current.setCenter(center);
      mapInstanceRef.current.setZoom(zoom);
    }

    // Handle marker
    if (selectedCall) {
      if (!markerRef.current) {
        markerRef.current = new window.google.maps.Marker({
          map: mapInstanceRef.current,
          position: center,
          title: selectedCall.location
        });
      } else {
        markerRef.current.setPosition(center);
        markerRef.current.setTitle(selectedCall.location);
      }
      markerRef.current.setVisible(true);
    } else if (markerRef.current) {
      markerRef.current.setVisible(false);
    }
  }, [center, zoom, selectedCall]);

  return (
    <Box
      ref={mapRef}
      sx={{
        width: '100%',
        height: '100%'
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
