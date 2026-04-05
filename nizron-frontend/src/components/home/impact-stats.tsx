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
    <section className="py-32 border-t border-border-v bg-background-v relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 p-60 bg-accent-primary-v/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
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
                className="card text-center p-12 hover:border-accent-primary-v/30 hover:-translate-y-2 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-accent-primary-v/0 via-accent-purple-v/0 to-primary-cyan/0 opacity-0 group-hover:opacity-[0.03] transition-all duration-500" />
                
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 shadow-sm">
                  <Icon className="w-8 h-8 text-accent-primary-v group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-5xl md:text-6xl font-bold text-white mb-3 font-header tracking-tight">{stat.value}</h3>
                <p className="text-xs font-bold text-text-muted-v uppercase tracking-[0.3em] group-hover:text-accent-primary-v transition-colors">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
