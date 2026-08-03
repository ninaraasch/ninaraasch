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
  className?: string;
};

export function Asset({
  src,
  width,
  height,
  alt,
  sizes,
  priority = false,
  className = "",
}: AssetProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-placeholder ${className}`}
      style={{ aspectRatio: `${width}/${height}` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onLoad={() => setLoaded(true)}
        className={`object-cover transition-opacity duration-500 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
