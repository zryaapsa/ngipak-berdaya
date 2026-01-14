import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold">404</h1>
      <p className="mt-2 text-gray-600">Halaman tidak ditemukan.</p>
      <Link className="mt-4 inline-block underline" to="/produk">
        Ke Produk
      </Link>
    </div>
  );
}
