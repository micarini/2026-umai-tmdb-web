import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MovieSection from "../containers/MovieSection";
import FavoritesContainer from "../containers/FavoritesContainer";
import { tmdbApi, tmdbEndpoints } from "../utils/api";

export default async function Home() {
  const featuredMovieId = 1891;
  let trailerKey = null;
  let featuredMovie = null;

  try {
    const featuredResponse = await tmdbApi.get(tmdbEndpoints.movieDetail(featuredMovieId));
    featuredMovie = featuredResponse.data || null;

    if (featuredMovie?.id) {
      const videosResponse = await tmdbApi.get(tmdbEndpoints.movieVideos(featuredMovie.id));
      const trailer = videosResponse.data?.results?.find(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      );
      trailerKey = trailer?.key || null;
    }
  } catch (error) {
    console.warn("Unable to load featured movie hero data", error);
  }

  return (
    <main className="space-y-10 p-4 md:p-6">
      <Navbar />
      <Hero movie={featuredMovie} trailerKey={trailerKey} />
      <MovieSection id="trending" title="Trending Movies" endpoint={tmdbEndpoints.trendingMovies} />
      <MovieSection id="popular" title="Popular Movies" endpoint={tmdbEndpoints.popularMovies} />
      <MovieSection title="Top Rated Movies" endpoint={tmdbEndpoints.topRatedMovies} />
      <MovieSection title="Now Playing" endpoint={tmdbEndpoints.nowPlayingMovies} />
      <MovieSection title="Upcoming Movies" endpoint={tmdbEndpoints.upcomingMovies} />
      <FavoritesContainer />
    </main>
  );
}