'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TeamMember } from '@/types/team';
import { Code2, Briefcase, Users } from 'lucide-react';

interface TeamGalleryClientProps {
  team: TeamMember[];
}

export default function TeamGalleryClient({ team }: TeamGalleryClientProps) {
  if (team.length === 0) {
    return (
      <div className="text-center py-32 bg-white/[0.02] backdrop-blur-2xl rounded-[3rem] border border-dashed border-white/10 max-w-4xl mx-auto shadow-2xl">
        <Users className="w-20 h-20 text-slate-700 mx-auto mb-8" />
        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Neural Roster Empty</h3>
        <p className="text-slate-500 text-lg font-medium">No team engineers have been registered in the technical stack yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <AnimatePresence mode="popLayout">
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

            {/* Neural Skill Matrix */}
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
  );
}
