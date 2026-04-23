import React from 'react';
import { motion } from 'framer-motion';
import type { Product } from '../../types';
import { Eye, FileDown, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  index: number;
}

export default function ProductCard({ product, onQuickView, index }: ProductCardProps) {
  // Varying aspect ratios for asymmetrical feel
  const aspectRatios = ['aspect-[4/5]', 'aspect-square', 'aspect-[3/4]'];
  const aspectRatio = aspectRatios[index % aspectRatios.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        y: -12,
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      className={`group relative ${aspectRatio} bg-white/3 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col justify-end p-10 cursor-pointer transition-all duration-500 shadow-2xl shadow-black/50 hover:border-white/20`}
      onClick={() => onQuickView(product)}
    >
      {/* Product Image / Background */}
      <div className="absolute inset-0 z-0 bg-[#050505]">
        {product.images?.[0]?.image ? (
          <img 
            src={product.images[0].image} 
            alt={product.name} 
            className="w-full h-full object-cover opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700" 
          />
        ) : (
          <div className="w-full h-full bg-white/2 flex items-center justify-center opacity-40">
            <Eye className="w-12 h-12 text-slate-700" />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/60 to-transparent group-hover:via-[#050505]/40 transition-all duration-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-6">
        <div className="space-y-2">
          <h3 className="text-3xl font-header font-bold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-vibrant transition-all duration-300">
            {product.name}
          </h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em] line-clamp-1">
            Logic Module • {product.features.length} Subsystems
          </p>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <div className="flex items-center space-x-2 text-slate-400 font-bold text-xs uppercase tracking-widest group-hover:text-white group-hover:translate-x-1 transition-all">
             <span>Protocol View</span>
             <ArrowRight className="w-4 h-4" />
          </div>
          {product.productUsePdf && (
             <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-vibrant hover:border-transparent transition-all shadow-lg hover:shadow-indigo-500/20">
                <FileDown className="w-5 h-5" />
             </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

