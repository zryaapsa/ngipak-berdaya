export type Dusun = {
  id: string;
  nama: string;
  slug: string;
};

export type UmkmKategori = "makanan" | "minuman" | "jasa";

export type Umkm = {
  id: string;
  nama: string;
  kategori: UmkmKategori;
  alamat: string | null;
  no_wa: string | null;
  deskripsi_singkat: string | null;
  aktif: boolean;
  dusun: Dusun | null; // hasil join
};

export type Kader = {
  id: string;
  nama: string;
  no_wa: string | null;
  catatan: string | null;
  aktif: boolean;
  dusun: Dusun | null;
};

export type JadwalKesehatan = {
  id: string;
  kegiatan: string;
  tanggal: string; // date string
  jam_mulai: string | null;
  jam_selesai: string | null;
  lokasi: string | null;
  catatan: string | null;
  aktif: boolean;
  dusun: Dusun | null;
};

export type UmkmRow = {
  id: string;
  nama: string;
  kategori: UmkmKategori;
  alamat: string | null;
  no_wa: string | null;
  deskripsi_singkat: string | null;
  aktif: boolean;
  dusun: Dusun | null;
};

export type KaderRow = {
  id: string;
  nama: string;
  no_wa: string | null;
  catatan: string | null;
  aktif: boolean;
  dusun: Dusun | null;
};

export type JadwalKesehatanRow = {
  id: string;
  kegiatan: string;
  tanggal: string;
  jam_mulai: string | null;
  jam_selesai: string | null;
  lokasi: string | null;
  catatan: string | null;
  aktif: boolean;
  dusun: Dusun | null;
};
