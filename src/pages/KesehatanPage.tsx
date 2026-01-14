import { useMemo, useState } from "react";

import { DUSUN } from "../data/dummy";
import { JADWAL, KADER } from "../data/dummyKesehatan";
import { formatTanggalID } from "../lib/date";
import { toWaLink } from "../lib/wa";

import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import SearchInput from "../components/ui/SearchInput";
import FilterSelect from "../components/ui/FilterSelect";

function compareTanggalAsc(a: string, b: string) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

export default function KesehatanPage() {
  const [dusunId, setDusunId] = useState<string>("all");
  const [q, setQ] = useState("");

  const dusunOptions = useMemo(() => {
    return [
      { value: "all", label: "Semua Dusun" },
      ...DUSUN.map((d) => ({ value: d.id, label: d.nama })),
    ];
  }, []);

  const filteredJadwal = useMemo(() => {
    const query = q.trim().toLowerCase();

    return [...JADWAL]
      .filter((j) => (dusunId === "all" ? true : j.dusun.id === dusunId))
      .filter((j) => {
        if (!query) return true;
        const hay = `${j.kegiatan} ${j.dusun.nama} ${j.lokasi ?? ""}`.toLowerCase();
        return hay.includes(query);
      })
      .sort((a, b) => compareTanggalAsc(a.tanggal, b.tanggal));
  }, [dusunId, q]);

  const upcomingTop3 = useMemo(() => filteredJadwal.slice(0, 3), [filteredJadwal]);

  const kaderFiltered = useMemo(() => {
    return KADER.filter((k) => (dusunId === "all" ? true : k.dusun.id === dusunId));
  }, [dusunId]);

  const reset = () => {
    setDusunId("all");
    setQ("");
  };

  return (
    <div className="space-y-6">
      {/* HERO */}
      <div className="rounded-2xl bg-gradient-to-br from-brand-800 to-brand-900 p-6 text-white shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Informasi Kesehatan</h1>
            <p className="mt-1 text-white/80">
              Jadwal posyandu & kontak kader per dusun. Klik tombol WhatsApp untuk bertanya.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="bg-white/15 text-white ring-1 ring-white/20">
              {filteredJadwal.length} jadwal
            </Badge>
            <Button variant="secondary" onClick={reset}>
              Reset
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

          <SearchInput
            className="md:col-span-2"
            label="Cari"
            placeholder="Cari kegiatan / lokasi..."
            value={q}
            onChange={setQ}
          />
        </div>
      </Card>

      {/* UPCOMING */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Jadwal Terdekat</h2>
          <span className="text-sm text-gray-500">3 teratas</span>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {upcomingTop3.map((j) => (
            <Card key={j.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate font-semibold text-gray-900">{j.kegiatan}</div>
                  <div className="mt-1 text-sm text-gray-600">{formatTanggalID(j.tanggal)}</div>
                </div>
                <Badge>{j.dusun.nama}</Badge>
              </div>

              <div className="mt-3 space-y-1 text-sm text-gray-700">
                {j.jam_mulai ? (
                  <div>
                    <span className="text-gray-500">Jam:</span> {j.jam_mulai}
                    {j.jam_selesai ? ` - ${j.jam_selesai}` : ""}
                  </div>
                ) : null}

                {j.lokasi ? (
                  <div>
                    <span className="text-gray-500">Lokasi:</span> {j.lokasi}
                  </div>
                ) : null}

                {j.catatan ? <div className="text-gray-600">{j.catatan}</div> : null}
              </div>
            </Card>
          ))}

          {upcomingTop3.length === 0 && (
            <Card className="p-6 md:col-span-3">
              <div className="font-semibold text-gray-900">Belum ada jadwal.</div>
              <div className="mt-1 text-sm text-gray-600">
                Coba pilih dusun lain atau kosongkan pencarian.
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* FULL LIST */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Semua Jadwal</h2>

        <div className="space-y-3">
          {filteredJadwal.map((j) => (
            <Card key={j.id} className="p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="truncate font-semibold text-gray-900">{j.kegiatan}</div>
                    <Badge className="hidden sm:inline-flex">{j.dusun.nama}</Badge>
                  </div>

                  <div className="mt-1 text-sm text-gray-600">{formatTanggalID(j.tanggal)}</div>

                  <div className="mt-2 space-y-1 text-sm text-gray-700">
                    {j.jam_mulai ? (
                      <div>
                        <span className="text-gray-500">Jam:</span> {j.jam_mulai}
                        {j.jam_selesai ? ` - ${j.jam_selesai}` : ""}
                      </div>
                    ) : null}

                    {j.lokasi ? (
                      <div>
                        <span className="text-gray-500">Lokasi:</span> {j.lokasi}
                      </div>
                    ) : null}

                    {j.catatan ? <div className="text-gray-600">{j.catatan}</div> : null}
                  </div>

                  <div className="mt-2 sm:hidden">
                    <Badge>{j.dusun.nama}</Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {filteredJadwal.length === 0 && (
            <Card className="p-6">
              <div className="font-semibold text-gray-900">Tidak ada jadwal yang cocok.</div>
              <div className="mt-1 text-sm text-gray-600">
                Coba reset filter atau ganti kata kunci.
              </div>
              <div className="mt-4">
                <Button variant="secondary" onClick={reset}>
                  Reset
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* KADER */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Kontak Kader</h2>

        <div className="grid gap-4 md:grid-cols-3">
          {kaderFiltered.map((k) => (
            <Card key={k.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-gray-900">{k.nama}</div>
                  <div className="mt-1 text-sm text-gray-600">{k.dusun.nama}</div>
                </div>
                <Badge>{k.dusun.nama}</Badge>
              </div>

              <div className="mt-4">
                <a
                  href={toWaLink(k.no_wa, "Halo, saya ingin tanya jadwal posyandu.")}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button className="w-full">Chat WhatsApp</Button>
                </a>
              </div>
            </Card>
          ))}

          {kaderFiltered.length === 0 && (
            <Card className="p-6 md:col-span-3">
              <div className="font-semibold text-gray-900">Kontak kader belum tersedia.</div>
              <div className="mt-1 text-sm text-gray-600">Tambahkan data kader untuk dusun ini.</div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
