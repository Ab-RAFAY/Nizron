'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/product';
import { 
  X, 
  FileDown, 
  ShieldCheck, 
  MessageCircleQuestion, 
  Package, 
  LayoutGrid, 
  ChevronRight,
  Database,
  Cloud 
} from 'lucide-react';

interface QuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickView({ product, isOpen, onClose }: QuickViewProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/95 backdrop-blur-2xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="w-full max-w-6xl bg-[#0D0D0D]/95 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] relative z-10 overflow-hidden shadow-2xl flex flex-col lg:flex-row my-auto border-t-white/10 shadow-black/80"
          >
            {/* Left Section: Visual / Title */}
            <div className="lg:w-2/5 p-16 bg-white/2 relative flex flex-col justify-end space-y-10 h-[450px] lg:h-auto border-r border-white/5">
              <div className="absolute top-0 right-0 p-40 bg-indigo-600/10 blur-[130px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-32 bg-purple-600/10 blur-[130px] pointer-events-none" />
              
              <div className="space-y-8 relative z-10">
                <motion.div 
                  initial={{ rotate: -10, scale: 0.8 }}
                  animate={{ rotate: -3, scale: 1 }}
                  className="p-6 bg-vibrant rounded-[2.5rem] w-fit shadow-2xl shadow-indigo-600/30 border border-white/20"
                >
                   <Package className="w-12 h-12 text-white" />
                </motion.div>
                <div className="space-y-4">
                  <h2 className="text-6xl font-header font-bold text-white tracking-tighter leading-none italic">
                    {product.name}
                  </h2>
                  <div className="flex flex-wrap gap-3 pt-6">
                     <div className="px-5 py-2 bg-white/3 border border-white/5 text-[10px] uppercase font-bold text-slate-400 rounded-full flex items-center tracking-[0.2em] shadow-2xl">
                        <ShieldCheck className="w-4 h-4 mr-2.5 text-indigo-400" /> Neural Tier
                     </div>
                     <div className="px-5 py-2 bg-white/3 border border-white/5 text-[10px] uppercase font-bold text-slate-400 rounded-full flex items-center tracking-[0.2em] shadow-2xl">
                        <Database className="w-4 h-4 mr-2.5 text-purple-400" /> Deep Matrix
                     </div>
                  </div>
                </div>
              </div>

              {product.productUsePdf && (
                 <a 
                   href={product.productUsePdf} 
                   target="_blank"
                   className="w-full h-20 bg-vibrant text-white font-bold rounded-2xl flex items-center justify-center space-x-4 shadow-2xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-95 transition-all text-lg group relative z-10 overflow-hidden"
                 >
                    <div className="absolute inset-0 liquid-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <FileDown className="w-7 h-7 group-hover:-translate-y-1 transition-transform relative z-10" />
                    <span className="relative z-10 tracking-tight">Technical Protocol PDF</span>
                 </a>
              )}
            </div>

            {/* Right Section: Details / FAQ */}
            <div className="flex-1 p-16 lg:p-20 space-y-16 overflow-y-auto max-h-[85vh] relative no-scrollbar">
               <button 
                 onClick={onClose}
                 className="absolute top-10 right-10 p-5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all z-20 group shadow-2xl"
               >
                 <X className="w-7 h-7 group-hover:rotate-90 transition-transform" />
               </button>

               <div className="space-y-8">
                  <h3 className="text-[11px] uppercase font-bold text-slate-500 tracking-[0.4em] flex items-center">
                    <div className="w-8 h-px bg-indigo-500/30 mr-4" /> Global Registry Abstract
                  </h3>
                  <p className="text-2xl text-slate-400 font-medium leading-relaxed tracking-tight">
                    {product.description}
                  </p>
               </div>

               <div className="grid md:grid-cols-2 gap-20 pt-10">
                  <div className="space-y-10">
                     <h3 className="text-[11px] uppercase font-bold text-slate-500 tracking-[0.4em] flex items-center">
                        <ChevronRight className="w-5 h-5 mr-3 text-purple-500" /> Neural Components
                     </h3>
                     <div className="grid grid-cols-1 gap-6">
                        {product.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start p-6 bg-white/2 border border-white/5 rounded-4xl group/feat hover:bg-white/5 hover:border-white/10 transition-all shadow-2xl shadow-black/20">
                             <div className="w-2.5 h-2.5 bg-vibrant rounded-full mt-2 shrink-0 group-hover:scale-125 transition-transform" />
                             <span className="text-base text-slate-400 font-bold ml-5 group-hover:text-white transition-colors tracking-tight">{feature}</span>
                          </div>
                        ))}
                     </div>
                  </div>

                  <div className="space-y-10">
                     <h3 className="text-[11px] uppercase font-bold text-slate-500 tracking-[0.4em] flex items-center">
                        <MessageCircleQuestion className="w-5 h-5 mr-3 text-indigo-400" /> Logic Directory
                     </h3>
                     <div className="space-y-10">
                        {product.faqs.length > 0 ? (
                           product.faqs.map((faq) => (
                              <div key={faq.id} className="space-y-4 group/faq border-l-2 border-white/5 pl-8 hover:border-indigo-500 transition-colors">
                                 <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors leading-snug tracking-tight">{faq.questionTitle}</h4>
                                 <p className="text-base text-slate-500 leading-relaxed font-medium">"{faq.answer.slice(0, 160)}..."</p>
                              </div>
                           ))
                        ) : (
                           <div className="p-10 bg-white/2 rounded-[2.5rem] border border-dashed border-white/10 text-center shadow-inner">
                              <p className="text-xs text-slate-600 font-bold uppercase tracking-widest italic">No registry entries available.</p>
                           </div>
                        )}
                     </div>
                  </div>
               </div>

               {/* Tech Badge Footer */}
               <div className="pt-20 flex flex-col sm:flex-row items-center justify-between border-t border-white/5 gap-10">
                  <div className="flex items-center space-x-10">
                     <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">Nizron Framework</span>
                        <span className="text-[11px] font-bold text-white tracking-widest">STABLE COMPLIANCE X-28</span>
                     </div>
                     <div className="p-4 bg-white/3 border border-white/10 rounded-2xl shadow-2xl">
                        <Cloud className="w-7 h-7 text-slate-400" />
                     </div>
                  </div>
                  <div className="bg-white/5 border border-white/5 px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 shadow-inner">
                    REGISTRY: {product.id.slice(0, 20)}
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
