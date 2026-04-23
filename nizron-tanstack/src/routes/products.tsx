import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/footer';
import ProductGalleryClient from '../components/products/product-gallery-client';
import type { Product } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const Route = createFileRoute('/products')({
  loader: async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      if (!res.ok) return { products: [] };
      const json = await res.json();
      return { products: (json?.data || []) as Product[] };
    } catch {
      return { products: [] };
    }
  },
  component: ProductPage,
});

function ProductPage() {
  const { products } = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-[#080a0f] flex flex-col pt-16">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 w-full py-16 flex-1">
        <ProductGalleryClient initialProducts={products} />
      </div>
      <Footer />
    </main>
  );
}

