import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Chip
} from '@mui/material';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import Notification from '../Notification/Notification';

const SummaryDialog = ({ open, onClose, selectedCall, messages }) => {
    const [notification, setNotification] = useState({ open: false, type: null });

    if (!selectedCall) return null;

    // Generate summary based on messages
    const generateSummary = () => {
        let summary = "";
        if (messages.length > 0) {
            const firstMessage = messages[0].text;
            summary = `Caller reports ${firstMessage.toLowerCase()}`;
        }
        return summary;
    };

    const handleDispatch = (type) => {
        setNotification({ open: true, type });
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    Emergency Call Summary
                    <Chip
                        label={selectedCall.status || 'active'}
                        color={selectedCall.status === 'completed' ? 'success' : 'primary'}
                        size="small"
                        sx={{ ml: 1 }}
                    />
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Summary
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {generateSummary()}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Location: {selectedCall.location}
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Dispatch first responders:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                startIcon={<LocalPoliceIcon />}
                                sx={{ 
                                    bgcolor: '#2196F3', 
                                    color: 'white',
                                    '&:hover': { bgcolor: '#1976D2' },
                                    flex: 1,
                                    py: 1.5
                                }}
                                onClick={() => handleDispatch('police')}
                            >
                                Police
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<LocalFireDepartmentIcon />}
                                sx={{ 
                                    bgcolor: '#F44336', 
                                    color: 'white',
                                    '&:hover': { bgcolor: '#D32F2F' },
                                    flex: 1,
                                    py: 1.5
                                }}
                                onClick={() => handleDispatch('fire')}
                            >
                                Firefighters
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<LocalHospitalIcon />}
                                sx={{ 
                                    bgcolor: '#4CAF50', 
                                    color: 'white',
                                    '&:hover': { bgcolor: '#388E3C' },
                                    flex: 1,
                                    py: 1.5
                                }}
                                onClick={() => handleDispatch('medical')}
                            >
                                Paramedics
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Close</Button>
                </DialogActions>
            </Dialog>

            <Notification
                open={notification.open}
                type={notification.type}
                location={selectedCall.location}
                onClose={() => setNotification({ ...notification, open: false })}
            />
        </>
    );
};

export default SummaryDialog;
