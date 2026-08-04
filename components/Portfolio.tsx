"use client";

import { useRef, useState } from "react";
import { projectSections, type Slide } from "@/data/projects";
import { useMountEffect } from "@/hooks/useMountEffect";
import { Cursor } from "./Cursor";
import { EdgeZones } from "./EdgeZones";
import { Navigation, type MenuName } from "./Navigation";
import { ProjectView } from "./ProjectView";
import { Slideshow } from "./Slideshow";

export function Portfolio({ slides }: { slides: Slide[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openMenu, setOpenMenu] = useState<MenuName | null>(null);
  const [hasOpenedOverview, setHasOpenedOverview] = useState(false);
  const [openProjectSlug, setOpenProjectSlug] = useState<string | null>(null);
  const openProjectRef = useRef<string | null>(null);

  const project = projectSections.find(
    (section) => section.slug === openProjectSlug,
  );

  const step = (offset: number) =>
    setCurrentIndex((index) => (index + offset + slides.length) % slides.length);

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
      <Slideshow slides={slides} currentIndex={currentIndex} />

      <EdgeZones onPrevious={() => step(-1)} onNext={() => step(1)} />

      <Navigation
        slides={slides}
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

      <Cursor />
    </main>
  );
}
