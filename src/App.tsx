import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ProdukPage from "./pages/ProdukPage";
import ProdukDetailPage from "./pages/ProdukDetailPage";
import KesehatanPage from "./pages/KesehatanPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/produk" replace />} />
        <Route path="/produk" element={<ProdukPage />} />
        <Route path="/produk/:id" element={<ProdukDetailPage />} />
        <Route path="/kesehatan" element={<KesehatanPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
