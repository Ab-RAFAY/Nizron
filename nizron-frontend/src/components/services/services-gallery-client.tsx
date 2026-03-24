'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Service } from '@/types/service';
import ServiceCard from '@/components/services/service-card';
import { Search, SlidersHorizontal, LayoutGrid, Layers } from 'lucide-react';

interface ServicesGalleryClientProps {
  initialServices: Service[];
}

export default function ServicesGalleryClient({ initialServices: services }: ServicesGalleryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...Array.from(new Set(services.map(s => s.category)))];

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         service.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
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
      <div className="flex items-center space-x-4 mb-20 pb-8 overflow-x-auto no-scrollbar border-b border-white/5 font-sans">
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
        {filteredServices.length > 0 ? (
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
    </>
  );
}
