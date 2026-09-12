/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

import { X, FolderTree, Save, CalendarDays, Clock3 } from "lucide-react";

export default function CategoryModal({ mode, category, onClose, onSave }) {
  const isAdd = mode === "add";
  const isEdit = mode === "edit";
  const isDetail = mode === "detail";

  const [nameCategory, setNameCategory] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isAdd) {
      setNameCategory("");
      return;
    }

    setNameCategory(category?.nameCategory || "");
  }, [category, mode, isAdd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isDetail || saving) {
      return;
    }

    const name = nameCategory.trim();

    if (!name) {
      return;
    }

    try {
      setSaving(true);

      await onSave({
        nameCategory: name,
      });
    } finally {
      setSaving(false);
    }
  };

  const title = isAdd
    ? "Thêm danh mục"
    : isEdit
      ? "Chỉnh sửa danh mục"
      : "Chi tiết danh mục";

  const description = isAdd
    ? "Tạo một danh mục tour mới"
    : isEdit
      ? "Cập nhật thông tin danh mục"
      : "Thông tin chi tiết của danh mục";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !saving) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-cyan-500">
              <FolderTree size={21} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">{title}</h2>

              <p className="mt-1 text-sm text-slate-500">{description}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-6 py-6">
            {!isAdd && (
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Mã danh mục
                </label>

                <div className="flex min-h-11 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-500">
                  {category?.idCategory || "-"}
                </div>
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Tên danh mục
                {!isDetail && <span className="ml-1 text-red-500">*</span>}
              </label>

              <div className="relative">
                <FolderTree
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={nameCategory}
                  onChange={(e) => {
                    setNameCategory(e.target.value);
                  }}
                  disabled={isDetail || saving}
                  autoFocus={isEdit || isAdd}
                  placeholder="Nhập tên danh mục..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>
            </div>

            {!isAdd && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                    <CalendarDays size={15} />
                    Ngày tạo
                  </div>

                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    {category?.createdAt || "-"}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                    <Clock3 size={15} />
                    Cập nhật
                  </div>

                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    {category?.updatedAt || "-"}
                  </p>
                </div>
              </div>
            )}

            {!isAdd && (
              <div className="flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Trạng thái
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Danh mục hiện đang được sử dụng
                  </p>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Hoạt động
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Đóng
            </button>

            {!isDetail && (
              <button
                type="submit"
                disabled={saving || !nameCategory.trim()}
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-cyan-500 px-5 text-sm font-semibold text-white shadow-md shadow-cyan-500/20 transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <Save size={17} />
                    {isAdd ? "Thêm danh mục" : "Lưu thay đổi"}
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
