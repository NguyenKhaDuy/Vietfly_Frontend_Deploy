import { Search, SlidersHorizontal, X } from "lucide-react";

export default function TourFilter({
  search,
  setSearch,
  status,
  setStatus,
  categoryId,
  categories,
  loadingCategories,
  onCategoryChange,
  onSearch,
  onClearSearch,
  loading,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tìm theo tên tour, mã tour, điểm đến..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-11 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />

          {search && (
            <button
              type="button"
              onClick={onClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
            >
              <X size={17} />
            </button>
          )}
        </div>

        <select
          value={categoryId}
          onChange={(e) => onCategoryChange(e.target.value)}
          disabled={loadingCategories}
          className="h-11 min-w-[190px] rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-600 outline-none transition focus:border-cyan-500 focus:bg-white"
        >
          <option value="ALL">
            {loadingCategories ? "Đang tải danh mục..." : "Tất cả danh mục"}
          </option>

          {categories.map((category) => (
            <option key={category.idCategory} value={category.idCategory}>
              {category.nameCategory}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-11 min-w-[180px] rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-600 outline-none focus:border-cyan-500"
        >
          <option value="ALL">Tất cả trạng thái</option>
          <option value="ACTIVE">Đang hoạt động</option>
          <option value="HIDE">Đã ẩn</option>
        </select>

        <button
          type="button"
          onClick={onSearch}
          disabled={loading}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Search size={17} />
          {loading ? "Đang tìm..." : "Tìm kiếm"}
        </button>

        <button
          type="button"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          <SlidersHorizontal size={17} />
          Bộ lọc
        </button>
      </div>
    </div>
  );
}
