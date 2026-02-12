'use client';

import { motion } from 'framer-motion';
import ASCIIText from './AsciiText';
import BackgroundBeams from './Beams';

export default function FinalSection() {
    return (
        <section style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Background Layer */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                <BackgroundBeams />
            </div>

            {/* Content Layer */}
            <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%' }}>
                {/* ASCII Text Container - Centered Absolutely */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                    <div style={{ width: '100%', height: '60vh', minHeight: '400px', position: 'relative', pointerEvents: 'auto' }}>
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
