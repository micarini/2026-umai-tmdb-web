"use client"; 

import Image from "next/image";
import Link from "next/link";
import MovieDetailRating from "./MovieDetailRating";
import { getTmdbBackdropUrl, getTmdbImageUrl } from "@/utils/api";
import MovieLogo from "./MovieLogo";
import { TfiAngleLeft } from "react-icons/tfi";


export default function MovieDetailHero({ movie, trailerKey }) {
  const backdrop = getTmdbBackdropUrl(movie.backdrop_path) || getTmdbImageUrl(movie.poster_path); // intento usar el backdrop para el fondo, pero si no está disponible uso el poster como fallback, esto me asegura que siempre tenga una imagen de fondo aunque no haya un backdrop específico para la película
  const poster = getTmdbImageUrl(movie.poster_path); // poster!! 

  // guion si no esta el dato disponible:
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "-"; // extraigo el año de lanzamiento de la película a partir de la fecha completa y muestro el año solo
  const runtime = movie.runtime ? `${movie.runtime} min` : "-"; // uso condicional para mostrar el runtime seguido de "min" si está disponible, o un guion si no lo está
  const language = movie.original_language?.toUpperCase() || "-"; // muestro el código del idioma original en mayúsculas si está disponible

  return (
    <header className="relative mb-8">
      <div className="relative h-[56vh] w-full overflow-hidden rounded-b-lg bg-black z-0">
        {backdrop ? (
          <Image src={backdrop} alt={movie.title} fill className="object-cover" priority />
        ) : null}  
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/60 to-transparent z-10" />
        <Link
          href="/"
          aria-label="Go back"
          className="absolute left-3 top-3 z-30 text-white p-4">
          <TfiAngleLeft />
        </Link>
      </div>

      <div className="container relative z-20 mx-auto -mt-28 px-4 sm:px-6 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:gap-6">
            <div className="w-32 shrink-0 overflow-hidden rounded-lg shadow-lg sm:w-40 md:w-44">
              {poster ? (
                <Image src={poster} alt={`${movie.title} poster`} width={300} height={450} className="w-full" />
              ) : (
                <div className="h-64 w-full bg-zinc-900" />
              )}
            </div>

            <div className="prose w-full max-w-none text-white">
              <MovieLogo logos={movie.images?.logos || []} title={movie.title} /> 
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-300 sm:mt-4 sm:gap-3 sm:text-sm">
                <span>{releaseYear}</span>
                <span>•</span>
                <span>{runtime}</span>
                <span>•</span>
                <span>{language}</span>
              </div>

              <div className="mt-4 max-w-prose text-zinc-200">{movie.tagline ? <em>{movie.tagline}</em> : null}</div>

              <div className="mt-4 text-zinc-200">{movie.overview}</div>

              <div className="mt-4 flex flex-wrap gap-2">
                {(movie.genres || []).map((g) => (
                  <span key={g.id} className="rounded-full border border-white/10 px-3 py-1 text-sm text-zinc-300">
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <aside className="flex flex-col justify-start lg:justify-between h-full text-center lg:text-right">
            <div className="flex justify-center lg:justify-end">
              <MovieDetailRating rating={movie.vote_average} label="tmdb" />
            </div>

            {trailerKey ? (
              <div className="mt-4 lg:mt-0 mx-auto max-w-md overflow-hidden rounded-lg border border-white/10 lg:mx-0 lg:max-w-none">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${trailerKey}`}
                  title={`${movie.title} trailer`}
                  className="aspect-video w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </header>
  );
}
