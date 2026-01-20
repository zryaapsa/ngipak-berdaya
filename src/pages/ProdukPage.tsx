import { useEffect, useMemo, useState } from "react";

import {
  DUSUN,
  PRODUK,
  type UmkmKategori,
  type Produk,
  type UmkmInfo,
} from "../data/dummyUmkm";
import { formatRupiah } from "../lib/format";
import { toWaLink } from "../lib/wa";
import { getShopStatus } from "../lib/status";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import SearchInput from "../components/ui/SearchInput";
import FilterSelect from "../components/ui/FilterSelect";
import Modal from "../components/ui/Modal";
import Carousel from "../components/ui/Carousel";
import QrCode from "../components/ui/QrCode";
import SectionHeader from "../components/ui/SectionHeader";
import StatTile from "../components/ui/StatTile";
import CopyButton from "../components/ui/CopyButton";

type KategoriOrAll = UmkmKategori | "all";

const kategoriUI: { value: KategoriOrAll; label: string }[] = [
  { value: "all", label: "Semua Kategori" },
  { value: "makanan", label: "Makanan" },
  { value: "minuman", label: "Minuman" },
  { value: "jasa", label: "Jasa" },
];

function isKategori(v: string): v is UmkmKategori {
  return v === "makanan" || v === "minuman" || v === "jasa";
}

function groupByUmkm(items: Produk[]) {
  const map = new Map<string, { umkm: UmkmInfo; produk: Produk[] }>();
  for (const p of items) {
    const key = p.umkm.id;
    const prev = map.get(key);
    if (!prev) map.set(key, { umkm: p.umkm, produk: [p] });
    else prev.produk.push(p);
  }
  return [...map.values()];
}

function pickGallery(umkm: UmkmInfo, produk: Produk[]) {
  const g = (umkm.galeri_foto ?? []).slice(0, 3);
  if (g.length) return g;
  return produk.map((p) => p.foto_url).slice(0, 3);
}

function pickUnggulan(umkm: UmkmInfo, produk: Produk[]) {
  const ids = (umkm.produk_unggulan_ids ?? []).filter(Boolean);
  if (ids.length) {
    const picked = produk.filter((p) => ids.includes(p.id)).slice(0, 2);
    if (picked.length) return picked;
  }
  return produk.slice(0, 2);
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
        {n}
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-gray-900">{title}</div>
        <div className="mt-0.5 text-xs text-gray-600">{desc}</div>
      </div>
    </div>
  );
}

