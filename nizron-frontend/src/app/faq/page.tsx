'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { FAQ } from '@/types/product';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, MessageCircleQuestion, Layers, AlertCircle } from 'lucide-react';

export default function FAQGallery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const { data: response, isLoading, error } = useQuery<{ success: boolean; data: FAQ[] }>({
    queryKey: ['public-faq'],
    queryFn: () => apiClient.get('/faq'),
  });

  const faqs = response?.data || [];

  const toggleAccordion = (id: string) => {
    const newOpenIds = new Set(openIds);
    if (newOpenIds.has(id)) {
      newOpenIds.delete(id);
    } else {
      newOpenIds.add(id);
    }
    setOpenIds(newOpenIds);
  };

  // Filter and Group
  const filteredFaqs = faqs.filter(f => 
    f.questionTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedFaqs = filteredFaqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

  const categories = Object.keys(groupedFaqs).sort();

  return (
    <main className="min-h-screen bg-[#050505] flex flex-col pt-20">
      <Navbar />

      <section className="py-24 relative overflow-hidden flex-1">
        {/* Deep-Space Ambient Glows */}
        <div className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <div className="text-center space-y-10 mb-20">
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="inline-flex items-center space-x-3 px-4 py-1.5 bg-white/[0.03] backdrop-blur-md border border-white/10 text-slate-400 rounded-full text-xs font-bold uppercase tracking-[0.3em] mx-auto shadow-2xl"
             >
               <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
               <span>Neural Knowledge Matrix</span>
             </motion.div>
             <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-6xl md:text-8xl font-header font-bold text-white tracking-tighter leading-none"
             >
               Interface <span className="text-gradient italic">Support.</span>
             </motion.h1>

             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="max-w-3xl mx-auto relative group pt-8"
             >
               <div className="absolute inset-y-0 mt-8 left-6 flex items-center pointer-events-none">
                 <Search className="w-7 h-7 text-slate-500 group-focus-within:text-white transition-all duration-300" />
               </div>
               <input
                 type="text"
                 placeholder="Search neural blueprints, cloud logic, or technical support..."
                 className="w-full h-20 bg-white/[0.03] border border-white/10 rounded-2xl pl-16 pr-6 outline-none text-white text-xl focus:border-indigo-500 focus:shadow-[0_0_40px_rgba(99,102,241,0.2)] transition-all font-medium backdrop-blur-3xl placeholder:text-slate-600"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
               <div className="absolute top-1/2 -translate-y-1/2 right-6 pt-8 opacity-0 group-focus-within:opacity-100 transition-opacity">
                  <div className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 rounded-md">NEURAL QUERY ACTIVE</div>
               </div>
             </motion.div>
          </div>

          <div className="relative min-h-[400px]">
            {isLoading ? (
               <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-24 bg-white/[0.02] rounded-2xl animate-pulse shadow-2xl border border-white/5" />
                  ))}
               </div>
            ) : error ? (
              <div className="text-center py-24 glass rounded-[3rem] max-w-2xl mx-auto shadow-2xl bg-white/[0.03] border border-white/10 p-16">
                <div className="p-6 bg-red-500/10 rounded-full w-fit mx-auto mb-10 border border-red-500/20">
                  <AlertCircle className="w-12 h-12 text-red-500" />
                </div>
                <p className="text-white font-bold mb-3 text-3xl tracking-tight">System Node Offline</p>
                <p className="text-slate-500 text-lg mb-12 font-medium">Unable to pull the technical logic from the core server matrix.</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-10 py-5 bg-vibrant text-white rounded-2xl text-lg font-bold shadow-2xl shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:scale-[1.05] transition-all"
                >
                  Attempt Signal Restoration
                </button>
              </div>
            ) : categories.length > 0 ? (
               <div className="space-y-20">
                 {categories.map((category, catIdx) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIdx * 0.1 }}
                      className="space-y-10"
                    >
                       <h2 className="flex items-center text-3xl font-header font-bold text-white border-b border-white/5 pb-10 group cursor-default">
                          <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl mr-6 group-hover:bg-vibrant group-hover:text-white group-hover:border-transparent transition-all duration-300">
                             <Layers className="w-8 h-8 text-indigo-400" />
                          </div>
                          {category}
                       </h2>
                       <div className="space-y-6">
                         {groupedFaqs[category].map((faq) => {
                            const isOpen = openIds.has(faq.id);
                            return (
                              <div 
                                key={faq.id} 
                                className={`bg-white/[0.03] border transition-all duration-500 rounded-[2rem] overflow-hidden backdrop-blur-2xl ${isOpen ? 'border-indigo-500 shadow-2xl shadow-indigo-600/10' : 'border-white/10 shadow-black/20 hover:border-white/20'}`}
                              >
                                 <button
                                   onClick={() => toggleAccordion(faq.id)}
                                   className="w-full px-10 py-8 flex items-center justify-between text-left focus:outline-none group"
                                 >
                                   <span className={`text-xl font-bold transition-all duration-300 pr-8 ${isOpen ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                                      {faq.questionTitle}
                                   </span>
                                   <div className={`p-3 rounded-xl transition-all duration-500 ${isOpen ? 'bg-white text-[#050505] rotate-180' : 'bg-white/5 border border-white/5 text-slate-500 group-hover:bg-white/10 group-hover:text-white group-hover:border-white/10'}`}>
                                      <ChevronDown className="w-6 h-6" />
                                   </div>
                                 </button>
                                 <AnimatePresence>
                                   {isOpen && (
                                     <motion.div
                                       initial={{ height: 0, opacity: 0 }}
                                       animate={{ height: 'auto', opacity: 1 }}
                                       exit={{ height: 0, opacity: 0 }}
                                       transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                                     >
                                       <div className="px-10 pb-10 pt-4 border-t border-white/5">
                                         <p className="text-lg text-slate-400 leading-relaxed font-medium">
                                            {faq.answer}
                                         </p>
                                       </div>
                                     </motion.div>
                                   )}
                                 </AnimatePresence>
                              </div>
                            )
                         })}
                       </div>
                    </motion.div>
                  ))}
               </div>
            ) : (
              <div className="text-center py-32 bg-white/[0.02] backdrop-blur-3xl rounded-[3.5rem] border border-dashed border-white/10 shadow-2xl max-w-4xl mx-auto">
                <div className="w-24 h-24 bg-white/[0.03] rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl border border-white/5">
                  <MessageCircleQuestion className="w-10 h-10 text-slate-700" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 tracking-tighter">Query Results Null</h3>
                <p className="text-slate-500 text-lg max-w-md mx-auto font-medium">
                  We couldn't retrieve any logic entries matching your neural parameters. Adjust your interface search.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
