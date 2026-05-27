"use client";

import { useEffect, useState } from "react";
import { tmdbApi, tmdbEndpoints } from "@/utils/api";
import MovieCard from "@/components/MovieCard";

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [debounced, setDebounced] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(q.trim()), 350);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    if (!debounced) {
      setResults([]);
      setLoading(false);
      return;
    }

    let mounted = true;
    setLoading(true);
    setError(null);

    tmdbApi
      .get(tmdbEndpoints.searchMovies(debounced, 1))
      .then((res) => {
        if (!mounted) return;
        setResults(res.data?.results || []);
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
  }, [debounced]);

  return (
    <main className="container mx-auto p-4">
      <div className="max-w-xl mx-auto">
        <label className="sr-only">Buscar películas</label>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar películas..."
          className="w-full rounded border border-white/10 bg-zinc-900 px-3 py-2 text-white placeholder:text-zinc-500"
        />
      </div>

      <div className="mt-6">
        {loading && <p className="text-zinc-400">Cargando...</p>}
        {error && <p className="text-red-400">Error al buscar películas.</p>}

        {!loading && !error && debounced && results.length === 0 && (
          <p className="text-zinc-400">No se encontraron resultados.</p>
        )}

        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {results.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      </div>
    </main>
  );
}
