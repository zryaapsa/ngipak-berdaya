export type Dusun = { id: string; nama: string; slug: string };
export type UmkmKategori = "makanan" | "minuman" | "jasa";

export type UmkmInfo = {
  id: string;
  nama: string;
  kategori: UmkmKategori;
  no_wa: string;
  alamat?: string;
  dusun: Dusun;

  tentang?: string;
  jam_buka?: string;
  maps_url?: string;
  pembayaran?: ("cash" | "transfer" | "qris")[];

  galeri_foto?: string[]; // max 3 dipakai UI
  produk_unggulan_ids?: string[];

  // UX trust signals (dummy)
  layanan?: ("ambil" | "antar" | "cod")[];
  estimasi?: string; // "1-2 hari"
};

export type Produk = {
  id: string;
  nama: string;
  harga: number;
  satuan?: string;
  foto_url: string;
  umkm: UmkmInfo;
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

const getDusun = (slug: Dusun["slug"]) => {
  const d = DUSUN.find((x) => x.slug === slug);
  if (!d) throw new Error(`Dusun slug tidak ditemukan: ${slug}`);
  return d;
};

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
  FALLBACK:
    "https://aimrxyqppgebeqgfneah.supabase.co/storage/v1/object/public/produk/3.jpeg",
} as const;

// helper generator WA dummy
const WA = (n: number) => `62812${String(1000000 + n).slice(1)}`;

// helper buat UMKM cepat
const mkUmkm = (p: {
  id: string;
  nama: string;
  kategori: UmkmKategori;
  waSeed: number;
  dusunSlug: Dusun["slug"];
  alamat?: string;
  tentang?: string;
  jam_buka?: string;
  pembayaran?: ("cash" | "transfer" | "qris")[];
  galeri?: string[];
  unggulan?: string[];
  layanan?: ("ambil" | "antar" | "cod")[];
  estimasi?: string;
}): UmkmInfo => ({
  id: p.id,
  nama: p.nama,
  kategori: p.kategori,
  no_wa: WA(p.waSeed),
  alamat: p.alamat ?? `Dusun ${getDusun(p.dusunSlug).nama}, Gunungkidul`,
  dusun: getDusun(p.dusunSlug),
  tentang: p.tentang,
  jam_buka: p.jam_buka,
  pembayaran: p.pembayaran,
  maps_url: `https://maps.google.com/?q=Dusun+${encodeURIComponent(getDusun(p.dusunSlug).nama)}+Gunungkidul`,
  galeri_foto: p.galeri,
  produk_unggulan_ids: p.unggulan,
  layanan: p.layanan,
  estimasi: p.estimasi,
});

