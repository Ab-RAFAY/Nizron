import { createFileRoute } from '@tanstack/react-router';
import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/footer';
import Hero from '../components/home/hero';
import TechStack from '../components/home/tech-stack';
import FeaturedProducts from '../components/home/featured-products';
import TestimonialsMarquee from '../components/home/testimonials-marquee';
import type { Product } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function getProductData(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data || [];
  } catch {
    return [];
  }
}

export const Route = createFileRoute('/')({
  loader: async () => {
    const products = await getProductData();
    return { products };
  },
  component: HomePage,
});

function HomePage() {
  const { products } = Route.useLoaderData();

  return (
    <main className="flex flex-col min-h-screen bg-transparent overflow-x-hidden relative">
      <Navbar />
      <div className="relative z-10 w-full">
        <Hero />
        <TechStack />
        <FeaturedProducts products={products} />
        <TestimonialsMarquee />
      </div>
      <Footer />
    </main>
  );
}

