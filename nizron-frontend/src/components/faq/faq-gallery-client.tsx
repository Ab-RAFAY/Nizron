'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ } from '@/types/product';
import { Search, ChevronDown, MessageCircleQuestion } from 'lucide-react';

interface FAQGalleryClientProps {
  initialFaqs: FAQ[];
}

export default function FAQGalleryClient({ initialFaqs: faqs }: FAQGalleryClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggleAccordion = (id: string) => {
    const newOpenIds = new Set(openIds);
    if (newOpenIds.has(id)) {
      newOpenIds.delete(id);
    } else {
      newOpenIds.add(id);
    }
    setOpenIds(newOpenIds);
  };

  const filteredFaqs = faqs.filter(f => 
    f.questionTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedFaqs = filteredFaqs.reduce((acc, faq) => {
    if (!acc[faq.category]) acc[faq.category] = [];
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

  const categories = Object.keys(groupedFaqs).sort();

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <div className="badge mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
          FAQ
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-header font-bold text-white tracking-tight mb-3">
              Frequently asked <span className="text-gradient">questions.</span>
            </h1>
            <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
              Answers to the most common questions about our services, process, and delivery.
            </p>
          </div>

          {/* Search */}
          <div className="relative flex-shrink-0 sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full h-9 bg-white/[0.04] border border-white/[0.08] rounded-lg pl-9 pr-4 outline-none text-sm text-white placeholder:text-slate-600 focus:border-indigo-500/50 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative min-h-[200px]">
        {categories.length > 0 ? (
          <div className="space-y-10">
            {categories.map((category, catIdx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.08 }}
              >
                <h2 className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-3 pb-3 border-b border-white/[0.07]">
                  {category}
                </h2>
                <div className="space-y-2">
                  {groupedFaqs[category].map((faq) => {
                    const isOpen = openIds.has(faq.id);
                    return (
                      <div 
                        key={faq.id} 
                        className={`card rounded-lg overflow-hidden transition-all duration-200 ${isOpen ? 'border-indigo-500/30 bg-indigo-600/[0.04]' : 'hover:border-white/[0.12]'}`}
                      >
                        <button
                          onClick={() => toggleAccordion(faq.id)}
                          className="w-full px-5 py-4 flex items-center justify-between text-left gap-4"
                        >
                          <span className={`text-sm font-medium transition-colors duration-200 ${isOpen ? 'text-white' : 'text-slate-300'}`}>
                            {faq.questionTitle}
                          </span>
                          <ChevronDown 
                            size={15} 
                            className={`text-slate-500 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-400' : ''}`} 
                          />
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                            >
                              <div className="px-5 pb-4 border-t border-white/[0.06]">
                                <p className="text-sm text-slate-400 leading-relaxed pt-3">
                                  {faq.answer}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 card rounded-xl">
            <MessageCircleQuestion className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-500">No results found for your search.</p>
          </div>
        )}
      </div>
    </>
  );
}
