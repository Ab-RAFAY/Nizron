import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/home/hero";
import ImpactStats from "@/components/home/impact-stats";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <Hero />
      <ImpactStats />
      
      {/* Short CTA Section: Matching the new bright/welcoming theme */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 p-40 bg-indigo-500/5 blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto p-16 bg-slate-50 border border-slate-100 rounded-[4rem] relative overflow-hidden group shadow-soft">
            <div className="absolute -top-12 -right-12 p-24 bg-vibrant/10 blur-[80px] group-hover:bg-vibrant/20 transition-all duration-700" />
            
            <h2 className="text-5xl md:text-6xl font-header font-bold mb-8 text-slate-900 relative z-10 leading-tight">
              Ready to transform your <br /> <span className="text-gradient italic">Business Ecosystem?</span>
            </h2>
            <p className="text-xl text-slate-500 mb-12 relative z-10 font-medium max-w-2xl mx-auto">Start your journey with Nizron today and experience the future of high-performance architecture.</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
              <button className="px-12 py-4 bg-vibrant text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.05] active:scale-95 transition-all text-lg relative overflow-hidden group/btn">
                <div className="absolute inset-0 liquid-gradient opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10">Get a Strategic Quote</span>
              </button>
              <button className="px-12 py-4 border-2 border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-white hover:border-indigo-200 hover:text-indigo-600 transition-all text-lg shadow-sm">
                Discuss Project
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
