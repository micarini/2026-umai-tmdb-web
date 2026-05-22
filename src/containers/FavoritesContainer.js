"use client";

import { useAppContext } from "@/contexts/AppContext";
import MovieCard from "@/components/MovieCard";
import { useEffect, useState } from "react";

const FavoritesContainer = () => {
  const { favorites } = useAppContext();
  const [clientFavorites, setClientFavorites] = useState(null);

  useEffect(() => {
    // sincronizo el estado local clientFavorites con el estado global favorites del contexto, cada vez que favorites cambie, se ejecutará este efecto y actualizará clientFavorites con el nuevo valor de favorites, esto asegura que la lista de favoritos mostrada en este componente esté siempre actualizada con los cambios realizados en el contexto
    setClientFavorites(favorites);
  }, [favorites]);

  return (
    <section id="favorites" className="p-4">
      <h2 className="mb-4 text-xl font-bold">Favorites</h2>

      {clientFavorites === null ? (
        <p className="text-sm text-zinc-600">Loading...</p>
      ) : clientFavorites.length === 0 ? (
        <p className="text-sm text-zinc-600">No favorites added yet.</p>
      ) : (
        <div className="flex gap-4 overflow-x-auto">
          {clientFavorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FavoritesContainer;