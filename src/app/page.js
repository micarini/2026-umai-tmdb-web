import Hero from "@/components/Hero";
import MovieSection from "../containers/MovieSection";
import FavoritesContainer from "../containers/FavoritesContainer";
import { tmdbApi, tmdbEndpoints } from "../utils/api";

export default async function Home() {
  const featuredMovieId = 1891; // ID de "The Empire Strikes Back" como película destacada
  const featuredResponse = await tmdbApi.get(tmdbEndpoints.movieDetail(featuredMovieId));
  const featuredMovie = featuredResponse.data || null;

  let trailerKey = null;

  // si la película destacada se cargó correctamente, intento cargar su tráiler, esto me permite mostrar un tráiler en el Hero si está disponible, pero si falla la carga del tráiler o no hay un tráiler disponible, simplemente dejo trailerKey como null y el Hero se encargará de mostrar solo la información sin el video
  if (featuredMovie?.id) {
    const videosResponse = await tmdbApi.get(tmdbEndpoints.movieVideos(featuredMovie.id));
    const trailer = videosResponse.data?.results?.find(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    );
    trailerKey = trailer?.key || null;
  }

  return (
    <main className="space-y-10 p-6 md:p-6">
      <div className="-mx-4 md:-mx-6 -mt-6 md:-mt-6">
        <Hero movie={featuredMovie} trailerKey={trailerKey} />
      </div>
      <MovieSection id="trending" title="Trending Movies" endpoint={tmdbEndpoints.trendingMovies} />
      <MovieSection id="popular" title="Popular Movies" endpoint={tmdbEndpoints.popularMovies} />
      <MovieSection title="Top Rated Movies" endpoint={tmdbEndpoints.topRatedMovies} />
      <MovieSection title="Now Playing" endpoint={tmdbEndpoints.nowPlayingMovies} />
      <MovieSection title="Upcoming Movies" endpoint={tmdbEndpoints.upcomingMovies} />
      <FavoritesContainer />
    </main>
  );
}