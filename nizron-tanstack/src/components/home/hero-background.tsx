import React, { lazy, Suspense } from 'react';

// Lazily import the globe to prevent SSR issues (replaces Next.js dynamic)
const GlobeAnimated = lazy(() => import('./globe-map'));

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-90 mix-blend-screen pointer-events-none overflow-hidden mask-radial-faded">
      <div className="transform scale-[1.1] md:scale-[1.2] lg:scale-[1.1] mt-20">
        <Suspense fallback={<div className="w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-3xl animate-pulse" />}>
          <GlobeAnimated />
        </Suspense>
      </div>
    </div>
  );
}
