"use client";

import { useState } from "react";
import type { Slide } from "@/data/projects";
import { useMountEffect } from "@/hooks/useMountEffect";
import { Cursor } from "./Cursor";
import { Navigation, type MenuName } from "./Navigation";
import { Slideshow } from "./Slideshow";

export function Portfolio({ slides }: { slides: Slide[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openMenu, setOpenMenu] = useState<MenuName | null>(null);

  const step = (offset: number) =>
    setCurrentIndex((index) => (index + offset + slides.length) % slides.length);

  const toggleMenu = (menu: MenuName) =>
    setOpenMenu((current) => (current === menu ? null : menu));

  useMountEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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

      <div className="fixed inset-0 flex">
        <button
          type="button"
          aria-label="Previous image"
          onClick={() => step(-1)}
          className="edge-zone flex h-full w-1/2 items-center justify-start pl-7"
        >
          <span className="edge-dot" />
        </button>
        <button
          type="button"
          aria-label="Next image"
          onClick={() => step(1)}
          className="edge-zone flex h-full w-1/2 items-center justify-end pr-7"
        >
          <span className="edge-dot" />
        </button>
      </div>

      <Cursor />

      <Navigation
        slides={slides}
        currentIndex={currentIndex}
        openMenu={openMenu}
        onToggleMenu={toggleMenu}
        onCloseMenu={() => setOpenMenu(null)}
      />
    </main>
  );
}
