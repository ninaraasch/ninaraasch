"use client";

import { useRef, useState } from "react";
import type { ProjectSection, Slide } from "@/lib/content";
import { useMountEffect } from "@/hooks/useMountEffect";
import { useViewportWidth } from "@/hooks/useViewport";
import { indexMetrics, justifyRows } from "@/lib/indexLayout";
import { Asset } from "./Asset";
import { EdgeZones } from "./EdgeZones";
import { Slideshow } from "./Slideshow";

type ProjectViewProps = {
  project: ProjectSection;
  slides: Slide[];
  onBackToOverview: () => void;
  onClose: () => void;
};

export function ProjectView({
  project,
  slides,
  onBackToOverview,
  onClose,
}: ProjectViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showIndex, setShowIndex] = useState(false);
  const showIndexRef = useRef(false);
  const viewportWidth = useViewportWidth();

  const { containerWidth, targetHeight, gap } = indexMetrics(viewportWidth);
  const rows = justifyRows(slides, containerWidth, gap, targetHeight);

  const step = (offset: number) =>
    setCurrentIndex((index) => (index + offset + slides.length) % slides.length);

  const closeIndex = () => {
    showIndexRef.current = false;
    setShowIndex(false);
    setCurrentIndex(0);
  };

  const toggleIndex = () => {
    if (showIndexRef.current) {
      closeIndex();
      return;
    }
    showIndexRef.current = true;
    setShowIndex(true);
  };

  const selectSlide = (index: number) => {
    showIndexRef.current = false;
    setShowIndex(false);
    setCurrentIndex(index);
  };

  useMountEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (showIndexRef.current) {
          closeIndex();
          return;
        }
        onClose();
        return;
      }
      if (showIndexRef.current) return;
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="fixed inset-0 z-[200] bg-paper">
      <Slideshow slides={slides} currentIndex={currentIndex} />

      {showIndex ? null : (
        <EdgeZones onPrevious={() => step(-1)} onNext={() => step(1)} />
      )}

      {showIndex ? (
        <div className="hide-scrollbar absolute inset-x-0 top-[var(--nav-height)] bottom-[var(--nav-height)] z-5 overflow-y-auto bg-paper">
          <div className="flex flex-col gap-2.5 px-[var(--page-margin)] py-5">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-2.5">
                {row.items.map(({ item, index }) => (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => selectSlide(index)}
                    className="shrink-0 cursor-pointer"
                    style={{ height: row.height }}
                  >
                    <Asset
                      src={item.src}
                      width={item.width}
                      height={item.height}
                      alt={item.alt}
                      sizes="(max-width: 700px) 50vw, 15vw"
                      className="pointer-events-none h-full w-auto"
                    />
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between">
        <div className="flex min-h-[var(--nav-height)] items-baseline justify-between p-[var(--page-margin)] nav:px-[var(--page-margin)] nav:py-[13px]">
          <p>{project.title}</p>
          <button
            type="button"
            aria-label={showIndex ? "Close index" : "Back to overview"}
            onClick={showIndex ? closeIndex : onBackToOverview}
            className="pointer-events-auto -m-3 cursor-pointer p-3 text-[22px] leading-none transition-opacity duration-200 hover:opacity-50"
          >
            ×
          </button>
        </div>

        <div className="flex min-h-[var(--nav-height)] items-baseline justify-between p-[var(--page-margin)] nav:px-[var(--page-margin)] nav:py-[13px]">
          {showIndex ? null : (
            <>
              <button
                type="button"
                aria-expanded={showIndex}
                onClick={toggleIndex}
                className="underline-reveal pointer-events-auto"
              >
                Index
              </button>
              <p>
                {currentIndex + 1}/{slides.length}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
