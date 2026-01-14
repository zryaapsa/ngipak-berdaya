import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = "", ...props }: Props) {
  return (
    <input
      {...props}
      className={[
        "w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none transition",
        "focus:border-brand-300 focus:ring-2 focus:ring-brand-100",
        className,
      ].join(" ")}
    />
  );
}
