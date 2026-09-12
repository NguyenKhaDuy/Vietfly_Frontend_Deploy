import { SlidersHorizontal } from "lucide-react";

function TourToolbar({ currentCount, totalCount, sortType, onSortChange }) {
  return (
    <div
      className="
        mb-8
        flex
        flex-col
        gap-4
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <div className="text-sm text-slate-500">
        Hiển thị{" "}
        <span className="font-bold text-slate-900">{currentCount}</span> trong
        tổng số <span className="font-bold text-slate-900">{totalCount}</span>{" "}
        tour
      </div>

      <div className="flex items-center gap-3">
        <SlidersHorizontal size={18} className="text-cyan-600" />

        <select
          value={sortType}
          onChange={(e) => onSortChange(e.target.value)}
          className="
            min-w-[210px]
            cursor-pointer
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            px-4
            py-2.5
            text-sm
            font-medium
            text-slate-700
            outline-none
            transition
            hover:border-cyan-300
            focus:border-cyan-500
            focus:ring-4
            focus:ring-cyan-500/10
          "
        >
          <option value="default">Sắp xếp mặc định</option>

          <option value="price-asc">Giá thấp đến cao</option>

          <option value="price-desc">Giá cao đến thấp</option>
        </select>
      </div>
    </div>
  );
}

export default TourToolbar;
