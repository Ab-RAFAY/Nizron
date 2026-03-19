'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { TeamMember } from '@/types/team';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Code2, Database, LayoutTemplate, Briefcase } from 'lucide-react';

export default function TeamGallery() {
  const { data: response, isLoading, error } = useQuery<{ success: boolean; data: TeamMember[] }>({
    queryKey: ['public-team'],
    queryFn: () => apiClient.get('/teams'),
  });

  const team = response?.data || [];

  return (
    <main className="min-h-screen bg-[#050505] flex flex-col pt-20">
      <Navbar />

      <section className="py-24 relative overflow-hidden flex-1">
        {/* Deep-Space Ambient Glows */}
        <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24 text-center md:text-left">
            <div className="space-y-6 max-w-4xl mx-auto md:mx-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center space-x-3 px-4 py-1.5 bg-white/[0.03] backdrop-blur-md border border-white/10 text-slate-400 rounded-full text-xs font-bold uppercase tracking-[0.3em] shadow-2xl mx-auto md:mx-0"
              >
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span>The Architecture Guild</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-8xl font-header font-bold text-white tracking-tight leading-none"
              >
                Neural <span className="text-gradient italic">Engineers.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-slate-400 mt-8 font-medium leading-relaxed max-w-3xl"
              >
                Our high-performance team of architects, developers, and product strategists are the neural engine behind global technical logic.
              </motion.p>
            </div>
          </div>

          <div className="relative">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-[450px] bg-white/[0.02] backdrop-blur-2xl rounded-[3rem] animate-pulse border border-white/5 shadow-2xl shadow-black/50" />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-24 glass rounded-[3rem] max-w-2xl mx-auto shadow-2xl bg-white/[0.03] border-white/10 p-16">
                <p className="text-red-400 font-bold mb-8 text-2xl tracking-tight">Interface Retrieval Error</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-10 py-5 bg-vibrant text-white rounded-2xl text-lg font-bold shadow-2xl shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:scale-[1.05] transition-all"
                >
                  Reload Neural Stack
                </button>
              </div>
            ) : team.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <AnimatePresence>
                  {team.map((member, idx) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, type: "spring", stiffness: 300, damping: 20 }}
                      whileHover={{ y: -10, rotateZ: 0.5, transition: { duration: 0.4 } }}
                      className="group bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 shadow-2xl shadow-black/50 hover:border-white/20 transition-all duration-500 relative overflow-hidden flex flex-col h-full"
                    >
                      {/* Avatar & Header */}
                      <div className="flex items-start justify-between mb-10 relative z-10">
                        <div className="flex items-center space-x-6">
                           {member.image ? (
                             <img src={member.image} alt={member.name} className="w-20 h-20 rounded-[2.5rem] object-cover border-2 border-white/5 group-hover:border-indigo-500/30 transition-all shadow-2xl" />
                           ) : (
                             <div className="w-20 h-20 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex items-center justify-center group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30 group-hover:text-indigo-400 transition-all">
                                <span className="text-3xl font-bold font-header select-none text-white">{member.name[0]}</span>
                             </div>
                           )}
                           <div className="space-y-1">
                             <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-indigo-400 transition-all">{member.name}</h3>
                             <p className="text-xs font-bold text-indigo-400 uppercase tracking-[0.2em]">{member.designation}</p>
                           </div>
                        </div>
                        <div className="p-3 bg-white/[0.03] border border-white/5 rounded-2xl group-hover:bg-white/10 group-hover:border-white/20 group-hover:text-white transition-all">
                          <Briefcase className="w-6 h-6 text-slate-500" />
                        </div>
                      </div>

                      {/* Animated Skills Visualizations */}
                      <div className="flex-1 space-y-8 relative z-10 pt-8 border-t border-white/5">
                        <div className="flex items-center space-x-3 text-slate-500 mb-2">
                           <Code2 className="w-5 h-5 text-indigo-500" />
                           <span className="text-[11px] uppercase font-bold tracking-[0.3em]">Neural Skill Matrix</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2.5">
                           {member.skillSet.map((skill, skillIdx) => (
                             <div 
                               key={skillIdx} 
                               className="px-4 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-[11px] font-bold text-slate-400 group-hover:text-indigo-300 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all duration-300 flex items-center"
                             >
                                <div className="w-1 h-1 rounded-full bg-indigo-500/50 mr-2 group-hover:bg-indigo-400 transition-colors" />
                                {skill}
                             </div>
                           ))}
                        </div>
                      </div>

                      {/* Ambient background hover glow */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/0 via-violet-500/0 to-indigo-500/0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-1000 pointer-events-none" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-32 bg-white/[0.02] backdrop-blur-2xl rounded-[3rem] border border-dashed border-white/10 max-w-4xl mx-auto shadow-2xl">
                <Users className="w-20 h-20 text-slate-700 mx-auto mb-8" />
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Neural Roster Empty</h3>
                <p className="text-slate-500 text-lg font-medium">No team engineers have been registered in the technical stack yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
