'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Globe, Shield, Award } from 'lucide-react';

const stats = [
  { label: 'Active Deployments', value: '150+', icon: Activity },
  { label: 'Global Clients', value: '45', icon: Globe },
  { label: 'Uptime SLA', value: '99.9%', icon: Shield },
  { label: 'Awards Won', value: '12', icon: Award },
];

export default function ImpactStats() {
  return (
    <section className="py-32 border-t border-slate-100 bg-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 p-60 bg-indigo-50/50 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                className="text-center p-12 bg-white border border-slate-50 rounded-[3rem] shadow-soft hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-violet-500/0 to-cyan-500/0 opacity-0 group-hover:opacity-[0.03] transition-all duration-500" />
                
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:bg-indigo-50 transition-all duration-500 shadow-sm">
                  <Icon className="w-8 h-8 text-indigo-500 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-5xl md:text-6xl font-bold text-slate-900 mb-3 font-header tracking-tight">{stat.value}</h3>
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] group-hover:text-indigo-400 transition-colors">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
