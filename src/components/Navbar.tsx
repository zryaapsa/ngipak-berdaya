import { NavLink } from "react-router-dom";

export default function Navbar() {
  const base =
    "px-4 py-2 rounded-xl text-sm font-semibold transition hover:bg-white/15 whitespace-nowrap";
  const active = "bg-white text-brand-900 shadow-soft";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-white/15 ring-1 ring-white/20" />
          <div className="min-w-0 leading-tight text-white">
            <div className="truncate font-semibold">Ngipak Berdaya</div>
            <div className="truncate text-xs text-white/80">Produk UMKM & Kesehatan</div>
          </div>
        </div>

        <nav className="flex items-center gap-2 rounded-2xl bg-white/10 p-1 ring-1 ring-white/15">
          <NavLink
            to="/produk"
            className={({ isActive }) =>
              `${base} ${isActive ? active : "text-white"}`
            }
          >
            {/* mobile: singkat, desktop: lengkap */}
            <span className="sm:hidden">UMKM</span>
            <span className="hidden sm:inline">Informasi UMKM</span>
          </NavLink>

          <NavLink
            to="/kesehatan"
            className={({ isActive }) =>
              `${base} ${isActive ? active : "text-white"}`
            }
          >
            <span className="sm:hidden">Sehat</span>
            <span className="hidden sm:inline">Informasi Kesehatan</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