export default function ProdukPage() {
  const [dusunId, setDusunId] = useState<string>("all");
  const [kategori, setKategori] = useState<KategoriOrAll>("all");
  const [q, setQ] = useState("");

  const [selectedUmkmId, setSelectedUmkmId] = useState<string | null>(null);
  const [selectedProdukId, setSelectedProdukId] = useState<string>("");

  const PAGE_SIZE = 8;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const dusunOptions = useMemo(
    () => [
      { value: "all", label: "Semua Dusun" },
      ...DUSUN.map((d) => ({ value: d.id, label: d.nama })),
    ],
    [],
  );

  const filteredProduk = useMemo(() => {
    const query = q.trim().toLowerCase();
    return PRODUK.filter((p) => {
      const okDusun = dusunId === "all" ? true : p.umkm.dusun.id === dusunId;
      const okKat = kategori === "all" ? true : p.umkm.kategori === kategori;

      const hay = `${p.nama} ${p.umkm.nama} ${p.umkm.dusun.nama} ${
        p.deskripsi ?? ""
      }`.toLowerCase();
      const okQ = query === "" ? true : hay.includes(query);

      return okDusun && okKat && okQ;
    });
  }, [dusunId, kategori, q]);

  const umkmAll = useMemo(() => groupByUmkm(filteredProduk), [filteredProduk]);
  const umkmShown = useMemo(
    () => umkmAll.slice(0, visibleCount),
    [umkmAll, visibleCount],
  );

  const selected = useMemo(() => {
    if (!selectedUmkmId) return null;
    return umkmAll.find((x) => x.umkm.id === selectedUmkmId) ?? null;
  }, [selectedUmkmId, umkmAll]);

  useEffect(() => setSelectedProdukId(""), [selectedUmkmId]);
  useEffect(() => setVisibleCount(PAGE_SIZE), [dusunId, kategori, q]);

  const reset = () => {
    setDusunId("all");
    setKategori("all");
    setQ("");
    setVisibleCount(PAGE_SIZE);
  };

  const onKategoriChange = (v: string) => {
    if (v === "all") return setKategori("all");
    if (isKategori(v)) return setKategori(v);
    return setKategori("all");
  };

  const waMessage = (umkm: UmkmInfo, produkList: Produk[]) => {
    const chosen = produkList.find((p) => p.id === selectedProdukId);
    if (chosen) {
      return `Halo, saya ingin pesan "${chosen.nama}". Jumlah: __. Alamat: __.`;
    }
    return `Halo, saya ingin tanya/pesan produk dari "${umkm.nama}". Produk: __. Jumlah: __.`;
  };

  const totalProduk = PRODUK.length;
  const totalUmkm = groupByUmkm(PRODUK).length;

  return (
    <div className="space-y-6">
      {/* HERO - premium */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 to-brand-900 p-6 text-white shadow-soft">
        <div className="pointer-events-none absolute inset-0 bg-radial-glow" />
        <div className="pointer-events-none absolute inset-0 bg-grid-soft opacity-60" />
        <div className="pointer-events-none absolute inset-0 bg-noise-soft" />

        <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-2xl font-semibold">
              Informasi UMKM Desa Ngipak
            </h1>
            <p className="mt-2 text-white/80">
              Direktori UMKM untuk memudahkan warga dan pengunjung memesan
              produk melalui WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={reset}>
              Reset Filter
            </Button>
          </div>
        </div>

        <div className="relative mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile
            label="Total UMKM (dummy)"
            value={totalUmkm}
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 21V9l8-6 8 6v12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            }
          />
          <StatTile
            label="Total Produk (dummy)"
            value={totalProduk}
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M20 7H4l2 14h12l2-14Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 7a3 3 0 0 1 6 0"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            }
          />
          <StatTile label="Dusun" value={DUSUN.length} />
          <StatTile label="UMKM Terfilter" value={umkmAll.length} />
        </div>
      </div>

      {/* FILTER */}
      <Card className="p-4">
        <SectionHeader
          title="Cari UMKM"
          desc="Gunakan filter untuk mempercepat pencarian."
          right={
            <Badge className="bg-gray-100 text-gray-700 ring-1 ring-gray-200">
              {umkmAll.length} UMKM
            </Badge>
          }
        />

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <FilterSelect
            label="Dusun"
            value={dusunId}
            options={dusunOptions}
            onChange={setDusunId}
          />
          <FilterSelect
            label="Kategori"
            value={kategori}
            options={kategoriUI}
            onChange={onKategoriChange}
          />
          <SearchInput
            label=""
            placeholder="Cari UMKM / produk..."
            value={q}
            onChange={setQ}
          />
        </div>
      </Card>

      {/* LIST */}
      <div className="space-y-4">
        {umkmShown.map(({ umkm, produk }) => {
          const gallery = pickGallery(umkm, produk);
          const unggulan = pickUnggulan(umkm, produk);
          const st = getShopStatus(umkm.jam_buka);

          return (
            <Card key={umkm.id} className="overflow-hidden">
              <div className="grid lg:grid-cols-[300px_1fr]">
                <div className="relative h-56 bg-gray-100 lg:h-full">
                  <Carousel
                    images={gallery}
                    alt={umkm.nama}
                    className="h-full w-full"
                  />
                  {/* overlay gradient biar teks kebaca */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                  <div className="absolute left-3 top-3 flex gap-2">
                    <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-brand-900 ring-1 ring-black/5 backdrop-blur">
                      {umkm.kategori.toUpperCase()}
                    </span>
                    <span className="rounded-full bg-brand-800 px-2.5 py-1 text-xs font-medium text-white shadow-soft">
                      {umkm.dusun.nama}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold text-white ${
                        st.color === "green"
                          ? "bg-green-600"
                          : st.color === "red"
                            ? "bg-red-600"
                            : "bg-gray-700"
                      }`}
                      title={st.label}
                    >
                      {st.label}
                    </span>
                    {umkm.estimasi ? (
                      <span className="rounded-full bg-black/35 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                        ⏱ {umkm.estimasi}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="text-lg font-semibold text-gray-900">
                        {umkm.nama}
                      </div>
                      <div className="mt-1 text-sm text-gray-600">
                        {umkm.alamat ?? `Dusun ${umkm.dusun.nama}`}
                      </div>

                      <p className="mt-3 text-sm text-gray-700 line-clamp-2">
                        {umkm.tentang ?? "Deskripsi belum tersedia."}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-700">
                        {umkm.layanan?.includes("cod") ? (
                          <span className="rounded-full border bg-gray-50 px-2 py-1">
                            COD
                          </span>
                        ) : null}
                        {umkm.layanan?.includes("antar") ? (
                          <span className="rounded-full border bg-gray-50 px-2 py-1">
                            Antar
                          </span>
                        ) : null}
                        {umkm.layanan?.includes("ambil") ? (
                          <span className="rounded-full border bg-gray-50 px-2 py-1">
                            Ambil
                          </span>
                        ) : null}
                        {umkm.pembayaran?.length ? (
                          <span className="rounded-full border bg-gray-50 px-2 py-1">
                            Bayar: {umkm.pembayaran.join(", ")}
                          </span>
                        ) : null}
                        {umkm.jam_buka ? (
                          <span className="rounded-full border bg-gray-50 px-2 py-1">
                            🕒 {umkm.jam_buka}
                          </span>
                        ) : null}
                      </div>

                      <div className="mt-5">
                        <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Produk unggulan
                        </div>
                        <div className="mt-2 grid gap-2 sm:grid-cols-2">
                          {unggulan.map((p) => (
                            <div
                              key={p.id}
                              className="rounded-xl border border-gray-100 bg-gray-50 p-3"
                            >
                              <div className="text-sm font-semibold text-gray-900">
                                {p.nama}
                              </div>
                              <div className="mt-1 text-sm font-semibold text-brand-900">
                                {formatRupiah(p.harga)}
                                {p.satuan ? (
                                  <span className="text-gray-500">
                                    {" "}
                                    / {p.satuan}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <button
                        type="button"
                        onClick={() => setSelectedUmkmId(umkm.id)}
                      >
                        <Button className="w-full sm:w-auto">Pesan</Button>
                      </button>
                      <div className="mt-2 text-xs text-gray-500">
                        WhatsApp & QR tersedia
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}

        {umkmAll.length === 0 ? (
          <Card className="p-8">
            <div className="text-lg font-semibold text-gray-900">
              Tidak ada hasil.
            </div>
            <div className="mt-1 text-sm text-gray-600">
              Coba ganti kata kunci atau reset filter.
            </div>
            <div className="mt-4">
              <Button variant="secondary" onClick={reset}>
                Reset
              </Button>
            </div>
          </Card>
        ) : null}

        {umkmAll.length > umkmShown.length ? (
          <div className="flex justify-center pt-2">
            <Button
              variant="secondary"
              onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
            >
              Tampilkan lebih banyak
            </Button>
          </div>
        ) : null}
      </div>

      {/* MODAL PESAN (guided) */}
      <Modal
        open={!!selected}
        onClose={() => setSelectedUmkmId(null)}
        title={selected?.umkm.nama}
      >
        {selected ? (
          <div className="space-y-5">
            {/* bikin item grid tidak stretch -> tidak ada blank area */}
            <div className="grid gap-4 lg:grid-cols-[1fr_420px] lg:items-start">
              {/* KIRI: sticky + aspect ratio (ga ada ruang kosong) */}
              <div className="lg:sticky lg:top-4 self-start">
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
                  <div className="aspect-[4/3]">
                    <Carousel
                      images={pickGallery(selected.umkm, selected.produk)}
                      alt={selected.umkm.nama}
                      className="h-full w-full"
                    />
                  </div>
                </div>

                {/* ringkasan cepat biar terasa “professional” */}
                <div className="mt-3 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <div className="text-sm font-semibold text-gray-900">
                    {selected.umkm.nama}
                  </div>
                  <div className="mt-1 text-xs text-gray-600">
                    {selected.umkm.alamat ??
                      `Dusun ${selected.umkm.dusun.nama}`}
                  </div>
                  {selected.umkm.tentang ? (
                    <p className="mt-2 text-sm text-gray-700 line-clamp-3">
                      {selected.umkm.tentang}
                    </p>
                  ) : null}
                </div>
              </div>

              {/* KANAN: step + action + QR dibuat 2 kolom agar tidak panjang */}
              <Card className="p-4 self-start">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-gray-900">
                    Panduan Pesan
                  </div>
                  <Badge>3 langkah</Badge>
                </div>

                <div className="mt-4 space-y-3">
                  <Step
                    n="1"
                    title="Pilih produk (opsional)"
                    desc="Jika belum yakin, biarkan kosong untuk tanya dulu."
                  />
                  <Step
                    n="2"
                    title="Kirim WhatsApp / Scan QR"
                    desc="Pesan otomatis sudah disiapkan."
                  />
                  <Step
                    n="3"
                    title="Konfirmasi jumlah & pengiriman"
                    desc="Tulis jumlah + alamat, lalu tunggu respon penjual."
                  />
                </div>

                <div className="mt-4">
                  <label className="text-xs font-semibold text-gray-600">
                    Produk
                  </label>
                  <select
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm focus:border-brand-300 focus:ring-brand-100"
                    value={selectedProdukId}
                    onChange={(e) => setSelectedProdukId(e.target.value)}
                  >
                    <option value="">(Tidak memilih) — tanya dulu</option>
                    {selected.produk.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nama} — {formatRupiah(p.harga)}
                      </option>
                    ))}
                  </select>
                </div>

                {(() => {
                  const msg = waMessage(selected.umkm, selected.produk);
                  const href = toWaLink(selected.umkm.no_wa, msg);

                  return (
                    <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_180px] lg:items-start">
                      {/* kiri: tombol2 */}
                      <div className="space-y-2">
                        {/* ACTION AREA RAPI: grid 2 kolom */}
                        <div className="grid grid-cols-2 gap-2">
                          {/* tombol utama full width */}
                          <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            className="col-span-2"
                          >
                            <Button className="h-11 w-full">
                              Buka WhatsApp
                            </Button>
                          </a>

                          {/* tombol sekunder konsisten tinggi */}
                          <CopyButton text={msg} className="col-span-1" />

                          {selected.umkm.maps_url ? (
                            <a
                              href={selected.umkm.maps_url}
                              target="_blank"
                              rel="noreferrer"
                              className="col-span-1"
                            >
                              <Button
                                variant="secondary"
                                className="h-11 w-full"
                              >
                                Lokasi
                              </Button>
                            </a>
                          ) : (
                            <div className="col-span-1">
                              <Button
                                variant="secondary"
                                className="h-11 w-full"
                                disabled
                              >
                                Lokasi
                              </Button>
                            </div>
                          )}
                        </div>

                        <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 text-xs text-gray-600">
                          Tip: setelah WA terbuka, isi jumlah & alamat pada
                          chat.
                        </div>
                      </div>

                      {/* kanan: QR compact */}
                      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-3 text-center">
                        <div className="text-xs font-semibold text-gray-600">
                          QR WhatsApp
                        </div>
                        <div className="mt-3 flex justify-center">
                          <QrCode
                            value={href}
                            size={150}
                            className="rounded-xl bg-white p-2 ring-1 ring-black/5"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </Card>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
