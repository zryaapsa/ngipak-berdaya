import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-6">
        <Outlet />
      </main>
       <Footer />
    </div>
  );
}
