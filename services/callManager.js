import { db } from '../firebase-config.js';
import { collection, addDoc, updateDoc, serverTimestamp, doc, arrayUnion } from 'firebase/firestore';

// Function to add a new emergency call
export async function addEmergencyCall(callData) {
    try {
        const callRef = await addDoc(collection(db, 'emergencyCalls'), {
            ...callData,
            timestamp: serverTimestamp(),
            lastUpdated: serverTimestamp(),
            transcript: []
        });
        console.log('Created new emergency call:', callRef.id);
        return callRef.id;
    } catch (error) {
        console.error('Error adding emergency call:', error);
        return null;
    }
}

// Function to store call data
export async function storeCallData(callData) {
    try {
        const callRef = await addDoc(collection(db, 'emergencyCalls'), {
            ...callData,
            timestamp: serverTimestamp(),
            startTime: serverTimestamp(),
            status: 'active',
            transcript: []
        });
        console.log('Stored call data:', callRef.id);
        return callRef.id;
    } catch (error) {
        console.error('Error storing call data:', error);
        return null;
    }
}

// Function to update call data
export async function updateCallData(callId, updates) {
    try {
        console.log('Updating call data for ID:', callId, 'Updates:', updates);
        const callRef = doc(db, 'emergencyCalls', callId);
        const updateData = {
            ...updates,
            lastUpdated: serverTimestamp()
        };

        // If there's a transcript update, use arrayUnion to add it to the array
        if (updates.transcript) {
            console.log('Adding transcript:', updates.transcript);
            await updateDoc(callRef, {
                ...updateData,
                transcript: arrayUnion(updates.transcript)
            });
        } else {
            await updateDoc(callRef, updateData);
        }
        
        console.log('Successfully updated call data');
    } catch (error) {
        console.error('Error updating call data:', error);
        throw error;
    }
}

// Enhanced session configuration
export const SESSION_CONFIG = {
    turn_detection: {
        type: 'server_vad',
        mode: 'fast',
        vad_threshold: 3,
        speech_activity_timeout: 1000,
        speech_fragments_timeout: 300
    },
    input_audio_format: 'g711_ulaw',
    output_audio_format: 'g711_ulaw',
    voice: 'alloy',
    modalities: ["text", "audio"],
    temperature: 0.8
};

// Media buffer manager class
export class MediaBufferManager {
    constructor() {
        this.mediaBuffer = [];
        this.mediaBufferTimeout = null;
    }

    addToBuffer(chunk) {
        this.mediaBuffer.push(chunk);
    }

    clearBuffer() {
        this.mediaBuffer = [];
    }

    getBuffer() {
        return this.mediaBuffer;
    }

    clearTimeout() {
        if (this.mediaBufferTimeout) {
            clearTimeout(this.mediaBufferTimeout);
            this.mediaBufferTimeout = null;
        }
    }

    setProcessTimeout(callback, timeout = 5000) {
        this.clearTimeout();
        this.mediaBufferTimeout = setTimeout(() => {
            callback(this.getBuffer());
            this.clearBuffer();
        }, timeout);
    }
}
