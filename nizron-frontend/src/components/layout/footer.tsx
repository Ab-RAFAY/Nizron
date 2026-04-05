'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Cpu, Shield, Globe } from 'lucide-react';

const footerLinks = {
  Infrastructure: [
    { label: 'Software Engineering', href: '/services' },
    { label: 'Cloud Architecture', href: '/services' },
    { label: 'Security & Analytics', href: '/services' },
    { label: 'Mobile Deployment', href: '/services' },
  ],
  Resources: [
    { label: 'Our Team', href: '/team' },
    { label: 'Product Ecosystem', href: '/products' },
    { label: 'Knowledge Base', href: '/faq' },
    { label: 'Terminal Access', href: '/admin/login' },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-12 pb-12 border-none">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-8">

          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 bg-vibrant rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <span className="text-white font-black text-sm">N</span>
              </div>
              <span className="text-lg font-bold tracking-tighter text-white group-hover:text-indigo-400 transition-colors">NIZRON</span>
            </Link>

            <p className="text-[14px] text-slate-400 leading-relaxed max-w-sm">
              Engineering the next generation of scalable digital infrastructure. We bridge the gap between complex software needs and elite technological execution.
            </p>

            <div className="flex gap-3">
              {[
                { Icon: Linkedin, label: 'LinkedIn' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Github, label: 'GitHub' }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 bg-white/[0.03] border border-white/[0.06] hover:border-indigo-500/40 hover:bg-indigo-500/10 text-slate-500 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.Icon size={16} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">{heading}</h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-[13px] text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact & Status */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">HQ Terminal</h4>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-slate-400 hover:text-slate-200 transition-colors text-[13px]">
                <Mail size={14} className="text-indigo-500/50" />
                <span>ops@nizron.solutions</span>
              </li>
              <li className="flex items-start gap-3 text-slate-400 hover:text-slate-200 transition-colors text-[13px]">
                <MapPin size={14} className="text-indigo-500/50 mt-0.5" />
                <span className="leading-relaxed">123 Tech Avenue, Suite 400<br />San Francisco, CA 94105</span>
              </li>
            </ul>

            {/* System Status Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500/80">System Operational</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 text-[12px] text-slate-600">
            <span>© Nizron IT Solutions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
