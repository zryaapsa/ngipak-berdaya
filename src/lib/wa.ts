export function toWaLink(no: string, message?: string) {
  const cleaned = no.replace(/[^\d]/g, "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${cleaned}${text}`;
}