const UMKM = {
  // Ngipak (existing)
  NGIPAK_KERIPIK: mkUmkm({
    id: "u-ngipak-keripik",
    nama: "Keripik Ngipak",
    kategori: "makanan",
    waSeed: 1,
    dusunSlug: "ngipak",
    tentang: "Keripik rumahan (terong & mlinjo) gurih-renyah untuk camilan dan oleh-oleh.",
    jam_buka: "08.00–17.00",
    pembayaran: ["cash", "transfer"],
    galeri: [IMG.TERONG, IMG.MLINJO, IMG.FALLBACK],
    unggulan: ["p-terong", "p-mlinjo"],
    layanan: ["ambil", "antar", "cod"],
    estimasi: "Same day (area dekat)",
  }),

  // Dungkasi
  DUNGKASI_KACANG: mkUmkm({
    id: "u-dungkasi-kacang",
    nama: "Kacang Oven Dungkasi",
    kategori: "makanan",
    waSeed: 2,
    dusunSlug: "dungkasi",
    tentang: "Kacang oven gurih untuk teman minum. Ada kemasan harian & oleh-oleh.",
    jam_buka: "09.00–16.00",
    pembayaran: ["cash", "qris"],
    galeri: [IMG.KACANG_OVEN, IMG.FALLBACK, IMG.KERIPIK_PISANG],
    unggulan: ["p-kacang-oven"],
    layanan: ["ambil", "antar"],
    estimasi: "1 hari",
  }),

  // Kalangan 2
  KALANGAN2_PISANG: mkUmkm({
    id: "u-kalangan2-pisang",
    nama: "Keripik Pisang Kalangan 2",
    kategori: "makanan",
    waSeed: 3,
    dusunSlug: "kalangan-2",
    tentang: "Keripik pisang renyah manis-gurih. Cocok untuk oleh-oleh.",
    jam_buka: "08.00–17.00",
    pembayaran: ["cash", "transfer"],
    galeri: [IMG.KERIPIK_PISANG, IMG.FALLBACK, IMG.MLINJO],
    unggulan: ["p-keripik-pisang"],
    layanan: ["ambil", "cod"],
    estimasi: "Same day",
  }),

  // Karangwetan
  KARANGWETAN_SARON: mkUmkm({
    id: "u-karangwetan-saron",
    nama: "Pengrajin Saron Karangwetan",
    kategori: "jasa",
    waSeed: 4,
    dusunSlug: "karangwetan",
    tentang: "Pembuatan saron/gamelan custom. Konsultasi spesifikasi & estimasi via WhatsApp.",
    jam_buka: "08.00–16.00",
    pembayaran: ["transfer", "cash"],
    galeri: [IMG.SARON, IMG.FALLBACK, IMG.KACANG_OVEN],
    unggulan: ["p-saron"],
    layanan: ["ambil"],
    estimasi: "7–14 hari (custom)",
  }),

  // ===== tambahan banyak UMKM (dummy) =====
  KALANGAN1_JAJAN: mkUmkm({
    id: "u-kalangan1-jajan",
    nama: "Jajan Pasar Kalangan 1",
    kategori: "makanan",
    waSeed: 5,
    dusunSlug: "kalangan-1",
    tentang: "Aneka jajanan pasar untuk acara dan harian.",
    jam_buka: "05.30–10.00",
    pembayaran: ["cash", "qris"],
    galeri: [IMG.FALLBACK, IMG.KERIPIK_PISANG, IMG.TERONG],
    layanan: ["ambil", "antar"],
    estimasi: "H-1 (preorder)",
  }),

  JETIS_MINUMAN: mkUmkm({
    id: "u-jetis-minuman",
    nama: "Minuman Segar Jetis",
    kategori: "minuman",
    waSeed: 6,
    dusunSlug: "jetis",
    tentang: "Minuman segar untuk pesanan acara dan harian.",
    jam_buka: "10.00–18.00",
    pembayaran: ["cash", "qris"],
    galeri: [IMG.FALLBACK, IMG.MLINJO, IMG.KERIPIK_PISANG],
    layanan: ["ambil", "antar", "cod"],
    estimasi: "Same day",
  }),

  MUNGGUR_CATERING: mkUmkm({
    id: "u-munggur-catering",
    nama: "Catering Munggur",
    kategori: "makanan",
    waSeed: 7,
    dusunSlug: "munggur",
    tentang: "Nasi box dan snack box untuk rapat/acara.",
    jam_buka: "07.00–17.00",
    pembayaran: ["cash", "transfer"],
    galeri: [IMG.FALLBACK, IMG.KERIPIK_PISANG, IMG.KACANG_OVEN],
    layanan: ["antar"],
    estimasi: "H-1 (preorder)",
  }),

  COYUDAN1_BAKERY: mkUmkm({
    id: "u-coyudan1-bakery",
    nama: "Roti Rumahan Coyudan 1",
    kategori: "makanan",
    waSeed: 8,
    dusunSlug: "coyudan-1",
    tentang: "Roti & kue rumahan, cocok untuk cemilan.",
    jam_buka: "08.00–15.00",
    pembayaran: ["cash", "qris"],
    galeri: [IMG.FALLBACK, IMG.TERONG, IMG.KERIPIK_PISANG],
    layanan: ["ambil", "cod"],
    estimasi: "1 hari",
  }),

  COYUDAN2_LAUNDRY: mkUmkm({
    id: "u-coyudan2-laundry",
    nama: "Laundry Coyudan 2",
    kategori: "jasa",
    waSeed: 9,
    dusunSlug: "coyudan-2",
    tentang: "Laundry kiloan, bisa antar-jemput.",
    jam_buka: "08.00–20.00",
    pembayaran: ["cash", "transfer", "qris"],
    galeri: [IMG.FALLBACK, IMG.FALLBACK, IMG.FALLBACK],
    layanan: ["antar"],
    estimasi: "2 hari",
  }),

  NGIPAK_SAMBAL: mkUmkm({
    id: "u-ngipak-sambal",
    nama: "Sambal & Bumbu Ngipak",
    kategori: "makanan",
    waSeed: 10,
    dusunSlug: "ngipak",
    tentang: "Sambal kemasan dan bumbu siap masak.",
    jam_buka: "09.00–17.00",
    pembayaran: ["cash", "qris"],
    galeri: [IMG.FALLBACK, IMG.MLINJO, IMG.TERONG],
    layanan: ["ambil", "cod"],
    estimasi: "Same day",
  }),

  DUNGKASI_KOPI: mkUmkm({
    id: "u-dungkasi-kopi",
    nama: "Kopi & Wedang Dungkasi",
    kategori: "minuman",
    waSeed: 11,
    dusunSlug: "dungkasi",
    tentang: "Wedang dan kopi untuk pesanan acara kecil.",
    jam_buka: "16.00–22.00",
    pembayaran: ["cash"],
    galeri: [IMG.FALLBACK, IMG.FALLBACK, IMG.FALLBACK],
    layanan: ["ambil"],
    estimasi: "Same day",
  }),

  KARANGWETAN_PANGKAS: mkUmkm({
    id: "u-karangwetan-pangkas",
    nama: "Pangkas Rambut Karangwetan",
    kategori: "jasa",
    waSeed: 12,
    dusunSlug: "karangwetan",
    tentang: "Cukur rambut pria, bisa booking.",
    jam_buka: "13.00–20.00",
    pembayaran: ["cash", "qris"],
    galeri: [IMG.FALLBACK, IMG.FALLBACK, IMG.FALLBACK],
    layanan: ["ambil"],
    estimasi: "Hari yang sama",
  }),

  JETIS_JAHIT: mkUmkm({
    id: "u-jetis-jahit",
    nama: "Jahit & Permak Jetis",
    kategori: "jasa",
    waSeed: 13,
    dusunSlug: "jetis",
    tentang: "Jahit, permak, ganti resleting. Bisa konsultasi via WA.",
    jam_buka: "09.00–17.00",
    pembayaran: ["cash", "transfer"],
    galeri: [IMG.FALLBACK, IMG.FALLBACK, IMG.FALLBACK],
    layanan: ["ambil"],
    estimasi: "2–3 hari",
  }),

  KALANGAN1_ES: mkUmkm({
    id: "u-kalangan1-es",
    nama: "Es & Minuman Kalangan 1",
    kategori: "minuman",
    waSeed: 14,
    dusunSlug: "kalangan-1",
    tentang: "Es teh, es jeruk, dan minuman acara.",
    jam_buka: "10.00–18.00",
    pembayaran: ["cash", "qris"],
    galeri: [IMG.FALLBACK, IMG.FALLBACK, IMG.KERIPIK_PISANG],
    layanan: ["antar", "cod"],
    estimasi: "Same day",
  }),

  MUNGGUR_KERIPIK: mkUmkm({
    id: "u-munggur-keripik",
    nama: "Keripik Munggur",
    kategori: "makanan",
    waSeed: 15,
    dusunSlug: "munggur",
    tentang: "Keripik aneka rasa, kemasan 100g–250g.",
    jam_buka: "08.00–17.00",
    pembayaran: ["cash", "transfer"],
    galeri: [IMG.TERONG, IMG.KERIPIK_PISANG, IMG.MLINJO],
    layanan: ["ambil", "antar"],
    estimasi: "1 hari",
  }),

  COYUDAN2_TANI: mkUmkm({
    id: "u-coyudan2-tani",
    nama: "Hasil Tani Coyudan 2",
    kategori: "makanan",
    waSeed: 16,
    dusunSlug: "coyudan-2",
    tentang: "Sayur segar dan hasil kebun (musiman).",
    jam_buka: "06.00–10.00",
    pembayaran: ["cash"],
    galeri: [IMG.FALLBACK, IMG.FALLBACK, IMG.FALLBACK],
    layanan: ["ambil"],
    estimasi: "Hari itu juga",
  }),
} as const satisfies Record<string, UmkmInfo>;

