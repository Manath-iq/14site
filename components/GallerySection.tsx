'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './GallerySection.module.css'; // We'll create this next
import HeartTrail from './HeartTrail';

const galleryPhotos = [
    '/gallery/1.png',
    '/gallery/2.png',
    '/gallery/3.png',
    '/gallery/4.png',
    '/gallery/5.png',
];

export default function GallerySection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % galleryPhotos.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
    };

    return (
        <section className={styles.gallerySection}>
            <div className={styles.contentContainer}>
                {/* Left Column: Text */}
                <div className={styles.textColumn}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className={styles.title}
                    >
                        Love is...
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={styles.subtitle}
                    >
                        В это 14 февраля давай вспомним, что такое любовь...
                        <br />
                        (On this February 14th, let's remember what love is...)
                    </motion.p>
                </div>

                {/* Right Column: Interactive Gallery */}
                <div className={styles.galleryColumn}>
                    <div className={styles.galleryWrapper} ref={containerRef}>
                        <HeartTrail parentRef={containerRef as React.RefObject<HTMLDivElement>} />

                        <div className={styles.imageContainer}>
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className={styles.activeImageWrapper}
                            >
                                <Image
                                    src={galleryPhotos[currentIndex]}
                                    alt="Gallery Image"
                                    fill
                                    className={styles.galleryImage}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </motion.div>
                        </div>

                        {/* Navigation Arrows */}
                        <button className={`${styles.navButton} ${styles.prev}`} onClick={handlePrev}>
                            ←
                        </button>
                        <button className={`${styles.navButton} ${styles.next}`} onClick={handleNext}>
                            →
                        </button>

                        <div className={styles.counter}>
                            {currentIndex + 1} / {galleryPhotos.length}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
