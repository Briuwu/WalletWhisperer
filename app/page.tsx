import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { HowItWorksSection } from "@/components/how-it-works-section";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4">
        <HeroSection />
        <HowItWorksSection />
      </main>
      ;
    </>
  );
}
