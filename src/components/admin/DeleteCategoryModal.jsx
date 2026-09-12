import { useState } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

import api from "../../api/api";

export default function DeleteCategoryModal({
  category,
  onClose,
  onSuccess,
  onError,
}) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!category?.idCategory || deleting) {
      return;
    }

    try {
      setDeleting(true);

      const response = await api.delete(
        `/api/admin/category/id=${category.idCategory}`,
      );

      onSuccess?.();
    } catch (err) {

      const data = err?.response?.data;

      let message = "Không thể xóa danh mục.";

      if (typeof data === "string") {
        message = data;
      } else if (data?.message) {
        message = data.message;
      } else if (data?.error) {
        message = data.error;
      } else if (err?.message) {
        message = err.message;
      }

      onError?.(message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !deleting) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* HEADER */}

        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <Trash2 size={21} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">Xóa danh mục</h2>

              <p className="mt-1 text-sm text-slate-500">
                Xác nhận xóa danh mục
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={19} />
          </button>
        </div>

        {/* CONTENT */}

        <div className="px-6 py-6">
          <div className="rounded-xl border border-red-100 bg-red-50 p-4">
            <div className="flex gap-3">
              <AlertTriangle
                size={20}
                className="mt-0.5 shrink-0 text-red-500"
              />

              <div>
                <p className="text-sm font-semibold text-red-700">
                  Bạn có chắc muốn xóa danh mục này?
                </p>

                <p className="mt-1 text-sm leading-6 text-red-600">
                  Thao tác này có thể làm mất dữ liệu liên quan đến danh mục.
                </p>
              </div>
            </div>
          </div>

          {/* CATEGORY INFO */}

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-400">Tên danh mục</p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {category?.nameCategory || "-"}
            </p>

            <p className="mt-3 text-xs font-medium text-slate-400">
              Mã danh mục
            </p>

            <p className="mt-1 break-all text-xs text-slate-500">
              {category?.idCategory || "-"}
            </p>
          </div>
        </div>

        {/* FOOTER */}

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Hủy
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-red-500 px-5 text-sm font-semibold text-white shadow-md shadow-red-500/20 transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Đang xóa...
              </>
            ) : (
              <>
                <Trash2 size={17} />
                Xóa danh mục
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
