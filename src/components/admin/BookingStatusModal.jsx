import { X, CheckCircle2, Clock3 } from "lucide-react";

const STATUS_CONFIG = {
  PENDING: {
    label: "Chờ xác nhận",
    description: "Booking đang chờ xử lý.",
    icon: Clock3,
    className: "border-amber-200 bg-amber-50 text-amber-700",
  },
  CONFIRMED: {
    label: "Đã xác nhận",
    description: "Booking đã được xác nhận.",
    icon: CheckCircle2,
    className: "border-blue-200 bg-blue-50 text-blue-700",
  },
};

export default function BookingStatusModal({
  booking,
  statuses = [],
  onClose,
  onUpdate,
}) {
  // Chỉ lấy PENDING và CONFIRMED
  const statusOptions = statuses
    .filter((status) => status === "PENDING" || status === "CONFIRMED")
    .map((status) => ({
      value: status,
      ...STATUS_CONFIG[status],
    }));

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Cập nhật trạng thái
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Booking #{booking.idBooking}
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={19} />
          </button>
        </div>

        {/* OPTIONS */}
        <div className="space-y-3 p-6">
          {statusOptions.map((status) => {
            const Icon = status.icon;

            const active = booking.statusTour === status.value;

            return (
              <button
                key={status.value}
                type="button"
                onClick={() => onUpdate(status.value)}
                className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                  active
                    ? status.className
                    : "border-slate-200 hover:border-blue-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Icon size={19} />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-bold">{status.label}</p>

                  <p className="mt-0.5 text-xs opacity-70">
                    {status.description}
                  </p>
                </div>

                {active && <span className="text-xs font-bold">Hiện tại</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
