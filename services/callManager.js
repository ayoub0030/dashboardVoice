import { db } from '../firebase-config.js';
import { collection, addDoc, updateDoc, serverTimestamp, doc } from 'firebase/firestore';

// Function to store call data
export async function storeCallData(callData) {
    try {
        const callRef = await addDoc(collection(db, 'emergencyCalls'), {
            ...callData,
            timestamp: serverTimestamp(),
            startTime: serverTimestamp(),
            status: 'active'
        });
        return callRef.id;
    } catch (error) {
        console.error('Error storing call data:', error);
        return null;
    }
}

// Function to update call data
export async function updateCallData(callId, updates) {
    try {
        const callRef = doc(db, 'emergencyCalls', callId);
        await updateDoc(callRef, {
            ...updates,
            lastUpdated: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating call data:', error);
    }
}

// Enhanced session configuration
export const SESSION_CONFIG = {
    turn_detection: {
        type: 'server_vad',
        threshold: 0.05,  // Very sensitive
        prefix_padding_ms: 1500,  // Much more padding
        silence_duration_ms: 3000,  // Much longer silence duration
        create_response: true
    },
    input_audio_format: 'g711_ulaw',
    output_audio_format: 'g711_ulaw',
    voice: 'alloy',
    modalities: ["text", "audio"],
    temperature: 0.8
};

// Media buffer management
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
        this.mediaBufferTimeout = setTimeout(callback, timeout);
    }
}
