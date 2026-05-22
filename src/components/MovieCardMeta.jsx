"use client";

export default function MovieCardMeta({ releaseYear }) {
  return (
    <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
      <span>{releaseYear || "-"}</span>
    </div>
  );
}
