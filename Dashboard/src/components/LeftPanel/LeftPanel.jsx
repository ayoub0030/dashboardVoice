import React, { useState } from 'react';
import { Box, Typography, InputBase, Paper, Chip, CircularProgress } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { emergencyScenarios } from '../../utils/emergencyScenarios';
import { simulateEmergencyCall } from '../../utils/simulateCall';
import './LeftPanel.css';

const LeftPanel = ({ calls, onCallSelect, selectedCall, loading, error }) => {
  const getIcon = (type, status) => {
    if (status === 'in_progress') {
      return <PhoneInTalkIcon sx={{ color: '#1976d2' }} />;
    }
    switch (type?.toLowerCase()) {
      case 'medical':
        return <LocalHospitalIcon sx={{ color: '#d32f2f' }} />;
      case 'fire':
        return <LocalFireDepartmentIcon sx={{ color: '#d32f2f' }} />;
      default:
        return <LocalHospitalIcon sx={{ color: '#d32f2f' }} />;
    }
  };

  // Calculate statistics
  const totalCalls = calls.length;
  const criticalCalls = calls.filter(call => call.priority?.toLowerCase() === 'high').length;
  const resolvedCalls = calls.filter(call => call.status === 'completed').length;

  // Sort calls by timestamp (newest first) if available, otherwise by startTime
  const sortedCalls = [...calls].sort((a, b) => {
    const timeA = a.timestamp?.toDate?.() || new Date(a.startTime);
    const timeB = b.timestamp?.toDate?.() || new Date(b.startTime);
    return timeB - timeA;
  });

  const [medicalIndex, setMedicalIndex] = useState(0);
  const [fireIndex, setFireIndex] = useState(0);
  const [policeIndex, setPoliceIndex] = useState(0);

  if (loading) {
    return (
      <Box sx={{ 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        p: 2,
        color: 'error.main'
      }}>
        <Typography>Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Emergency Calls</Typography>
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            mb: 2
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search calls..."
          />
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4">{totalCalls}</Typography>
            <Typography variant="body2" color="text.secondary">Total</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="error.main">{criticalCalls}</Typography>
            <Typography variant="body2" color="text.secondary">Critical</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="success.main">{resolvedCalls}</Typography>
            <Typography variant="body2" color="text.secondary">Resolved</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        {sortedCalls.length === 0 ? (
          <Typography sx={{ textAlign: 'center', color: 'text.secondary', mt: 2 }}>
            No emergency calls
          </Typography>
        ) : (
          sortedCalls.map((call) => (
            <Paper
              key={call.id}
              elevation={selectedCall?.id === call.id ? 3 : 1}
              sx={{
                p: 2,
                mb: 2,
                cursor: 'pointer',
                bgcolor: selectedCall?.id === call.id ? 'action.selected' : 'background.paper',
                '&:hover': {
                  bgcolor: 'action.hover'
                }
              }}
              onClick={() => onCallSelect(call)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                {getIcon(call.callType, call.status)}
                <Box sx={{ ml: 1 }}>
                  <Typography variant="subtitle1">{call.location}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Started: {call.startTime ? new Date(call.startTime).toLocaleString() : 'Invalid Date'}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip
                  label={call.status || 'active'}
                  color={call.status === 'completed' ? 'success' : 'primary'}
                  size="small"
                />
                {call.priority && (
                  <Chip
                    label={call.priority}
                    color={call.priority.toLowerCase() === 'high' ? 'error' : 'default'}
                    size="small"
                  />
                )}
              </Box>
            </Paper>
          ))
        )}
      </Box>

      {/* Emergency Scenario Buttons */}
      <Box sx={{ 
        p: 2, 
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        display: 'flex',
        gap: 2,
        justifyContent: 'center'
      }}>
        <Paper
          elevation={2}
          sx={{
            p: 1,
            cursor: 'pointer',
            bgcolor: '#4CAF50',
            color: 'white',
            flex: 1,
            textAlign: 'center',
            '&:hover': { bgcolor: '#388E3C' }
          }}
          onClick={async () => {
            try {
              const scenario = emergencyScenarios.medical[medicalIndex];
              const callId = await simulateEmergencyCall(scenario);
              const newCall = calls.find(call => call.id === callId);
              if (newCall) onCallSelect(newCall);
              setMedicalIndex((medicalIndex + 1) % emergencyScenarios.medical.length);
            } catch (error) {
              console.error('Error simulating medical emergency:', error);
            }
          }}
        >
          <Typography variant="body2">Medical Emergency </Typography>
        </Paper>
        <Paper
          elevation={2}
          sx={{
            p: 1,
            cursor: 'pointer',
            bgcolor: '#F44336',
            color: 'white',
            flex: 1,
            textAlign: 'center',
            '&:hover': { bgcolor: '#D32F2F' }
          }}
          onClick={async () => {
            try {
              const scenario = emergencyScenarios.fire[fireIndex];
              const callId = await simulateEmergencyCall(scenario);
              const newCall = calls.find(call => call.id === callId);
              if (newCall) onCallSelect(newCall);
              setFireIndex((fireIndex + 1) % emergencyScenarios.fire.length);
            } catch (error) {
              console.error('Error simulating fire emergency:', error);
            }
          }}
        >
          <Typography variant="body2">Fire Emergency </Typography>
        </Paper>
        <Paper
          elevation={2}
          sx={{
            p: 1,
            cursor: 'pointer',
            bgcolor: '#2196F3',
            color: 'white',
            flex: 1,
            textAlign: 'center',
            '&:hover': { bgcolor: '#1976D2' }
          }}
          onClick={async () => {
            try {
              const scenario = emergencyScenarios.police[policeIndex];
              const callId = await simulateEmergencyCall(scenario);
              const newCall = calls.find(call => call.id === callId);
              if (newCall) onCallSelect(newCall);
              setPoliceIndex((policeIndex + 1) % emergencyScenarios.police.length);
            } catch (error) {
              console.error('Error simulating police emergency:', error);
            }
          }}
        >
          <Typography variant="body2">Police Emergency  </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default LeftPanel;
