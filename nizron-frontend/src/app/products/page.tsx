import React from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import ProductGalleryClient from '@/components/products/product-gallery-client';

// Incremental Static Regeneration: Cache data on the server for 60 seconds
export const revalidate = 60;

async function getProductData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  
  try {
    const res = await fetch(`${apiUrl}/products`, { 
      next: { revalidate: 60 } 
    });
    
    if (!res.ok) {
        console.error('Failed to fetch products:', res.statusText);
        return { data: [] };
    }
    
    return res.json();
  } catch (error) {
    console.error('Network error fetching products:', error);
    return { data: [] };
  }
}

/**
 * HIGH-PERFORMANCE NEURAL REGISTRY (Server Component)
 * --------------------------------------------------
 * Optimized for lightning-fast LCP and SEO.
 * Content is pre-rendered on the server so users never see a loading state.
 */
export default async function ProductPage() {
  const response = await getProductData();
  const products = response?.data || [];

  return (
    <main className="min-h-screen bg-[#050505] flex flex-col pt-20">
      <Navbar />

      <section className="py-24 relative overflow-hidden flex-1">
        {/* Deep-Space Ambient Glows */}
        <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          {/* Main Gallery (Client Component with pre-fetched data) */}
          <ProductGalleryClient initialProducts={products} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
