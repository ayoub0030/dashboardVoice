import React, { useEffect, useState, useRef } from 'react';
import { onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Box, Typography, Paper, CircularProgress, Button } from '@mui/material';
import SwapCallsIcon from '@mui/icons-material/SwapCalls';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { emergencyScenarios } from '../../utils/emergencyScenarios';
import SummaryDialog from '../SummaryDialog/SummaryDialog';
import './ConversationPanel.css';

const ConversationPanel = ({ selectedCall }) => {
    const [messages, setMessages] = useState([]);
    const [openSummary, setOpenSummary] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        let unsubscribe;

        if (selectedCall?.id) {
            // Subscribe to real-time updates
            unsubscribe = onSnapshot(doc(db, 'emergencyCalls', selectedCall.id), (doc) => {
                const data = doc.data();
                if (data) {
                    const scenario = emergencyScenarios[data.callType.toLowerCase()]?.find(
                        s => s.title === data.title
                    );
                    
                    if (scenario && typeof data.displayedMessageCount === 'number') {
                        // Show only the messages up to displayedMessageCount
                        setMessages(scenario.conversation.slice(0, data.displayedMessageCount));
                    }
                }
            });
        } else {
            // Reset messages when no call is selected
            setMessages([]);
        }

        // Cleanup subscription on unmount
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [selectedCall]);

    // Scroll to bottom when messages update
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleTimeString();
    };

    // If no call is selected, show a placeholder message
    if (!selectedCall) {
        return (
            <Box
                sx={{
                    width: '400px',
                    height: '100vh',
                    borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#fff'
                }}
            >
                <Typography variant="body1" color="text.secondary">
                    Select a call to view the conversation
                </Typography>
            </Box>
        );
    }

    const getMessageStyle = (role) => {
        return role === 'caller' ? 'caller-message' : 'operator-message';
    };

    return (
        <Box
            sx={{
                width: '400px',
                height: '100vh',
                borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: '#fff'
            }}
        >
            {/* Header */}
            <Box sx={{ p: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                <Typography variant="h6">Live Transcript</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Box
                        sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: selectedCall.status === 'active' ? '#4CAF50' : '#757575',
                            mr: 1
                        }}
                    />
                    <Typography variant="body2" color={selectedCall.status === 'active' ? "success.main" : "text.secondary"}>
                        {selectedCall.status === 'active' ? 'AI Operator Connected' : 'Call Ended'}
                    </Typography>
                </Box>
            </Box>

            {/* Messages Section */}
            <Box 
                className="conversation-container"
                sx={{ 
                    flex: 1, 
                    overflowY: 'auto', 
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}
            >
                {messages.length === 0 ? (
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
                        {selectedCall.status === 'active' ? 'Waiting for conversation to begin...' : 'No messages in this call'}
                    </Typography>
                ) : (
                    messages.map((message, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                justifyContent: message.role === 'operator' ? 'flex-start' : 'flex-end',
                                mb: 2
                            }}
                        >
                            <Paper
                                elevation={1}
                                sx={{
                                    p: 2,
                                    maxWidth: '70%',
                                    bgcolor: message.role === 'operator' ? '#e8eaf6' : '#f5f5f5',
                                    color: message.role === 'operator' ? '#000' : '#000',
                                    borderRadius: message.role === 'operator' ? '20px 20px 20px 5px' : '20px 20px 5px 20px'
                                }}
                            >
                                <Typography variant="body1">
                                    {message.text}
                                </Typography>
                            </Paper>
                        </Box>
                    ))
                )}
                <div ref={messagesEndRef} />
            </Box>

            {/* Call Duration and Actions */}
            {selectedCall.startTime && (
                <Box 
                    sx={{ 
                        p: 2, 
                        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 2
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {selectedCall.status === 'active' && (
                            <>
                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: '#4CAF50',
                                        '&:hover': {
                                            bgcolor: '#388E3C'
                                        },
                                        px: 4,
                                        py: 1
                                    }}
                                    size="large"
                                    startIcon={<SwapCallsIcon />}
                                    onClick={async () => {
                                        try {
                                            await updateDoc(doc(db, 'emergencyCalls', selectedCall.id), {
                                                status: 'transferred',
                                                endTime: new Date().toISOString()
                                            });
                                        } catch (error) {
                                            console.error('Error transferring call:', error);
                                        }
                                    }}
                                >
                                    Transfer
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: '#FF9800',
                                        '&:hover': {
                                            bgcolor: '#F57C00'
                                        },
                                        ml: 2,
                                        px: 4,
                                        py: 1
                                    }}
                                    size="large"
                                    startIcon={<SummarizeIcon />}
                                    onClick={() => setOpenSummary(true)}
                                >
                                    Summary
                                </Button>
                            </>
                        )}
                    </Box>
                </Box>
            )}

            {/* Summary Dialog */}
            <SummaryDialog
                open={openSummary}
                onClose={() => setOpenSummary(false)}
                selectedCall={selectedCall}
                messages={messages}
            />
        </Box>
    );
};

export default ConversationPanel;
