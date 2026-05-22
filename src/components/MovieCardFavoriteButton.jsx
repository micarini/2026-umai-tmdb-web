"use client";

import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

export default function MovieCardFavoriteButton({ isFavorite, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isFavorite ? "Already in favorites" : "Add to favorites"}
      title={isFavorite ? "Already in favorites" : "Add to favorites"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-xl text-white backdrop-blur-sm transition-colors hover:bg-black/60"
    >
      {isFavorite ? <IoIosHeart className="text-red-500" /> : <IoIosHeartEmpty />}
    </button>
  );
}
