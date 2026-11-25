"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { href: "/", label: "Beranda" },
  { href: "/buku", label: "Daftar Buku" },
  { href: "/buku/baru", label: "Tambah Buku" },
];

export default function Navbar() {
  const pathname = usePathname();
  const aktif = (href: string) =>
    href === "/" ? pathname === "/" : href === "/buku/baru" ? pathname === href : pathname.startsWith("/buku") && pathname !== "/buku/baru";

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
        <Link href="/" className="judul text-xl font-bold text-[var(--ink)]">PustakaKu</Link>
        <ul className="flex gap-1 text-sm">
          {menu.map((m) => (
            <li key={m.href}>
              <Link
                href={m.href}
                aria-current={aktif(m.href) ? "page" : undefined}
                className={`rounded px-3 py-1.5 ${aktif(m.href) ? "bg-[var(--ink)] text-white" : "text-gray-600 hover:bg-gray-100"}`}
              >
                {m.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
