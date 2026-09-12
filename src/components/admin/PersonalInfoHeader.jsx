import { LockKeyhole, Pencil, Save, UserRound, X } from "lucide-react";

export default function PersonalInfoHeader({
  isEditing,
  onEdit,
  onCancel,
  onSave,
  onChangePassword,
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* LEFT */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500 text-white shadow-lg shadow-cyan-500/20">
            <UserRound size={18} />
          </div>

          <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-600">
            Account
          </span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          Thông tin cá nhân
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Quản lý thông tin cá nhân và bảo mật tài khoản của bạn.
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onChangePassword}
          className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-600"
        >
          <LockKeyhole size={17} />
          Đổi mật khẩu
        </button>

        {!isEditing ? (
          <button
            type="button"
            onClick={onEdit}
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-600"
          >
            <Pencil size={17} />
            Cập nhật thông tin
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={onCancel}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              <X size={17} />
              Hủy
            </button>

            <button
              type="button"
              onClick={onSave}
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-600"
            >
              <Save size={17} />
              Lưu thay đổi
            </button>
          </>
        )}
      </div>
    </div>
  );
}
