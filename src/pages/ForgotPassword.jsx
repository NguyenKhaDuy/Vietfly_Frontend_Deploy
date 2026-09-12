import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import api from "../api/api";
import logo from "../assets/logo.png";

import OtpVerificationModal from "../components/OtpVerificationModal";
import Notification from "../components/Notification";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(null);

  const showNotification = (type, title, message) => {
    setNotification({
      type,
      title,
      message,
    });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [notification]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const emailValue = email.trim();
    if (!emailValue) {
      showNotification(
        "warning",
        "Thiếu email",
        "Vui lòng nhập email của bạn.",
      );
      return;
    }

    try {
      setLoading(true);

      await api.post("/api/send-otp/forgotPassword", null, {
        params: {
          email: emailValue,
        },
      });

      // Email gửi thành công
      showNotification(
        "success",
        "Gửi OTP thành công",
        "Mã OTP đã được gửi đến email của bạn.",
      );

      // Mở modal OTP
      setShowOtp(true);
    } catch (err) {

      const message =
        err?.response?.data?.message ||
        "Không thể gửi mã OTP. Vui lòng kiểm tra lại email.";

      setError(message);

      showNotification(
        "error",
        "Gửi OTP thất bại",
        message,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (otp) => {
    try {
      setLoading(true);
      setError("");

      await api.post("/api/verify-otp", null, {
        params: {
          otpCode: otp,
        },
      });

      // OTP đúng
      showNotification(
        "success",
        "Xác thực thành công",
        "Mã OTP chính xác. Vui lòng nhập mật khẩu mới.",
      );

      // Đóng modal OTP
      setShowOtp(false);

      // Hiện form nhập mật khẩu
      setShowResetPassword(true);
    } catch (err) {

      const message =
        err?.response?.data?.message ||
        "Mã OTP không chính xác hoặc đã hết hạn.";

      setError(message);

      showNotification(
        "error",
        "Xác thực thất bại",
        message,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.post("/api/resend-otp");

      if (response?.status === "OK") {
        showNotification(
          "success",
          "Gửi lại OTP thành công",
          response?.message || "Một mã OTP mới đã được gửi đến email của bạn.",
        );

        return;
      }

      const message = response?.message || "Không thể gửi lại mã OTP.";

      setError(message);

      showNotification("error", "Gửi lại OTP thất bại", message);
    } catch (err) {

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Không thể gửi lại mã OTP.";

      setError(message);

      showNotification("error", "Gửi lại OTP thất bại", message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseOtp = () => {
    if (loading) return;

    setShowOtp(false);
    setError("");
  };

  const handleResetPassword = async () => {
    setError("");

    if (!newPassword) {
      showNotification(
        "warning",
        "Thiếu mật khẩu",
        "Vui lòng nhập mật khẩu mới.",
      );
      return;
    }

    if (newPassword.length < 6) {
      showNotification(
        "warning",
        "Mật khẩu không hợp lệ",
        "Mật khẩu phải có ít nhất 6 ký tự.",
      );
      return;
    }

    if (!confirmPassword) {
      showNotification(
        "warning",
        "Thiếu xác nhận mật khẩu",
        "Vui lòng nhập lại mật khẩu mới.",
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      showNotification(
        "warning",
        "Mật khẩu không khớp",
        "Mật khẩu xác nhận không giống nhau.",
      );
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/api/forgot/password", null, {
        params: {
          password: newPassword,
        },
      });

      // api của bạn trả trực tiếp response.data
      if (response?.status === "OK") {
        showNotification(
          "success",
          "Đổi mật khẩu thành công",
          "Mật khẩu đã được cập nhật. Đang chuyển về trang đăng nhập...",
        );

        setNewPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 2000);

        return;
      }

      showNotification(
        "error",
        "Đổi mật khẩu thất bại",
        response?.message || "Không thể đổi mật khẩu.",
      );
    } catch (err) {

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Không thể đổi mật khẩu. Vui lòng thử lại.";

      setError(message);

      showNotification("error", "Đổi mật khẩu thất bại", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {notification && (
        <div className="fixed right-5 top-5 z-[9999] w-[380px] max-w-[calc(100vw-40px)]">
          <Notification
            type={notification.type}
            title={notification.title}
            message={notification.message}
            onClose={closeNotification}
          />
        </div>
      )}
      <div className="min-h-screen bg-slate-50">
        <header className="border-b border-slate-100 bg-white">
          <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center transition-transform duration-200 hover:scale-[1.02]"
            >
              <img
                src={logo}
                alt="VietFly"
                className="h-14 w-auto object-contain sm:h-16"
              />
            </Link>

            {/* Login */}
            <div className="flex items-center gap-3 sm:gap-5">
              <span className="hidden text-sm text-slate-500 sm:block">
                Đã nhớ mật khẩu?
              </span>

              <Link
                to="/login"
                className="rounded-xl border border-cyan-500 px-4 py-2.5 text-sm font-semibold text-cyan-600 transition-all duration-200 hover:bg-cyan-500 hover:text-white hover:shadow-lg hover:shadow-cyan-500/20"
              >
                Đăng nhập
              </Link>
            </div>
          </div>
        </header>

        <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-10">
          <div className="w-full max-w-md">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
              {!showResetPassword ? (
                <>
                  {/* Icon */}
                  <div className="flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                      <Mail size={30} />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="mt-5 text-center">
                    <h1 className="text-2xl font-bold text-slate-900">
                      Quên mật khẩu?
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Nhập email tài khoản của bạn để nhận mã OTP
                      đặt lại mật khẩu.
                    </p>
                  </div>

                  {/* Error */}
                  {error && !showOtp && (
                    <div className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
                      {error}
                    </div>
                  )}

                  {/* Email Form */}
                  <form
                    onSubmit={handleSubmit}
                    className="mt-7"
                  >
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Email
                    </label>

                    <div className="relative">
                      <Mail
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="email"
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                          setError("");
                        }}
                        placeholder="Nhập email của bạn"
                        disabled={loading}
                        autoComplete="email"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                      />
                    </div>

                    {/* Send OTP */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
                    >
                      {loading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />

                          Đang gửi mã OTP...
                        </>
                      ) : (
                        <>
                          Gửi mã OTP
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>

                    {/* Back Login */}
                    <div className="mt-6 text-center">
                      <Link
                        to="/login"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-cyan-600"
                      >
                        <ArrowLeft size={16} />
                        Quay lại đăng nhập
                      </Link>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  {/* Icon */}
                  <div className="flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                      <LockKeyhole size={30} />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="mt-5 text-center">
                    <h1 className="text-2xl font-bold text-slate-900">
                      Đặt lại mật khẩu
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Nhập mật khẩu mới cho tài khoản
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {email}
                    </p>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
                      {error}
                    </div>
                  )}
                  <div className="mt-7">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Mật khẩu mới
                    </label>

                    <div className="relative">
                      <LockKeyhole
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type={
                          showNewPassword
                            ? "text"
                            : "password"
                        }
                        value={newPassword}
                        onChange={(event) => {
                          setNewPassword(event.target.value);
                          setError("");
                        }}
                        placeholder="Nhập mật khẩu mới"
                        disabled={loading}
                        autoComplete="new-password"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowNewPassword(
                            (prev) => !prev,
                          )
                        }
                        disabled={loading}
                        className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                      >
                        {showNewPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="mt-5">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Xác nhận mật khẩu
                    </label>

                    <div className="relative">
                      <LockKeyhole
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        value={confirmPassword}
                        onChange={(event) => {
                          setConfirmPassword(event.target.value);
                          setError("");
                        }}
                        placeholder="Nhập lại mật khẩu mới"
                        disabled={loading}
                        autoComplete="new-password"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            (prev) => !prev,
                          )
                        }
                        disabled={loading}
                        className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3">
                    <p className="text-xs text-slate-500">
                      Mật khẩu phải có ít nhất{" "}
                      <span className="font-semibold text-slate-700">
                        6 ký tự
                      </span>
                      .
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    disabled={loading}
                    className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Đang cập nhật...
                      </>
                    ) : (
                      <>
                        Đổi mật khẩu
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>

                  {/* Back Login */}
                  <div className="mt-6 text-center">
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-cyan-600"
                    >
                      <ArrowLeft size={16} />
                      Quay lại đăng nhập
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Copyright */}
            <p className="mt-6 text-center text-xs text-slate-400">
              © {new Date().getFullYear()} VietFly. All rights reserved.
            </p>
          </div>
        </main>
      </div>
      
      <OtpVerificationModal
        open={showOtp}
        email={email}
        onClose={handleCloseOtp}
        onVerify={handleVerifyOtp}
        onResend={handleResendOtp}
        loading={loading}
        error={showOtp ? error : ""}
      />
    </>
  );
}
