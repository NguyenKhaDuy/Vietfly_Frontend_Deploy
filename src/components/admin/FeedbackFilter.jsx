import { Search, X, SlidersHorizontal } from "lucide-react";

export default function FeedbackFilter({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  resultCount,
  totalCount,
}) {
  return (
    <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        {/* LEFT */}
        <div className="flex flex-1 flex-col gap-3 md:flex-row">
          {/* SEARCH */}
          <div className="relative w-full md:max-w-md">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tên, email, SĐT hoặc nội dung..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={17} />
              </button>
            )}
          </div>

          {/* STATUS */}
          <div className="relative">
            <SlidersHorizontal
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-11 w-full min-w-[190px] appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-9 text-sm font-medium text-slate-700 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            >
              <option value="ALL">Tất cả trạng thái</option>
              <option value="PENDING">Chờ xử lý</option>
              <option value="PROCESSING">Đang xử lý</option>
              <option value="REPLIED">Đã phản hồi</option>
              <option value="RESOLVED">Đã xử lý</option>
            </select>
          </div>
        </div>

        {/* RESULT */}
        <div className="text-sm text-slate-500">
          Hiển thị{" "}
          <span className="font-semibold text-slate-700">{resultCount}</span> /{" "}
          {totalCount} phản hồi
        </div>
      </div>
    </div>
  );
}
