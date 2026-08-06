"use client";

import { useRef, useState } from "react";
import { useMountEffect } from "@/hooks/useMountEffect";

const MIN_DURATION = 1600;
const SETTLE = 350;
const LIFT = 900;

type Phase = "loading" | "leaving" | "gone";

function easeOut(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

export function Preloader() {
  const [phase, setPhase] = useState<Phase>("loading");
  const counterRef = useRef<HTMLSpanElement>(null);

  useMountEffect(() => {
    const start = performance.now();
    let loaded = document.readyState === "complete";
    let frame = 0;
    let settleTimer = 0;
    let goneTimer = 0;

    const onLoad = () => {
      loaded = true;
    };
    if (!loaded) window.addEventListener("load", onLoad);

    const tick = () => {
      const elapsed = performance.now() - start;
      const ceiling = loaded ? 1 : 0.99;
      const value = Math.min(easeOut(Math.min(elapsed / MIN_DURATION, 1)), ceiling);

      if (counterRef.current) {
        counterRef.current.textContent = String(Math.round(value * 100));
      }

      if (value < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }

      settleTimer = window.setTimeout(() => {
        setPhase("leaving");
        goneTimer = window.setTimeout(() => setPhase("gone"), LIFT);
      }, SETTLE);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
      window.clearTimeout(goneTimer);
      window.removeEventListener("load", onLoad);
    };
  });

  return (
    <div className="preloader" data-phase={phase} aria-hidden="true">
      <noscript>
        <style>{".preloader { display: none; }"}</style>
      </noscript>
      <span className="logotype preloader-mark">Nina Raasch</span>
      <span ref={counterRef} className="preloader-counter">
        0
      </span>
    </div>
  );
}
