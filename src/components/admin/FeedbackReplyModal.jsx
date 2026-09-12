import { useState } from "react";
import { X, Send, MessageCircleReply, UserRound, Loader2 } from "lucide-react";

export default function FeedbackReplyModal({
  feedback,
  onClose,
  onReply,
  submitting = false,
}) {
  const [reply, setReply] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!reply.trim() || submitting) {
      return;
    }

    onReply(reply.trim());
  };

  const handleClose = () => {
    // Không cho đóng modal khi đang gửi
    if (submitting) {
      return;
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
      
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <MessageCircleReply size={21} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Trả lời feedback
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Phản hồi khách hàng một cách chuyên nghiệp
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={submitting}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-6 py-6">
                        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-cyan-500">
                {feedback.fullname?.charAt(0)?.toUpperCase()}
              </div>

              <div>
                <p className="text-sm font-bold text-slate-800">
                  {feedback.fullname}
                </p>

                <p className="mt-1 text-xs text-slate-400">{feedback.email}</p>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <UserRound size={16} className="text-slate-400" />

                <label className="text-sm font-bold text-slate-700">
                  Feedback của khách hàng
                </label>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm leading-6 text-slate-600">
                  {feedback.description}
                </p>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Nội dung phản hồi
                <span className="ml-1 text-red-500">*</span>
              </label>

              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                disabled={submitting}
                rows={6}
                placeholder="Nhập nội dung phản hồi cho khách hàng..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-70"
              />

              <p className="mt-2 text-right text-xs text-slate-400">
                {reply.length} ký tự
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
            {/* HỦY */}

            <button
              type="button"
              onClick={handleClose}
              disabled={submitting}
              className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Hủy
            </button>

            {/* GỬI */}

            <button
              type="submit"
              disabled={!reply.trim() || submitting}
              className="inline-flex h-10 min-w-[145px] items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white shadow-md shadow-violet-600/20 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Đang gửi...
                </>
              ) : (
                <>
                  <Send size={17} />
                  Gửi phản hồi
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
