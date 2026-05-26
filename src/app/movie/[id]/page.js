import Link from "next/link";
import { tmdbApi, tmdbEndpoints } from "@/utils/api";
import MovieDetailHero from "@/components/MovieDetailHero";
import MovieGallery from "@/components/MovieGallery";

async function fetchMovie(id) { // uso el endpoint que incluye los extras para obtener toda la información necesaria de una sola vez, incluyendo las imágenes y los créditos, esto me permite mostrar la galería y la información del director y el elenco sin tener que hacer múltiples llamadas a la API
  const resp = await tmdbApi.get(tmdbEndpoints.movieDetailWithExtras(id));
  return resp.data; 
}

async function fetchTrailerKey(id) { // hago una llamada separada para obtener los videos de la película, ya que el endpoint de detalles con extras no incluye los videos, esto me permite obtener la clave del tráiler de YouTube para mostrarlo en el MovieDetailHero
  const resp = await tmdbApi.get(tmdbEndpoints.movieVideos(id));
  const trailer = resp.data?.results?.find(
    (v) => v.site === "YouTube" && v.type === "Trailer" // busco específicamente un video que sea un tráiler y que esté alojado en YouTube, ya que es el formato más común para los tráilers y es fácil de integrar en la página usando un iframe
  );
  return trailer?.key || null;
}

export default async function MoviePage({ params }) {
  // en algunas versiones de Next.js, los params pueden ser una promesa, así que me aseguro de resolverla antes de usarla para obtener el id de la película
  const resolvedParams = await params;
  const { id } = resolvedParams; // extraigo el id de la película de los params

  // inicializo las variables como null para poder manejar los casos en los que la carga falle, esto me permite mostrar mensajes de error específicos dependiendo de si el problema fue al cargar la película o al cargar el tráiler, y también me permite mostrar un mensaje de "película no encontrada" si la película no existe, en lugar de un error genérico
  let movie = null; 
  let trailerKey = null;
  try {
    movie = await fetchMovie(id);
  } catch (err) {
    const status = err?.response?.status;
    console.error("Failed to load movie:", err);
    if (status === 404) {
      return (
        <main className="p-6">
          <p className="text-red-400">Movie not found (404).</p>
        </main>
      );
    }
    return (
      <main className="p-6">
        <p className="text-red-400">Failed to load movie.</p>
        <Link href="/" className="mt-4 inline-block text-sm text-zinc-300 underline">
          Back to home
        </Link>
      </main>
    );
  }

  try {
    trailerKey = await fetchTrailerKey(id); 
  } catch (e) {
    trailerKey = null; // si falla la carga del tráiler, simplemente dejo trailerKey como null, lo que hará que el MovieDetailHero no muestre el video pero aún así muestre el resto
  }

  if (!movie) {
    return (
      <main className="p-6">
        <p className="text-zinc-400">Movie not found.</p>
        <Link href="/" className="mt-4 inline-block text-sm text-zinc-300 underline">
          Back to home
        </Link>
      </main>
    );
  }

  return (
    <main>
      <MovieDetailHero movie={movie} trailerKey={trailerKey} /> {/* paso los objetos movie y trailerKey al componente MovieDetailHero */}

      <section className="container mx-auto px-4 py-8">
        <div className="mt-4 grid grid-cols-1 gap-4 text-sm text-zinc-400 md:grid-cols-2">
          <div>
            <strong className="text-zinc-300">Director:</strong>
            <div className="mt-1 text-zinc-200">{movie.credits?.crew?.find((c) => c.job === "Director")?.name || "-"}</div>
          </div>

          <div className="md:text-right">
            <strong className="text-zinc-300">Starring:</strong>
            <div className="mt-1 text-zinc-200">
              {(movie.credits?.cast || []).slice(0, 5).map((c) => c.name).join(", ") || "-"}
            </div>
          </div>
        </div>

      <MovieGallery images={movie.images?.backdrops || []} /> {/* paso las imágenes de fondo de la película al componente MovieGallery, si no hay imágenes disponibles, paso un array vacío para que el componente no intente renderizar nada */}
      </section>
    </main>
  );
}
