"use client";

import Link from "next/link";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import { tmdbApi, tmdbEndpoints } from "@/utils/api";

export default function SearchBar({ placeholder = "Search movies", maxResults = 6 }) {
  const [q, setQ] = useState(""); // estado para almacenar el texto ingresado por el usuario en el campo de búsqueda
  const [results, setResults] = useState([]); // estado para almacenar los resultados de la búsqueda, inicialmente es un array vacío

  useEffect(() => {
    if (!q.trim()) { // si el texto de búsqueda está vacío o solo contiene espacios, limpio los resultados y no hago la llamada a la API, esto evita hacer solicitudes innecesarias cuando el usuario borra el texto o no ha ingresado nada
      setResults([]); 
      return;
    }

    let cancelled = false; 
    const t = setTimeout(() => { // uso un timeout para esperar a que el usuario termine de escribir antes de hacer la llamada a la API, esto mejora la experiencia al evitar hacer una solicitud por cada letra que el usuario ingresa, y en su lugar solo hace la solicitud después de que el usuario ha dejado de escribir por 350ms
      tmdbApi
        .get(tmdbEndpoints.searchMovies(q.trim(), 1)) // hago la llamada a la API usando el endpoint de búsqueda de películas, paso el texto de búsqueda (trim para eliminar espacios al inicio y al final) y la página 1 para obtener los primeros resultados
        .then((res) => { 
          if (cancelled) return;
          setResults(res.data?.results?.slice(0, maxResults) || []); 
        })
        .catch(() => {
          if (cancelled) return;
          setResults([]);
        });
    }, 350);

    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [q, maxResults]);

  const open = q.trim().length > 0 && results.length > 0; // esta variable determina si el dropdown de resultados debe estar abierto, se abre solo si hay texto de búsqueda y hay resultados para mostrar

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
                  className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-200 hover:bg-white/3"
                  onClick={() => setQ("")}
                >
                  <div className="relative h-12 w-8 shrink-0 overflow-hidden rounded bg-zinc-800">
                    {m.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w92${m.poster_path}`}
                        alt={m.title || m.name || "Movie poster"}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <span className="line-clamp-1">{m.title || m.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
