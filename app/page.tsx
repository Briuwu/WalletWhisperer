import { CTASection } from "@/components/CTA-section";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { Footer } from "@/components/ui/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4">
        <HeroSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
