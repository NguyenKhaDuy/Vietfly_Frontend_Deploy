import { Eye, Pencil, Trash2, FolderTree } from "lucide-react";

export default function CategoryRow({
  category,
  index,
  onDetail,
  onEdit,
  onDelete,
}) {
  return (
    <tr className="group transition hover:bg-slate-50/80">
           <td className="px-6 py-5 text-center">
        <span className="text-sm font-semibold text-slate-400">
          {String(index + 1).padStart(2, "0")}
        </span>
      </td>
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-cyan-500">
            <FolderTree size={20} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">
              {category.nameCategory}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              ID: {category.idCategory}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-5">
        <span className="whitespace-nowrap text-sm text-slate-600">
          {category.createdAt || "-"}
        </span>
      </td>
      <td className="px-6 py-5">
        <span className="whitespace-nowrap text-sm text-slate-600">
          {category.updatedAt || "-"}
        </span>
      </td>
      <td className="px-6 py-5 text-center">
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Đang hoạt động
        </span>
      </td>

      <td className="px-6 py-5">
        <div className="flex items-center justify-end gap-2">
          {/* XEM CHI TIẾT */}

          <button
            type="button"
            onClick={() => onDetail(category)}
            title="Xem chi tiết"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-500"
          >
            <Eye size={17} />
          </button>

          {/* CHỈNH SỬA */}

          <button
            type="button"
            onClick={() => onEdit(category)}
            title="Chỉnh sửa"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600"
          >
            <Pencil size={17} />
          </button>

          {/* XÓA */}

          <button
            type="button"
            onClick={() => onDelete(category)}
            title="Xóa"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </td>
    </tr>
  );
}
