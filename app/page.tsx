import { Portfolio } from "@/components/Portfolio";
import {
  toProjectSections,
  toSlides,
  type ContactContent,
  type SanityProject,
} from "@/lib/content";
import { sanityClient } from "@/lib/sanity/client";
import { contactQuery, projectsQuery } from "@/lib/sanity/queries";

export default async function Home() {
  const [projects, contact] = await Promise.all([
    sanityClient.fetch<SanityProject[]>(projectsQuery),
    sanityClient.fetch<ContactContent>(contactQuery),
  ]);

  const sections = toProjectSections(projects);

  return (
    <Portfolio
      sections={sections}
      slides={toSlides(sections)}
      contact={contact}
    />
  );
}
