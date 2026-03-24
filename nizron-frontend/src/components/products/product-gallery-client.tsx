'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/product';
import ProductCard from '@/components/products/product-card';
import QuickView from '@/components/products/quick-view';
import { Package, Search } from 'lucide-react';

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
      {/* Page Header */}
      <div className="mb-8">
        <div className="badge mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
          Products
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-header font-bold text-white tracking-tight mb-3">
              Our <span className="text-gradient">product suite.</span>
            </h1>
            <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
              Explore purpose-built software solutions designed for real-world enterprise challenges.
            </p>
          </div>

          {/* Search */}
          <div className="relative flex-shrink-0 sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full h-9 bg-white/[0.04] border border-white/[0.08] rounded-lg pl-9 pr-4 outline-none text-sm text-white placeholder:text-slate-600 focus:border-indigo-500/50 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="relative min-h-[200px]">
        {filteredProducts.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
                <motion.div 
                  layout
                  key={product.id} 
                  className="break-inside-avoid"
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  transition={{ duration: 0.25 }}
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
          <div className="text-center py-16 card rounded-xl">
            <Package className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-500">No products match your search.</p>
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
