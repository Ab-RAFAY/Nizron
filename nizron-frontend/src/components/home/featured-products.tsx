'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import { ArrowRight, Package, ShieldCheck, Database, Zap } from 'lucide-react';
import Link from 'next/link';

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  // Show only first 3 products
  const displayedProducts = products.slice(0, 3);

  if (displayedProducts.length === 0) return null;

  return (
    <section className="py-24 bg-[#080a0f] relative overflow-hidden border-t border-white/[0.07]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[600px] pointer-events-none">
        <div className="absolute top-0 right-0 p-40 bg-primary/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-0 left-0 p-40 bg-indigo-600/10 blur-[130px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <div className="badge mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
              Platforms
            </div>
            <h2 className="text-3xl md:text-5xl font-header font-bold text-white tracking-tight leading-tight">
              Purpose-built <span className="text-gradient">software.</span>
            </h2>
            <p className="text-base text-slate-400 mt-4 leading-relaxed">
              We Don't just build projects; we engineer scalable products that solve complex enterprise challenges.
            </p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-white transition-colors group mb-2"
          >
            View Full Registry <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-white/3 border border-white/8 rounded-[2.5rem] hover:border-white/20 transition-all duration-300 group hover:-translate-y-2"
            >
              <div className="w-14 h-14 bg-white/5 border border-white/8 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-vibrant transition-colors duration-500">
                <Package className="w-7 h-7 text-indigo-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{product.name}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3">
                {product.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {product.features.slice(0, 3).map((f, i) => (
                  <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold text-slate-500 tracking-widest uppercase truncate max-w-[80px]">
                    {f}
                  </span>
                ))}
              </div>

              <Link
                href="/products"
                className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest"
              >
                Explore Specs <ArrowRight size={13} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Floating Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
           {[
             { label: 'Security Layer', icon: ShieldCheck, value: 'Advanced' },
             { label: 'Latency', icon: Zap, value: '<10ms' },
             { label: 'Architecture', icon: Database, value: 'Modular' },
             { label: 'Status', icon: Package, value: 'Stable' },
           ].map((item, idx) => (
             <div key={idx} className="flex items-center gap-3 p-4 bg-white/2 border border-white/5 rounded-2xl">
               <item.icon size={14} className="text-indigo-400 shadow-glow" />
               <div className="flex flex-col">
                 <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{item.label}</span>
                 <span className="text-xs font-bold text-slate-300">{item.value}</span>
               </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
