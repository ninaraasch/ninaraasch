"use client";

type EdgeZonesProps = {
  onPrevious: () => void;
  onNext: () => void;
};

export function EdgeZones({ onPrevious, onNext }: EdgeZonesProps) {
  return (
    <div className="absolute inset-0 flex">
      <button
        type="button"
        aria-label="Previous image"
        onClick={onPrevious}
        className="edge-zone flex h-full w-1/2 items-center justify-start pl-7"
      >
        <span className="edge-dot" />
      </button>
      <button
        type="button"
        aria-label="Next image"
        onClick={onNext}
        className="edge-zone flex h-full w-1/2 items-center justify-end pr-7"
      >
        <span className="edge-dot" />
      </button>
    </div>
  );
}
