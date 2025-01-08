import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const Notification = ({ open, onClose, type, location }) => {
    const getNotificationContent = () => {
        switch (type) {
            case 'police':
                return {
                    icon: <LocalPoliceIcon />,
                    message: `Police units dispatched to ${location}`,
                    color: '#2196F3'
                };
            case 'medical':
                return {
                    icon: <LocalHospitalIcon />,
                    message: `Ambulance dispatched to ${location}`,
                    color: '#4CAF50'
                };
            case 'fire':
                return {
                    icon: <LocalFireDepartmentIcon />,
                    message: `Fire brigade dispatched to ${location}`,
                    color: '#F44336'
                };
            default:
                return {
                    icon: null,
                    message: '',
                    color: '#2196F3'
                };
        }
    };

    const content = getNotificationContent();

    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert
                onClose={onClose}
                severity="info"
                icon={content.icon}
                sx={{
                    bgcolor: content.color,
                    color: 'white',
                    '& .MuiAlert-icon': {
                        color: 'white'
                    },
                    minWidth: '300px'
                }}
            >
                {content.message}
            </Alert>
        </Snackbar>
    );
};

export default Notification;
