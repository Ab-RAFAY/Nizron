import { useRouterState } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import HeroBackground from './hero-background';

export default function GlobalBackground() {
  const { location } = useRouterState();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isHome = location.pathname === '/' || location.pathname === '';

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-0 transition-opacity duration-1000 pointer-events-none ${isHome ? 'opacity-40' : 'opacity-0'}`}
      style={{ visibility: isHome ? 'visible' : 'hidden' }}
    >
      <div className="absolute inset-0 bg-background-v grid-pattern opacity-50" />
      <div className="absolute inset-0 flex items-center justify-center">
        <HeroBackground />
      </div>
    </div>
  );
}
