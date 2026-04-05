'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import {
  Users,
  Layers,
  Package,
  TrendingUp,
  MousePointer2,
  BarChart3,
  Globe,
  Zap,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

const activity = [
  { id: 1, action: 'Service Updated', user: 'Admin', time: '2 mins ago', icon: Layers, color: 'text-blue-400' },
  { id: 2, action: 'New Product Added', user: 'Admin', time: '1 hour ago', icon: Package, color: 'text-indigo-400' },
  { id: 3, action: 'Team Member Joined', user: 'System', time: '4 hours ago', icon: Users, color: 'text-green-400' },
  { id: 4, action: 'API Response Optimized', user: 'System', time: '6 hours ago', icon: Zap, color: 'text-yellow-400' },
];

export default function OverviewAdmin() {
  const { data: servicesRes } = useQuery<any>({
    queryKey: ['admin-services'],
    queryFn: () => apiClient.get('/services'),
  });

  const { data: productsRes } = useQuery<any>({
    queryKey: ['admin-products'],
    queryFn: () => apiClient.get('/products'),
  });

  const { data: teamsRes } = useQuery<any>({
    queryKey: ['admin-teams'],
    queryFn: () => apiClient.get('/teams'),
  });

  const totalServices = servicesRes?.data?.length || servicesRes?.length || 0;
  const totalProducts = productsRes?.data?.length || productsRes?.length || 0;
  const teamSize = teamsRes?.data?.length || teamsRes?.length || 0;

  return (
    <div className="space-y-10 max-w-[1240px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-header font-bold text-white tracking-tight">System Overview</h1>
          <p className="text-slate-500 text-sm font-medium">Monitoring Nizron's technological ecosystems in real-time</p>
        </div>
        <div className="px-4 py-2 bg-white/5 border border-white/5 rounded-full flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Backend Connected</span>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: 'Total Services', value: totalServices, icon: Layers, color: 'bg-blue-500/10 text-blue-500', trend: '+12%' },
          { name: 'Active Products', value: totalProducts, icon: Package, color: 'bg-indigo-500/10 text-indigo-500', trend: '+5%' },
          { name: 'Team Size', value: teamSize, icon: Users, color: 'bg-green-500/10 text-green-500', trend: '+2%' },
          { name: 'Web Reach', value: '5.2k', icon: Globe, color: 'bg-primary/10 text-primary', trend: '+18%' },
        ].map((stat, idx) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 bg-white/5 border border-white/5 rounded-4xl relative group overflow-hidden"
          >
            <div className={`absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity`}>
              <stat.icon className="w-20 h-20" />
            </div>
            <div className="space-y-4 relative z-10">
              <div className={`p-4 ${stat.color} w-fit rounded-2xl`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.name}</p>
                <div className="flex items-end space-x-3">
                  <h3 className="text-4xl font-bold text-white tracking-tighter">{stat.value}</h3>
                  <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full mb-1">{stat.trend}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Graph Placeholder */}
        <div className="lg:col-span-2 p-10 bg-white/5 border border-white/5 rounded-[2.5rem] flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -bottom-12 -right-12 p-32 bg-primary/10 blur-[100px] pointer-events-none group-hover:bg-primary/20 transition-all duration-500" />
          <div className="space-y-2 mb-8 relative z-10">
            <div className="flex items-center space-x-2 text-slate-500">
              <BarChart3 className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Performance Matrix</span>
            </div>
            <h4 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">Server Consumption</h4>
          </div>

          <div className="flex-1 min-h-[250px] flex items-end justify-between space-x-3 pb-4">
            {[80, 45, 95, 60, 75, 50, 90, 65, 85, 40, 100, 70].map((h, i) => (
              <div key={i} className="flex-1 bg-white/5 rounded-t-lg relative group/bar transition-all hover:bg-primary hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] overflow-hidden">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.05, duration: 1 }}
                  className="absolute bottom-0 left-0 right-0 bg-primary/20 group-hover/bar:bg-primary transition-colors"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-[10px] font-bold text-slate-600 uppercase tracking-widest pt-6 border-t border-white/5 relative z-10">
            <span>JAN</span>
            <span>JUN</span>
            <span>DEC</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] space-y-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-24 bg-indigo-500/10 blur-[80px] pointer-events-none" />
          <div className="space-y-1 relative z-10">
            <h4 className="text-xl font-bold text-white">Recent Activity</h4>
            <p className="text-xs font-medium text-slate-500">Latest system events</p>
          </div>

          <div className="space-y-6 relative z-10">
            {activity.map((item, idx) => (
              <div key={item.id} className="flex items-start space-x-4">
                <div className={`p-2.5 bg-white/5 rounded-xl ${item.color} border border-white/5`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white leading-none mb-1">{item.action}</p>
                  <p className="text-[10px] font-medium text-slate-500">{item.user} • {item.time}</p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-slate-700" />
              </div>
            ))}
          </div>

          <button className="w-full h-12 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-all">
            View Audit Logs
          </button>
        </div>
      </div>
    </div>
  );
}
