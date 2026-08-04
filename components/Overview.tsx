"use client";

import { projectSections } from "@/data/projects";
import { Asset } from "./Asset";

type OverviewProps = {
  hasOpened: boolean;
  onOpen: (slug: string) => void;
};

export function Overview({ hasOpened, onOpen }: OverviewProps) {
  return (
    <div
      className="hide-scrollbar overflow-y-auto"
      style={{ maxHeight: "calc(100dvh - var(--nav-height) - 20px)" }}
    >
      <div className="grid grid-cols-2 gap-5 px-[var(--page-margin)] pb-5 nav:grid-cols-5 nav:pb-[30px]">
        {projectSections.map((section) => {
          const cover = section.images[0];

          return (
            <button
              key={section.slug}
              type="button"
              onClick={() => onOpen(section.slug)}
              className="group relative block w-full"
            >
              {hasOpened ? (
                <Asset
                  src={cover.src}
                  width={cover.width}
                  height={cover.height}
                  alt={`${section.campaign} for ${section.client}, photographed by Nina Raasch`}
                  sizes="(max-width: 700px) 50vw, 20vw"
                  aspectRatio="4/5"
                  className="pointer-events-none w-full"
                />
              ) : (
                <div className="aspect-[4/5] w-full bg-placeholder" />
              )}

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-ink/45 p-4 text-center text-paper opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
                <span className="italic">{section.campaign}</span>
                <span>{section.client}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
