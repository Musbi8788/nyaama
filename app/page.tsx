import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/marketing/Header";
import { Hero } from "@/components/marketing/Hero";
import {
  CoreSkills,
  FinalCta,
  Footer,
  HowItWorks,
  LanguageSection,
  PathGrid,
  ProblemSection,
  ProjectShowcase,
} from "@/components/marketing/Sections";
import type { CareerPath, Project } from "@/lib/types/database";

/** Content is public (RLS allows anon select), so this renders for signed-out visitors. */
export default async function LandingPage() {
  const supabase = await createClient();

  const [{ data: pathData }, { data: projectData }] = await Promise.all([
    supabase.from("career_paths").select("*").order("sort"),
    supabase.from("projects").select("*"),
  ]);

  const paths = (pathData ?? []) as CareerPath[];
  const projects = (projectData ?? []) as Project[];

  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <HowItWorks />
        {paths.length > 0 && <PathGrid paths={paths} />}
        {/* Self-guarding: renders nothing until the paths agree on a skill. */}
        <CoreSkills paths={paths} />
        {projects.length > 0 && <ProjectShowcase projects={projects} />}
        <LanguageSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
