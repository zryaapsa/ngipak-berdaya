export default function StatTile({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-2xl font-bold">{value}</div>
          <div className="mt-1 text-xs text-white/75">{label}</div>
        </div>
        {icon ? (
          <div className="rounded-xl bg-white/10 p-2 text-white/90">{icon}</div>
        ) : null}
      </div>
    </div>
  );
}
