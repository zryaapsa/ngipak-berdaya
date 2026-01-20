// File: src/lib/status.ts

function parseTime(timeStr: string): Date | null {
  try {
    const today = new Date();
    // Ganti titik dengan titik dua (08.00 -> 08:00) agar standar ISO
    const [hours, minutes] = timeStr.replace(".", ":").split(":").map(Number);
    
    if (isNaN(hours) || isNaN(minutes)) return null;

    const date = new Date(today);
    date.setHours(hours, minutes, 0, 0);
    return date;
  } catch (e) {
    return null;
  }
}

export function getShopStatus(range?: string): { 
  isOpen: boolean; 
  label: string; 
  color: "green" | "red" | "gray" 
} {
  if (!range) {
    return { isOpen: false, label: "Info jam (-)", color: "gray" };
  }

  // Pisahkan string berdasarkan "–" (en dash) atau "-" (hyphen)
  const parts = range.split(/–|-/); 
  if (parts.length !== 2) {
    // Fallback jika format tidak standar, anggap info biasa
    return { isOpen: true, label: range, color: "gray" }; 
  }

  const start = parseTime(parts[0].trim());
  const end = parseTime(parts[1].trim());
  const now = new Date();

  if (!start || !end) {
    return { isOpen: false, label: "Jam tidak valid", color: "gray" };
  }

  // Logika sederhana: Buka jika Sekarang >= Buka DAN Sekarang < Tutup
  if (now >= start && now < end) {
    return { isOpen: true, label: "Sedang Buka", color: "green" };
  }

  return { isOpen: false, label: "Tutup", color: "red" };
}