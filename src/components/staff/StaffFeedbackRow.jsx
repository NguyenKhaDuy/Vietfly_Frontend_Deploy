import {
  Eye,
  MessageCircleReply,
  CheckCircle2,
  Trash2,
  Mail,
  Phone,
} from "lucide-react";

import FeedbackStatusBadge from "../admin/FeedbackStatusBadge";

export default function FeedbackRow({
  feedback,
  index,
  onDetail,
  onReply,
  onResolve,
  onDelete,
}) {
  const isResolved = feedback.feedbackStatus === "RESOLVED";
  const isReplied = feedback.feedbackStatus === "REPLIED";

  return (
    <tr className="group transition hover:bg-slate-50/80">
      {/* STT */}
      <td className="px-5 py-5 text-center">
        <span className="text-sm font-semibold text-slate-400">
          {String(index + 1).padStart(2, "0")}
        </span>
      </td>

      {/* CUSTOMER */}
      <td className="px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-cyan-500">
            {feedback.fullname?.charAt(0)?.toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">
              {feedback.fullname}
            </p>

            <div className="mt-1 flex items-center gap-3">
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Mail size={12} />
                {feedback.email}
              </span>
            </div>

            <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
              <Phone size={12} />
              {feedback.phone}
            </div>
          </div>
        </div>
      </td>

      {/* TIME */}
      <td className="px-5 py-5">
        <div>
          <p className="text-sm font-medium text-slate-600">
            {feedback.createdAt?.split(" ")[0]}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {feedback.createdAt?.split(" ")[1]}
          </p>
        </div>
      </td>

      {/* STATUS */}
      <td className="px-5 py-5 text-center">
        <FeedbackStatusBadge status={feedback.feedbackStatus} />
      </td>

      {/* ACTIONS */}
      <td className="px-5 py-5">
        <div className="flex items-center justify-end gap-2">
          {/* DETAIL */}
          <button
            type="button"
            onClick={() => onDetail(feedback)}
            title="Xem chi tiết"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-blue-200 hover:bg-cyan-50 hover:text-cyan-500"
          >
            <Eye size={17} />
          </button>

          {/* REPLY */}
          {!isReplied && (
            <button
              type="button"
              onClick={() => onReply(feedback)}
              title="Trả lời feedback"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
            >
              <MessageCircleReply size={17} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
