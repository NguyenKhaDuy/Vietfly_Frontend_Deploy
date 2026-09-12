import { Trash2 } from "lucide-react";

export default function DeleteModal({ user, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
          <Trash2 size={22} />
        </div>

        <h2 className="mt-5 text-lg font-bold text-slate-900">
          Xóa người dùng?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Bạn có chắc muốn xóa tài khoản{" "}
          <span className="font-semibold text-slate-700">{user.fullName}</span>?
          Hành động này không thể hoàn tác.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Hủy
          </button>

          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-700"
          >
            Xóa người dùng
          </button>
        </div>
      </div>
    </div>
  );
}
