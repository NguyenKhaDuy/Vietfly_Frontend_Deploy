import { Eye, EyeOff, LockKeyhole, Mail, ArrowRight } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../api/api";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import Notification from "../components/Notification";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [notification, setNotification] = useState(null);


  const showNotification = (type, title, message) => {
    setNotification({
      type,
      title,
      message,
    });

    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const clearLoginData = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("fullname");
    localStorage.removeItem("email");
    localStorage.removeItem("idUser");
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      // Không có trạng thái đăng nhập
      // => không gọi /api/me
      const isLoggedIn = localStorage.getItem("isLoggedIn");

      if (isLoggedIn !== "true") {
        setCheckingAuth(false);
        return;
      }

      try {
        const response = await api.get("/api/me");

        // /api/me trả trực tiếp LoginDTO
        const user = response;
        const role = user?.role;

        if (!role) {
          clearLoginData();
          setCheckingAuth(false);
          return;
        }

        // Đồng bộ thông tin user
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", role);

        if (user.fullname) {
          localStorage.setItem("fullname", user.fullname);
        }

        if (user.email) {
          localStorage.setItem("email", user.email);
        }

        if (user.idUser) {
          localStorage.setItem("idUser", user.idUser);
        }

        // Đã đăng nhập -> redirect
        if (role === "ADMIN") {
          navigate("/admin", { replace: true });
          return;
        }

        if (role === "STAFF") {
          navigate("/staff", { replace: true });
          return;
        }

        // Role không hợp lệ
        clearLoginData();
      } catch (error) {
        clearLoginData();
      } finally {
        setCheckingAuth(false);
      }
    };

    checkLoggedIn();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");

    // Nếu user bắt đầu nhập lại thì đóng notification lỗi
    if (notification?.type === "error") {
      setNotification(null);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate frontend
    if (!form.email.trim() || !form.password) {
      showNotification(
        "warning",
        "Thiếu thông tin",
        "Vui lòng nhập đầy đủ email và mật khẩu.",
      );
      return;
    }

    try {
      setLoading(true);
      setError("");
      setNotification(null);

      const response = await api.post("/api/login", {
        email: form.email.trim(),
        password: form.password,
      });

      const loginData = response?.data;

      const role = loginData?.role;
      const fullname = loginData?.fullname;
      const email = loginData?.email;
      const idUser = loginData?.idUser;

      // Backend trả response nhưng không có role
      if (!role) {
        showNotification(
          "error",
          "Đăng nhập thất bại",
          loginData?.message || "Thông tin đăng nhập không hợp lệ.",
        );
        return;
      }
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", role);

      if (fullname) {
        localStorage.setItem("fullname", fullname);
      }

      if (email) {
        localStorage.setItem("email", email);
      }

      if (idUser) {
        localStorage.setItem("idUser", idUser);
      }

      const from = location.state?.from?.pathname;

      if (from) {
        if (
          (role === "ADMIN" && from.startsWith("/admin")) ||
          (role === "STAFF" && from.startsWith("/staff"))
        ) {
          navigate(from, { replace: true });
          return;
        }
      }

      if (role === "ADMIN") {
        navigate("/admin", { replace: true });
        return;
      }

      if (role === "STAFF") {
        navigate("/staff", { replace: true });
        return;
      }

      clearLoginData();

      showNotification(
        "error",
        "Không có quyền truy cập",
        "Tài khoản không có quyền truy cập hệ thống.",
      );
    } catch (error) {
      const status = error?.response?.status;

      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Email hoặc mật khẩu không chính xác.";

      if (status === 403) {
        clearLoginData();

        showNotification("error", "Tài khoản không hoạt động", errorMessage);

        return;
      }

      if (errorMessage === "Password incorrect") {
        showNotification(
          "error",
          "Sai mật khẩu",
          "Mật khẩu bạn nhập không chính xác.",
        );

        return;
      }

      if (errorMessage === "Can not found email") {
        showNotification(
          "error",
          "Không tìm thấy tài khoản",
          "Email này chưa được đăng ký trong hệ thống.",
        );

        return;
      }


      showNotification("error", "Đăng nhập thất bại", errorMessage);
    } finally {
      setLoading(false);
    }
  };


  if (checkingAuth) {
    return null;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">
      {notification && (
        <div className="fixed right-6 top-6 z-[100] w-[380px] max-w-[calc(100vw-2rem)]">
          <Notification
            type={notification.type}
            title={notification.title}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        </div>
      )}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-200/30 blur-3xl" />

      <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl shadow-slate-200/70 lg:grid-cols-2">
        
          <div className="relative hidden min-h-[650px] overflow-hidden bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 lg:flex">
            {/* Decorative */}
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[40px] border-white/10" />

            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border-[50px] border-white/10" />

            <div className="relative z-10 flex w-full flex-col justify-between p-12">
              {/* Logo */}
              <div>
                <div className="inline-flex items-center gap-3 rounded-2xl bg-white/10 p-3 backdrop-blur-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-lg">
                    <img
                      src={logo}
                      alt="VietFly"
                      className="h-10 w-10 object-contain"
                    />
                  </div>

                  <div>
                    <p className="text-lg font-bold text-white">VietFly</p>

                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/70">
                      Management System
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="max-w-md">
                <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
                  VIETFLY MANAGEMENT
                </div>

                <h1 className="text-4xl font-bold leading-tight text-white xl:text-5xl">
                  Chào mừng bạn trở lại!
                </h1>

                <p className="mt-5 text-base leading-7 text-blue-100">
                  Đăng nhập vào hệ thống quản lý VietFly để quản lý tour, đặt
                  lịch, khách hàng và các hoạt động của hệ thống.
                </p>

                {/* Features */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-white/90">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                      ✓
                    </div>
                    Quản lý hệ thống tập trung
                  </div>

                  <div className="flex items-center gap-3 text-sm text-white/90">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                      ✓
                    </div>
                    Quản lý đặt lịch và khách hàng
                  </div>

                  <div className="flex items-center gap-3 text-sm text-white/90">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                      ✓
                    </div>
                    Bảo mật và phân quyền tài khoản
                  </div>
                </div>
              </div>

              {/* Footer */}
              <p className="text-xs text-white/50">
                © {new Date().getFullYear()} VietFly. All rights reserved.
              </p>
            </div>
          </div>
          <div className="flex min-h-[650px] items-center justify-center px-6 py-12 sm:px-12">
            <div className="w-full max-w-md">
              {/* Mobile Logo */}
              <div className="mb-10 flex items-center gap-3 lg:hidden">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                  <img
                    src={logo}
                    alt="VietFly"
                    className="h-10 w-10 object-contain"
                  />
                </div>

                <div>
                  <p className="font-bold text-slate-900">VietFly</p>

                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    Management System
                  </p>
                </div>
              </div>

              {/* Heading */}
              <div className="mb-8">
                <p className="mb-3 text-sm font-semibold text-cyan-600">
                  VIETFLY MANAGEMENT
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                  Đăng nhập
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Đăng nhập bằng tài khoản quản trị hoặc nhân viên của bạn.
                </p>
              </div>
              {error && (
                <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
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
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Nhập email của bạn"
                      className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700">
                      Mật khẩu
                    </label>

                    <Link
                      to="/forgot-password"
                      className="text-xs font-semibold text-cyan-600 hover:text-cyan-700"
                    >
                      Quên mật khẩu?
                    </Link>
                  </div>

                  <div className="relative">
                    <LockKeyhole
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Nhập mật khẩu"
                      className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Đang đăng nhập...
                    </>
                  ) : (
                    <>
                      Đăng nhập
                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* Back */}
              <div className="mt-8 border-t border-slate-100 pt-6 text-center">
                <Link
                  to="/"
                  className="text-sm font-medium text-slate-500 transition hover:text-cyan-600"
                >
                  ← Quay lại trang chủ
                </Link>
              </div>

              <p className="mt-8 text-center text-xs leading-5 text-slate-400">
                Hệ thống dành riêng cho Admin và Staff VietFly.
                <br />
                Vui lòng không chia sẻ thông tin đăng nhập.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
