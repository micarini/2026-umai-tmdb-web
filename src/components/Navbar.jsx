import Link from "next/link";
import Image from "next/image";
import { IoIosHeartEmpty } from "react-icons/io";

const navItems = [
  { href: "#trending", label: "Trending" },
  { href: "#popular", label: "Popular" },
  { href: "#favorites", label: "Favorites" },
];

export default function Navbar({ overlay = false }) { // agrego el prop overlay con valor por defecto false para controlar si el navbar se muestra como un overlay transparente o como un navbar fijo con fondo sólido, dependiendo del valor de este prop
  return (
    <header
      className={overlay // si overlay es true, aplico estilos para que el navbar sea un overlay transparente con borde inferior, si overlay es false, aplico estilos para que el navbar sea sticky con fondo sólido y efecto de desenfoque, esto permite que el mismo componente Navbar se pueda usar tanto en el Hero como en otras partes de la aplicación con diferentes estilos según el contexto
        ? "absolute left-0 right-0 top-0 z-40 bg-transparent"
        : "sticky top-0 z-40 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl"
      }
    >
      <div className="flex w-full items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-4 lg:px-10 xl:px-12 2xl:px-16">
        <Link href="/" className="inline-flex items-center">
          <Image
            src="/soli-blanco.png"
            alt="Soli logo"
            width={96}
            height={32}
            priority
            className="h-auto w-16 object-contain md:w-24"
          />
        </Link>

        <Link
          href="#favorites"
          className="inline-flex items-center justify-center rounded-full border border-white/10  p-2 text-white transition-color md:hidden"
          aria-label="Go to favorites"
        >
          <IoIosHeartEmpty className="h-5 w-5" />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
