"use client";

import Image from "next/image";
import { getTmdbImageUrl } from "@/utils/api";

export default function MovieLogo({ logos = [], title }) { // logos es un array de objetos con información sobre los logos disponibles para la película, y title es el título de la película que se usará como texto alternativo para la imagen del logo
  const logo =
    logos.find((item) => item.iso_639_1 === "en" && item.file_path) || // primero intento encontrar un logo que tenga el idioma inglés y un file_path válido, ya que generalmente el logo en inglés es el más completo y de mejor calidad
    logos.find((item) => item.file_path) || // si no encuentro un logo en inglés, busco cualquier logo que tenga un file_path válido, esto me permite mostrar al menos algún logo aunque no esté en inglés
    null; 

  if (!logo) {
    return null; // si no hay ningún logo disponible, no renderizo nada
  }

  const width = logo.width || 500;
  const height = logo.height || 200;
  const aspectRatio = width / height;
  const displayWidth = 320;
  const displayHeight = Math.round(displayWidth / aspectRatio); // calcula la altura manteniendo la proporción original del logo

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
