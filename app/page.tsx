import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import ContentSection from "@/components/ContentSection";
import SkillsSection from "@/components/SkillsSection";
import InsightCards from "@/components/InsightCards";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <ContentSection />
      <SkillsSection />
      <InsightCards />
      <AboutSection />
    </>
  );
}
