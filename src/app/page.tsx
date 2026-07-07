import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { ApiFlow } from "@/components/landing/ApiFlow";
import { FeatureCards } from "@/components/landing/FeatureCards";
import { BrowserMockups } from "@/components/landing/BrowserMockups";
import { ArchitectureDiagram } from "@/components/landing/ArchitectureDiagram";
import { DocsPreview } from "@/components/landing/DocsPreview";
import { SdkSection } from "@/components/landing/SdkSection";
import { Playground } from "@/components/landing/Playground";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProductShowcase />
        <BrowserMockups />
        <ApiFlow />
        <FeatureCards />
        <ArchitectureDiagram />
        <DocsPreview />
        <SdkSection />
        <Playground />
        <Testimonials />
        <FAQ />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
