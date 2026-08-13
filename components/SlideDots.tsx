"use client";

import type { CSSProperties } from "react";

type SlideDotsProps = {
  index: number;
  total: number;
  direction: number;
};

export function SlideDots({ index, total, direction }: SlideDotsProps) {
  if (total < 2) return null;

  return (
    <div className="slide-dots" aria-hidden="true">
      <div
        key={index}
        className="slide-dots-track"
        style={{ "--dir": direction } as CSSProperties}
      >
        <span className="slide-dot" />
        <span className="slide-dot slide-dot-current" />
        <span className="slide-dot" />
      </div>
    </div>
  );
}
