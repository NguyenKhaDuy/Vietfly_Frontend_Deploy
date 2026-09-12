const STATUS_CONFIG = {
  PENDING: {
    label: "Chờ xác nhận",
    className: "bg-amber-50 text-amber-700 ring-amber-600/10",
    dot: "bg-amber-500",
  },

  CONFIRMED: {
    label: "Đã xác nhận",
    className: "bg-blue-50 text-blue-700 ring-blue-600/10",
    dot: "bg-blue-500",
  },
};

export default function BookingStatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;

  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold ring-1 ring-inset ${config.className}`}
    >
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${config.dot}`} />

      {config.label}
    </span>
  );
}