// helper buat produk cepat
const mkProduk = (p: {
  id: string;
  nama: string;
  harga: number;
  satuan?: string;
  foto: string;
  deskripsi?: string;
  umkm: UmkmInfo;
}): Produk => ({
  id: p.id,
  nama: p.nama,
  harga: p.harga,
  satuan: p.satuan,
  foto_url: p.foto,
  deskripsi: p.deskripsi,
  umkm: p.umkm,
});

export const PRODUK: Produk[] = [
  // core existing
  mkProduk({
    id: "p-terong",
    nama: "Keripik Terong",
    harga: 15000,
    satuan: "pack",
    foto: IMG.TERONG,
    deskripsi: "Keripik terong gurih dan renyah.",
    umkm: UMKM.NGIPAK_KERIPIK,
  }),
  mkProduk({
    id: "p-mlinjo",
    nama: "Keripik Mlinjo",
    harga: 20000,
    satuan: "pack",
    foto: IMG.MLINJO,
    deskripsi: "Keripik mlinjo (emping) gurih.",
    umkm: UMKM.NGIPAK_KERIPIK,
  }),
  mkProduk({
    id: "p-kacang-oven",
    nama: "Kacang Oven",
    harga: 12000,
    satuan: "pack",
    foto: IMG.KACANG_OVEN,
    deskripsi: "Kacang oven gurih, cocok untuk teman minum.",
    umkm: UMKM.DUNGKASI_KACANG,
  }),
  mkProduk({
    id: "p-keripik-pisang",
    nama: "Keripik Pisang",
    harga: 13000,
    satuan: "pack",
    foto: IMG.KERIPIK_PISANG,
    deskripsi: "Keripik pisang renyah untuk oleh-oleh.",
    umkm: UMKM.KALANGAN2_PISANG,
  }),
  mkProduk({
    id: "p-saron",
    nama: "Saron (Gamelan) Custom",
    harga: 0,
    satuan: "custom",
    foto: IMG.SARON,
    deskripsi: "Custom sesuai spesifikasi. Chat WA untuk konsultasi.",
    umkm: UMKM.KARANGWETAN_SARON,
  }),

  // ===== banyak produk tambahan =====
  mkProduk({ id: "p-ngipak-sambal-1", nama: "Sambal Bawang", harga: 15000, satuan: "botol", foto: IMG.FALLBACK, umkm: UMKM.NGIPAK_SAMBAL }),
  mkProduk({ id: "p-ngipak-sambal-2", nama: "Sambal Ijo", harga: 15000, satuan: "botol", foto: IMG.FALLBACK, umkm: UMKM.NGIPAK_SAMBAL }),
  mkProduk({ id: "p-ngipak-bumbu-1", nama: "Bumbu Pecel", harga: 12000, satuan: "pack", foto: IMG.FALLBACK, umkm: UMKM.NGIPAK_SAMBAL }),

  mkProduk({ id: "p-dungkasi-kacang-250", nama: "Kacang Oven 250g", harga: 22000, satuan: "pack", foto: IMG.KACANG_OVEN, umkm: UMKM.DUNGKASI_KACANG }),
  mkProduk({ id: "p-dungkasi-kacang-100", nama: "Kacang Oven 100g", harga: 12000, satuan: "pack", foto: IMG.KACANG_OVEN, umkm: UMKM.DUNGKASI_KACANG }),

  mkProduk({ id: "p-kalangan1-jajan-1", nama: "Klepon", harga: 10000, satuan: "box", foto: IMG.FALLBACK, umkm: UMKM.KALANGAN1_JAJAN }),
  mkProduk({ id: "p-kalangan1-jajan-2", nama: "Lemper", harga: 12000, satuan: "box", foto: IMG.FALLBACK, umkm: UMKM.KALANGAN1_JAJAN }),
  mkProduk({ id: "p-kalangan1-jajan-3", nama: "Getuk", harga: 10000, satuan: "box", foto: IMG.FALLBACK, umkm: UMKM.KALANGAN1_JAJAN }),

  mkProduk({ id: "p-jetis-minum-1", nama: "Es Teh Jumbo", harga: 8000, satuan: "gelas", foto: IMG.FALLBACK, umkm: UMKM.JETIS_MINUMAN }),
  mkProduk({ id: "p-jetis-minum-2", nama: "Es Jeruk", harga: 10000, satuan: "gelas", foto: IMG.FALLBACK, umkm: UMKM.JETIS_MINUMAN }),
  mkProduk({ id: "p-jetis-minum-3", nama: "Es Susu Coklat", harga: 12000, satuan: "gelas", foto: IMG.FALLBACK, umkm: UMKM.JETIS_MINUMAN }),

  mkProduk({ id: "p-munggur-catering-1", nama: "Nasi Box Ayam", harga: 18000, satuan: "box", foto: IMG.FALLBACK, umkm: UMKM.MUNGGUR_CATERING }),
  mkProduk({ id: "p-munggur-catering-2", nama: "Snack Box", harga: 15000, satuan: "box", foto: IMG.FALLBACK, umkm: UMKM.MUNGGUR_CATERING }),

  mkProduk({ id: "p-coyudan1-roti-1", nama: "Roti Manis", harga: 6000, satuan: "pcs", foto: IMG.FALLBACK, umkm: UMKM.COYUDAN1_BAKERY }),
  mkProduk({ id: "p-coyudan1-roti-2", nama: "Bolu Kukus", harga: 12000, satuan: "box", foto: IMG.FALLBACK, umkm: UMKM.COYUDAN1_BAKERY }),

  mkProduk({ id: "p-dungkasi-kopi-1", nama: "Wedang Jahe", harga: 7000, satuan: "gelas", foto: IMG.FALLBACK, umkm: UMKM.DUNGKASI_KOPI }),
  mkProduk({ id: "p-dungkasi-kopi-2", nama: "Kopi Tubruk", harga: 6000, satuan: "gelas", foto: IMG.FALLBACK, umkm: UMKM.DUNGKASI_KOPI }),

  mkProduk({ id: "p-kalangan1-es-1", nama: "Es Teh", harga: 5000, satuan: "gelas", foto: IMG.FALLBACK, umkm: UMKM.KALANGAN1_ES }),
  mkProduk({ id: "p-kalangan1-es-2", nama: "Es Jeruk", harga: 7000, satuan: "gelas", foto: IMG.FALLBACK, umkm: UMKM.KALANGAN1_ES }),

  mkProduk({ id: "p-munggur-keripik-1", nama: "Keripik Singkong", harga: 12000, satuan: "pack", foto: IMG.FALLBACK, umkm: UMKM.MUNGGUR_KERIPIK }),
  mkProduk({ id: "p-munggur-keripik-2", nama: "Keripik Tempe", harga: 14000, satuan: "pack", foto: IMG.FALLBACK, umkm: UMKM.MUNGGUR_KERIPIK }),
  mkProduk({ id: "p-munggur-keripik-3", nama: "Keripik Pisang", harga: 13000, satuan: "pack", foto: IMG.KERIPIK_PISANG, umkm: UMKM.MUNGGUR_KERIPIK }),
];

export const UMKM_LIST: UmkmInfo[] = Array.from(
  new Map(PRODUK.map((p) => [p.umkm.id, p.umkm])).values(),
);
