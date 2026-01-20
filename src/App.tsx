import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProdukPage from "./pages/ProdukPage";
import ProdukDetailPage from "./pages/ProdukDetailPage";
import KesehatanPage from "./pages/KesehatanPage";
import TentangPage from "./pages/TentangPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/produk" replace />} />

        <Route path="/produk" element={<ProdukPage />} />

        {/* FINAL FLOW: detail UMKM */}
        <Route path="/umkm/:id" element={<ProdukDetailPage />} />

        {/* legacy: dulu product detail, sekarang diarahkan balik */}
        <Route path="/produk/:id" element={<Navigate to="/produk" replace />} />

        <Route path="/kesehatan" element={<KesehatanPage />} />
        <Route path="/tentang" element={<TentangPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
