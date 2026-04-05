import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HeroBackground from "@/components/home/hero-background";
import Hero from "@/components/home/hero";
import TechStack from "@/components/home/tech-stack";
import FeaturedProducts from "@/components/home/featured-products";
import TestimonialsMarquee from "@/components/home/testimonials-marquee";
import Link from "next/link";

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

export default async function Home() {
  const productRes = await getProductData();
  const products = productRes?.data || [];

  return (
    <main className="flex flex-col min-h-screen bg-transparent overflow-x-hidden relative">
      <Navbar />

      <div className="relative z-10 w-full">
        <Hero />
        <TechStack />
        <FeaturedProducts products={products} />

        {/* Social Proof & Trust Section */}
        <TestimonialsMarquee />
      </div>

      <Footer />
    </main>
  );
}
