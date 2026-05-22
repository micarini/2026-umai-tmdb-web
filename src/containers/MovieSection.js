'use client';

import { useEffect, useState } from "react";
import { tmdbApi } from "../utils/api";
import MovieCard from "../components/MovieCard";

export default function MovieSection({ title, endpoint, limit = 20, id }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    tmdbApi
      .get(endpoint)
      .then((res) => {
        if (!mounted) return;
        setMovies(res.data?.results || []);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err);
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [endpoint]);

  return (
    <section id={id} className="my-6 scroll-mt-28">
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>

      {loading && <p>Loading movies...</p>}
      {error && <p>Error loading movies.</p>}

      {!loading && !error && (
        <div className="flex gap-4 overflow-x-auto">
          {movies.slice(0, limit).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}
