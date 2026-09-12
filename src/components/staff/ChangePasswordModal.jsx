import { useState } from "react";
import { LockKeyhole, Save, X, Loader2, Eye, EyeOff } from "lucide-react";

export default function ChangePasswordModal({
  open,
  onClose,
  onSubmit,
  loading = false,
}) {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  // Trạng thái ẩn/hiện từng password
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  if (!open) {
    return null;
  }

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setError("");
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const resetForm = () => {
    setForm({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setError("");

    // Reset tất cả về trạng thái ẩn
    setShowPassword({
      oldPassword: false,
      newPassword: false,
      confirmPassword: false,
    });
  };
  const handleClose = () => {
    if (loading) {
      return;
    }

    resetForm();

    onClose?.();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    setError("");

    if (!form.oldPassword) {
      setError("Vui lòng nhập mật khẩu hiện tại.");
      return;
    }

    if (!form.newPassword) {
      setError("Vui lòng nhập mật khẩu mới.");
      return;
    }

    if (form.newPassword.length < 6) {
      setError("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }

    if (form.newPassword === form.oldPassword) {
      setError("Mật khẩu mới phải khác mật khẩu hiện tại.");
      return;
    }

    if (!form.confirmPassword) {
      setError("Vui lòng xác nhận mật khẩu mới.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      await onSubmit?.({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });

      // Chỉ reset sau khi gửi OTP thành công
      resetForm();
    } catch (err) {
      setError(err?.message || "Không thể gửi mã OTP.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      {/* BACKDROP */}

      <div className="absolute inset-0" onClick={handleClose} />

      {/* MODAL */}

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
              <LockKeyhole size={21} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">Đổi mật khẩu</h2>

              <p className="text-xs text-slate-500">
                Cập nhật mật khẩu tài khoản
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
          {/* OLD PASSWORD */}

          <PasswordInput
            label="Mật khẩu hiện tại"
            placeholder="Nhập mật khẩu hiện tại"
            value={form.oldPassword}
            onChange={(e) => updateField("oldPassword", e.target.value)}
            disabled={loading}
            visible={showPassword.oldPassword}
            onToggle={() => togglePassword("oldPassword")}
          />

          {/* NEW PASSWORD */}

          <PasswordInput
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            value={form.newPassword}
            onChange={(e) => updateField("newPassword", e.target.value)}
            disabled={loading}
            visible={showPassword.newPassword}
            onToggle={() => togglePassword("newPassword")}
          />

          {/* CONFIRM PASSWORD */}

          <PasswordInput
            label="Xác nhận mật khẩu mới"
            placeholder="Nhập lại mật khẩu mới"
            value={form.confirmPassword}
            onChange={(e) => updateField("confirmPassword", e.target.value)}
            disabled={loading}
            visible={showPassword.confirmPassword}
            onToggle={() => togglePassword("confirmPassword")}
          />

          {/* ERROR */}

          {error && (
            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          {/* BUTTON */}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="h-11 flex-1 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Hủy
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-500 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
            >
              {loading ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Đang gửi OTP...
                </>
              ) : (
                <>
                  <Save size={17} />
                  Thay đổi
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PasswordInput({
  label,
  placeholder,
  value,
  onChange,
  disabled,
  visible,
  onToggle,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      {/* INPUT + EYE */}

      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 pr-12 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-60"
        />

        <button
          type="button"
          onClick={onToggle}
          disabled={disabled}
          tabIndex={-1}
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={visible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}
