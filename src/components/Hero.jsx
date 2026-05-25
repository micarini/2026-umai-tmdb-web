import Image from "next/image";
import Link from "next/link";
import { getTmdbBackdropUrl, getTmdbImageUrl } from "@/utils/api";
import Navbar from "@/components/Navbar";

export default function Hero({ movie, trailerKey }) {
  const backdropUrl = getTmdbBackdropUrl(movie?.backdrop_path) || getTmdbImageUrl(movie?.poster_path);
  const title = movie?.title || movie?.name || "Featured title"; // si el objeto movie tiene una propiedad title, la uso como título, si no tiene title pero tiene name, uso name, y si no tiene ninguna de las dos, uso "Featured title" como título por defecto
  const overview = movie?.overview || "A featured movie area with backdrop image, call to action, and optional trailer media."; // si el objeto movie tiene una propiedad overview, la uso como descripción, y si no tiene overview, uso un texto genérico como descripción por defecto
  const trailerUrl = trailerKey ? `https://www.youtube.com/watch?v=${trailerKey}` : null; // construyo la URL para el trailer de yt
  const trailerEmbedUrl = trailerKey ? `https://www.youtube-nocookie.com/embed/${trailerKey}` : null; // construyo la URL para el iframe del trailer, uso youtube-nocookie para mejorar la privacidad

  return (
    <section className="relative overflow-hidden bg-zinc-950 text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <Navbar overlay />
      <div className="absolute inset-0">
        {backdropUrl ? ( // si hay una URL de imagen de fondo disponible, muestro la imagen usando el componente Image con la URL del backdrop, y aplico estilos para que la imagen cubra todo el fondo y tenga una opacidad del 45%
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

      <div className="relative grid min-h-130 items-end gap-10 px-6 pb-8 pt-28 sm:pt-32 md:grid-cols-[1.2fr_0.8fr] md:px-10 md:pb-12 md:pt-28">
        <div className="max-w-2xl pt-2 sm:pt-4 md:pt-0">
          <p className="mb-4 inline-flex text-xs uppercase tracking-[0.35em] text-zinc-300">
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
              className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              View details
            </Link>
          </div>
        </div>

        <div>
          <div className="overflow-hidden rounded-[22px] border border-white/10 bg-black/40">
            <div className="aspect-video w-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_60%,transparent_70%)]">
              {trailerEmbedUrl ? ( // si hay una URL de embed para el trailer, muestro un iframe con esa URL, el iframe tiene estilos para que ocupe todo el espacio disponible y tenga un aspecto de video, también tiene atributos para mejorar la experiencia de reproducción y la privacidad, como allow="accelerometer...." para permitir ciertas funcionalidades del video, y allowFullScreen para permitir que el video se reproduzca en pantalla completa
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
