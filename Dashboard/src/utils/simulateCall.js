import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

export const simulateEmergencyCall = async (scenario) => {
    try {
        // Create initial emergency call with empty transcript
        const callRef = await addDoc(collection(db, 'emergencyCalls'), {
            location: scenario.location,
            coordinates: scenario.coordinates,
            callType: scenario.callType,
            priority: scenario.priority,
            status: 'active',
            timestamp: serverTimestamp(),
            startTime: serverTimestamp(),
            title: scenario.title,
            transcript: [],
            displayedMessageCount: 0 // Track how many messages to show
        });

        // Start adding messages one by one
        let messageCount = 0;
        const addMessageInterval = setInterval(async () => {
            if (messageCount >= scenario.conversation.length) {
                clearInterval(addMessageInterval);
                return;
            }

            await updateDoc(doc(db, 'emergencyCalls', callRef.id), {
                displayedMessageCount: messageCount + 1
            });

            messageCount++;
        }, 1700);

        return callRef.id;
    } catch (error) {
        console.error('Error simulating emergency call:', error);
        throw error;
    }
};
