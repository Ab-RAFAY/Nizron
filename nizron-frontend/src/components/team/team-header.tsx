'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function TeamHeader() {
  return (
    <div className="mb-12">
      <div className="badge mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
        Our Team
      </div>
      <h1 className="text-3xl md:text-4xl font-header font-bold text-white tracking-tight mb-3">
        The people behind <span className="text-gradient">Nizron.</span>
      </h1>
      <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
        A focused team of engineers, designers, and strategists delivering professional IT solutions at enterprise scale.
      </p>
    </div>
  );
}
