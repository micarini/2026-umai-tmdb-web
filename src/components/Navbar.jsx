import Link from "next/link";

const navItems = [
  { href: "#trending", label: "Trending" },
  { href: "#popular", label: "Popular" },
  { href: "#favorites", label: "Favorites" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-sm font-semibold tracking-[0.28em] text-white uppercase">
          TMDB Vault
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
