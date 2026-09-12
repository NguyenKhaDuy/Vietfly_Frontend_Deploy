const variants = {
  default: {
    icon: "bg-blue-50 text-cyan-500",
  },
  warning: {
    icon: "bg-amber-50 text-amber-600",
  },
  success: {
    icon: "bg-emerald-50 text-emerald-600",
  },
  danger: {
    icon: "bg-red-50 text-red-600",
  },
};

export default function BookingStatCard({
  icon,
  title,
  value,
  description,
  variant = "default",
}) {
  const style = variants[variant];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>

          <p className="mt-1 text-xs text-slate-400">{description}</p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${style.icon}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
