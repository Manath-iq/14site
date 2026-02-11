'use client';

import { useEffect, useRef, useState } from 'react';

export default function SecretLoveAudio() {
    const [isPlaying, setIsPlaying] = useState(false);
    // Store the sequence of keys pressed
    const keySequence = useRef<string[]>([]);
    // Store the audio element
    const audioRef = useRef<HTMLAudioElement | null>(null);
    // Timer to clear sequence if user stops typing
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Initialize audio
        audioRef.current = new Audio('/music/love.mp3');

        const handleKeyDown = (e: KeyboardEvent) => {
            // Add key to sequence
            keySequence.current.push(e.key.toLowerCase());

            // Trim sequence to last 4 chars (length of "love")
            if (keySequence.current.length > 4) {
                keySequence.current.shift();
            }

            // Check for match
            if (keySequence.current.join('') === 'love') {
                if (audioRef.current) {
                    // Reset if already playing or just play
                    audioRef.current.currentTime = 0;
                    audioRef.current.play().catch(err => console.log('Audio play failed:', err));
                    setIsPlaying(true);

                    // Reset sequence to allow re-triggering? 
                    // Or keep it? Let's reset.
                    keySequence.current = [];
                }
            }

            // Clear previous timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Set new timeout to clear sequence after 2 seconnds of inactivity
            timeoutRef.current = setTimeout(() => {
                keySequence.current = [];
            }, 2000);
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            // Cleanup audio
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    return null; // This component renders nothing
}
