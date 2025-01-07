import { db } from '../firebase-config.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import dotenv from 'dotenv';

dotenv.config();

// Function to add test emergency calls
async function addTestCalls() {
    try {
        const testCalls = [
          {
            location: 'Casablanca, Morocco',
            coordinates: {
              latitude: 33.5731,
              longitude: -7.5898
            },
            callType: 'Medical',
            priority: 'High',
            status: 'active',
            timestamp: serverTimestamp(),
            startTime: serverTimestamp()
          },
          {
            location: 'Marrakech, Morocco',
            coordinates: {
              latitude: 31.6295,
              longitude: -7.9811
            },
            callType: 'Fire',
            priority: 'Critical',
            status: 'completed',
            timestamp: serverTimestamp(),
            startTime: serverTimestamp(),
            endTime: serverTimestamp()
          },
          {
            location: 'Rabat, Morocco',
            coordinates: {
              latitude: 34.0209,
              longitude: -6.8416
            },
            callType: 'Medical',
            priority: 'Critical',
            status: 'active',
            timestamp: serverTimestamp(),
            startTime: serverTimestamp()
          }
        ];

        for (const call of testCalls) {
          const addedCall = await addDoc(collection(db, 'emergencyCalls'), call);
          console.log(`Added call with ID: ${addedCall.id}`);
        }

        console.log('Test data added successfully!');
    } catch (error) {
        console.error('Error adding test data:', error);
    }
}

// Run the function
addTestCalls();
