"use client";

import { IoIosStar } from "react-icons/io";

export default function MovieCardRating({ rating }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-sm font-semibold text-white backdrop-blur-sm">
      <IoIosStar className="text-amber-400" />
      <span>{Number.isFinite(rating) ? rating.toFixed(1) : "-"}</span>
    </div>
  );
}
