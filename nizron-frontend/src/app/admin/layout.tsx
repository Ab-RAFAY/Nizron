'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from '@/components/admin/sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is on login page
    if (pathname === '/admin/login') {
      return;
    }

    const token = localStorage.getItem('nizron_token');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  // If we're on login page, just show children
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // If loading or not authenticated, show blank or loader
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Sidebar />
      <main className="pl-64 min-h-screen flex flex-col relative">
        {/* Main Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] pointer-events-none" />
        <div className="relative z-10 flex-1 p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
