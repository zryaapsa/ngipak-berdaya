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

// Helper: ambil Dusun dari slug biar aman & konsisten
const getDusun = (slug: Dusun["slug"]) => {
  const d = DUSUN.find((x) => x.slug === slug);
  if (!d) throw new Error(`Dusun slug tidak ditemukan: ${slug}`);
  return d;
};

// ====== Gambar Produk (Supabase Storage) ======
const IMG = {
  TERONG:
    "https://aimrxyqppgebeqgfneah.supabase.co/storage/v1/object/public/produk/KERIPIK%20TERONG.jpeg",
  MLINJO:
    "https://aimrxyqppgebeqgfneah.supabase.co/storage/v1/object/public/produk/KERIPIK%20MLINJO.jpeg",
  KACANG_OVEN:
    "https://aimrxyqppgebeqgfneah.supabase.co/storage/v1/object/public/produk/KACANG%20OVEN.jpeg",
  KERIPIK_PISANG:
    "https://aimrxyqppgebeqgfneah.supabase.co/storage/v1/object/public/produk/KERIPIK%20PISANG.jpeg",
  SARON:
    "https://aimrxyqppgebeqgfneah.supabase.co/storage/v1/object/public/produk/GAMELAN.jpg",

  // fallback
  FALLBACK:
    "https://aimrxyqppgebeqgfneah.supabase.co/storage/v1/object/public/produk/3.jpeg",
} as const;

// ====== UMKM dummy (pisah sesuai WA + dusun) ======
const UMKM = {
  // NGIPAK: Keripik Terong & Mlinjo
  NGIPAK_KERIPIK: {
    id: "u-ngipak-keripik",
    nama: "Keripik Ngipak",
    kategori: "makanan" as const,
    no_wa: "6288226870992", // 088226870992
    alamat: "Dusun Ngipak, Gunungkidul",
    dusun: getDusun("ngipak"),
  },

  // DUNGKASI: Kacang Oven
  DUNGKASI_KACANG: {
    id: "u-dungkasi-kacang",
    nama: "Kacang Oven Dungkasi",
    kategori: "makanan" as const,
    no_wa: "6285641191935", // 085641191935
    alamat: "Dusun Dungkasi, Gunungkidul",
    dusun: getDusun("dungkasi"),
  },

  // KALANGAN 2: Keripik Pisang
  KALANGAN2_PISANG: {
    id: "u-kalangan2-pisang",
    nama: "Keripik Pisang Kalangan 2",
    kategori: "makanan" as const,
    no_wa: "6281228452875", // sudah format 62
    alamat: "Dusun Kalangan 2, Gunungkidul",
    dusun: getDusun("kalangan-2"),
  },

  // KARANGWETAN: Pengrajin Saron/Gamelan
  KARANGWETAN_SARON: {
    id: "u-karangwetan-saron",
    nama: "Pengrajin Saron Karangwetan",
    kategori: "jasa" as const,
    no_wa: "6285720045126", // 085720045126
    alamat: "Dusun Karangwetan, Gunungkidul",
    dusun: getDusun("karangwetan"),
  },

  // Dummy tambahan (kalau masih butuh)
  JETIS_MINUMAN: {
    id: "u-jetis-minuman",
    nama: "Minuman Segar Jetis",
    kategori: "minuman" as const,
    no_wa: "6281111111111",
    dusun: getDusun("jetis"),
  },
  KARANGWETAN_JASA: {
    id: "u-karangwetan-jasa",
    nama: "Jasa Karangwetan",
    kategori: "jasa" as const,
    no_wa: "6282222222222",
    dusun: getDusun("karangwetan"),
  },
} as const;

export const PRODUK: Produk[] = [
  {
    id: "p-terong",
    nama: "Keripik Terong",
    harga: 15000,
    satuan: "pack",
    foto_url: IMG.TERONG,
    deskripsi: "Keripik terong gurih dan renyah, cocok untuk camilan dan oleh-oleh.",
    umkm: UMKM.NGIPAK_KERIPIK,
  },
  {
    id: "p-mlinjo",
    nama: "Keripik Mlinjo",
    harga: 20000,
    satuan: "pack",
    foto_url: IMG.MLINJO,
    deskripsi: "Keripik mlinjo (emping) gurih, pas untuk camilan keluarga.",
    umkm: UMKM.NGIPAK_KERIPIK,
  },
  {
    id: "p-kacang-oven",
    nama: "Kacang Oven",
    harga: 12000,
    satuan: "pack",
    foto_url: IMG.KACANG_OVEN,
    deskripsi: "Kacang oven gurih, cocok untuk teman minum teh/kopi.",
    umkm: UMKM.DUNGKASI_KACANG,
  },
  {
    id: "p-keripik-pisang",
    nama: "Keripik Pisang",
    harga: 13000,
    satuan: "pack",
    foto_url: IMG.KERIPIK_PISANG,
    deskripsi: "Keripik pisang renyah, cocok untuk camilan dan oleh-oleh.",
    umkm: UMKM.KALANGAN2_PISANG,
  },
  {
    id: "p-saron",
    nama: "Saron (Gamelan)",
    harga: 0,
    satuan: "custom",
    foto_url: IMG.SARON,
    deskripsi:
      "Pembuatan saron/gamelan custom. Harga menyesuaikan ukuran dan spesifikasi. Chat WhatsApp untuk konsultasi.",
    umkm: UMKM.KARANGWETAN_SARON,
  },

  // Dummy lain kalau masih mau ditampilkan
  // {
  //   id: "p-dummy-es-teh",
  //   nama: "Es Teh Jumbo",
  //   harga: 8000,
  //   satuan: "gelas",
  //   foto_url: IMG.FALLBACK,
  //   deskripsi: "Es teh manis segar ukuran jumbo.",
  //   umkm: UMKM.JETIS_MINUMAN,
  // },
  // {
  //   id: "p-dummy-jahit",
  //   nama: "Jasa Jahit & Permak",
  //   harga: 15000,
  //   satuan: "mulai",
  //   foto_url: IMG.FALLBACK,
  //   deskripsi: "Jasa jahit dan permak pakaian (harga mulai).",
  //   umkm: UMKM.KARANGWETAN_JASA,
  // },
];
