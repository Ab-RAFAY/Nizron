'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-24 bg-[#050505]">
      {/* Deep-Space Ambient Glows */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1.1, 1.3, 1],
            rotate: [0, 45, 90, 45, 0],
            x: [0, 100, -100, 50, 0],
            y: [0, -50, 50, -25, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-indigo-600/10 rounded-full blur-[180px] pointer-events-none" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1.2, 1.4, 1],
            rotate: [0, -45, -90, -45, 0],
            x: [0, -120, 120, -60, 0],
            y: [0, 80, -80, 40, 0]
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-purple-600/10 rounded-full blur-[180px] pointer-events-none" 
        />
        {/* Subtle Scanlines / Noise Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-3 px-4 py-1.5 bg-white/[0.03] backdrop-blur-md border border-white/10 text-slate-300 rounded-full text-xs font-bold uppercase tracking-[0.3em] shadow-2xl mx-auto"
          >
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span>Neural Excellence Matrix</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="text-6xl md:text-9xl font-header font-bold leading-[0.95] tracking-tighter text-white"
          >
            Architecting <br />
            <span className="text-gradient italic">Intelligence.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Empowering the global enterprise with high-octane software engineering, cloud architecture, and technical logic.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10"
          >
            <Link
              href="/services"
              className="w-full sm:w-auto px-12 h-20 bg-vibrant text-white font-bold rounded-2xl shadow-2xl shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center group relative overflow-hidden"
            >
              <div className="absolute inset-0 liquid-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center text-lg">
                View Services <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
            <Link
              href="/products"
              className="w-full sm:w-auto px-12 h-20 bg-white/[0.03] border border-white/10 hover:border-white/20 text-white font-bold rounded-2xl shadow-2xl hover:shadow-white/5 transition-all flex items-center justify-center backdrop-blur-md text-lg transform hover:-translate-y-1"
            >
              Solutions Hub
            </Link>
          </motion.div>

          {/* High-Density Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-3 gap-10 pt-24 border-t border-white/5"
          >
            <div className="flex flex-col items-center space-y-4 group cursor-default">
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-3xl group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 group-hover:text-indigo-400 transition-all duration-500">
                <Shield className="w-8 h-8" />
              </div>
              <div className="text-center">
                <span className="block text-xl font-bold text-white tracking-tight">Enterprise Stack</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Scalability Protocol</span>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 group cursor-default">
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-3xl group-hover:bg-success/20 group-hover:border-success/30 group-hover:text-success transition-all duration-500">
                <Terminal className="w-8 h-8" />
              </div>
              <div className="text-center">
                <span className="block text-xl font-bold text-white tracking-tight">Technical Logic</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Clean Code Matrix</span>
              </div>
            </div>
            <div className="hidden lg:flex flex-col items-center space-y-4 group cursor-default">
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-3xl group-hover:bg-cyan-500/20 group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-all duration-500">
                <Zap className="w-8 h-8" />
              </div>
              <div className="text-center">
                <span className="block text-xl font-bold text-white tracking-tight">Agile Growth</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Performance Index</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Cinematic Dark Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg fill="currentColor" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" className="relative block w-full h-[80px] text-[#0D0D0D]">
          <path d="M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V0H0v27.35a600.21 600.21 0 0 0 321.39 29.09Z" />
        </svg>
      </div>
    </section>
  );
}
