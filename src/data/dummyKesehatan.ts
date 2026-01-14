import type { Dusun } from "./dummy";

export type Kader = {
  id: string;
  dusun: Dusun;
  nama: string;
  no_wa: string;
};

export type JadwalKesehatan = {
  id: string;
  dusun: Dusun;
  kegiatan: string;
  tanggal: string; // "YYYY-MM-DD"
  jam_mulai?: string; // "HH:MM"
  jam_selesai?: string; // "HH:MM"
  lokasi?: string;
  catatan?: string;
};

export const KADER: Kader[] = [
  {
    id: "k1",
    dusun: { id: "d1", nama: "Kalangan 1", slug: "kalangan-1" },
    nama: "Bu Siti",
    no_wa: "6281111111111",
  },
  {
    id: "k2",
    dusun: { id: "d3", nama: "Ngipak", slug: "ngipak" },
    nama: "Bu Wati",
    no_wa: "6282222222222",
  },
  {
    id: "k3",
    dusun: { id: "d8", nama: "Jetis", slug: "jetis" },
    nama: "Bu Rina",
    no_wa: "6283333333333",
  },
];

export const JADWAL: JadwalKesehatan[] = [
  {
    id: "j1",
    dusun: { id: "d3", nama: "Ngipak", slug: "ngipak" },
    kegiatan: "Posyandu Balita",
    tanggal: "2026-01-20",
    jam_mulai: "08:00",
    jam_selesai: "10:00",
    lokasi: "Balai Dusun Ngipak",
    catatan: "Bawa KIA & buku kesehatan.",
  },
  {
    id: "j2",
    dusun: { id: "d1", nama: "Kalangan 1", slug: "kalangan-1" },
    kegiatan: "Posbindu Lansia",
    tanggal: "2026-01-22",
    jam_mulai: "07:30",
    jam_selesai: "09:30",
    lokasi: "Rumah Pak RT",
  },
  {
    id: "j3",
    dusun: { id: "d8", nama: "Jetis", slug: "jetis" },
    kegiatan: "Imunisasi",
    tanggal: "2026-01-25",
    jam_mulai: "08:00",
    lokasi: "Posyandu Jetis",
  },
];
