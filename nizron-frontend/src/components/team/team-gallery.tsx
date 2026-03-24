'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TeamMember } from '@/types/team';
import { Users } from 'lucide-react';

interface TeamGalleryClientProps {
  team: TeamMember[];
}

export default function TeamGalleryClient({ team }: TeamGalleryClientProps) {
  if (team.length === 0) {
    return (
      <div className="text-center py-20 card rounded-xl">
        <Users className="w-10 h-10 text-slate-600 mx-auto mb-4" />
        <p className="text-sm font-semibold text-slate-500">No team members found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <AnimatePresence mode="popLayout">
        {team.map((member, idx) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.06, duration: 0.4 }}
            className="card rounded-xl p-5 hover:border-white/[0.12] hover:bg-[#111420] transition-all duration-200 group"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-10 h-10 rounded-lg object-cover border border-white/[0.08] flex-shrink-0"
                />
              ) : (
                <div className="w-10 h-10 bg-indigo-600/20 border border-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-indigo-400">{member.name[0]}</span>
                </div>
              )}
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-white truncate group-hover:text-indigo-300 transition-colors">{member.name}</h3>
                <p className="text-[11px] text-indigo-400/80 font-medium uppercase tracking-wider truncate">{member.designation}</p>
              </div>
            </div>

            {/* Skills */}
            {member.skillSet.length > 0 && (
              <div className="border-t border-white/[0.06] pt-3">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-2">Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {member.skillSet.map((skill, skillIdx) => (
                    <span
                      key={skillIdx}
                      className="px-2 py-0.5 text-[11px] font-medium text-slate-400 bg-white/[0.04] border border-white/[0.06] rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
