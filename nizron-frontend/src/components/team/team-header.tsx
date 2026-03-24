'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function TeamHeader() {
  return (
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
  );
}
