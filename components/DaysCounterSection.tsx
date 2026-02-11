'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import VariableProximity from './VariableProximity';
import FallingHearts from './FallingHearts';

export default function DaysCounterSection() {
    const [days, setDays] = useState(0);
    const [clickCount, setClickCount] = useState(0);
    const [lastClickTime, setLastClickTime] = useState(0);
    const [showHearts, setShowHearts] = useState(false);

    useEffect(() => {
        const startDate = new Date('2024-07-30T00:00:00');
        const now = new Date();

        // Calculate difference in milliseconds
        const diffTime = Math.abs(now.getTime() - startDate.getTime());
        // Convert to days (ceil to count partial days as current day, or floor for full days passed)
        // Usually for "days since", people expect full days or rounded up. Let's use ceil to include "today".
        // Actually, "days since" specific date usually means full 24h periods?
        // Let's use Math.floor for "full days passed" or `Math.ceil` if we want to say "it's the Xth day".
        // 30 July -> 31 July = 1 day? 
        // Let's just standard math.
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        setDays(diffDays);
    }, []);

    const handleTripleClick = useCallback(() => {
        const now = Date.now();
        const timeDiff = now - lastClickTime;

        if (timeDiff < 500) { // 500ms threshold for consecutive clicks
            const newCount = clickCount + 1;
            setClickCount(newCount);

            if (newCount === 3) {
                setShowHearts(true);
                setClickCount(0); // Reset after triggering
            }
        } else {
            setClickCount(1); // Reset if too slow
        }
        setLastClickTime(now);
    }, [clickCount, lastClickTime]);

    return (
        <section style={{
            width: '100vw',
            minHeight: '100vh', // Full screen height to cover previous section
            backgroundColor: '#000',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
            padding: '10vh 0'
        }}>
            {showHearts && <FallingHearts onComplete={() => setShowHearts(false)} />}

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{ textAlign: 'center' }}
            >
                <VariableProximity
                    label={days.toString()}
                    className="days-counter"
                    radius={300}
                    onClick={handleTripleClick}
                    style={{
                        fontSize: '15vw',
                        lineHeight: 1,
                        margin: 0,
                        fontFamily: 'Inter, sans-serif',
                        cursor: 'pointer',
                        userSelect: 'none'
                    }}
                />
                <p style={{
                    fontSize: '1.5rem',
                    color: '#666',
                    marginTop: '1rem',
                    fontWeight: 300,
                    letterSpacing: '0.05em'
                }}>
                    дней с того самого звонка
                </p>
            </motion.div>
        </section>
    );
}
