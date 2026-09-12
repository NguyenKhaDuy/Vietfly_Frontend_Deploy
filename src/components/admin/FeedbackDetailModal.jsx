import {
  X,
  MessageSquareText,
  Mail,
  Phone,
  UserRound,
  CalendarDays,
  Reply,
} from "lucide-react";

import FeedbackStatusBadge from "./FeedbackStatusBadge";

export default function FeedbackDetailModal({ feedback, onClose, onReply }) {
  const isReplied = feedback.feedbackStatus === "REPLIED";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* HEADER */}
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-cyan-500">
              <MessageSquareText size={21} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Chi tiết phản hồi
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                #{feedback.idFeedback}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={19} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="max-h-[70vh] space-y-5 overflow-y-auto px-6 py-6">
          {/* CUSTOMER */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold text-cyan-500">
                {feedback.fullname?.charAt(0)?.toUpperCase()}
              </div>

              <div>
                <p className="text-sm font-bold text-slate-800">
                  {feedback.fullname}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  User: {feedback.userName}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Mail size={16} className="text-slate-400" />
                {feedback.email}
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Phone size={16} className="text-slate-400" />
                {feedback.phone}
              </div>
            </div>
          </div>

          {/* META */}
          <div className="flex flex-wrap items-center gap-3">
            <FeedbackStatusBadge status={feedback.feedbackStatus} />

            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <CalendarDays size={14} />
              {feedback.createdAt}
            </span>
          </div>

          {/* FEEDBACK */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <UserRound size={16} className="text-slate-400" />

              <h3 className="text-sm font-bold text-slate-800">
                Nội dung phản hồi
              </h3>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600">
                {feedback.description}
              </p>
            </div>
          </div>

          {/* REPLY */}
          {feedback.reply && (
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Reply size={16} className="text-violet-500" />

                <h3 className="text-sm font-bold text-slate-800">
                  Phản hồi từ VietFly
                </h3>
              </div>

              <div className="rounded-xl border border-violet-100 bg-violet-50 p-4">
                <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600">
                  {feedback.reply}
                </p>

                {feedback.repliedAt && (
                  <p className="mt-3 text-xs text-slate-400">
                    Đã phản hồi: {feedback.repliedAt}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            Đóng
          </button>

          {/* CHỈ CHO REPLY KHI CHƯA REPLIED */}
          {!isReplied && (
            <button
              type="button"
              onClick={onReply}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-cyan-500 px-5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-cyan-700"
            >
              <Reply size={17} />
              Trả lời feedback
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
