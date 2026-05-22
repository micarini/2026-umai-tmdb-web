import Image from "next/image";
import Link from "next/link";
import { getTmdbBackdropUrl, getTmdbImageUrl } from "@/utils/api";

export default function Hero({ movie, trailerKey }) {
  const backdropUrl = getTmdbBackdropUrl(movie?.backdrop_path) || getTmdbImageUrl(movie?.poster_path);
  const title = movie?.title || movie?.name || "Featured title";
  const overview = movie?.overview || "A featured movie area with backdrop image, call to action, and optional trailer media.";
  const trailerUrl = trailerKey ? `https://www.youtube.com/watch?v=${trailerKey}` : null;
  const trailerEmbedUrl = trailerKey ? `https://www.youtube-nocookie.com/embed/${trailerKey}` : null;

  return (
    <section className="relative overflow-hidden rounded-4xl border border-white/8 bg-zinc-950 text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <div className="absolute inset-0">
        {backdropUrl ? (
          <Image
            src={backdropUrl}
            alt={title}
            fill
            priority
            className="object-cover opacity-45"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,#1f2937,#09090b_70%)]" />
        )}
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/65 to-black/20" />
      </div>

      <div className="relative mx-auto grid min-h-130 max-w-7xl items-end gap-10 px-6 py-8 md:grid-cols-[1.2fr_0.8fr] md:px-10 md:py-12">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.35em] text-zinc-300">
            Featured movie
          </p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-300 md:text-base">
            {overview}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={movie?.id ? `/movie/${movie.id}` : "/"}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition-transform hover:scale-[1.02]"
            >
              View details
            </Link>
            {trailerUrl && (
              <a
                href={trailerUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Watch trailer
              </a>
            )}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-black/35 p-4 backdrop-blur-sm">
          <div className="overflow-hidden rounded-[22px] border border-white/10 bg-black/40">
            <div className="aspect-video w-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_60%,transparent_70%)]">
              {trailerEmbedUrl ? (
                <iframe
                  src={trailerEmbedUrl}
                  title={`${title} trailer`}
                  className="h-full w-full"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full items-center justify-center p-4 text-center text-sm text-zinc-400">
                  Trailer unavailable for now.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
