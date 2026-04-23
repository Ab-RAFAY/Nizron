import React from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import {
  LayoutDashboard,
  Layers,
  Package,
  Users,
  MessageSquare,
  LogOut,
  ChevronRight,
} from 'lucide-react';

const menuItems = [
  { name: 'Overview', icon: LayoutDashboard, href: '/admin/dashboard' },
  { name: 'Services', icon: Layers, href: '/admin/services' },
  { name: 'Products', icon: Package, href: '/admin/products' },
  { name: 'Team', icon: Users, href: '/admin/team' },
  { name: 'FAQ', icon: MessageSquare, href: '/admin/faq' },
];

export default function AdminSidebar() {
  const { location } = useRouterState();
  const pathname = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem('nizron_token');
    localStorage.removeItem('nizron_user');
    window.location.href = '/admin/login';
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0D0D0D] border-r border-white/10 flex flex-col z-50 shadow-2xl shadow-black">
      <div className="p-8 pb-10 border-b border-white/5">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-vibrant rounded-xl flex items-center justify-center shadow-2xl shadow-indigo-600/20 group-hover:scale-110 transition-transform">
            <span className="text-white font-bold text-xl tracking-tighter italic">N</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-header font-bold text-white tracking-tighter leading-none italic uppercase">
              Nizron
            </span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] pt-1">Admin Core</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-6 space-y-3 mt-6">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center justify-between p-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all group ${
                isActive
                  ? 'bg-vibrant text-white shadow-2xl shadow-indigo-600/30 border border-white/20'
                  : 'text-slate-500 hover:text-white hover:bg-white/3 border border-transparent hover:border-white/5'
              }`}
            >
              <div className="flex items-center">
                <item.icon className={`w-5 h-5 mr-3.5 transition-colors ${isActive ? 'text-white' : 'group-hover:text-indigo-400'}`} />
                {item.name}
              </div>
              {isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/5 space-y-6">
        <button
          onClick={handleLogout}
          className="w-full p-4 flex items-center text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 rounded-2xl transition-all text-xs font-bold uppercase tracking-widest group"
        >
          <LogOut className="w-5 h-5 mr-4 group-hover:-translate-x-1 transition-transform" />
          Log Out
        </button>
      </div>
    </aside>
  );
}
