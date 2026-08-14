"use client";

import { useRef, useState } from "react";
import type {
  ContactContent,
  Print,
  ProjectSection,
  Slide,
} from "@/lib/content";
import { useMountEffect } from "@/hooks/useMountEffect";
import { Cursor } from "./Cursor";
import { EdgeZones } from "./EdgeZones";
import { Navigation, type MenuName } from "./Navigation";
import { ProjectView } from "./ProjectView";
import { SlideDots } from "./SlideDots";
import { Slideshow } from "./Slideshow";

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

  const toggleMenu = (menu: MenuName) => {
    setOpenMenu((current) => (current === menu ? null : menu));
    if (menu === "overview") setHasOpenedOverview(true);
  };

  const openProject = (slug: string) => {
    openProjectRef.current = slug;
    setOpenProjectSlug(slug);
    setOpenMenu(null);
  };

  const closeProject = () => {
    openProjectRef.current = null;
    setOpenProjectSlug(null);
  };

  const goHome = () => {
    closeProject();
    setOpenMenu(null);
  };

  const returnToIndex = () => {
    closeProject();
    setOpenMenu("overview");
  };

  useMountEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (openProjectRef.current) return;
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "Escape") setOpenMenu(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <main className="relative h-dvh overflow-hidden">
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
        onCloseMenu={() => setOpenMenu(null)}
        onOpenProject={openProject}
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
