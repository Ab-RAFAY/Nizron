import React from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import FAQGalleryClient from '@/components/faq/faq-gallery-client';

// Incremental Static Regeneration: Cache data on the server for 60 seconds
export const revalidate = 60;

async function getFAQData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  
  try {
    const res = await fetch(`${apiUrl}/faq`, { 
      next: { revalidate: 60 } 
    });
    
    if (!res.ok) {
        console.error('Failed to fetch FAQs:', res.statusText);
        return { data: [] };
    }
    
    return res.json();
  } catch (error) {
    console.error('Network error fetching FAQs:', error);
    return { data: [] };
  }
}

/**
 * HIGH-PERFORMANCE INTERFACE SUPPORT (Server Component)
 * ----------------------------------------------------
 * Built for instant knowledge retrieval without client-side loading states.
 */
export default async function FAQPage() {
  const response = await getFAQData();
  const faqs = response?.data || [];

  return (
    <main className="min-h-screen bg-[#050505] flex flex-col pt-20">
      <Navbar />

      <section className="py-24 relative overflow-hidden flex-1">
        {/* Deep-Space Ambient Glows */}
        <div className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 max-w-5xl relative z-10">
           {/* Client logic for Accordion and Search, Server data for speed */}
           <FAQGalleryClient initialFaqs={faqs} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
