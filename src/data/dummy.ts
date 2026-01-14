export type Dusun = { id: string; nama: string; slug: string };
export type UmkmKategori = "makanan" | "minuman" | "jasa";

export type Produk = {
  id: string;
  nama: string;
  harga: number;
  satuan?: string;
  foto_url: string;
  umkm: {
    id: string;
    nama: string;
    kategori: UmkmKategori;
    no_wa: string;
    alamat?: string;
    dusun: Dusun;
  };
  deskripsi?: string;
};

export const DUSUN: Dusun[] = [
  { id: "d1", nama: "Kalangan 1", slug: "kalangan-1" },
  { id: "d2", nama: "Kalangan 2", slug: "kalangan-2" },
  { id: "d3", nama: "Ngipak", slug: "ngipak" },
  { id: "d4", nama: "Karangwetan", slug: "karangwetan" },
  { id: "d5", nama: "Dungkasi", slug: "dungkasi" },
  { id: "d6", nama: "Coyudan 1", slug: "coyudan-1" },
  { id: "d7", nama: "Coyudan 2", slug: "coyudan-2" },
  { id: "d8", nama: "Jetis", slug: "jetis" },
  { id: "d9", nama: "Munggur", slug: "munggur" },
];

const img = "https://aimrxyqppgebeqgfneah.supabase.co/storage/v1/object/public/produk/3.jpeg";

export const PRODUK: Produk[] = [
  {
    id: "p1",
    nama: "Keripik Pisang Cokelat",
    harga: 25000,
    satuan: "pack",
    foto_url: img,
    deskripsi: "Keripik pisang varian cokelat. Cocok untuk oleh-oleh.",
    umkm: {
      id: "u1",
      nama: "UMKM Ngipak Sejahtera",
      kategori: "makanan",
      no_wa: "6281234567890",
      alamat: "Dusun Ngipak, Gunungkidul",
      dusun: DUSUN[2],
    },
  },
  {
    id: "p2",
    nama: "Keripik Pisang Original",
    harga: 22000,
    satuan: "pack",
    foto_url: img,
    umkm: {
      id: "u1",
      nama: "UMKM Ngipak Sejahtera",
      kategori: "makanan",
      no_wa: "6281234567890",
      dusun: DUSUN[2],
    },
  },
  {
    id: "p3",
    nama: "Es Teh Jumbo",
    harga: 8000,
    satuan: "gelas",
    foto_url: img,
    umkm: {
      id: "u2",
      nama: "Minuman Segar Jetis",
      kategori: "minuman",
      no_wa: "6281111111111",
      dusun: DUSUN[7],
    },
  },
  {
    id: "p4",
    nama: "Jasa Jahit & Permak",
    harga: 15000,
    satuan: "mulai",
    foto_url: img,
    umkm: {
      id: "u3",
      nama: "Jasa Karangwetan",
      kategori: "jasa",
      no_wa: "6282222222222",
      dusun: DUSUN[3],
    },
  },
];
