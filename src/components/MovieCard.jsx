'use client';

import Link from "next/link";
import Image from "next/image";
import { getTmdbImageUrl } from "../utils/api";
import { useAppContext } from "@/contexts/AppContext";
import MovieCardFavoriteButton from "./MovieCardFavoriteButton";
import MovieCardRating from "./MovieCardRating";

export default function MovieCard({ movie }) {
  const imageUrl = getTmdbImageUrl(movie.poster_path) || "/placeholder.png";
  const title = movie.title || movie.name || "Untitled";
  const { isFavorite, toggleFavorite: toggleFavoriteMovie } = useAppContext();

  const handleFavoriteClick = (event) => {
    event.preventDefault(); // Evita que el clic en el botón de favorito navegue al detalle de la película
    event.stopPropagation(); // Evita que el clic se propague al contenedor del enlace, lo que también podría causar navegación
    toggleFavoriteMovie(movie); // Llama a la función toggleFavorite del contexto para agregar o quitar la película de favoritos
  };

  const isMovieFavorite = isFavorite(movie.id); 

  const releaseYear = movie.release_date ? movie.release_date.substring(0, 4) : null;

  return (
    <article className="w-47.5 shrink-0 p-2">
      <div className="group relative overflow-hidden rounded-[28px] bg-zinc-950 shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
        <Link href={`/movie/${movie.id}`} className="block">
          <div className="relative h-70 w-full overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              width={500}
              height={750}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/15 to-transparent" />
            <div className="absolute left-3 top-3">
              <MovieCardFavoriteButton isFavorite={isMovieFavorite} onClick={handleFavoriteClick} />
            </div>
            <div className="absolute right-3 top-3">
              <MovieCardRating rating={movie.vote_average} />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4">
              <h3 className="text-[1.1rem] font-semibold leading-tight text-white drop-shadow-md">
                {title}
              </h3>
              {releaseYear && (
                <div className="mt-2 inline-block rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                  {releaseYear}
                </div>
              )}
            </div>
          </div>
        </Link>
      </div>

    </article>
  );
}
