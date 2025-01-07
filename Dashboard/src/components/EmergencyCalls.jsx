import React, { useEffect, useState } from 'react';
import { 
    Box, 
    Card, 
    CardContent, 
    Typography, 
    List,
    Chip
} from '@mui/material';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { format } from 'date-fns';

const EmergencyCalls = () => {
    const [calls, setCalls] = useState([]);
    const [activeCalls, setActiveCalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Setting up Firebase listeners...');
        try {
            // Query for all calls
            const q = query(
                collection(db, 'emergencyCalls'),
                orderBy('timestamp', 'desc')
            );

            // Query for active calls - simplified to avoid index requirement
            const activeQ = query(
                collection(db, 'emergencyCalls'),
                where('status', '==', 'active')
            );

            // Subscribe to updates
            const unsubscribe = onSnapshot(q, (snapshot) => {
                console.log('Received update from Firebase:', snapshot.size, 'documents');
                const callsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                console.log('Processed calls data:', callsData);
                setCalls(callsData);
                setLoading(false);
            }, (err) => {
                console.error('Error in main query:', err);
                setError(err.message);
                setLoading(false);
            });

            const unsubscribeActive = onSnapshot(activeQ, (snapshot) => {
                const activeCallsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                console.log('Active calls:', activeCallsData);
                setActiveCalls(activeCallsData);
            }, (err) => {
                console.error('Error in active query:', err);
            });

            return () => {
                unsubscribe();
                unsubscribeActive();
            };
        } catch (err) {
            console.error('Error setting up listeners:', err);
            setError(err.message);
            setLoading(false);
        }
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'error';
            case 'completed':
                return 'success';
            default:
                return 'default';
        }
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return '';
        try {
            const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
            return format(date, 'MMM dd, yyyy HH:mm:ss');
        } catch (err) {
            console.error('Error formatting timestamp:', timestamp, err);
            return 'Invalid date';
        }
    };

    if (loading) return <Typography>Loading emergency calls...</Typography>;
    if (error) return <Typography color="error">Error: {error}</Typography>;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Emergency Calls
                <Chip 
                    label={`${activeCalls.length} Active`} 
                    color="error" 
                    sx={{ ml: 2 }}
                />
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <Typography variant="h6">Total</Typography>
                        <Typography variant="h4">{calls.length}</Typography>
                    </CardContent>
                </Card>
                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <Typography variant="h6">Critical</Typography>
                        <Typography variant="h4">
                            {calls.filter(call => call.priority === 'Critical').length}
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <Typography variant="h6">Resolved</Typography>
                        <Typography variant="h4">
                            {calls.filter(call => call.status === 'completed').length}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            <List>
                {calls.length === 0 ? (
                    <Typography>No emergency calls found</Typography>
                ) : (
                    calls.map((call) => (
                        <Card key={call.id} sx={{ mb: 2 }}>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h6">
                                        Call ID: {call.id.slice(0, 8)}...
                                    </Typography>
                                    <Chip 
                                        label={call.status} 
                                        color={getStatusColor(call.status)}
                                    />
                                </Box>
                                
                                <Typography color="textSecondary" gutterBottom>
                                    Started: {formatTimestamp(call.timestamp)}
                                </Typography>

                                {call.location && (
                                    <Typography variant="body1" gutterBottom>
                                        Location: {call.location}
                                    </Typography>
                                )}
                                
                                {call.lastMessage && (
                                    <Box mt={2}>
                                        <Typography variant="body1">
                                            Last Message: {call.lastMessage}
                                        </Typography>
                                    </Box>
                                )}

                                {call.priority && (
                                    <Chip 
                                        label={`Priority: ${call.priority}`}
                                        color={call.priority === 'Critical' ? 'error' : 'warning'}
                                        size="small"
                                        sx={{ mt: 1 }}
                                    />
                                )}
                            </CardContent>
                        </Card>
                    ))
                )}
            </List>
        </Box>
    );
};

export default EmergencyCalls;
