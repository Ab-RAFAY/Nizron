'use client';

import React, { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Alex Rivera",
    role: "CTO",
    company: "TechFlow Systems",
    content: "Nizron's engineering team delivered a platform that handled our 500% growth without a single hitch. Truly professional.",
    avatar: "AR"
  },
  {
    name: "Sarah Chen",
    role: "Head of Product",
    company: "Nexus AI",
    content: "The attention to detail and clean architecture they provide is a breath of fresh air. They don't just build; they engineer excellence.",
    avatar: "SC"
  },
  {
    name: "Marcus Thorne",
    role: "Founder",
    company: "Blackwood Defense",
    content: "Security was our top priority, and Nizron exceeded every standard. Their modular approach is exactly what the industry needs.",
    avatar: "MT"
  },
  {
    name: "Elena Rodriguez",
    role: "Operations Director",
    company: "Global Logistics",
    content: "The real-time tracking system Nizron built transformed our efficiency. It's fast, reliable, and beautiful to use.",
    avatar: "ER"
  },
  {
    name: "James Wilson",
    role: "Senior Architect",
    company: "CloudCore",
    content: "Integrating their specialized modules was seamless. The code quality is enterprise-grade and documentation is flawless.",
    avatar: "JW"
  }
];

export default function TestimonialsMarquee() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div className="h-40" />;

  const ReviewCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
    <div className="flex-shrink-0 w-[350px] p-6 mx-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-indigo-500/30 transition-all duration-500 group relative">
      <div className="absolute -top-3 -left-3 w-8 h-8 bg-indigo-600/10 rounded-full flex items-center justify-center border border-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity">
        <Quote size={12} className="text-indigo-400" />
      </div>

      <div className="flex items-center gap-1 mb-4 text-indigo-400/60">
        {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
      </div>

      <p className="text-[13px] text-slate-400 leading-relaxed mb-6 group-hover:text-slate-300 transition-colors italic">
        "{testimonial.content}"
      </p>

      <div className="flex items-center gap-3 border-t border-white/[0.05] pt-4">
        <div className="w-9 h-9 rounded-lg bg-vibrant flex items-center justify-center font-bold text-[11px] text-white">
          {testimonial.avatar}
        </div>
        <div className="flex flex-col">
          <span className="text-[13px] font-bold text-white leading-none mb-1">{testimonial.name}</span>
          <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{testimonial.role} @ {testimonial.company}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="pt-12 pb-30 relative overflow-hidden border-none shadow-none">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-header font-bold text-white mb-4 tracking-tight">
          Trusted by the most <span className="text-gradient hover:opacity-80 transition-opacity cursor-default">innovative companies.</span>
        </h2>
        <div className="w-20 h-1 bg-vibrant mx-auto rounded-full opacity-30" />
      </div>

      <div
        className="w-full overflow-hidden py-4 relative group"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}
      >
        <div className="flex w-max animate-marquee-reverse">
          <div className="flex shrink-0">
            {testimonials.map((t, i) => <ReviewCard key={`t1-${i}`} testimonial={t} />)}
          </div>
          <div className="flex shrink-0">
            {testimonials.map((t, i) => <ReviewCard key={`t2-${i}`} testimonial={t} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
