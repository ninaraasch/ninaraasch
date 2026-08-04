"use client";

import type { ProjectSection } from "@/lib/content";
import { Asset } from "./Asset";

type OverviewProps = {
  sections: ProjectSection[];
  hasOpened: boolean;
  onOpen: (slug: string) => void;
};

export function Overview({ sections, hasOpened, onOpen }: OverviewProps) {
  return (
    <div
      className="hide-scrollbar overflow-y-auto"
      style={{ maxHeight: "calc(100dvh - var(--nav-height) - 20px)" }}
    >
      <div className="grid grid-cols-2 gap-5 px-[var(--page-margin)] pb-5 nav:grid-cols-5 nav:pb-[30px]">
        {sections.map((section) => (
          <button
            key={section.slug}
            type="button"
            onClick={() => onOpen(section.slug)}
            className="group relative block w-full"
          >
            {hasOpened ? (
              <Asset
                src={section.cover.src}
                width={section.cover.width}
                height={section.cover.height}
                alt={`${section.title}, photographed by Nina Raasch`}
                sizes="(max-width: 700px) 50vw, 20vw"
                aspectRatio="4/5"
                className="pointer-events-none w-full"
              />
            ) : (
              <div className="aspect-[4/5] w-full bg-placeholder" />
            )}

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-ink/45 p-4 text-center text-paper opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
              {section.campaign ? (
                <span className="italic">{section.campaign}</span>
              ) : null}
              <span>{section.client}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
