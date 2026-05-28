"use client";

import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import { tmdbApi, tmdbEndpoints } from "@/utils/api";

export default function SearchBar({ placeholder = "Search movies", maxResults = 6 }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      return;
    }

    let canceled = false;
    const t = setTimeout(() => {
      tmdbApi
        .get(tmdbEndpoints.searchMovies(q.trim(), 1))
        .then((res) => {
          if (canceled) return;
          setResults(res.data?.results?.slice(0, maxResults) || []);
        })
        .catch(() => {
          if (canceled) return;
          setResults([]);
        });
    }, 350);

    return () => {
      canceled = true;
      clearTimeout(t);
    };
  }, [q, maxResults]);

  const open = q.trim().length > 0 && results.length > 0;

  return (
    <div className="relative max-w-lg mx-auto">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-white/6 bg-zinc-900/60 py-2 pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
      />

      {open && (
        <div className="absolute left-0 right-0 mt-2 z-50 rounded-md bg-zinc-950/90 shadow-lg">
          <ul>
            {results.map((m) => (
              <li key={m.id} className="border-b border-white/5 last:border-b-0">
                <Link
                  href={`/movie/${m.id}`}
                  className="block px-3 py-2 text-sm text-zinc-200 hover:bg-white/3"
                  onClick={() => setQ("")}
                >
                  {m.title || m.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
