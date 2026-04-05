import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/home/hero";
import ImpactStats from "@/components/home/impact-stats";
import FeaturedProducts from "@/components/home/featured-products";
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
    <main className="flex flex-col min-h-screen bg-[#080a0f] overflow-x-hidden">
      <Navbar />
      <Hero />
      <ImpactStats />
      
      <FeaturedProducts products={products} />

      {/* CTA Section */}
      <section className="border-t border-white/[0.07] bg-[#0a0c12]">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-header font-bold text-white tracking-tight mb-3">
            Ready to transform your <span className="text-gradient">business?</span>
          </h2>
          <p className="text-sm text-slate-400 mb-8 leading-relaxed max-w-xl mx-auto">
            Start your journey with Nizron today. We build software that scales with your ambitions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/services"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-lg shadow-indigo-600/20 transition-all duration-200 text-sm"
            >
              Get Started
            </Link>
            <Link
              href="/products"
              className="px-6 py-2.5 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white font-semibold rounded-lg transition-all duration-200 text-sm"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
