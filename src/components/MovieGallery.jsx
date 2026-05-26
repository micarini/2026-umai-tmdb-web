import Image from "next/image";
import { getTmdbImageUrl } from "@/utils/api";

export default function MovieGallery({ images = [] }) {
  if (!images || images.length === 0) return null;

  const thumbs = images.slice(0, 9);

  return (
    <section className="container mx-auto mt-8 px-4">
      <h3 className="mb-6 text-center text-lg font-semibold text-zinc-200">GALLERY</h3>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {thumbs.map((img, idx) => (
          <div key={idx} className="overflow-hidden rounded-md">
            <Image
              src={getTmdbImageUrl(img.file_path)}
              alt={`gallery-${idx}`}
              width={500}
              height={300}
              className="h-44 w-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
