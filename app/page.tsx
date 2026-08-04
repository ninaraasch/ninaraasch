import { Portfolio } from "@/components/Portfolio";
import {
  toHomeSlides,
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
  const slides = toSlides(sections);

  return (
    <Portfolio
      sections={sections}
      slides={slides}
      homeSlides={toHomeSlides(slides)}
      contact={contact}
    />
  );
}
