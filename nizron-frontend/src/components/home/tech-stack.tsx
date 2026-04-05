'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const frontendTech = [
  { name: 'Next.js', logo: '/next.svg' },
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Framer Motion', logo: '/globe.svg' },
  { name: 'Redux', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
];

const backendTech = [
  { name: 'NestJS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg' },
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
];

export default function TechStack() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="h-[400px]" />;
  }

  const TechTrack = ({ items, reverse = false }: { items: typeof frontendTech, reverse?: boolean }) => (
    <div className={`flex w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
      <div className="flex shrink-0 space-x-16 items-center px-8">
        {items.map((tech, index) => (
          <div key={`${tech.name}-${index}`} className="flex items-center gap-3 group">
            <div className="w-12 h-12 flex items-center justify-center grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100 transition-all duration-500">
              <img
                src={tech.logo}
                alt={tech.name}
                className="max-w-full max-h-full object-contain"
                loading="lazy"
              />
            </div>
            <span className="text-slate-500 group-hover:text-white font-medium text-sm transition-colors duration-500">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
      <div className="flex shrink-0 space-x-16 items-center px-8">
        {items.map((tech, index) => (
          <div key={`${tech.name}-clone-${index}`} className="flex items-center gap-3 group">
            <div className="w-12 h-12 flex items-center justify-center grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100 transition-all duration-500">
              <img
                src={tech.logo}
                alt={tech.name}
                className="max-w-full max-h-full object-contain"
                loading="lazy"
              />
            </div>
            <span className="text-slate-500 group-hover:text-white font-medium text-sm transition-colors duration-500">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="pt-4 pb-12 relative overflow-hidden">
      {/* Dynamic glows handled globally or locally */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-primary-cyan/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[5%] w-[500px] h-[500px] bg-primary-purple/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Side: Content */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-indigo-400">
              The Engine of Innovation
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-header font-bold text-white leading-tight tracking-tight">
              Fueling Innovation with Our <span className="text-gradient">Modern Tech Stack</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed max-w-lg">
              We leverage the most advanced framework and tools to engineer high-performance digital solutions that scale with your business needs.
            </p>
          </div>

          {/* Right Side: Marquees */}
          <div className="lg:col-span-7 space-y-12 relative">
            {/* Gradient Masks */}
            <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-[#080a0f] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-[#080a0f] to-transparent z-10 pointer-events-none" />

            {/* Row 1: Frontend */}
            <div className="relative overflow-hidden py-2">
              <TechTrack items={frontendTech} />
            </div>

            {/* Row 2: Backend */}
            <div className="relative overflow-hidden py-2">
              <TechTrack items={backendTech} reverse />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
