import { ChevronLeft, ChevronRight } from "lucide-react";

import StaffFeedbackRow from "./StaffFeedbackRow";

export default function FeedbackTable({
  feedbacks,
  currentPage,
  totalPages,
  onPageChange,
  onPreviousPage,
  onNextPage,
  onDetail,
  onReply,
  onResolve,
  onDelete,
}) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="w-[80px] px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                STT
              </th>

              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Khách hàng
              </th>

              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Thời gian
              </th>

              <th className="w-[180px] px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                Trạng thái
              </th>

              <th className="w-[230px] px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {feedbacks.length > 0 ? (
              feedbacks.map((feedback, index) => (
                <StaffFeedbackRow
                  key={feedback.idFeedback}
                  feedback={feedback}
                  index={index}
                  onDetail={onDetail}
                  onReply={onReply}
                  onResolve={onResolve}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center">
                  <span className="text-sm text-slate-400">
                    Không có feedback phù hợp trên trang này.
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 border-t border-slate-100 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-400">
          Trang{" "}
          <span className="font-semibold text-slate-600">{currentPage}</span> /{" "}
          <span className="font-semibold text-slate-600">
            {totalPages || 1}
          </span>
        </p>

        <div className="flex items-center justify-center gap-1">
          <button
            type="button"
            onClick={onPreviousPage}
            disabled={currentPage <= 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300"
          >
            <ChevronLeft size={17} />
          </button>

          {pages.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-semibold transition ${
                page === currentPage
                  ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                  : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={onNextPage}
            disabled={currentPage >= totalPages || totalPages <= 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
