"use client";

import { useRef } from "react";
import { useMountEffect } from "@/hooks/useMountEffect";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useMountEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    let frame = 0;

    const follow = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        dot.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
        dot.style.opacity = "1";
      });
    };

    const hide = () => {
      cancelAnimationFrame(frame);
      dot.style.opacity = "0";
    };

    window.addEventListener("pointermove", follow);
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", follow);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  });

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
