import type { HTMLAttributes } from "react";

export default function Badge({
  className = "",
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-800 ${className}`}
      {...props}
    />
  );
}
