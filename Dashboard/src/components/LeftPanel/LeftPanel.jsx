import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Chip,
  Paper,
  IconButton,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import WarningIcon from '@mui/icons-material/Warning';
import './LeftPanel.css';

const LeftPanel = ({ calls = [], onCallSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getCallIcon = (callType) => {
    switch (callType?.toLowerCase()) {
      case 'medical':
        return <LocalHospitalIcon color="error" />;
      case 'fire':
        return <LocalFireDepartmentIcon color="error" />;
      default:
        return <WarningIcon color="warning" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical':
        return 'error';
      case 'high':
        return 'warning';
      default:
        return 'default';
    }
  };

  const filteredCalls = calls.filter(call =>
    call.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.callType?.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    const timeA = a.timestamp?.toDate?.() || new Date(a.startTime);
    const timeB = b.timestamp?.toDate?.() || new Date(b.startTime);
    return timeB - timeA;
  });

  const activeCalls = filteredCalls.filter(call => call.status === 'active');
  const completedCalls = filteredCalls.filter(call => call.status === 'completed');

  return (
    <Paper className="left-panel" elevation={3} sx={{ 
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      m: 0,
      borderRadius: 0
    }}>
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(0,0,0,0.12)' }}>
        <Typography variant="h6" className="panel-title">
          Emergency Calls
        </Typography>
        
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search calls..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          className="search-field"
          sx={{ mb: 2 }}
        />

        <Box className="emergency-stats" sx={{ mb: 2 }}>
          <Box className="stat-item">
            <Typography variant="h4">{calls.length}</Typography>
            <Typography variant="body2">Total</Typography>
          </Box>
          <Box className="stat-item">
            <Typography variant="h4" color="error">
              {calls.filter(call => call.priority?.toLowerCase() === 'critical').length}
            </Typography>
            <Typography variant="body2">Critical</Typography>
          </Box>
          <Box className="stat-item">
            <Typography variant="h4" color="success">
              {completedCalls.length}
            </Typography>
            <Typography variant="body2">Resolved</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        px: 2,
        py: 1
      }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Active Calls ({activeCalls.length})
        </Typography>
        <List className="emergency-list" disablePadding>
          {activeCalls.map((call) => (
            <ListItem
              key={call.id}
              button
              onClick={() => onCallSelect?.(call)}
              sx={{
                mb: 1,
                borderRadius: 1,
                border: '1px solid rgba(0,0,0,0.12)',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.04)',
                },
              }}
            >
              <IconButton size="small" sx={{ mr: 1 }}>
                {getCallIcon(call.callType)}
              </IconButton>
              <ListItemText
                primary={call.location || 'Unknown Location'}
                secondary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <Chip
                      label={call.callType || 'Emergency'}
                      size="small"
                      variant="outlined"
                    />
                    {call.priority && (
                      <Chip
                        label={call.priority}
                        size="small"
                        color={getPriorityColor(call.priority)}
                        variant="outlined"
                      />
                    )}
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>

        {completedCalls.length > 0 && (
          <>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, mt: 2 }}>
              Completed Calls ({completedCalls.length})
            </Typography>
            <List className="emergency-list" disablePadding>
              {completedCalls.map((call) => (
                <ListItem
                  key={call.id}
                  button
                  onClick={() => onCallSelect?.(call)}
                  sx={{
                    mb: 1,
                    borderRadius: 1,
                    border: '1px solid rgba(0,0,0,0.12)',
                    opacity: 0.7,
                  }}
                >
                  <IconButton size="small" sx={{ mr: 1 }}>
                    {getCallIcon(call.callType)}
                  </IconButton>
                  <ListItemText
                    primary={call.location || 'Unknown Location'}
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <Chip
                          label={call.callType || 'Emergency'}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default LeftPanel;
