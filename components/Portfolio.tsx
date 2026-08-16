"use client";

import { useRef, useState, type CSSProperties } from "react";
import type {
  ContactContent,
  Print,
  ProjectSection,
  Slide,
} from "@/lib/content";
import { useMountEffect } from "@/hooks/useMountEffect";
import { useViewportHeight, useViewportWidth } from "@/hooks/useViewport";
import { Cursor } from "./Cursor";
import { EdgeZones } from "./EdgeZones";
import { Navigation, type MenuName } from "./Navigation";
import { ProjectView } from "./ProjectView";
import { SlideDots } from "./SlideDots";
import { Slideshow } from "./Slideshow";

const PAGE_INSET = 87;

type PortfolioProps = {
  sections: ProjectSection[];
  slides: Slide[];
  homeSlides: Slide[];
  contact: ContactContent;
  prints: Print[];
};

export function Portfolio({
  sections,
  slides,
  homeSlides,
  contact,
  prints,
}: PortfolioProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openMenu, setOpenMenu] = useState<MenuName | null>(null);
  const [hasOpenedOverview, setHasOpenedOverview] = useState(false);
  const [openProjectSlug, setOpenProjectSlug] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);
  const [pulse, setPulse] = useState(0);
  const openProjectRef = useRef<string | null>(null);
  const openMenuRef = useRef<MenuName | null>(null);

  const setMenu = (menu: MenuName | null) => {
    openMenuRef.current = menu;
    setOpenMenu(menu);
  };

  const viewportWidth = useViewportWidth();
  const viewportHeight = useViewportHeight();
  const margin = viewportWidth <= 700 ? 10 : 20;
  const frameWidth = viewportWidth - margin * 2;
  const frameHeight = viewportHeight - PAGE_INSET * 2;
  const slide = homeSlides[currentIndex];
  const renderedHeight =
    frameWidth / frameHeight > slide.width / slide.height
      ? frameHeight
      : frameWidth / (slide.width / slide.height);
  const imageBottom = PAGE_INSET + Math.max(0, frameHeight - renderedHeight) / 2;

  const project = sections.find(
    (section) => section.slug === openProjectSlug,
  );

  const step = (offset: number) => {
    setDirection(offset > 0 ? 1 : -1);
    setPulse((count) => count + 1);
    setCurrentIndex(
      (index) => (index + offset + homeSlides.length) % homeSlides.length,
    );
  };

  const nextProject = () => {
    const current = homeSlides[currentIndex].title;
    let offset = 1;
    while (
      offset < homeSlides.length &&
      homeSlides[(currentIndex + offset) % homeSlides.length].title === current
    ) {
      offset += 1;
    }
    step(offset);
  };

  const toggleMenu = (menu: MenuName) => {
    setMenu(openMenuRef.current === menu ? null : menu);
    if (menu === "overview") setHasOpenedOverview(true);
  };

  const openProject = (slug: string) => {
    openProjectRef.current = slug;
    setOpenProjectSlug(slug);
    setMenu(null);
  };

  const closeProject = () => {
    openProjectRef.current = null;
    setOpenProjectSlug(null);
  };

  const goHome = () => {
    closeProject();
    setMenu(null);
  };

  const returnToIndex = () => {
    closeProject();
    setMenu("overview");
  };

  useMountEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(null);
        return;
      }
      if (openProjectRef.current || openMenuRef.current) return;
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <main
      className="relative h-dvh overflow-hidden"
      style={{ "--image-bottom": `${Math.round(imageBottom)}px` } as CSSProperties}
    >
      <Slideshow slides={homeSlides} currentIndex={currentIndex} />

      <EdgeZones onPrevious={() => step(-1)} onNext={() => step(1)} />

      <Navigation
        sections={sections}
        contact={contact}
        prints={prints}
        slides={homeSlides}
        currentIndex={currentIndex}
        openMenu={openMenu}
        hasOpenedOverview={hasOpenedOverview}
        onToggleMenu={toggleMenu}
        onCloseMenu={() => setMenu(null)}
        onOpenProject={openProject}
        onNextProject={nextProject}
        onHome={goHome}
      />

      {project ? (
        <ProjectView
          key={project.slug}
          project={project}
          slides={slides.slice(
            project.startIndex,
            project.startIndex + project.images.length,
          )}
          onClose={closeProject}
          onBackToOverview={returnToIndex}
        />
      ) : null}

      <SlideDots pulse={pulse} direction={direction} />

      <Cursor />
    </main>
  );
}
