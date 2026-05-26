"use client";

import Image from "next/image";
import { getTmdbImageUrl } from "@/utils/api";

export default function MovieLogo({ logos = [], title }) {
  const logo =
    logos.find((item) => item.iso_639_1 === "en" && item.file_path) ||
    logos.find((item) => item.file_path) ||
    null;

  if (!logo) {
    return null;
  }

  const width = logo.width || 500;
  const height = logo.height || 200;
  const aspectRatio = width / height;
  const displayWidth = 320;
  const displayHeight = Math.round(displayWidth / aspectRatio);

  return (
    <div className="max-w-[min(100%,340px)]">
      <Image
        src={getTmdbImageUrl(logo.file_path)}
        alt={`${title} logo`}
        width={displayWidth}
        height={displayHeight}
        className="h-auto w-full object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]"
        priority
      />
    </div>
  );
}
