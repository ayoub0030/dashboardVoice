import OpenAI from 'openai';
import { updateCallData } from './callManager.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';
import { createReadStream } from 'fs';
import { writeFile, unlink } from 'fs/promises';
import wav from 'wav';
import FormData from 'form-data';
import fetch from 'node-fetch';

// Load environment variables
dotenv.config();

// Debug log to check if API key is loaded
console.log('OpenAI API Key available:', !!process.env.OPENAI_API_KEY);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

class AudioChunkManager {
    constructor(callId, chunkDurationMs = 10000) { // 10 seconds default
        this.chunks = [];
        this.callId = callId;
        this.chunkDurationMs = chunkDurationMs;
        this.lastProcessedTime = Date.now();
        this.buffer = Buffer.alloc(0);
        this.maxBufferSize = 5 * 1024 * 1024; // 5MB max buffer size
        this.isProcessing = false;
    }

    async addChunk(audioData) {
        try {
            // Check if buffer would exceed max size
            if (this.buffer.length + audioData.length > this.maxBufferSize) {
                console.log('Buffer full, processing current chunk before adding more');
                await this.processCurrentBuffer();
            }

            // Append the new audio data to our buffer
            this.buffer = Buffer.concat([this.buffer, audioData]);

            // Check if enough time has passed to process the chunk
            const currentTime = Date.now();
            if (currentTime - this.lastProcessedTime >= this.chunkDurationMs && !this.isProcessing) {
                await this.processCurrentBuffer();
                this.lastProcessedTime = currentTime;
            }
        } catch (error) {
            console.error('Error in addChunk:', error);
            // Don't throw the error to prevent call interruption
        }
    }

    async processCurrentBuffer() {
        if (this.buffer.length === 0 || this.isProcessing) return;

        try {
            this.isProcessing = true;
            const currentBuffer = this.buffer;
            this.buffer = Buffer.alloc(0); // Clear the buffer

            // Check if the buffer is silent (you can adjust the threshold)
            const isSilent = this.isSilent(currentBuffer);
            if (isSilent) {
                console.log('Ignoring silent audio input.');
                return;
            }

            const tempFilePath = `temp_${Date.now()}.wav`;
            
            // Create WAV header with proper settings
            const wavHeader = Buffer.alloc(44);
            
            // RIFF identifier
            wavHeader.write('RIFF', 0);
            // file length
            wavHeader.writeUInt32LE(36 + currentBuffer.length, 4);
            // WAVE identifier
            wavHeader.write('WAVE', 8);
            // format chunk identifier
            wavHeader.write('fmt ', 12);
            // format chunk length
            wavHeader.writeUInt32LE(16, 16);
            // sample format (1 is PCM)
            wavHeader.writeUInt16LE(1, 20);
            // channel count
            wavHeader.writeUInt16LE(1, 22);
            // sample rate
            wavHeader.writeUInt32LE(8000, 24);
            // byte rate (sample rate * block align)
            wavHeader.writeUInt32LE(8000 * 2, 28);
            // block align
            wavHeader.writeUInt16LE(2, 32);
            // bits per sample
            wavHeader.writeUInt16LE(16, 34);
            // data chunk identifier
            wavHeader.write('data', 36);
            // data chunk length
            wavHeader.writeUInt32LE(currentBuffer.length, 40);

            // Convert ulaw to PCM
            const pcmBuffer = this.ulawToPcm(currentBuffer);
            
            // Write WAV file
            await writeFile(tempFilePath, Buffer.concat([wavHeader, pcmBuffer]));

            // Create form data with the WAV file
            const form = new FormData();
            form.append('file', createReadStream(tempFilePath));
            form.append('model', 'whisper-1');
            form.append('language', 'en');  // Force English language
            form.append('response_format', 'json');
            form.append('temperature', '0.2');  // Lower temperature for more accurate transcription

            // Send to OpenAI API
            const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    ...form.getHeaders()
                },
                body: form
            });

            // Clean up temp file
            try {
                await unlink(tempFilePath);
            } catch (err) {
                console.error('Error cleaning up temp file:', err);
            }

            if (!response.ok) {
                throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            const transcriptionText = result.text;

            if (transcriptionText) {
                // Create message object
                const message = {
                    text: transcriptionText,
                    role: 'user',
                    timestamp: new Date().toISOString(),
                    type: 'whisper_transcription'
                };

                // Update Firebase with the transcription
                await updateCallData(this.callId, {
                    transcript: message
                });

                console.log('Transcription stored:', message);
            }
        } catch (error) {
            console.error('Error processing audio chunk:', error);
        } finally {
            this.isProcessing = false;
        }
    }

    // Convert ulaw to PCM
    ulawToPcm(ulawBuffer) {
        const pcmBuffer = Buffer.alloc(ulawBuffer.length * 2);
        for (let i = 0; i < ulawBuffer.length; i++) {
            const ulawByte = ulawBuffer[i];
            const pcmSample = this.ulawToLinear(ulawByte);
            pcmBuffer.writeInt16LE(pcmSample, i * 2);
        }
        return pcmBuffer;
    }

    // ulaw to linear conversion
    ulawToLinear(ulawByte) {
        const BIAS = 0x84;
        const CLIP = 32635;
        
        ulawByte = ~ulawByte;
        const sign = (ulawByte & 0x80) ? -1 : 1;
        let magnitude = ((ulawByte & 0x70) >> 4) * 2;
        let mantissa = (ulawByte & 0x0F) << 3;
        
        let sample = sign * (((1 << magnitude) | mantissa << (magnitude - 3) | (1 << (magnitude - 4))) - BIAS);
        return Math.max(Math.min(sample, CLIP), -CLIP);
    }

    isSilent(buffer) {
        const threshold = 0.01; // Adjust this threshold as needed
        const maxAmplitude = Math.max(...buffer);
        return maxAmplitude < threshold;
    }

    async finalize() {
        try {
            // Process any remaining audio when the call ends
            if (this.buffer.length > 0) {
                await this.processCurrentBuffer();
            }
        } catch (error) {
            console.error('Error finalizing audio chunks:', error);
        }
    }
}

export { AudioChunkManager };
