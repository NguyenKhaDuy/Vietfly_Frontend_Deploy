export default function StatCard({
  title,
  value,
  icon,
  description,
  positive,
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            positive
              ? "bg-emerald-50 text-emerald-600"
              : "bg-cyan-50 text-cyan-600"
          }`}
        >
          {icon}
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-400">{description}</p>
    </div>
  );
}
