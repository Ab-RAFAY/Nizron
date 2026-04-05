import React from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import ServicesGalleryClient from '@/components/services/services-gallery-client';
import { Database, Cloud } from 'lucide-react';

export const revalidate = 60;

async function getServicesData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  try {
    const res = await fetch(`${apiUrl}/services`, { next: { revalidate: 60 } });
    if (!res.ok) return { data: [] };
    return res.json();
  } catch {
    return { data: [] };
  }
}

export default async function ServicesHub() {
  const response = await getServicesData();
  const services = response?.data || [];

  return (
    <main className="min-h-screen bg-[#080a0f] flex flex-col pt-16">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 w-full py-16 flex-1">
        <ServicesGalleryClient initialServices={services} />
      </div>

      {/* CTA Section */}
      <section className="border-t border-white/[0.07] bg-[#0a0c12]">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-header font-bold text-white tracking-tight mb-4">
              Ready to start a project?
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-md">
              We partner with businesses of all sizes to build reliable, scalable technology that solves real problems.
            </p>
            <div className="flex gap-2 flex-wrap">
              <div className="flex items-center gap-2 px-3 py-2 card rounded-lg">
                <Database size={14} className="text-indigo-400" />
                <span className="text-[12px] font-medium text-slate-300">System Architecture</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 card rounded-lg">
                <Cloud size={14} className="text-violet-400" />
                <span className="text-[12px] font-medium text-slate-300">Cloud Deployment</span>
              </div>
            </div>
          </div>
          <div className="card rounded-2xl p-8">
            <p className="text-sm text-slate-300 italic leading-relaxed mb-6">
              "Nizron delivered a high-performance platform ahead of schedule. Their technical depth and professionalism set them apart from any other engineering partner we've worked with."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-indigo-600/30 border border-indigo-500/30 rounded-lg shrink-0" />
              <div>
                <p className="text-sm font-semibold text-white">Chief Technology Officer</p>
                <p className="text-[11px] text-slate-500">Global Logistics Partner</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
