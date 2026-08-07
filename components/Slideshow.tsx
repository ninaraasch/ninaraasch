"use client";

import type { Slide } from "@/lib/content";
import { useViewportHeight, useViewportWidth } from "@/hooks/useViewport";
import { Asset } from "./Asset";

const PAGE_INSET = 87;
const PAGE_MARGIN = 20;
const WINDOW = 2;

type SlideshowProps = {
  slides: Slide[];
  currentIndex: number;
};

function isNear(index: number, currentIndex: number, total: number) {
  const distance = Math.abs(index - currentIndex);
  return Math.min(distance, total - distance) <= WINDOW;
}

export function Slideshow({ slides, currentIndex }: SlideshowProps) {
  const viewportWidth = useViewportWidth();
  const viewportHeight = useViewportHeight();
  const frameRatio =
    (viewportWidth - PAGE_MARGIN * 2) / (viewportHeight - PAGE_INSET * 2);

  return (
    <ul className="pointer-events-none absolute top-[var(--page-inset)] right-[var(--page-margin)] bottom-[var(--page-inset)] left-[var(--page-margin)] m-0 list-none p-0">
      {slides.map((slide, index) => {
        const isActive = index === currentIndex;
        const isRendered = isNear(index, currentIndex, slides.length);
        const fitsByHeight = frameRatio > slide.width / slide.height;

        return (
          <li
            key={slide.src}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-[250ms] ease-out ${
              isActive ? "opacity-100" : "opacity-0"
            } ${isRendered ? "will-change-[opacity]" : ""}`}
            aria-hidden={!isActive}
          >
            {isRendered ? (
              <Asset
                src={slide.src}
                width={slide.width}
                height={slide.height}
                alt={slide.alt}
                sizes="90vw"
                priority={index === 0}
                className={`shrink-0 ${
                  fitsByHeight ? "h-full w-auto" : "h-auto w-full"
                }`}
              />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
