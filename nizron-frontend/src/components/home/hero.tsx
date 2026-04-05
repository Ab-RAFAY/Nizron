'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const pillars = [
  'Web & Mobile Engineering',
  'Cloud Architecture',
  'Enterprise ERP Systems',
  'API & Backend Platforms',
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20 bg-background-v grid-pattern">
      {/* Subtle background glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-accent-primary-v/5 rounded-full blur-[130px]" />
        <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] bg-accent-purple-v/5 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">

        {/* Main content - centered */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="badge mb-8 mx-auto"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0 animate-pulse" />
            IT Services & Engineering
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl md:text-6xl font-header font-bold leading-[1.1] tracking-tight text-white mb-5"
          >
            Professional IT Solutions
            <br />
            <span className="text-gradient">Built for Scale.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-base text-slate-400 max-w-xl mx-auto leading-relaxed"
          >
            Nizron delivers enterprise-grade software, cloud infrastructure, and technical strategy — helping organizations grow with precision and speed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8"
          >
            <Link
              href="/services"
              className="btn-primary px-8"
            >
              Explore Services <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/products"
              className="btn-secondary px-8"
            >
              View Products
            </Link>
          </motion.div>
        </div>

        {/* Service pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="max-w-2xl mx-auto border-t border-white/[0.07] pt-10"
        >
          <p className="text-[11px] text-slate-500 uppercase tracking-widest text-center font-semibold mb-5">Core Competencies</p>
          <div className="grid grid-cols-2 gap-3">
            {pillars.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-white/3 border border-white/6"
              >
                <CheckCircle2 size={14} className="text-indigo-400 shrink-0" />
                <span className="text-[13px] text-slate-300 font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
