'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Service } from '@/types/service';
import ServiceCard from '@/components/services/service-card';
import { Search, LayoutGrid } from 'lucide-react';

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
      {/* Page Header */}
      <div className="mb-8">
        <div className="badge mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
          Services
        </div>
        <h1 className="text-3xl md:text-4xl font-header font-bold text-white tracking-tight mb-3">
          What we <span className="text-gradient">deliver.</span>
        </h1>
        <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
          From custom software to cloud infrastructure — our service catalog covers every layer of modern technology.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search services..."
            className="w-full h-9 bg-white/[0.04] border border-white/[0.08] rounded-lg pl-9 pr-4 outline-none text-sm text-white placeholder:text-slate-600 focus:border-indigo-500/50 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 h-9 rounded-lg text-[12px] font-semibold transition-all duration-200 ${
                selectedCategory === cat 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                  : 'text-slate-400 bg-white/[0.04] border border-white/[0.07] hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="relative">
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-16 card rounded-xl">
            <LayoutGrid className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-500">No services match your search.</p>
          </div>
        )}
      </div>
    </>
  );
}
