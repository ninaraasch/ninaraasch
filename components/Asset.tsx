"use client";

import Image from "next/image";
import { useState } from "react";

type AssetProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  sizes: string;
  priority?: boolean;
  aspectRatio?: string;
  className?: string;
};

export function Asset({
  src,
  width,
  height,
  alt,
  sizes,
  priority = false,
  aspectRatio,
  className = "",
}: AssetProps) {
  const [loaded, setLoaded] = useState(false);

  const markLoadedIfCached = (node: HTMLImageElement | null) => {
    if (node?.complete) setLoaded(true);
  };

  return (
    <div
      className={`relative overflow-hidden bg-placeholder ${className}`}
      style={{ aspectRatio: aspectRatio ?? `${width}/${height}` }}
    >
      <Image
        ref={markLoadedIfCached}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onLoad={() => setLoaded(true)}
        className={`object-cover ${
          loaded ? "opacity-100 transition-opacity duration-300 ease-out" : "opacity-0"
        }`}
      />
    </div>
  );
}
