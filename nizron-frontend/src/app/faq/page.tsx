import React from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import FAQGalleryClient from '@/components/faq/faq-gallery-client';

export const revalidate = 60;

async function getFAQData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  try {
    const res = await fetch(`${apiUrl}/faq`, { next: { revalidate: 60 } });
    if (!res.ok) return { data: [] };
    return res.json();
  } catch {
    return { data: [] };
  }
}

export default async function FAQPage() {
  const response = await getFAQData();
  const faqs = response?.data || [];

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
