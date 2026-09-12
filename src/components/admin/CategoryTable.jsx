import { ChevronLeft, ChevronRight, FolderTree } from "lucide-react";

import CategoryRow from "./CategoryRow";

export default function CategoryTable({
  categories,
  loading,
  onDetail,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
                   <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="w-[90px] px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                STT
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Danh mục
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Ngày tạo
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Cập nhật gần nhất
              </th>

              <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                Trạng thái
              </th>

              <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {/* LOADING */}

            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-14 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-500" />

                    <span className="text-sm text-slate-400">
                      Đang tải danh sách danh mục...
                    </span>
                  </div>
                </td>
              </tr>
            ) : categories.length > 0 ? (
              /* CATEGORY LIST */

              categories.map((category, index) => (
                <CategoryRow
                  key={category.idCategory}
                  category={category}
                  index={index}
                  onDetail={onDetail}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            ) : (
              /* EMPTY */

              <tr>
                <td colSpan={6} className="px-6 py-14 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                      <FolderTree size={24} />
                    </div>

                    <p className="text-sm font-semibold text-slate-600">
                      Không có danh mục
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Hiện tại chưa có danh mục nào.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* <div className="flex items-center justify-end border-t border-slate-100 px-6 py-4">
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-300"
          >
            <ChevronLeft size={17} />
          </button>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500 text-sm font-semibold text-white shadow-md shadow-blue-600/20"
          >
            1
          </button>

          <button
            type="button"
            disabled
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-300"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div> */}
    </div>
  );
}
