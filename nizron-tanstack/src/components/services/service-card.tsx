import React from 'react';
import { motion } from 'framer-motion';
import type { Service } from '../../types';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const category = service.category.trim();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative h-full bg-white/3 backdrop-blur-xl rounded-3xl border border-white/10 p-7 flex flex-col transition-all duration-300 hover:border-white/20 hover:bg-white/5"
    >
      <div className="flex-1 space-y-5 relative z-10">
        {/* Category Badge + Title */}
        <div className="space-y-2">
          <div className="inline-flex px-2 py-0.5 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-500 rounded-md">
            {category}
          </div>
          <h3 className="text-xl font-header font-bold text-white leading-tight group-hover:text-indigo-400 transition-colors">
            {service.title}
          </h3>
        </div>

        {/* Description */}
        {service.description && (
          <p className="text-sm text-slate-400 leading-relaxed">
            {service.description}
          </p>
        )}

        {/* Bullet Points (ServiceCards) */}
        {service.serviceCards.length > 0 && (
          <div className="space-y-2 pt-1">
            {service.serviceCards.slice(0, 5).map((card, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-indigo-400 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-300 font-medium">{card.title}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack */}
        {service.technologies.length > 0 && (
          <div className="pt-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600 mb-2">Tech Stack</p>
            <div className="flex flex-wrap gap-1.5">
              {service.technologies.slice(0, 4).map((tech, idx) => (
                <span 
                  key={tech.id || idx} 
                  className="px-2.5 py-1 bg-white/4 border border-white/[0.07] rounded-lg text-[10px] font-medium text-slate-400"
                >
                  {tech.name}
                </span>
              ))}
              {service.technologies.length > 4 && (
                <span className="px-2.5 py-1 bg-white/2 border border-white/5 rounded-lg text-[10px] text-slate-600">
                  +{service.technologies.length - 4}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer: Show Related Products */}
      <div className="mt-7 pt-5 border-t border-white/[0.07] flex items-center justify-between relative z-10">
        <span className="text-[12px] font-semibold text-slate-500">Related Products</span>
        <Link
          to={`/products`}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/10 border border-indigo-500/20 hover:bg-indigo-600/20 hover:border-indigo-500/40 text-indigo-400 hover:text-indigo-300 rounded-xl text-[12px] font-semibold transition-all duration-200"
        >
          Show related products <ChevronRight size={13} />
        </Link>
      </div>
    </motion.div>
  );
}
