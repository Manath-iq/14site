'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './HeroSection.module.css';

// Список фотографий
const photos = [
  '/photos/1.png',
  '/photos/3.jpeg',
  '/photos/4.jpeg',
  '/photos/5.jpeg',
  '/photos/6.jpeg',
  '/photos/7.jpeg',
  '/photos/8.jpeg',
  '/photos/9.jpeg',
  '/photos/10.jpeg',
  '/photos/11.jpeg',
  '/photos/12.jpeg',
  '/photos/13.jpeg',
  '/photos/14.jpeg',
  '/photos/15.jpeg',
  '/photos/16.jpeg',
  '/photos/17.jpeg',
  '/photos/18.jpeg',
];

interface HeroSectionProps {
  onComplete?: () => void;
}

export default function HeroSection({ onComplete }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [, forceUpdate] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  // Time state
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // If completed, let natural scroll happen (don't prevent default)
      if (isCompleted) return;

      e.preventDefault();

      const delta = e.deltaY;
      const sensitivity = 0.0008;

      let newProgress = progressRef.current + delta * sensitivity;

      // Clamp progress to a very high value to ensure full exit
      // We set a threshold for "completion".
      // Calculated: Last photo exits around progress ~3.3.
      // Set threshold slightly after that to ensure clear exit.
      const maxProgress = 4.5;
      const completionThreshold = 3.5; // Reduced from 10.0 to remove dead space

      newProgress = Math.max(0, Math.min(newProgress, maxProgress));

      progressRef.current = newProgress;

      if (newProgress >= completionThreshold && !isCompleted) {
        setIsCompleted(true);
        if (onComplete) onComplete();
      }

      forceUpdate({});
    };

    // Attach to GLOBAL window to catch all scrolls
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isCompleted, onComplete]); // Add dependencies

  // Вычисляем позицию и стиль для каждой фотографии
  const getPhotoStyle = (index: number) => {
    const progress = progressRef.current;
    const photoSpacing = 0.12; // Increased spacing slightly
    const photoProgress = progress - index * photoSpacing;

    // Start further left (-120vw) to ensure they enter from completely off-screen
    // Multiplier determines speed across screen - increased to 200 to ensure full travel
    const x = -120 + photoProgress * 200;

    // Center X for parabola peak is 0 (relative to center of screen)
    const centerX = 0;
    const distanceFromCenter = Math.abs(x - centerX);

    // Parabola height (y-offset)
    const maxArcHeight = 60;
    // Normalize distance for curve shape (larger divisor = wider curve)
    const y = maxArcHeight * Math.pow(distanceFromCenter / 50, 2);

    const maxScale = 1.3;
    const minScale = 0.6;

    // Scale factor based on distance from center (0 = center = max scale)
    const scaleFactor = Math.max(0, 1 - Math.min(distanceFromCenter / 45, 1));
    const scale = minScale + (maxScale - minScale) * scaleFactor;

    const opacity = 1;
    const zIndex = Math.round(100 * scaleFactor);

    // Visibility range extended massively to prevent ANY early cut-off
    const isVisible = x > -1000 && x < 1000;

    // Gray scale logic (0 at center, 1 at edges)
    // Sharper transition to color in middle
    const grayscale = Math.min(1, distanceFromCenter / 15);

    return {
      transform: `translate(${x}vw, calc(-50% + ${y}px)) scale(${scale})`,
      opacity: isVisible ? opacity : 0,
      zIndex,
      filter: `grayscale(${grayscale}) brightness(${1 - grayscale * 0.3})`,
    };
  };

  return (
    <div
      ref={containerRef}
      className={styles.heroContainer}
    >
      {/* Background Grid */}
      <div className={styles.gridLayer}>
        <div className={styles.gridLineVertical} style={{ left: '20%' }} />
        <div className={styles.gridLineVertical} style={{ left: '40%' }} />
        <div className={styles.gridLineVertical} style={{ left: '60%' }} />
        <div className={styles.gridLineVertical} style={{ left: '80%' }} />
        <div className={styles.gridLineHorizontal} style={{ top: '20%' }} />
        <div className={styles.gridLineHorizontal} style={{ top: '80%' }} />
      </div>

      {/* Header Layer */}
      <header className={styles.header}>
        <div className={styles.headerTop}>

          <div className={styles.headerInfo}>
            <div className={styles.statusDot}>
              <span className={styles.dot} />
              <div className={styles.statusText}>
                <span>Made with love</span>
                <span className={styles.statusSub}>14 FEB 2026</span>
              </div>
            </div>
            <div className={styles.timeBlock}>
              <span className={styles.time}>{time}</span>
              <span className={styles.timezone}>(GMT+7)</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Big Text Layer */}
      <div className={styles.bigTextLayer}>
        <h1 className={styles.bigText}>HISTORY</h1>
      </div>

      {/* Stats / Footer Layer */}
      <div className={styles.footerLayer}>
        <div className={styles.statGroup}>
          <div className={styles.statNumber}>∞</div>
          <div className={styles.statLabel}>MOMENTS<br />TOGETHER</div>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statGroup}>
          <div className={styles.statNumber}>100%</div>
          <div className={styles.statLabel}>PURE<br />HAPPINESS</div>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statGroup}>
          <div className={styles.statNumber}>1</div>
          <div className={styles.statLabel}>BIG<br />LOVE STORY</div>
        </div>

        <div className={styles.footerBrand}>
          <div className={styles.footerLogo}>us®</div>
          <p className={styles.footerDesc}>
            Every second we spend together is<br />a beautiful memory.
          </p>
        </div>
      </div>

      {/* Floating UI Elements */}
      <div className={styles.floatingUI}>
        <div className={styles.sideTextLeft}>
          OUR STORY<br />
          <span className={styles.dim}>WRITTEN<br />TOGETHER</span>
        </div>

        <div className={styles.sideTextRight}>
          <div className={styles.serviceItem}>
            <span className={styles.serviceNum}>(01)</span>
            <span>Trust</span>
          </div>
          <div className={styles.serviceItem}>
            <span className={styles.serviceNum}>(02)</span>
            <span>Care</span>
          </div>
          <div className={styles.serviceItem}>
            <span className={styles.serviceNum}>(03)</span>
            <span>Love</span>
          </div>
        </div>

        <div className={styles.circularButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>

        <div className={styles.copyright}>
          © 2026
        </div>
      </div>

      {/* Carousel Layer */}
      <div className={styles.carouselLayer}>
        <div className={styles.photosContainer}>
          {photos.map((photo, index) => (
            <div
              key={photo}
              className={styles.photoWrapper}
              style={getPhotoStyle(index)}
            >
              <Image
                src={photo}
                alt={`Photo ${index + 1}`}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: 'auto', height: '100%' }}
                className={styles.photo}
                priority={index < 5}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
