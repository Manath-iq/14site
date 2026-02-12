'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ASCIIText from './AsciiText';
import BackgroundBeams from './Beams';

const CAT_IMAGES = [
    '/cats/Gemini_Generated_Image_jx7hmsjx7hmsjx7h (1).png',
    '/cats/Gemini_Generated_Image_jx7hmsjx7hmsjx7h (2).png',
    '/cats/Gemini_Generated_Image_jx7hmsjx7hmsjx7h.png',
    '/cats/Gemini_Generated_Image_nqqlaqnqqlaqnqql.png',
    '/cats/Gemini_Generated_Image_pa0yy3pa0yy3pa0y.png',
    '/cats/Gemini_Generated_Image_xxugxxxugxxxugxx (1).png',
    '/cats/Gemini_Generated_Image_xxugxxxugxxxugxx (2).png',
    '/cats/Gemini_Generated_Image_xxugxxxugxxxugxx (3).png',
    '/cats/Gemini_Generated_Image_xxugxxxugxxxugxx.png',
];

interface Cat {
    id: number;
    x: number;
    y: number;
    src: string;
    rotation: number;
    scale: number;
}

export default function FinalSection() {
    const [cats, setCats] = useState<Cat[]>([]);

    const handleSectionClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
        // Prevent interaction if clicking on interactive children (though most are pointer-events-none)
        // But we want clicks everywhere on the background.

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const randomCat = CAT_IMAGES[Math.floor(Math.random() * CAT_IMAGES.length)];
        const randomRotation = Math.random() * 60 - 30; // -30 to 30 degrees
        const randomScale = 0.8 + Math.random() * 0.4; // 0.8 to 1.2

        const newCat: Cat = {
            id: Date.now() + Math.random(),
            x,
            y,
            src: randomCat,
            rotation: randomRotation,
            scale: randomScale,
        };

        setCats((prev) => [...prev, newCat]);
    }, []);

    return (
        <section
            onClick={handleSectionClick}
            style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
            {/* Background Layer */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
                <BackgroundBeams />
            </div>

            {/* Cats Layer - Z-index between background and content */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5, pointerEvents: 'none', overflow: 'hidden' }}>
                <AnimatePresence>
                    {cats.map((cat) => (
                        <motion.img
                            key={cat.id}
                            src={cat.src}
                            alt="Random Cat"
                            initial={{ scale: 0, opacity: 0, rotate: 0 }}
                            animate={{ scale: cat.scale, opacity: 1, rotate: cat.rotation }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                            style={{
                                position: 'absolute',
                                left: cat.x,
                                top: cat.y,
                                maxWidth: '200px', // Reasonable max size
                                transform: 'translate(-50%, -50%)', // Center on click
                            }}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {/* Content Layer */}
            <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%', pointerEvents: 'none' }}>
                {/* ASCII Text Container */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '100%', height: '60vh', minHeight: '400px', position: 'relative' }}>
                        <ASCIIText
                            text="manathuli.love"
                            enableWaves={true}
                            asciiFontSize={10}
                            textFontSize={200}
                            textColor="#ff6b6b"
                            planeBaseHeight={8}
                        />
                    </div>
                </div>

                {/* Footer Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.5 }}
                    transition={{ duration: 1, delay: 1 }}
                    style={{ position: 'absolute', bottom: '3rem', left: 0, width: '100%', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.5em', pointerEvents: 'auto' }}
                >
                    forever
                </motion.div>
            </div>
        </section>
    );
}
