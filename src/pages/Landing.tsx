
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import ApiSection from "@/components/ApiSection";
import UseCases from "@/components/UseCases";
import Testimonials from "@/components/Testimonials";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

const Landing = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <ApiSection />
        <UseCases />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
