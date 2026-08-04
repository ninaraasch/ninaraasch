export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt?: string | null;
};

export type SanityProject = {
  slug: string;
  campaign?: string | null;
  client: string;
  cover?: ProjectImage | null;
  images: ProjectImage[];
};

export type ProjectSection = {
  slug: string;
  campaign: string;
  client: string;
  title: string;
  cover: ProjectImage;
  images: ProjectImage[];
  startIndex: number;
};

export type Slide = ProjectImage & {
  title: string;
  alt: string;
};

export type ContactLink = {
  label: string;
  text: string;
  href: string;
};

export type ContactList = {
  label: string;
  items: string[];
};

export type ContactContent = {
  intro: string;
  links: ContactLink[];
  lists: ContactList[];
  exhibitions: string[];
};

export function projectTitle(project: SanityProject) {
  return [project.campaign, project.client].filter(Boolean).join(" — ");
}

export function toProjectSections(projects: SanityProject[]): ProjectSection[] {
  let startIndex = 0;

  return projects.map((project) => {
    const section: ProjectSection = {
      slug: project.slug,
      campaign: project.campaign ?? "",
      client: project.client,
      title: projectTitle(project),
      cover: project.cover ?? project.images[0],
      images: project.images,
      startIndex,
    };
    startIndex += project.images.length;
    return section;
  });
}

export function toSlides(sections: ProjectSection[]): Slide[] {
  return sections.flatMap((section) =>
    section.images.map((image, index) => ({
      ...image,
      title: section.title,
      alt:
        image.alt ??
        `${section.title}, image ${index + 1}, photographed by Nina Raasch`,
    })),
  );
}
