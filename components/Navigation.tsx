"use client";

import Link from "next/link";
import { useRef } from "react";
import { useMountEffect } from "@/hooks/useMountEffect";
import type {
  ContactContent,
  Print,
  ProjectSection,
  Slide,
} from "@/lib/content";
import { Contact } from "./Contact";
import { Overview } from "./Overview";
import { Prints } from "./Prints";

function PrintsButton({
  prints,
  openMenu,
  onToggleMenu,
  className = "",
}: {
  prints: Print[];
  openMenu: MenuName | null;
  onToggleMenu: (menu: MenuName) => void;
  className?: string;
}) {
  if (prints.length === 0) {
    return (
      <button
        type="button"
        aria-disabled="true"
        className={`underline-reveal bold ${className}`}
      >
        prints
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-expanded={openMenu === "prints"}
      aria-controls="prints-panel"
      data-active={openMenu === "prints"}
      onClick={() => onToggleMenu("prints")}
      className={`underline-reveal bold ${className}`}
    >
      prints
    </button>
  );
}

export type MenuName = "overview" | "contact" | "prints";

type NavigationProps = {
  sections: ProjectSection[];
  contact: ContactContent;
  prints: Print[];
  slides: Slide[];
  currentIndex: number;
  openMenu: MenuName | null;
  hasOpenedOverview: boolean;
  onToggleMenu: (menu: MenuName) => void;
  onCloseMenu: () => void;
  onOpenProject: (slug: string) => void;
  onNextProject: () => void;
  onHome: () => void;
};

export function Navigation({
  sections,
  contact,
  prints,
  slides,
  currentIndex,
  openMenu,
  hasOpenedOverview,
  onToggleMenu,
  onCloseMenu,
  onOpenProject,
  onNextProject,
  onHome,
}: NavigationProps) {
  const isOpen = openMenu !== null;
  const titleRef = useRef<HTMLButtonElement>(null);
  const counterRef = useRef<HTMLButtonElement>(null);

  useMountEffect(() => {
    const title = titleRef.current;
    const counter = counterRef.current;
    if (!title) return;

    const syncTitleOffset = () => {
      document.documentElement.style.setProperty(
        "--title-offset",
        `${Math.round(title.getBoundingClientRect().left)}px`,
      );
    };

    syncTitleOffset();
    const observer = new ResizeObserver(syncTitleOffset);
    observer.observe(document.body);
    if (counter) observer.observe(counter);
    return () => observer.disconnect();
  });

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
                sections={sections}
                hasOpened={hasOpenedOverview}
                onOpen={onOpenProject}
              />
            </div>
          </div>

          <div
            id="prints-panel"
            className="panel"
            data-open={openMenu === "prints"}
            inert={openMenu !== "prints"}
          >
            <div className="panel-content pt-5">
              <Prints prints={prints} />
            </div>
          </div>

          <div
            id="contact-panel"
            className="panel"
            data-open={openMenu === "contact"}
            inert={openMenu !== "contact"}
          >
            <div className="panel-content pt-5">
              <Contact content={contact} />
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

          <div className="col-start-2 row-start-1 flex min-w-0 items-baseline justify-end gap-2.5 justify-self-end nav:col-span-10 nav:col-start-3 nav:justify-start nav:justify-self-start nav:gap-5">
            <button
              type="button"
              aria-expanded={openMenu === "overview"}
              aria-controls="overview-panel"
              data-active={openMenu === "overview"}
              onClick={() => onToggleMenu("overview")}
              className="underline-reveal bold shrink-0"
            >
              overview
            </button>
            <button
              type="button"
              aria-expanded={openMenu === "contact"}
              aria-controls="contact-panel"
              data-active={openMenu === "contact"}
              onClick={() => onToggleMenu("contact")}
              className="underline-reveal bold shrink-0"
            >
              contact
            </button>
            <PrintsButton
              prints={prints}
              openMenu={openMenu}
              onToggleMenu={onToggleMenu}
              className="shrink-0"
            />

            <div className="slide-meta flex min-w-0 items-baseline gap-2.5 nav:gap-5">
              <button
                ref={counterRef}
                type="button"
                onClick={onNextProject}
                aria-label="Next project"
                className="underline-reveal shrink-0"
              >
                {currentIndex + 1}/{slides.length}
              </button>
              <button
                ref={titleRef}
                type="button"
                onClick={onNextProject}
                aria-label="Next project"
                className="underline-reveal truncate"
              >
                {slides[currentIndex].title}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
