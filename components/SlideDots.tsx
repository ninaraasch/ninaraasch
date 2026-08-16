"use client";

type SlideDotsProps = {
  pulse: number;
  direction: number;
  hidden: boolean;
};

export function SlideDots({ pulse, direction, hidden }: SlideDotsProps) {
  const back = pulse > 0 && direction < 0;
  const forward = pulse > 0 && direction > 0;

  return (
    <div className="slide-dots" data-hidden={hidden} aria-hidden="true">
      <span
        key={back ? `back-${pulse}` : "back"}
        className={`slide-dot ${back ? "slide-dot-flash" : ""}`}
      />
      <span
        key={forward ? `forward-${pulse}` : "forward"}
        className={`slide-dot ${forward ? "slide-dot-flash" : ""}`}
      />
    </div>
  );
}
