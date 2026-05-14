import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import SkillsSection from "@/components/SkillsSection";
import InsightCards from "@/components/InsightCards";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <SkillsSection />
      <InsightCards />
      <AboutSection />
    </>
  );
}
