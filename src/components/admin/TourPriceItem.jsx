import {
  CalendarDays,
  Check,
  LoaderCircle,
  Pencil,
  Save,
  Tag,
  Trash2,
  X,
} from "lucide-react";

export default function TourPriceItem({
  item,
  index,
  type,
  isEditing,
  editName,
  editDescription,
  onEditNameChange,
  onEditDescriptionChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  saving,
  deleting,
}) {
  const isIncluded = type === "INCLUDED";

  const color = isIncluded
    ? {
        border: "border-emerald-300",
        ring: "focus:ring-emerald-100",
        button: "bg-emerald-500 hover:bg-emerald-600",
        icon: "text-emerald-500",
        badge: "bg-emerald-50 text-emerald-600",
      }
    : {
        border: "border-red-300",
        ring: "focus:ring-red-100",
        button: "bg-red-500 hover:bg-red-600",
        icon: "text-red-500",
        badge: "bg-red-50 text-red-600",
      };

  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      {isEditing ? (
        <div className="space-y-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-500">
              Tên dịch vụ
            </label>

            <input
              autoFocus
              value={editName}
              onChange={(e) => onEditNameChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape" && !saving) {
                  onCancelEdit();
                }

                if (e.key === "Enter" && !e.shiftKey && !saving) {
                  e.preventDefault();
                  onSaveEdit(index);
                }
              }}
              disabled={saving}
              placeholder="Tên dịch vụ..."
              className={`w-full rounded-lg border ${color.border} bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 ${color.ring} disabled:cursor-not-allowed disabled:bg-slate-100`}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-500">
              Mô tả
            </label>

            <textarea
              value={editDescription}
              onChange={(e) => onEditDescriptionChange(e.target.value)}
              disabled={saving}
              rows={3}
              placeholder="Mô tả dịch vụ..."
              className={`w-full resize-none rounded-lg border ${color.border} bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 ${color.ring} disabled:cursor-not-allowed disabled:bg-slate-100`}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancelEdit}
              disabled={saving}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X size={14} />
              Hủy
            </button>

            <button
              type="button"
              onClick={() => onSaveEdit(index)}
              disabled={saving}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-white transition ${color.button} disabled:cursor-not-allowed disabled:opacity-60`}
            >
              {saving ? (
                <>
                  <LoaderCircle size={14} className="animate-spin" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save size={14} />
                  Lưu
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              {isIncluded ? (
                <Check size={17} className={`mt-0.5 shrink-0 ${color.icon}`} />
              ) : (
                <X size={17} className={`mt-0.5 shrink-0 ${color.icon}`} />
              )}

              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-700">
                  {item.nameService || "--"}
                </p>

                {item.description && (
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {item.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() => onStartEdit(index)}
                disabled={deleting}
                title="Chỉnh sửa"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 transition hover:bg-cyan-50 hover:text-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Pencil size={15} />
              </button>

              <button
                type="button"
                onClick={() => onDelete(index)}
                disabled={deleting}
                title="Xóa"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleting ? (
                  <LoaderCircle size={15} className="animate-spin" />
                ) : (
                  <Trash2 size={15} />
                )}
              </button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-3">
            <span
              className={`flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium ${color.badge}`}
            >
              <Tag size={11} />

              {item.typeTourPrice || type}
            </span>

            <span className="flex items-center gap-1 text-[10px] text-slate-400">
              <CalendarDays size={11} />
              Tạo: {item.createdAt || "--"}
            </span>

            {item.updatedAt && (
              <span className="flex items-center gap-1 text-[10px] text-slate-400">
                <CalendarDays size={11} />
                Cập nhật: {item.updatedAt}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
