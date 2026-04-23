import React, { useState, useEffect } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Services', href: '/services' },
  { name: 'Products', href: '/products' },
  { name: 'Team', href: '/team' },
  { name: 'FAQ', href: '/faq' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { location } = useRouterState();
  const pathname = location.pathname;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#080a0f]/80 backdrop-blur-xl shadow-lg shadow-black/30'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-vibrant rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 flex-shrink-0">
            <span className="text-white font-black text-sm">N</span>
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors">
            NIZRON
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-white/[0.08]'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/admin/login"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[13px] font-semibold shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-200"
          >
            Admin Portal →
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-400 hover:text-white p-1.5 hover:bg-white/5 rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-3 right-3 mt-1 bg-[#0e1018] border border-white/[0.08] rounded-xl shadow-2xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-2 gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-white/[0.07] my-1" />
              <Link
                to="/admin/login"
                className="px-4 py-3 text-sm font-semibold text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin Portal →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
