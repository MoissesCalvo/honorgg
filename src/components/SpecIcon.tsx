"use client";

import Image from "next/image";

interface Props {
  iconUrl?: string | null;
  fallback: string; // emoji
  alt: string;
  size?: number;
}

export function SpecIcon({ iconUrl, fallback, alt, size = 28 }: Props) {
  if (!iconUrl) {
    return <span style={{ fontSize: size * 0.85 }}>{fallback}</span>;
  }

  return (
    <Image
      src={iconUrl}
      alt={alt}
      width={size}
      height={size}
      className="rounded-sm"
      unoptimized // Blizzard CDN URLs
    />
  );
}
