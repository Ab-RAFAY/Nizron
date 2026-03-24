import React from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import TeamHeader from '@/components/team/team-header';
import TeamGalleryClient from '@/components/team/team-gallery';

// Incremental Static Regeneration: Cache data on the server for 60 seconds
export const revalidate = 60;

async function getTeamData() {
  // Use the Internal URL if possible, otherwise use the public API URL
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  
  try {
    const res = await fetch(`${apiUrl}/teams`, { 
      // Next.js will cache this response on the server
      next: { revalidate: 60 } 
    });
    
    if (!res.ok) {
        console.error('Failed to fetch team data:', res.statusText);
        return { data: [] };
    }
    
    return res.json();
  } catch (error) {
    console.error('Network error fetching team data:', error);
    return { data: [] };
  }
}

/**
 * HIGH-PERFORMANCE NEURAL ROSTER (Server Component)
 * -----------------------------------------------
 * This page is now 100% Server-Side Rendered (SSR/ISR). 
 * Data is fetched on the server and delivered as instant HTML.
 * Result: 0ms Client-Side Latency for initial load.
 */
export default async function TeamPage() {
  const response = await getTeamData();
  const team = response?.data || [];

  return (
    <main className="min-h-screen bg-[#050505] flex flex-col pt-20">
      <Navbar />

      <section className="py-24 relative overflow-hidden flex-1">
        {/* Deep-Space Ambient Glows */}
        <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          {/* Animated Header (Client Component) */}
          <TeamHeader />

          {/* Functional Gallery (Client Component with pre-fetched props) */}
          <TeamGalleryClient team={team} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
