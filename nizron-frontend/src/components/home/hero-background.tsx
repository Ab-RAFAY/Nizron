'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the globe to prevent SSR issues
const GlobeAnimated = dynamic(() => import('./globe-map'), {
  ssr: false,
  loading: () => <div className="w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-3xl animate-pulse" />
});

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-90 mix-blend-screen pointer-events-none overflow-hidden mask-radial-faded">
      <div className="transform scale-[1.1] md:scale-[1.2] lg:scale-[1.1] mt-20">
        <GlobeAnimated />
      </div>
    </div>
  );
}
