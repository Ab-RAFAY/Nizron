import React from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import ServicesGalleryClient from '@/components/services/services-gallery-client';
import { Database, Cloud } from 'lucide-react';

// Incremental Static Regeneration: Cache data on the server for 60 seconds
export const revalidate = 60;

async function getServicesData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  
  try {
    const res = await fetch(`${apiUrl}/services`, { 
      next: { revalidate: 60 } 
    });
    
    if (!res.ok) {
        console.error('Failed to fetch services:', res.statusText);
        return { data: [] };
    }
    
    return res.json();
  } catch (error) {
    console.error('Network error fetching services:', error);
    return { data: [] };
  }
}

/**
 * HIGH-PERFORMANCE SERVICES HUB (Server Component)
 * -----------------------------------------------
 * Optimized for server-side delivery to eliminate all loading states.
 */
export default async function ServicesHub() {
  const response = await getServicesData();
  const services = response?.data || [];

  return (
    <main className="min-h-screen bg-[#050505] flex flex-col pt-20">
      <Navbar />

      <section className="py-24 relative overflow-hidden flex-1">
        {/* Deep-Space Ambient Glows */}
        <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
           {/* Managed by Client Component for Interactivity, with Server Data */}
           <ServicesGalleryClient initialServices={services} />
        </div>
      </section>

      {/* Trust Quote Section */}
      <section className="py-40 border-t border-white/5 bg-[#0D0D0D] relative overflow-hidden">
        <div className="absolute top-0 right-[-5%] w-[500px] h-[500px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-24 items-center relative z-10">
          <div className="space-y-12">
             <h2 className="text-5xl md:text-6xl font-header font-bold text-white leading-[1.1] tracking-tighter">Secure Nizron precision for your next <span className="text-gradient italic">Neural Scale.</span></h2>
             <p className="text-xl text-slate-400 leading-relaxed font-medium">We don't just write code; we architect elite-level systems. Our engineers specialize in high-availability, high-performance logic that scales alongside global business ambition.</p>
             <div className="flex flex-wrap gap-6">
               <div className="flex items-center gap-5 p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] shadow-2xl backdrop-blur-3xl">
                 <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl shadow-2xl group transition-all">
                   <Database className="w-7 h-7 text-indigo-400 group-hover:text-indigo-300" />
                 </div>
                 <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">Logic Architecture</span>
               </div>
               <div className="flex items-center gap-5 p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] shadow-2xl backdrop-blur-3xl">
                 <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl shadow-2xl group transition-all">
                   <Cloud className="w-7 h-7 text-purple-400 group-hover:text-purple-300" />
                 </div>
                 <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">Global Matrix</span>
               </div>
             </div>
          </div>
          <div className="p-20 bg-white/[0.02] border border-white/5 rounded-[4rem] relative overflow-hidden shadow-2xl backdrop-blur-3xl">
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 opacity-40" />
             <p className="text-3xl text-white italic font-semibold relative z-10 leading-snug tracking-tighter">
               "Nizron transformed our technical logic into a high-octane strategic asset. Their engineering precision is the industry benchmark for high-performance scale."
             </p>
             <div className="mt-16 flex items-center gap-8 relative z-10">
               <div className="w-16 h-16 bg-vibrant rounded-2xl shadow-2xl shadow-indigo-600/30" />
               <div>
                 <p className="text-xl font-bold text-white">Chief Technology Officer</p>
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] pt-1">Global Logic Partner</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
