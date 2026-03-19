'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Product } from '@/types/product';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import ProductCard from '@/components/products/product-card';
import QuickView from '@/components/products/quick-view';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Search, Filter, AlertCircle } from 'lucide-react';

export default function ProductGallery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data: response, isLoading, error } = useQuery<{ success: boolean; data: Product[] }>({
    queryKey: ['public-products'],
    queryFn: () => apiClient.get('/products'),
  });

  const products = response?.data || [];

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#050505] flex flex-col pt-20">
      <Navbar />

      <section className="py-24 relative overflow-hidden flex-1">
        {/* Deep-Space Ambient Glows */}
        <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
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
            {isLoading ? (
              <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className={`bg-white/80 border border-slate-50 rounded-[3rem] animate-pulse shadow-soft ${i % 2 === 0 ? 'h-80' : 'h-[500px]'}`} />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-24 bg-white/80 backdrop-blur-xl rounded-[3.5rem] max-w-3xl mx-auto shadow-soft p-16 border border-slate-100">
                <div className="p-8 bg-red-50 rounded-full w-fit mx-auto mb-10">
                  <AlertCircle className="w-16 h-16 text-red-500" />
                </div>
                <p className="text-slate-900 font-bold mb-4 text-3xl tracking-tight">Ecosystem Disconnected</p>
                <p className="text-slate-500 text-xl mb-12 font-medium">Unable to pull the technical registry from the neural core server.</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-12 py-6 bg-vibrant text-white rounded-[2rem] text-lg font-bold shadow-2xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.05] transition-all"
                >
                  Attempt Sync Interface
                </button>
              </div>
            ) : filteredProducts.length > 0 ? (
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
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickView 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />

      <Footer />
    </main>
  );
}
