'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Service } from '@/types/service';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import ServiceCard from '@/components/services/service-card';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Layers, LayoutGrid, Database, Cloud } from 'lucide-react';

export default function ServicesHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: response, isLoading, error } = useQuery<{ success: boolean; data: Service[] }>({
    queryKey: ['services'],
    queryFn: () => apiClient.get('/services'),
  });

  const services = response?.data || [];

  const categories = ['All', ...Array.from(new Set(services.map(s => s.category)))];

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         service.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#050505] flex flex-col pt-20">
      <Navbar />

      <section className="py-24 relative overflow-hidden flex-1">
        {/* Deep-Space Ambient Glows */}
        <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20 text-center md:text-left">
            <div className="space-y-6 max-w-2xl mx-auto md:mx-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center space-x-3 px-4 py-1.5 bg-white/[0.03] border border-white/10 text-slate-400 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-2xl mx-auto md:mx-0"
              >
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Expertise Ecosystem</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-8xl font-header font-bold text-white tracking-tighter leading-none"
              >
                Neural <br />
                <span className="text-gradient italic">Solutions.</span>
              </motion.h1>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex-shrink-0 w-full md:w-[450px] group bg-white/[0.03] border border-white/10 rounded-2xl relative overflow-hidden focus-within:border-indigo-500 focus-within:shadow-[0_0_40px_rgba(99,102,241,0.2)] transition-all"
            >
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <Search className="w-6 h-6 text-slate-500 group-focus-within:text-white transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search the architecture..."
                className="w-full h-20 bg-transparent pl-16 pr-6 outline-none text-white text-lg font-medium placeholder:text-slate-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute top-1/2 -translate-y-1/2 right-4 opacity-0 group-focus-within:opacity-100 transition-all">
                  <div className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 rounded-md">REGISTRY</div>
               </div>
            </motion.div>
          </div>

          {/* Categories Grid */}
          <div className="flex items-center space-x-4 mb-20 pb-8 overflow-x-auto no-scrollbar border-b border-white/5">
            <div className="flex items-center space-x-5 pr-8 border-r border-white/10 text-slate-500">
              <SlidersHorizontal className="w-6 h-6" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Logic Filter</span>
            </div>
            {categories.map((cat, idx) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-8 py-3 rounded-xl text-[11px] font-bold uppercase tracking-[0.3em] transition-all duration-500 ${
                  selectedCategory === cat 
                    ? 'bg-vibrant text-white shadow-[0_0_30px_rgba(99,102,241,0.3)] font-black' 
                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-96 bg-white/[0.02] border border-white/5 rounded-[3rem] animate-pulse shadow-2xl shadow-black/50" />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-24 glass rounded-[3rem] shadow-2xl bg-white/[0.03] border-white/10 p-16">
                <p className="text-red-400 font-bold mb-8 text-3xl tracking-tight leading-none">Interface Retrieval Failed</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-10 py-5 bg-vibrant text-white rounded-2xl text-lg font-bold shadow-2xl shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:scale-[1.05] transition-all"
                >
                  Attempt Re-Link
                </button>
              </div>
            ) : filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <AnimatePresence mode="popLayout">
                  {filteredServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-32 bg-white/[0.02] backdrop-blur-3xl rounded-[3.5rem] border border-dashed border-white/10 shadow-2xl max-w-4xl mx-auto">
                <div className="w-24 h-24 bg-white/[0.03] border border-white/5 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl">
                  <LayoutGrid className="w-10 h-10 text-slate-700" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Logical Registry Empty</h3>
                <p className="text-slate-500 text-lg font-medium">Try broadening your neural filters or registry search query.</p>
              </div>
            )}
          </div>
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
