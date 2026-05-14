import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProject } from "@/data/projects";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudySection from "@/components/case-study/CaseStudySection";
import MediaGallery from "@/components/case-study/MediaGallery";
import ResultsGrid from "./ResultsGrid";
import LessonsList from "./LessonsList";
import NextProject from "./NextProject";
import ScrollToTopOnMount from "./ScrollToTopOnMount";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.name} — Cole Bonawitz`,
    description: project.tagline,
    openGraph: {
      title: `${project.name} — Cole Bonawitz`,
      description: project.tagline,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <ScrollToTopOnMount />
      <CaseStudyHero project={project} />

      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <CaseStudySection title="The Problem">
          <p className="text-muted leading-relaxed text-lg">
            {project.sections.problem}
          </p>
        </CaseStudySection>

        <CaseStudySection title="What I Built">
          <p className="text-muted leading-relaxed text-lg">
            {project.sections.built}
          </p>
        </CaseStudySection>

        <CaseStudySection title="My Role">
          <p className="text-muted leading-relaxed text-lg">
            {project.sections.role}
          </p>
        </CaseStudySection>

        <CaseStudySection title="Growth & Distribution">
          <p className="text-muted leading-relaxed text-lg">
            {project.sections.growth}
          </p>
        </CaseStudySection>

        <CaseStudySection title="Results">
          <ResultsGrid results={project.sections.results} />
        </CaseStudySection>

        <MediaGallery media={project.media} />

        <CaseStudySection title="Lessons Learned">
          <LessonsList lessons={project.sections.lessons} />
        </CaseStudySection>
      </div>

      <NextProject project={nextProject} />
    </>
  );
}
