'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Products', href: '/products' },
  { name: 'Our Team', href: '/team' },
  { name: 'FAQ', href: '/faq' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-4 bg-[#050505]/60 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/50' : 'py-8 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <motion.div 
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="w-12 h-12 bg-vibrant rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/30 relative overflow-hidden group/logo"
          >
            <div className="absolute inset-0 liquid-gradient opacity-0 group-hover/logo:opacity-100 transition-opacity" />
            <span className="text-white font-black text-2xl relative z-10">N</span>
          </motion.div>
          <span className="text-3xl font-header font-black tracking-tighter text-white uppercase italic group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-vibrant transition-all duration-500">
            Nizron
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-slate-400 hover:text-white hover:scale-105 transition-all duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-vibrant group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
          <Link
            href="/admin/login"
            className="px-7 py-3 bg-vibrant text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center"
          >
            Admin Portal <ChevronRight className="ml-1 w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2 hover:bg-white/5 rounded-xl transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-full left-4 right-4 mt-2 bg-[#0D0D0D]/95 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-8 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xl font-bold text-white hover:text-indigo-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/admin/login"
                className="w-full py-4 bg-vibrant text-white rounded-2xl text-center font-bold shadow-lg shadow-indigo-500/20"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin Portal
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
