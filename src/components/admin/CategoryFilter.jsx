import { Search, X } from "lucide-react";

export default function CategoryFilter({
  search,
  setSearch,
  resultCount,
  totalCount,
}) {
  return (
    <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* SEARCH */}
        <div className="relative w-full lg:max-w-md">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm danh mục..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
            >
              <X size={17} />
            </button>
          )}
        </div>

        {/* RESULT */}
        <div className="text-sm text-slate-500">
          Hiển thị{" "}
          <span className="font-semibold text-slate-700">{resultCount}</span> /{" "}
          {totalCount} danh mục
        </div>
      </div>
    </div>
  );
}
