// File: src/pages/TentangPage.tsx
import BackButton from "../components/ui/BackButton";
import Card from "../components/ui/Card";

export default function TentangPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <BackButton to="/produk" label="Kembali" />
        <h1 className="text-2xl font-bold text-gray-900">Tentang Ngipak Berdaya</h1>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-brand-900">Apa itu Ngipak Berdaya?</h2>
        <p className="mt-2 text-gray-700 leading-relaxed">
          Ngipak Berdaya adalah platform informasi digital yang dikembangkan untuk mendukung potensi 
          Desa Ngipak, khususnya dalam promosi <strong>UMKM Lokal</strong> dan penyebaran 
          <strong>Informasi Kesehatan</strong>.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          Dikembangkan oleh Tim KKN-T 35 Universitas Duta Bangsa Surakarta (Periode 2025/2026) 
          sebagai bentuk pengabdian masyarakat.
        </p>
      </Card>

      <Card className="p-6 border-l-4 border-l-green-500">
        <h2 className="text-lg font-semibold text-gray-900">Panduan Pendaftaran UMKM Baru</h2>
        <p className="mt-2 text-sm text-gray-600">
          Bagi warga Desa Ngipak yang memiliki usaha dan ingin produknya ditampilkan di website ini, 
          silakan ikuti langkah berikut:
        </p>
        <ul className="mt-4 space-y-3">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">1</span>
            <span className="text-gray-700">Siapkan foto produk yang jelas dan deskripsi singkat usaha Anda.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">2</span>
            <span className="text-gray-700">Catat Nomor WhatsApp aktif yang bisa dihubungi pembeli.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">3</span>
            <div className="text-gray-700">
              Hubungi Admin Desa / Perangkat Desa bidang Informasi:
              <div className="mt-2 font-semibold text-green-700">Pak Admin (0812-XXXX-XXXX)</div>
            </div>
          </li>
        </ul>
      </Card>
    </div>
  );
}