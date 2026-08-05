import { Portfolio } from "@/components/Portfolio";
import {
  toHomeSlides,
  toProjectSections,
  toSlides,
  type ContactContent,
  type Homepage,
  type Print,
  type SanityProject,
} from "@/lib/content";
import { sanityClient } from "@/lib/sanity/client";
import {
  contactQuery,
  homepageQuery,
  printsQuery,
  projectsQuery,
} from "@/lib/sanity/queries";

export default async function Home() {
  const [projects, contact, homepage, prints] = await Promise.all([
    sanityClient.fetch<SanityProject[]>(projectsQuery),
    sanityClient.fetch<ContactContent>(contactQuery),
    sanityClient.fetch<Homepage>(homepageQuery),
    sanityClient.fetch<Print[]>(printsQuery),
  ]);

  const sections = toProjectSections(projects);
  const slides = toSlides(sections);

  const email = contact?.links?.find((link) => link.href.startsWith("mailto:"));
  const profiles = (contact?.links ?? [])
    .filter((link) => link.href.startsWith("http"))
    .map((link) => link.href);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nina Raasch",
    jobTitle: "Photographer",
    url: "https://ninaraasch.com",
    image: "https://ninaraasch.com/og.png",
    description: contact?.intro,
    email: email?.href.replace("mailto:", ""),
    sameAs: profiles,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Berlin",
      addressCountry: "DE",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <h1 className="sr-only">Nina Raasch — Photographer, London and Berlin</h1>
      <Portfolio
        sections={sections}
        slides={slides}
        homeSlides={toHomeSlides(homepage, slides)}
        contact={contact}
        prints={prints}
      />
    </>
  );
}
