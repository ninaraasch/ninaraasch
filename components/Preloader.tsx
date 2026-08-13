"use client";

import { useRef, useState } from "react";
import { useMountEffect } from "@/hooks/useMountEffect";
import type { Slide } from "@/lib/content";

const MIN_DURATION = 2800;
const SETTLE = 400;
const LIFT = 1400;
const STEP = 1;
const MAX_FRAMES = 12;

type Phase = "loading" | "leaving" | "gone";

function easeOut(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

function preloadUrl(src: string, width = 900) {
  return `${src}?w=${width}&q=75&fit=max&auto=format`;
}

function Wheel({ trackRef }: { trackRef: React.RefObject<HTMLSpanElement | null> }) {
  return (
    <span className="wheel">
      <span ref={trackRef} className="wheel-track">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit, index) => (
          <span key={index}>{digit}</span>
        ))}
      </span>
    </span>
  );
}

export function Preloader({ slides }: { slides: Slide[] }) {
  const [phase, setPhase] = useState<Phase>("loading");
  const hundreds = useRef<HTMLSpanElement>(null);
  const tens = useRef<HTMLSpanElement>(null);
  const units = useRef<HTMLSpanElement>(null);
  const frame = useRef<HTMLImageElement>(null);

  useMountEffect(() => {
    const sources = slides.slice(0, MAX_FRAMES).map((slide) => slide.src);
    if (sources.length === 0) return;

    const start = performance.now();
    const arrived: string[] = [];
    let windowLoaded = document.readyState === "complete";
    let animation = 0;
    let shown = -1;
    let settleTimer = 0;
    let goneTimer = 0;

    const onLoad = () => {
      windowLoaded = true;
    };
    if (!windowLoaded) window.addEventListener("load", onLoad);

    const preloaders = sources.map((src, index) => {
      const url = preloadUrl(src, index === 0 ? 2000 : 900);
      const image = new Image();
      image.onload = () => {
        arrived.push(url);
        if (frame.current && !frame.current.src) frame.current.src = url;
      };
      image.src = url;
      return image;
    });

    const roll = (track: HTMLSpanElement | null, position: number) => {
      if (track) track.style.transform = `translateY(${-position * STEP}em)`;
    };

    const tick = (now: number) => {
      const elapsed = now - start;
      const byTime = easeOut(Math.min(elapsed / MIN_DURATION, 1));
      const byAssets = arrived.length / sources.length;
      const progress = windowLoaded
        ? byTime
        : Math.min(byTime, byAssets, 0.99);

      const value = progress * 100;
      const whole = Math.floor(value);
      const fraction = value - whole;
      const unitDigit = whole % 10;
      const tenDigit = Math.floor(whole / 10) % 10;

      roll(units.current, unitDigit + fraction);
      roll(tens.current, tenDigit + (unitDigit === 9 ? fraction : 0));
      roll(
        hundreds.current,
        Math.floor(whole / 100) + (tenDigit === 9 && unitDigit === 9 ? fraction : 0),
      );

      if (arrived.length > 0) {
        const next = Math.min(
          arrived.length - 1,
          Math.floor(progress * sources.length),
        );
        if (next !== shown) {
          shown = next;
          if (frame.current) frame.current.src = arrived[next];
        }
      }

      if (progress < 1) {
        animation = requestAnimationFrame(tick);
        return;
      }

      if (frame.current) frame.current.src = preloadUrl(sources[0], 2000);

      settleTimer = window.setTimeout(() => {
        setPhase("leaving");
        goneTimer = window.setTimeout(() => setPhase("gone"), LIFT);
      }, SETTLE);
    };

    animation = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animation);
      window.clearTimeout(settleTimer);
      window.clearTimeout(goneTimer);
      window.removeEventListener("load", onLoad);
      preloaders.forEach((image) => {
        image.onload = null;
      });
    };
  });

  return (
    <div className="preloader" data-phase={phase} aria-hidden="true">
      <noscript>
        <style>{".preloader { display: none; }"}</style>
      </noscript>

      <div className="preloader-sheet">
        <div className="preloader-content">
          <span className="preloader-mark">
            <span className="logotype">Nina Raasch</span>
          </span>

          <div className="preloader-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={frame} alt="" />
          </div>

          <div className="preloader-count">
            <Wheel trackRef={hundreds} />
            <Wheel trackRef={tens} />
            <Wheel trackRef={units} />
          </div>
        </div>
      </div>
    </div>
  );
}
