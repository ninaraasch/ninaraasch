"use client";

import Link from "next/link";
import type { Slide } from "@/data/projects";
import { Contact } from "./Contact";
import { Overview } from "./Overview";

export type MenuName = "overview" | "contact";

type NavigationProps = {
  slides: Slide[];
  currentIndex: number;
  openMenu: MenuName | null;
  hasOpenedOverview: boolean;
  onToggleMenu: (menu: MenuName) => void;
  onCloseMenu: () => void;
  onOpenProject: (slug: string) => void;
  onHome: () => void;
};

export function Navigation({
  slides,
  currentIndex,
  openMenu,
  hasOpenedOverview,
  onToggleMenu,
  onCloseMenu,
  onOpenProject,
  onHome,
}: NavigationProps) {
  const isOpen = openMenu !== null;

  return (
    <nav className="pointer-events-none fixed inset-0 z-99 flex overflow-hidden">
      <button
        type="button"
        tabIndex={isOpen ? 0 : -1}
        aria-label="Close menu"
        onClick={onCloseMenu}
        className={`absolute inset-0 z-0 bg-ink/25 transition-opacity duration-200 ease-out ${
          isOpen
            ? "pointer-events-auto opacity-100 delay-[350ms]"
            : "pointer-events-none opacity-0 delay-0"
        }`}
      />

      <div className="relative z-10 w-full self-start">
        <div className="panel-clip">
          <div
            id="overview-panel"
            className="panel"
            data-open={openMenu === "overview"}
            inert={openMenu !== "overview"}
          >
            <div className="panel-content pt-5">
              <Overview
                hasOpened={hasOpenedOverview}
                onOpen={onOpenProject}
              />
            </div>
          </div>

          <div
            id="contact-panel"
            className="panel"
            data-open={openMenu === "contact"}
            inert={openMenu !== "contact"}
          >
            <div className="panel-content pt-5">
              <Contact />
            </div>
          </div>
        </div>

        <div className="pointer-events-auto relative z-[2] grid min-h-[var(--nav-height)] grid-cols-2 items-baseline gap-5 bg-paper p-[var(--page-margin)] nav:grid-cols-12 nav:px-[var(--page-margin)] nav:py-[13px]">
          <Link
            href="/"
            onClick={onHome}
            className="logotype col-start-1 row-start-1 nav:col-span-2 nav:col-start-1"
          >
            Nina Raasch
          </Link>

          <div className="col-span-2 row-start-2 flex min-w-0 items-baseline gap-2.5 nav:col-span-5 nav:col-start-3 nav:row-start-1 nav:gap-5">
            <button
              type="button"
              aria-expanded={openMenu === "overview"}
              aria-controls="overview-panel"
              data-active={openMenu === "overview"}
              onClick={() => onToggleMenu("overview")}
              className="underline-reveal shrink-0"
            >
              overview
            </button>
            <button
              type="button"
              aria-expanded={openMenu === "contact"}
              aria-controls="contact-panel"
              data-active={openMenu === "contact"}
              onClick={() => onToggleMenu("contact")}
              className="underline-reveal shrink-0"
            >
              contact
            </button>
            <p className="shrink-0">
              {currentIndex + 1}/{slides.length}
            </p>
            <p className="truncate">{slides[currentIndex].title}</p>
          </div>

          <div className="col-start-2 row-start-1 flex justify-end gap-2.5 justify-self-end nav:col-span-5 nav:col-start-8 nav:gap-5 nav:justify-self-stretch">
            <button type="button" aria-disabled="true" className="underline-reveal">
              prints
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
