import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";

import { PRODUK } from "../data/dummyUmkm";
import { formatRupiah } from "../lib/format";
import { toWaLink } from "../lib/wa";

export default function ProdukDetailPage() {
  const { id } = useParams();

  const produk = useMemo(
    () => PRODUK.find((p) => String(p.id) === String(id)),
    [id],
  );

  const produkLain = useMemo(() => {
    if (!produk) return [];
    return PRODUK.filter((p) => p.umkm.id === produk.umkm.id && p.id !== produk.id).slice(0, 6);
  }, [produk]);

  if (!produk) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Link to="/produk">
            <Button variant="secondary">← Kembali</Button>
          </Link>
        </div>

        <Card className="p-6">
          <div className="font-semibold text-gray-900">Produk tidak ditemukan.</div>
          <div className="mt-1 text-sm text-gray-600">
            Kembali ke halaman Informasi UMKM untuk melihat daftar produk.
          </div>
        </Card>
      </div>
    );
  }

  const umkm = produk.umkm;
  const waText = `Halo, saya tertarik dengan produk "${produk.nama}". Apakah masih tersedia?`;
  const waHref = toWaLink(umkm.no_wa, waText);

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Link to="/produk">
          <Button variant="secondary">← Kembali</Button>
        </Link>
        <div className="text-sm text-gray-500">Detail Produk</div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Foto + detail utama */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="overflow-hidden">
            <div className="aspect-[4/3] bg-gray-100">
              <img
                src={produk.foto_url}
                alt={produk.nama}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-sm text-gray-500">
              Produk <span className="text-gray-400">/</span> {umkm.dusun.nama}
            </div>

            <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
              <h1 className="text-2xl font-semibold text-gray-900">{produk.nama}</h1>
              <div className="flex items-center gap-2">
                <Badge>{umkm.kategori.toUpperCase()}</Badge>
                <Badge>{umkm.dusun.nama}</Badge>
              </div>
            </div>

            <div className="mt-1 text-sm text-gray-700">
              <span className="text-gray-500">UMKM</span>{" "}
              <span className="font-medium text-gray-900">{umkm.nama}</span>
            </div>

            <div className="mt-4 text-2xl font-semibold text-brand-900">
              {formatRupiah(produk.harga)}
              {produk.satuan ? (
                <span className="text-base text-gray-500"> / {produk.satuan}</span>
              ) : null}
            </div>

            {produk.deskripsi ? (
              <p className="mt-4 text-gray-700">{produk.deskripsi}</p>
            ) : (
              <p className="mt-4 text-gray-500">
                Deskripsi belum tersedia. Silakan chat untuk tanya detail produk.
              </p>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
              <a href={waHref} target="_blank" rel="noreferrer">
                <Button>Chat WhatsApp</Button>
              </a>
              <Link to="/produk">
                <Button variant="secondary">Kembali ke UMKM</Button>
              </Link>
            </div>
          </Card>

          {produkLain.length ? (
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Produk lain dari {umkm.nama}
                </h2>
                <Badge>{produkLain.length} item</Badge>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {produkLain.map((p) => (
                  <Link key={p.id} to={`/produk/${p.id}`} className="group">
                    <div className="overflow-hidden rounded-xl border border-gray-200 transition hover:shadow-soft">
                      <div className="aspect-[4/3] bg-gray-100">
                        <img
                          src={p.foto_url}
                          alt={p.nama}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-3">
                        <div className="truncate font-semibold text-gray-900">{p.nama}</div>
                        <div className="mt-1 text-sm font-semibold text-brand-900">
                          {formatRupiah(p.harga)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          ) : null}
        </div>

        {/* Sidebar UMKM */}
        <aside className="space-y-4">
          <Card className="p-5">
            <div className="text-xs font-semibold text-gray-600">Profil UMKM</div>
            <div className="mt-1 text-lg font-semibold text-gray-900">{umkm.nama}</div>
            <div className="mt-1 text-sm text-gray-600">
              {umkm.alamat ?? `Dusun ${umkm.dusun.nama}`}
            </div>

            {umkm.tentang ? <p className="mt-3 text-sm text-gray-700">{umkm.tentang}</p> : null}

            <div className="mt-4 space-y-2 text-sm text-gray-700">
              {umkm.jam_buka ? (
                <div>
                  <span className="text-gray-500">Jam buka:</span> {umkm.jam_buka}
                </div>
              ) : null}

              {umkm.pembayaran?.length ? (
                <div>
                  <span className="text-gray-500">Pembayaran:</span> {umkm.pembayaran.join(", ")}
                </div>
              ) : null}
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <a
                href={toWaLink(umkm.no_wa, `Halo, saya ingin tanya produk dari ${umkm.nama}.`)}
                target="_blank"
                rel="noreferrer"
              >
                <Button className="w-full">Chat UMKM</Button>
              </a>

              {umkm.maps_url ? (
                <a href={umkm.maps_url} target="_blank" rel="noreferrer">
                  <Button variant="secondary" className="w-full">
                    Lihat Lokasi
                  </Button>
                </a>
              ) : null}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
