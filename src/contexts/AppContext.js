'use client';

import { useEffect, useMemo, useState, useContext, createContext } from 'react';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    if (typeof window === "undefined") { // agrego esto para evitar errores en el server side rendering, ya que localStorage no está disponible en el servidor, entonces si window es undefined, simplemente devuelvo un array vacío para evitar que el código intente acceder a localStorage y cause un error.
      return [];
    }

    const savedFavorites = localStorage.getItem("favorites"); 
    return savedFavorites ? JSON.parse(savedFavorites) : []; // intento cargar los favoritos desde localStorage, si no hay nada guardado, devuelvo un array vacío
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites)); // cada vez que favorites cambie, guardo el nuevo valor en localStorage para que persista entre sesiones
  }, [favorites]); 

  const favQuantity = () => favorites.length; // esta función devuelve la cantidad de favoritos, simplemente retornando la longitud del array favorites

  const hasMovie = (movies, movieId) => movies.some((movie) => movie.id === movieId); // esta función recibe un array de movies y un movieId, y verifica si alguna de las movies tiene el mismo id que el movieId proporcionado, devuelve true si encuentra una coincidencia y false si no lo hace. lo creo para reutilizarlo tanto en isFavorite como en toggleFavorite 

  const isFavorite = (movieId) => hasMovie(favorites, movieId);  // aca uso la función hasMovie para verificar si el movieId proporcionado ya está en el array de favoritos

  const toggleFavorite = (movie) => { 
    setFavorites((currentFavorites) => {
      const exists = hasMovie(currentFavorites, movie.id);  // primero verifico si la movie ya está en favoritos usando la función hasMovie, paso el array actual de favoritos y el id de la movie que quiero agregar o quitar

      if (exists) {
        return currentFavorites.filter((favorite) => favorite.id !== movie.id); // si la movie ya existe en favoritos, devuelvo un nuevo array que contiene todos los favoritos excepto la movie que quiero quitar, uso filter para crear este nuevo array, manteniendo solo aquellos favoritos cuyo id sea diferente al id de la movie que quiero eliminar
      }

      return [...currentFavorites, movie]; // uso spread operator para crear un nuevo array que contiene todos los favoritos actuales más la nueva movie que quiero agregar, esto se ejecuta si la movie no estaba previamente en favoritos
    });
  };

  const contextValue = useMemo( //useMemo sirve para memorizar el valor del contexto y evitar re-renderizados innecesarios en los componentes que lo consumen, sino que solo se recalcula cuando favorites cambia
    () => ({ favorites, setFavorites, favQuantity, isFavorite, toggleFavorite }),
    [favorites]
  );

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
    const context = useContext(AppContext);

    if (!context){
        throw new Error("useAppContext solo puede ser usado dentro del provider");
    }

  return context;
}

export default AppContext;