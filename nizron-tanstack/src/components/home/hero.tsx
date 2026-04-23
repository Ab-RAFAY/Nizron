import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import ClientMarquee from './client-marquee';

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden pt-32 pb-12">
      {/* Subtle background glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-primary-cyan/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
        {/* Main content - centered */}
        <div className="max-w-3xl mx-auto text-center mb-25">
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
            <Link to="/services" className="btn-primary px-8">
              Explore Services <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/products" className="btn-secondary px-8">
              View Products
            </Link>
          </motion.div>
        </div>

        {/* Client Logobar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full mt-8"
        >
          <ClientMarquee />
        </motion.div>
      </div>
    </section>
  );
}
