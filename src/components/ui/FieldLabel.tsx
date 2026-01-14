import type { ReactNode } from "react";

type Props = {
  icon?: ReactNode;
  children: ReactNode;
};

export default function FieldLabel({ icon, children }: Props) {
  return (
    <div className="flex h-5 items-center gap-2 text-xs font-semibold text-gray-700">
      {icon ? <span className="text-gray-400">{icon}</span> : null}
      {children}
    </div>
  );
}
