import { Map, CheckCircle2, EyeOff } from "lucide-react";

export default function TourStats({ stats }) {
  const items = [
    {
      label: "Tổng số tour",
      value: stats.total,
      icon: Map,
      iconClass: "bg-blue-50 text-cyan-500",
    },
    {
      label: "Đang hoạt động",
      value: stats.active,
      icon: CheckCircle2,
      iconClass: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Đã ẩn",
      value: stats.hide,
      icon: EyeOff,
      iconClass: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {item.label}
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {item.value}
                </p>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.iconClass}`}
              >
                <Icon size={22} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
