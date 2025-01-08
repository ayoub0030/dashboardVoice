import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  arrayUnion,
  where
} from 'firebase/firestore';
import { db } from './config';

// Collection reference
const emergenciesRef = collection(db, 'emergencies');
const emergencyCallsRef = collection(db, 'emergencyCalls');

// Add a new emergency
export const addEmergency = async (emergency) => {
  try {
    const docRef = await addDoc(emergenciesRef, {
      ...emergency,
      createdAt: new Date().toISOString(),
      status: emergency.status || 'CRITICAL'
    });
    return { id: docRef.id, ...emergency };
  } catch (error) {
    console.error('Error adding emergency: ', error);
    throw error;
  }
};

// Get all emergencies
export const getEmergencies = async () => {
  try {
    const querySnapshot = await getDocs(emergenciesRef);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting emergencies: ', error);
    throw error;
  }
};

// Update emergency status
export const updateEmergencyStatus = async (emergencyId, status) => {
  try {
    const emergencyRef = doc(db, 'emergencies', emergencyId);
    await updateDoc(emergencyRef, { status });
    return true;
  } catch (error) {
    console.error('Error updating emergency status: ', error);
    throw error;
  }
};

// Subscribe to emergency updates
export const subscribeToEmergencies = (callback) => {
  const q = query(emergenciesRef, orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (snapshot) => {
    const emergencies = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(emergencies);
  });
};

// Get emergency calls
export const getEmergencyCalls = (callback) => {
  const q = query(
    emergencyCallsRef,
    orderBy('timestamp', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const calls = [];
    snapshot.forEach((doc) => {
      calls.push({
        id: doc.id,
        ...doc.data()
      });
    });
    callback(calls);
  });
};

// Add a new emergency call
export const addEmergencyCall = async (callData) => {
  try {
    const docRef = await addDoc(emergencyCallsRef, {
      ...callData,
      startTime: new Date().toISOString(),
      status: 'active',
      transcript: [],
      emotions: {
        fear: 0,
        confusion: 0
      }
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding emergency call: ', error);
    throw error;
  }
};

// Update call transcript
export const updateCallTranscript = async (callId, message) => {
  try {
    const callRef = doc(db, 'emergencyCalls', callId);
    await updateDoc(callRef, {
      transcript: arrayUnion({
        text: message.text,
        type: message.type,
        timestamp: new Date().toISOString(),
        role: message.role || 'assistant'
      })
    });
  } catch (error) {
    console.error('Error updating call transcript: ', error);
    throw error;
  }
};

// Subscribe to emergency calls
export const subscribeToEmergencyCalls = (callback) => {
  const q = query(
    emergencyCallsRef,
    where('status', '==', 'active'),
    orderBy('startTime', 'desc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const calls = [];
    snapshot.forEach((doc) => {
      calls.push({
        id: doc.id,
        ...doc.data()
      });
    });
    callback(calls);
  });
};

// Subscribe to a specific call's transcript
export const subscribeToCallTranscript = (callId, callback) => {
  const callRef = doc(db, 'emergencyCalls', callId);
  
  return onSnapshot(callRef, (doc) => {
    if (doc.exists()) {
      callback({
        id: doc.id,
        ...doc.data()
      });
    }
  });
};

// Update call status
export const updateCallStatus = async (callId, status) => {
  try {
    const callRef = doc(db, 'emergencyCalls', callId);
    await updateDoc(callRef, {
      status,
      endTime: status === 'completed' ? new Date().toISOString() : null
    });
  } catch (error) {
    console.error('Error updating call status: ', error);
    throw error;
  }
};

// Update call emotions
export const updateCallEmotions = async (callId, emotions) => {
  try {
    const callRef = doc(db, 'emergencyCalls', callId);
    await updateDoc(callRef, {
      emotions: {
        fear: emotions.fear || 0,
        confusion: emotions.confusion || 0
      }
    });
  } catch (error) {
    console.error('Error updating call emotions: ', error);
    throw error;
  }
};
