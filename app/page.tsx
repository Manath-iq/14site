'use client';

import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import GallerySection from '@/components/GallerySection';
import DaysCounterSection from '@/components/DaysCounterSection';

export default function Home() {
  const [heroCompleted, setHeroCompleted] = useState(false);

  return (
    <main style={{ backgroundColor: '#000', minHeight: '100vh', overflowX: 'hidden' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, pointerEvents: heroCompleted ? 'none' : 'auto' }}>
        <HeroSection onComplete={() => setHeroCompleted(true)} />
      </div>

      {heroCompleted && (
        <div style={{ position: 'relative', zIndex: 20, marginTop: '100vh' }}>
          <GallerySection />
          <DaysCounterSection />
        </div>
      )}
    </main>
  );
}
