const STATUS_CONFIG = {
  PENDING: {
    label: "Chờ xử lý",
    className: "bg-amber-50 text-amber-600",
    dot: "bg-amber-500",
  },

  PROCESSING: {
    label: "Đang xử lý",
    className: "bg-blue-50 text-cyan-500",
    dot: "bg-blue-500",
  },

  REPLIED: {
    label: "Đã phản hồi",
    className: "bg-violet-50 text-violet-600",
    dot: "bg-violet-500",
  },

  RESOLVED: {
    label: "Đã xử lý",
    className: "bg-emerald-50 text-emerald-600",
    dot: "bg-emerald-500",
  },
};

export default function FeedbackStatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${config.className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />

      {config.label}
    </span>
  );
}
