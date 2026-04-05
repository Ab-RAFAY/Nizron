'use client';

import { usePathname } from 'next/navigation';
import HeroBackground from './hero-background';

export default function GlobalBackground() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <div className={`fixed inset-0 z-0 transition-opacity duration-700 pointer-events-none ${isHome ? 'opacity-40' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-background-v grid-pattern" />
      <div className="absolute inset-0 flex items-center justify-center">
         <HeroBackground />
      </div>
    </div>
  );
}
