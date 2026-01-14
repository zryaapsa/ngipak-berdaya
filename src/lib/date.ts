export function formatTanggalID(isoDate: string) {
  const [y, m, d] = isoDate.split("-").map((x) => Number(x));
  const dt = new Date(y, m - 1, d);
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(dt);
}
