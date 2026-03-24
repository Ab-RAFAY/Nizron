'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Service } from '@/types/service';
import { ChevronRight, Cpu } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -12,
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      className="group relative h-full bg-white/[0.03] backdrop-blur-2xl rounded-[2.5rem] border border-white/10 p-10 flex flex-col transition-all duration-500 shadow-2xl shadow-black/50 hover:border-white/20"
    >
      {/* Dynamic Hover Glow */}
      <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/0 via-violet-500/0 to-cyan-500/0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none" />
      
      <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        <Cpu className="w-24 h-24 text-white" />
      </div>

      <div className="flex-1 space-y-8 relative z-10">
        <div className="space-y-3">
          <div className="inline-flex px-3 py-1 bg-white/[0.05] border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 rounded-lg group-hover:text-indigo-400 transition-colors">
            {service.category.trim()}
          </div>
          <h3 className="text-3xl font-header font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-vibrant transition-all duration-300 leading-tight">
            {service.title}
          </h3>
        </div>

        <div className="space-y-6">
          {service.serviceCards.slice(0, 2).map((card, idx) => (
            <div key={idx} className="space-y-2 group/item">
              <h4 className="text-base font-bold text-white/90 flex items-center">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                {card.title}
              </h4>
              <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed font-medium">{card.description}</p>
            </div>
          ))}
        </div>

        <div className="pt-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-4 px-1">Logic Architecture</p>
          <div className="flex flex-wrap gap-2">
            {service.technologies.slice(0, 4).map((tech, idx) => (
              <span 
                key={tech.id || idx} 
                className="px-3.5 py-1.5 bg-white/[0.02] border border-white/5 rounded-xl text-[11px] font-bold text-slate-400 hover:bg-white/5 hover:border-white/20 hover:text-white transition-all cursor-default"
              >
                {tech.name}
              </span>
            ))}
            {service.technologies.length > 4 && (
              <span className="px-3.5 py-1.5 bg-white/[0.02] border border-white/5 rounded-xl text-[11px] font-bold text-slate-600">
                +{service.technologies.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between relative z-10">
        <p className="text-sm font-bold text-slate-400 group-hover:text-white transition-colors uppercase tracking-[0.1em]">Analyze Protocol</p>
        <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-white transform group-hover:rotate-12 group-hover:bg-vibrant group-hover:border-transparent group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all">
          <ChevronRight className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
}
