import { Search, Filter } from "lucide-react";

export default function BookingFilter({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  resultCount,
  totalCount,
  onSearch,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col gap-3 md:flex-row">
          {/* SEARCH */}
          <div className="relative w-full md:w-[380px]">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tìm mã booking, khách hàng, điểm đến..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          {/* STATUS */}
          <div className="relative">
            <Filter
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            >
              <option value="ALL">Tất cả trạng thái</option>
              <option value="PENDING">Chờ xác nhận</option>
              <option value="CONFIRMED">Đã xác nhận</option>
            </select>
          </div>

          {/* SEARCH BUTTON */}
          <button
            type="button"
            onClick={onSearch}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600 active:scale-[0.98]"
          >
            <Search size={17} />
            Tìm kiếm
          </button>
        </div>

        <div className="text-sm text-slate-500">
          Hiển thị{" "}
          <span className="font-semibold text-slate-800">{resultCount}</span> /{" "}
          {totalCount} booking
        </div>
      </div>
    </div>
  );
}
