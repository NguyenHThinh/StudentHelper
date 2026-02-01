import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import UnderstandingSection from "@/components/home/UnderstandingSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-green-50/20 font-sans">
      <HeroSection />
      <FeaturesSection />
      <UnderstandingSection />
      <CTASection />
      <Footer />
    </div>
  );
}
