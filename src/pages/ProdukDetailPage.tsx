import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";

import { PRODUK } from "../data/dummy";
import { formatRupiah } from "../lib/format";
import { toWaLink } from "../lib/wa";

export default function ProdukDetailPage() {
  const { id } = useParams();

  const produk = useMemo(() => PRODUK.find((p) => String(p.id) === String(id)), [id]);

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

  const waText = `Halo, saya tertarik dengan produk "${produk.nama}". Apakah masih tersedia?`;
  const waHref = toWaLink(produk.umkm.no_wa, waText);

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Link to="/produk">
          <Button variant="secondary">← Kembali</Button>
        </Link>
        <div className="text-sm text-gray-500">Detail Produk</div>
      </div>

      {/* Main content */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Foto */}
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

        {/* Info */}
        <Card className="p-6">
          <div className="text-sm text-gray-500">
            Produk <span className="text-gray-400">/</span> {produk.umkm.dusun.nama}
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-2xl font-semibold text-gray-900">{produk.nama}</h1>

            <div className="flex items-center gap-2">
              <Badge>{produk.umkm.kategori.toUpperCase()}</Badge>
              <Badge>{produk.umkm.dusun.nama}</Badge>
            </div>
          </div>

          <div className="mt-1 text-sm text-gray-700">
            <span className="text-gray-500">UMKM</span>{" "}
            <span className="font-medium text-gray-900">{produk.umkm.nama}</span>{" "}
            <span className="text-gray-400">•</span>{" "}
            <span className="font-medium text-gray-900">{produk.umkm.dusun.nama}</span>
          </div>

          <div className="mt-4 text-2xl font-semibold text-brand-900">
            {formatRupiah(produk.harga)}
            {produk.satuan ? <span className="text-base text-gray-500"> / {produk.satuan}</span> : null}
          </div>

          {produk.deskripsi ? (
            <p className="mt-4 text-gray-700">{produk.deskripsi}</p>
          ) : (
            <p className="mt-4 text-gray-500">
              Deskripsi belum tersedia. Silakan chat untuk tanya detail produk.
            </p>
          )}

          {/* Seller box ringkas (berguna, tidak redundant) */}
          <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="text-xs font-semibold text-gray-600">Penjual</div>
            <div className="mt-1 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="truncate font-semibold text-gray-900">{produk.umkm.nama}</div>
                <div className="truncate text-sm text-gray-600">
                  Dusun {produk.umkm.dusun.nama}
                </div>
              </div>

              {/* opsional: tampilkan nomor sebagai info kecil */}
              <div className="text-xs text-gray-500">via WhatsApp</div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-5 flex flex-wrap gap-2">
            <a href={waHref} target="_blank" rel="noreferrer">
              <Button>Chat WhatsApp</Button>
            </a>

            <Link to="/produk">
              <Button variant="secondary">Lihat Produk Lain</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
