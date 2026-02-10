'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Point {
    x: number;
    y: number;
    id: number;
}

export default function HeartTrail({ parentRef }: { parentRef: React.RefObject<HTMLDivElement> }) {
    const [hearts, setHearts] = useState<Point[]>([]);
    const requestRef = useRef<number>(0);
    const heartIdCounter = useRef(0);

    useEffect(() => {
        const container = parentRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Add a new heart
            const newHeart = { x, y, id: heartIdCounter.current++ };

            setHearts((prev) => [...prev, newHeart]);

            // Remove it after a short delay (handled by Animation or separate cleanup)
            // For performance, let's just keep adding and have a cleanup interval or use Framer Motion's onExitComplete? 
            // Better: standard timeout for removing specific ID
            setTimeout(() => {
                setHearts((prev) => prev.filter(h => h.id !== newHeart.id));
            }, 1000);
        };

        container.addEventListener('mousemove', handleMouseMove);
        return () => container.removeEventListener('mousemove', handleMouseMove);
    }, [parentRef]);

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden', zIndex: 50 }}>
            <AnimatePresence>
                {hearts.map((heart) => (
                    <motion.div
                        key={heart.id}
                        initial={{ opacity: 1, scale: 0.8, y: heart.y, x: heart.x }} // Increased initial scale
                        animate={{ opacity: 0, scale: 2.5, y: heart.y - 100 }} // Increased float distance and end scale
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: 'easeOut' }} // Slightly longer duration
                        style={{
                            position: 'absolute',
                            width: '40px', // Doubled size
                            height: '40px', // Doubled size
                            color: 'red', // Or use SVG
                            pointerEvents: 'none',
                            zIndex: 100,
                        }}
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
