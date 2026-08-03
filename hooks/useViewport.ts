"use client";

import { useSyncExternalStore } from "react";

const SERVER_WIDTH = 1440;
const SERVER_HEIGHT = 900;

function subscribeToResize(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}

export function useViewportWidth() {
  return useSyncExternalStore(
    subscribeToResize,
    () => window.innerWidth,
    () => SERVER_WIDTH,
  );
}

export function useViewportHeight() {
  return useSyncExternalStore(
    subscribeToResize,
    () => window.innerHeight,
    () => SERVER_HEIGHT,
  );
}
