'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, ChevronRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-24 pb-12 relative overflow-hidden">
      {/* Decorative Space Blobs */}
      <div className="absolute top-0 right-[-10%] w-[400px] h-[400px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
        <div className="space-y-8">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 bg-vibrant rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:rotate-6 transition-transform">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="text-2xl font-header font-bold text-white uppercase italic tracking-tighter group-hover:text-vibrant transition-colors">
              Nizron
            </span>
          </Link>
          <p className="text-slate-400 leading-relaxed font-medium text-base">
            Pioneering the future of neural IT solutions. We architect cutting-edge technology 
            systems that empower the global enterprise to scale, innovate, and thrive.
          </p>
          <div className="flex space-x-4 pt-2">
            {[Linkedin, Twitter, Github].map((Icon, idx) => (
              <a key={idx} href="#" className="p-3 bg-white/[0.03] border border-white/5 hover:bg-vibrant hover:border-transparent text-slate-400 hover:text-white transition-all duration-300 rounded-2xl shadow-sm hover:shadow-indigo-500/20">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <h4 className="text-white font-bold text-lg tracking-tight uppercase tracking-[0.1em]">Logic Hubs</h4>
          <ul className="space-y-5">
            {['Software Engineering', 'Cloud Architecture', 'Neural Security', 'Cyber Defense'].map((item) => (
              <li key={item}>
                <Link href="/services" className="text-slate-400 hover:text-white transition-all flex items-center group font-medium">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          <h4 className="text-white font-bold text-lg tracking-tight uppercase tracking-[0.1em]">Registry</h4>
          <ul className="space-y-5">
            {['Team Dossier', 'Solutions Registry', 'Knowledge Matrix', 'System FAQ'].map((item) => (
              <li key={item}>
                <Link href="#" className="text-slate-400 hover:text-white transition-all flex items-center group font-medium">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          <h4 className="text-white font-bold text-lg tracking-tight uppercase tracking-[0.1em]">Contact Logic</h4>
          <ul className="space-y-6">
            <li className="flex items-center space-x-4 group">
              <div className="p-2.5 bg-white/[0.03] border border-white/5 rounded-xl text-indigo-400 group-hover:bg-vibrant group-hover:text-white group-hover:border-transparent transition-all duration-300">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-slate-400 font-medium group-hover:text-white transition-colors select-all">info@nizron.solutions</span>
            </li>
            <li className="flex items-center space-x-4 group">
              <div className="p-2.5 bg-white/[0.03] border border-white/5 rounded-xl text-purple-400 group-hover:bg-vibrant group-hover:text-white group-hover:border-transparent transition-all duration-300">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-slate-400 font-medium group-hover:text-white transition-colors select-all">+1 (234) 567-890</span>
            </li>
            <li className="flex items-center space-x-4 group">
              <div className="p-2.5 bg-white/[0.03] border border-white/5 rounded-xl text-blue-400 group-hover:bg-vibrant group-hover:text-white group-hover:border-transparent transition-all duration-300">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-slate-400 font-medium group-hover:text-white transition-colors">123 Tech Avenue, Matrix Cluster</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
          &copy; {currentYear} Nizron IT Solutions. Optimized for Neural Excellence.
        </p>
        <div className="flex space-x-10 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
           <Link href="#" className="hover:text-white transition-colors">Privacy Protocol</Link>
           <Link href="#" className="hover:text-white transition-colors">System Terms</Link>
        </div>
      </div>
    </footer>
  );
}
