'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';

const footerLinks = {
  Services: [
    { label: 'Software Engineering', href: '/services' },
    { label: 'Cloud Architecture', href: '/services' },
    { label: 'Security & Defense', href: '/services' },
    { label: 'Mobile Development', href: '/services' },
  ],
  Company: [
    { label: 'Our Team', href: '/team' },
    { label: 'Products', href: '/products' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Admin Portal', href: '/admin/login' },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080a0f] border-t border-white/[0.07] pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-vibrant rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">N</span>
              </div>
              <span className="text-[13px] font-semibold tracking-tight text-white">NIZRON</span>
            </Link>
            <p className="text-[13px] text-slate-500 leading-relaxed mb-5">
              Professional IT solutions built for the modern enterprise.
            </p>
            <div className="flex gap-2">
              {[Linkedin, Twitter, Github].map((Icon, idx) => (
                <a key={idx} href="#" className="p-2 bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.08] text-slate-500 hover:text-white rounded-lg transition-all duration-200">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[13px] text-slate-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5">
                <Mail size={13} className="text-slate-500 flex-shrink-0" />
                <span className="text-[13px] text-slate-400 select-all">info@nizron.solutions</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={13} className="text-slate-500 flex-shrink-0" />
                <span className="text-[13px] text-slate-400">+1 (234) 567-890</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={13} className="text-slate-500 flex-shrink-0 mt-0.5" />
                <span className="text-[13px] text-slate-400">123 Tech Avenue, Suite 400</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[12px] text-slate-600">
            © {currentYear} Nizron IT Solutions. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="#" className="text-[12px] text-slate-600 hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-[12px] text-slate-600 hover:text-slate-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
