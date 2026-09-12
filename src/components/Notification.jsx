import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

const notificationConfig = {
  success: {
    icon: CheckCircle,
    iconClass: "text-green-500",
    progressClass: "bg-green-500",
  },

  error: {
    icon: XCircle,
    iconClass: "text-red-500",
    progressClass: "bg-red-500",
  },

  warning: {
    icon: AlertTriangle,
    iconClass: "text-yellow-500",
    progressClass: "bg-yellow-500",
  },

  info: {
    icon: Info,
    iconClass: "text-blue-500",
    progressClass: "bg-blue-500",
  },
};

export default function Notification({
  type = "info",
  title,
  message,
  onClose,
}) {
  const config = notificationConfig[type] || notificationConfig.info;

  const Icon = config.icon;

  return (
    <div className="animate-notification-in relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
      <div className="flex items-start gap-3">
        <div className="shrink-0 pt-0.5">
          <Icon size={23} strokeWidth={2.2} className={config.iconClass} />
        </div>
        <div className="min-w-0 flex-1">
          {title && (
            <h4 className="text-sm font-semibold text-slate-800">{title}</h4>
          )}

          {message && (
            <p className="mt-1 text-sm leading-5 text-slate-500">{message}</p>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        >
          <X size={17} />
        </button>
      </div>
      <div
        className={`absolute bottom-0 left-0 h-[3px] w-full ${config.progressClass} animate-notification-progress`}
      />
    </div>
  );
}
