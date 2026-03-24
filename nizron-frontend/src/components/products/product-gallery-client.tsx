'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/product';
import ProductCard from '@/components/products/product-card';
import QuickView from '@/components/products/quick-view';
import { Package, Search, Filter, AlertCircle } from 'lucide-react';

interface ProductGalleryClientProps {
  initialProducts: Product[];
}

export default function ProductGalleryClient({ initialProducts: products }: ProductGalleryClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-24 text-center md:text-left">
         <div className="space-y-6 max-w-2xl mx-auto md:mx-0">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="inline-flex items-center space-x-3 px-4 py-1.5 bg-white/[0.03] border border-white/10 text-slate-400 rounded-full text-xs font-bold uppercase tracking-[0.3em] shadow-2xl mx-auto md:mx-0"
           >
             <Package className="w-5 h-5 text-indigo-400" />
             <span>Neural Ecosystem Directory</span>
           </motion.div>
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-6xl md:text-8xl font-header font-bold text-white tracking-tighter leading-none"
           >
             Neural <br />
             <span className="text-gradient italic">Modules.</span>
           </motion.h1>
         </div>

         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.2 }}
           className="flex-shrink-0 w-full md:w-[450px] flex space-x-4"
         >
           <div className="relative flex-1 group bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden focus-within:border-indigo-500 focus-within:shadow-[0_0_40px_rgba(99,102,241,0.2)] transition-all">
             <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
               <Search className="w-6 h-6 text-slate-500 group-focus-within:text-white transition-colors" />
             </div>
             <input
               type="text"
               placeholder="Search the registry..."
               className="w-full h-20 bg-transparent pl-16 pr-6 outline-none text-white text-lg font-medium placeholder:text-slate-600"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
             <div className="absolute top-1/2 -translate-y-1/2 right-4 opacity-0 group-focus-within:opacity-100 transition-all">
                <div className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 rounded-md uppercase">Registry Sync</div>
             </div>
           </div>
           <button className="h-20 w-20 flex items-center justify-center bg-white/[0.03] border border-white/10 rounded-2xl text-slate-500 hover:text-white hover:border-white/20 transition-all shadow-2xl group">
              <Filter className="w-7 h-7 group-hover:rotate-12 transition-transform" />
           </button>
         </motion.div>
      </div>

      <div className="relative min-h-[400px]">
        {filteredProducts.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
                <motion.div 
                  layout
                  key={product.id} 
                  className="break-inside-avoid"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <ProductCard 
                    product={product} 
                    index={idx}
                    onQuickView={setSelectedProduct} 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-40 bg-white/50 backdrop-blur-xl rounded-[3.5rem] border border-dashed border-slate-200 shadow-soft max-w-4xl mx-auto">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
              <Package className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">No Modules Discovered</h3>
            <p className="text-slate-500 text-lg max-w-md mx-auto font-medium">
              The registry search completed but found zero matches for your query. Try broadening your parameters.
            </p>
          </div>
        )}
      </div>

      <QuickView 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </>
  );
}
