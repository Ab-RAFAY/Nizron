import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/footer';
import FAQGalleryClient from '../components/faq/faq-gallery-client';
import type { FAQ } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const Route = createFileRoute('/faq')({
  loader: async () => {
    try {
      const res = await fetch(`${API_URL}/faq`);
      if (!res.ok) return { faqs: [] };
      const json = await res.json();
      return { faqs: (json?.data || []) as FAQ[] };
    } catch {
      return { faqs: [] };
    }
  },
  component: FAQPage,
});

function FAQPage() {
  const { faqs } = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-[#080a0f] flex flex-col pt-16">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 w-full py-16 flex-1">
        <FAQGalleryClient initialFaqs={faqs} />
      </div>
      <Footer />
    </main>
  );
}

