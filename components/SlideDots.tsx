"use client";

import type { CSSProperties } from "react";

const SLOTS = [0, 1, 2, 3, 4];
const CURRENT = 2;

type SlideDotsProps = {
  index: number;
  total: number;
  direction: number;
};

export function SlideDots({ index, total, direction }: SlideDotsProps) {
  if (total < 2) return null;

  return (
    <div className="slide-dots" aria-hidden="true">
      <div className="slide-dots-window">
        <div
          key={index}
          className="slide-dots-track"
          style={{ "--dir": direction } as CSSProperties}
        >
          {SLOTS.map((slot) => (
            <span
              key={slot}
              className={`slide-dot ${slot === CURRENT ? "slide-dot-current" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
