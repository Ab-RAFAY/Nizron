import React, { Suspense } from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import ProductGalleryClient from '@/components/products/product-gallery-client';

export const revalidate = 60;

async function getProductData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  try {
    const res = await fetch(`${apiUrl}/products`, { next: { revalidate: 60 } });
    if (!res.ok) return { data: [] };
    return res.json();
  } catch {
    return { data: [] };
  }
}

export default async function ProductPage() {
  const response = await getProductData();
  const products = response?.data || [];

  return (
    <main className="min-h-screen bg-[#080a0f] flex flex-col pt-16">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 w-full py-16 flex-1">
        <Suspense fallback={<div className="text-slate-500 text-sm">Loading products...</div>}>
          <ProductGalleryClient initialProducts={products} />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
