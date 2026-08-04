import { Portfolio } from "@/components/Portfolio";
import {
  toHomeSlides,
  toProjectSections,
  toSlides,
  type ContactContent,
  type Homepage,
  type SanityProject,
} from "@/lib/content";
import { sanityClient } from "@/lib/sanity/client";
import {
  contactQuery,
  homepageQuery,
  projectsQuery,
} from "@/lib/sanity/queries";

export default async function Home() {
  const [projects, contact, homepage] = await Promise.all([
    sanityClient.fetch<SanityProject[]>(projectsQuery),
    sanityClient.fetch<ContactContent>(contactQuery),
    sanityClient.fetch<Homepage>(homepageQuery),
  ]);

  const sections = toProjectSections(projects);
  const slides = toSlides(sections);

  return (
    <Portfolio
      sections={sections}
      slides={slides}
      homeSlides={toHomeSlides(homepage, slides)}
      contact={contact}
    />
  );
}
