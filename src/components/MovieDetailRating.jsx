export default function MovieDetailRating({ rating, label = "TMDB" }) {
  const safeRating = Number.isFinite(rating) ? rating : 0; //me fijo si el rating es un número finito, si no lo es, uso 0 para evitar problemas al calcular el porcentaje
  const percent = Math.max(0, Math.min(100, Math.round((safeRating / 10) * 100))); // convierto el rating a un porcentaje de 0 a 100, asegurándome de que esté dentro de ese rango usando Math.max y Math.min, esto es importante para que el conic-gradient funcione correctamente incluso si el rating es inválido o está fuera del rango esperado
  const displayValue = Number.isFinite(rating) ? rating.toFixed(1) : "-"; // para mostrar el valor del rating con un decimal, pero solo si el rating es un número finito, si no lo es, muestro un guion para indicar que no hay un rating disponible

  return (
    <div className="relative z-40 flex flex-col items-center gap-2 text-white">
      <div
        className="grid h-24 w-24 place-items-center rounded-full bg-[radial-gradient(circle_at_center,#111_58%,transparent_59%)] shadow-[0_0_0_1px_rgba(255,255,255,0.08)] sm:h-28 sm:w-28"
        style={{
          backgroundImage: `conic-gradient(#facc15 ${percent}%, rgba(255,255,255,0.12) 0)`,
        }}
      >
        <div className="grid h-[4.9rem] w-[4.9rem] place-items-center rounded-full bg-zinc-950/95 text-center sm:h-[5.6rem] sm:w-[5.6rem]">
          <span className="text-2xl font-bold leading-none sm:text-3xl">{displayValue}</span>
        </div>
      </div>

      <span className="text-[0.65rem] uppercase tracking-[0.3em] text-zinc-300">{label}</span>
    </div>
  );
}
