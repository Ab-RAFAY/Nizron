'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import ProductCard from '@/components/products/product-card';
import QuickView from '@/components/products/quick-view';
import { Package, Search, X } from 'lucide-react';

interface ProductGalleryClientProps {
  initialProducts: Product[];
}

export default function ProductGalleryClient({ initialProducts: products }: ProductGalleryClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlCategory = searchParams.get('category') || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Sync state if URL param changes (e.g., navigating back)
  useEffect(() => {
    setSelectedCategory(urlCategory);
  }, [urlCategory]);

  const categories = Array.from(new Set(products.map(p => p.category?.trim()).filter(Boolean)));

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || p.category?.trim().toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleClearCategory = () => {
    setSelectedCategory('');
    router.replace('/products', { scroll: false });
  };

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

      {/* Active category filter banner */}
      {selectedCategory && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-5 px-4 py-3 bg-indigo-600/10 border border-indigo-500/30 rounded-xl"
        >
          <span className="text-sm text-indigo-300 font-medium">
            Showing products in: <strong className="text-white">{selectedCategory}</strong>
          </span>
          <button
            onClick={handleClearCategory}
            className="ml-auto flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <X size={13} /> Clear filter
          </button>
        </motion.div>
      )}

      {/* Category filter pills */}
      {categories.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-6">
          <button
            onClick={handleClearCategory}
            className={`px-3 h-8 rounded-lg text-[12px] font-semibold transition-all duration-200 ${
              !selectedCategory ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-white/[0.04] border border-white/[0.07] hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 h-8 rounded-lg text-[12px] font-semibold transition-all duration-200 ${
                selectedCategory?.toLowerCase() === cat.toLowerCase() 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                  : 'text-slate-400 bg-white/[0.04] border border-white/[0.07] hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

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
            <p className="text-sm font-semibold text-slate-500">
              {selectedCategory 
                ? `No products found in the "${selectedCategory}" category.` 
                : 'No products match your search.'}
            </p>
            {selectedCategory && (
              <button onClick={handleClearCategory} className="mt-3 text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                Show all products
              </button>
            )}
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
