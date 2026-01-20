import { useEffect, useMemo, useState } from "react";

export default function Carousel({
  images,
  alt,
  className = "",
}: {
  images: string[];
  alt?: string;
  className?: string;
}) {
  const imgs = useMemo(() => images.filter(Boolean).slice(0, 3), [images]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (idx > imgs.length - 1) setIdx(0);
  }, [imgs.length, idx]);

  if (!imgs.length) {
    return <div className={`h-full w-full bg-gray-100 ${className}`} />;
  }

  const prev = () => setIdx((v) => (v - 1 + imgs.length) % imgs.length);
  const next = () => setIdx((v) => (v + 1) % imgs.length);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={imgs[idx]}
        alt={alt ?? "gambar"}
        className="h-full w-full object-cover"
        loading="lazy"
      />

      {imgs.length > 1 ? (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-gray-900 shadow-soft ring-1 ring-black/5 hover:bg-white"
            aria-label="Sebelumnya"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-gray-900 shadow-soft ring-1 ring-black/5 hover:bg-white"
            aria-label="Berikutnya"
          >
            ›
          </button>

          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
            {imgs.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                className={`h-2 w-2 rounded-full ring-1 ring-black/10 ${
                  i === idx ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
