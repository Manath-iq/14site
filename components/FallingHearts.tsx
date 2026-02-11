'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Heart {
    id: number;
    x: number;
    delay: number;
    duration: number;
    scale: number;
}

export default function FallingHearts({ onComplete }: { onComplete: () => void }) {
    const [hearts, setHearts] = useState<Heart[]>([]);

    useEffect(() => {
        // Generate hearts
        const newHearts: Heart[] = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // 0-100vw
            delay: Math.random() * 2, // 0-2s delay
            duration: 3 + Math.random() * 2, // 3-5s duration
            scale: 0.5 + Math.random() * 1, // 0.5-1.5 scale
        }));
        setHearts(newHearts);

        // Auto cleanup after animation finishes (max duration + max delay)
        // 5s duration + 2s delay = 7s max
        const timer = setTimeout(() => {
            onComplete();
        }, 7000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999,
                overflow: 'hidden',
            }}
        >
            <AnimatePresence>
                {hearts.map((heart) => (
                    <motion.div
                        key={heart.id}
                        initial={{ y: -100, x: `${heart.x}vw`, opacity: 1, scale: heart.scale }}
                        animate={{ y: '110vh', opacity: 0 }}
                        transition={{
                            duration: heart.duration,
                            delay: heart.delay,
                            ease: 'linear',
                        }}
                        style={{
                            position: 'absolute',
                            color: '#ff4d6d', // Nice pink/red color
                        }}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            style={{
                                width: '100%',
                                height: '100%',
                                filter: 'drop-shadow(0 0 5px rgba(255, 77, 109, 0.5))',
                            }}
                        >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
