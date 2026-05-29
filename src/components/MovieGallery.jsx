import Image from "next/image";
import { getTmdbImageUrl } from "@/utils/api";

export default function MovieGallery({ images = [] }) {
  if (!images || images.length === 0) return null; // si no hay imágenes, no renderizar nada

  const thumbs = images.slice(0, 9); // mostrar solo las primeras 9 imágenes 

  return (
    <section className="container mx-auto mt-8 px-4">
      <h3 className="mb-6 text-center text-lg font-semibold text-zinc-200">GALLERY</h3>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {thumbs.map((img, idx) => ( // usar el índice como key ya que las imágenes no tienen un ID único, y el orden no cambia 
          <div key={idx} className="overflow-hidden rounded-md">
            <Image
              src={getTmdbImageUrl(img.file_path)}
              alt={`gallery-${idx}`} // mi texto alternativo es simplemente "gallery-" seguido del índice de la imagen, ya que no tengo información adicional sobre cada imagen para hacer un texto alternativo más descriptivo, pero al menos así tengo algo que identifica cada imagen de manera única
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
