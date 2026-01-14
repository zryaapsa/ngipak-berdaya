import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { DUSUN, PRODUK, type UmkmKategori } from "../data/dummy";
import { formatRupiah } from "../lib/format";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import SearchInput from "../components/ui/SearchInput";
import FilterSelect from "../components/ui/FilterSelect";

type KategoriOrAll = UmkmKategori | "all";

const kategoriUI: { value: KategoriOrAll; label: string }[] = [
  { value: "all", label: "Semua" },
  { value: "makanan", label: "Makanan" },
  { value: "minuman", label: "Minuman" },
  { value: "jasa", label: "Jasa" },
];

function isKategori(v: string): v is UmkmKategori {
  return v === "makanan" || v === "minuman" || v === "jasa";
}

export default function ProdukPage() {
  const [dusunId, setDusunId] = useState<string>("all");
  const [kategori, setKategori] = useState<KategoriOrAll>("all");
  const [q, setQ] = useState("");

  const dusunOptions = useMemo(() => {
    return [
      { value: "all", label: "Semua Dusun" },
      ...DUSUN.map((d) => ({ value: d.id, label: d.nama })),
    ];
  }, []);

  const kategoriOptions = useMemo(() => {
    return kategoriUI.map((k) => ({ value: k.value, label: k.label }));
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return PRODUK.filter((p) => {
      const okDusun = dusunId === "all" ? true : p.umkm.dusun.id === dusunId;
      const okKat = kategori === "all" ? true : p.umkm.kategori === kategori;

      const haystack = `${p.nama} ${p.umkm.nama} ${p.umkm.dusun.nama}`.toLowerCase();
      const okQ = query === "" ? true : haystack.includes(query);

      return okDusun && okKat && okQ;
    });
  }, [dusunId, kategori, q]);

  const reset = () => {
    setDusunId("all");
    setKategori("all");
    setQ("");
  };

  const onKategoriChange = (v: string) => {
    if (v === "all") return setKategori("all");
    if (isKategori(v)) return setKategori(v);
    return setKategori("all");
  };

  return (
    <div className="space-y-6">
      {/* HERO */}
      <div className="rounded-2xl bg-gradient-to-br from-brand-800 to-brand-900 p-6 text-white shadow-soft">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Informasi UMKM</h1>
            <p className="mt-1 text-white/80">
              Temukan produk berdasarkan dusun & kategori. Klik produk untuk detail dan chat WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-white/15 text-white ring-1 ring-white/20">
              {filtered.length} produk
            </Badge>
            <Button variant="secondary" onClick={reset}>
              Reset Filter
            </Button>
          </div>
        </div>
      </div>

      {/* FILTER PANEL */}
      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-3">
          <FilterSelect
            label="Dusun"
            value={dusunId}
            options={dusunOptions}
            onChange={setDusunId}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M3 5h18M6 12h12M10 19h4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            }
          />

          <FilterSelect
            label="Kategori"
            value={kategori}
            options={kategoriOptions}
            onChange={onKategoriChange}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 7h16M7 12h10M10 17h4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            }
          />

          <SearchInput
            label="Cari"
            placeholder="Nama produk / UMKM / dusun..."
            value={q}
            onChange={setQ}
          />
        </div>
      </Card>

      {/* GRID */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <Link key={p.id} to={`/produk/${p.id}`} className="group">
            <Card className="overflow-hidden transition hover:-translate-y-0.5 hover:shadow-soft">
              <div className="relative aspect-[4/3] bg-gray-100">
                <img
                  src={p.foto_url}
                  alt={p.nama}
                  className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                  loading="lazy"
                />

                <div className="absolute left-3 top-3">
                  <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-brand-900 ring-1 ring-black/5 backdrop-blur">
                    {p.umkm.kategori.toUpperCase()}
                  </span>
                </div>

                <div className="absolute right-3 top-3">
                  <span className="rounded-full bg-brand-800 px-2.5 py-1 text-xs font-medium text-white shadow-soft">
                    {p.umkm.dusun.nama}
                  </span>
                </div>
              </div>

              <div className="space-y-2 p-4">
                <div className="min-w-0">
                  <div className="truncate text-base font-semibold text-gray-900">{p.nama}</div>
                  <div className="truncate text-sm text-gray-600">{p.umkm.nama}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-base font-semibold text-brand-900">
                    {formatRupiah(p.harga)}
                    {p.satuan ? <span className="text-sm text-gray-500"> / {p.satuan}</span> : null}
                  </div>

                  <span className="text-xs text-gray-500 transition group-hover:text-brand-900">
                    Lihat detail →
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}

        {filtered.length === 0 && (
          <Card className="p-6 sm:col-span-2 lg:col-span-3">
            <div className="font-semibold text-gray-900">Tidak ada produk yang cocok.</div>
            <div className="mt-1 text-sm text-gray-600">
              Coba reset filter atau ganti kata kunci pencarian.
            </div>
            <div className="mt-4">
              <Button variant="secondary" onClick={reset}>
                Reset Filter
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
