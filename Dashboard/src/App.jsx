import React, { useState, useEffect } from 'react';
import { Box, Grid, CssBaseline } from '@mui/material';
import LeftPanel from './components/LeftPanel/LeftPanel';
import Map from './components/Map/Map';
import ConversationPanel from './components/ConversationPanel/ConversationPanel';
import { getEmergencyCalls } from './firebase/emergencyService';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './firebase/config';
import './App.css';

function App() {
  const [calls, setCalls] = useState([]);
  const [selectedCall, setSelectedCall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      console.log('Setting up emergency calls listener...');
      // Subscribe to real-time emergency call updates
      const q = query(
        collection(db, 'emergencyCalls')
        // Removing orderBy for now as it might be causing issues
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        console.log('Received snapshot update');
        const callsData = snapshot.docs.map(doc => {
          const data = doc.data();
          console.log('Call data:', { id: doc.id, ...data });
          return {
            id: doc.id,
            ...data
          };
        });
        console.log('Total calls:', callsData.length);
        setCalls(callsData);
        setLoading(false);
      }, (err) => {
        console.error('Error fetching calls:', err);
        setError(err.message);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error('Error setting up listener:', err);
      setError(err.message);
      setLoading(false);
    }
  }, []);

  const handleCallSelect = (call) => {
    setSelectedCall(call);
  };

  return (
    <Box sx={{ 
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      display: 'flex',
      position: 'fixed',
      top: 0,
      left: 0
    }}>
      <CssBaseline />
      <Grid 
        container 
        sx={{ 
          height: '100%',
          width: '100%',
          m: 0,
          p: 0
        }} 
        spacing={0}
      >
        <Grid 
          item 
          xs={12} 
          md={3} 
          sx={{ 
            height: '100%',
            p: '0 !important',
            borderRight: '1px solid rgba(0,0,0,0.12)'
          }}
        >
          <LeftPanel 
            calls={calls}
            onCallSelect={handleCallSelect}
            selectedCall={selectedCall}
            loading={loading}
            error={error}
          />
        </Grid>
        <Grid 
          item 
          xs={12} 
          md={selectedCall ? 6 : 9}
          sx={{ 
            height: '100%',
            p: '0 !important'
          }}
        >
          <Box sx={{ 
            height: '100%',
            width: '100%'
          }}>
            <Map 
              calls={calls}
              selectedCall={selectedCall}
              center={selectedCall?.coordinates ? {
                lat: selectedCall.coordinates.latitude,
                lng: selectedCall.coordinates.longitude
              } : {
                lat: 31.7917,
                lng: -7.0926
              }}
              zoom={selectedCall ? 12 : 6}
            />
          </Box>
        </Grid>
        <Grid 
          item 
          xs={12} 
          md={3} 
          sx={{ 
            height: '100%',
            p: '0 !important',
            display: selectedCall ? 'block' : 'none'
          }}
        >
          <ConversationPanel 
            selectedCall={selectedCall}
            isVisible={!!selectedCall}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
