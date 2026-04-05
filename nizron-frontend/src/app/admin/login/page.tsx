'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Lock, Mail, ArrowRight, ShieldCheck, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (result.success) {
        // In a real app, use a secure cookie. 
        // For this implementation, we follow the requirement for local storage/cookie.
        localStorage.setItem('nizron_token', result.data.access_token);
        localStorage.setItem('nizron_user', JSON.stringify(result.data.user));
        router.push('/admin/dashboard');
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      setError('Connection to backend failed. Is NestJS running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[600px] pointer-events-none">
        <div className="absolute top-0 right-0 p-32 bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 p-32 bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[450px] relative z-10"
      >
        <Link 
          href="/" 
          className="inline-flex items-center text-slate-500 hover:text-white transition-colors mb-8 group"
        >
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Public Site</span>
        </Link>

        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-4xl p-10 shadow-2xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 blur-2xl group-hover:bg-primary/30 transition-all pointer-events-none" />
          
          <div className="text-center space-y-3 mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-primary rounded-2xl shadow-lg shadow-primary/30 mb-2">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-header font-bold text-white tracking-tight">Admin Portal</h1>
            <p className="text-slate-500 text-sm font-medium">Verify credentials for <span className="text-white">Nizron Management</span></p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 pl-4">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 outline-none text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                  placeholder="admin@nizron.solutions"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center pr-4">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 pl-4">Password</label>
                <Link href="#" className="text-[10px] uppercase font-bold text-primary tracking-widest hover:underline">Forgot?</Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 outline-none text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-400/10 border border-red-400/20 rounded-xl text-center"
              >
                <p className="text-xs font-bold text-red-400">{error}</p>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/40 flex items-center justify-center group transform active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Authenticate <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-center space-x-6 text-slate-600">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Secure Server</span>
            </div>
            <div className="flex items-center space-x-2">
              <LayoutGrid className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Nizron ERP v1.0</span>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
