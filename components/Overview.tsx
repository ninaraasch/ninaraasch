"use client";

import type { Slide } from "@/data/projects";
import { useViewportWidth } from "@/hooks/useViewport";
import {
  GRID_GAP,
  pageMargin,
  spanForIndex,
  teaserContainerWidth,
  teaserItemWidth,
} from "@/lib/grid";
import { packMasonry } from "@/lib/masonry";
import { Asset } from "./Asset";

type OverviewProps = {
  slides: Slide[];
  hasOpened: boolean;
  onSelect: (index: number) => void;
};

export function Overview({ slides, hasOpened, onSelect }: OverviewProps) {
  const viewportWidth = useViewportWidth();
  const margin = pageMargin(viewportWidth);
  const containerWidth = teaserContainerWidth(viewportWidth);

  const layout = packMasonry(
    slides.map((slide, index) => {
      const width = teaserItemWidth(viewportWidth, spanForIndex(index));
      return { width, height: (width * slide.height) / slide.width };
    }),
    containerWidth,
    GRID_GAP,
  );

  return (
    <div
      className="hide-scrollbar overflow-y-scroll"
      style={{ height: `calc(100dvh - var(--nav-height) - 20px)` }}
    >
      <div
        className="relative mb-5"
        style={{
          height: layout.height,
          marginLeft: margin,
          marginRight: margin,
        }}
      >
        {slides.map((slide, index) => {
          const box = layout.boxes[index];

          return (
            <button
              key={slide.src}
              type="button"
              onClick={() => onSelect(index)}
              className="absolute flex cursor-pointer"
              style={{ top: box.y, left: box.x, width: box.width }}
            >
              {hasOpened ? (
                <Asset
                  src={slide.src}
                  width={slide.width}
                  height={slide.height}
                  alt={slide.alt}
                  sizes="(max-width: 700px) 50vw, 25vw"
                  className="pointer-events-none w-full"
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
