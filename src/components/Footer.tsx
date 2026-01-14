export default function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-col gap-2 text-sm text-gray-600 md:flex-row md:items-center md:justify-between">
          <div>
            Copyright © 2026 Desa Ngipak. All rights reserved.
          </div>

          <div className="text-gray-500">
            Made by <span className="font-medium text-gray-700">Kelompok KKN-T 35</span>{" "}
            Universitas Duta Bangsa Surakarta.
          </div>
        </div>
      </div>
    </footer>
  );
}
