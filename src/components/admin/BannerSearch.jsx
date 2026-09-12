import { Search } from "lucide-react";

export default function BannerSearch({
  search,
  setSearch,
  resultCount,
  totalCount,
}) {
  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm banner..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        <div className="text-sm text-slate-500">
          Hiển thị{" "}
          <span className="font-semibold text-slate-800">{resultCount}</span> /{" "}
          {totalCount} banner
        </div>
      </div>
    </div>
  );
}
