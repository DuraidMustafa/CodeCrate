import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ProblemSection } from "@/components/problem-section";
import { SolutionSection } from "@/components/solution-section";
import { FeaturesSection } from "@/components/features-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { DemoSection } from "@/components/demo-section";
import { WhyCodeCrateSection } from "@/components/why-codecrate-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className='min-h-screen bg-black text-white overflow-x-hidden'>
      {/* Animated background */}
      <div className='fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20' />
      <div className='fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent' />

      <div className='relative z-10'>
        <Header />
        <main>
          <HeroSection />
          <ProblemSection />
          <SolutionSection />
          <FeaturesSection />
          <HowItWorksSection />
          <WhyCodeCrateSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
