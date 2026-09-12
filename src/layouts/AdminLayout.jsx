import {
  Link,
  Outlet,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useEffect, useState } from "react";

import {
  Users,
  Map,
  Image,
  CalendarCheck,
  FolderTree,
  MessageSquare,
  UserRound,
  ArrowLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

import api from "../api/api";
import logo from "../assets/logo.png";

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [adminName, setAdminName] = useState("Administrator");

  const menuItems = [
    {
      label: "Quản lý người dùng",
      path: "/admin/users",
      icon: Users,
    },
    {
      label: "Quản lý tour",
      path: "/admin/tours",
      icon: Map,
    },
    {
      label: "Quản lý banner",
      path: "/admin/banners",
      icon: Image,
    },
    {
      label: "Quản lý booking",
      path: "/admin/bookings",
      icon: CalendarCheck,
    },
    {
      label: "Quản lý category",
      path: "/admin/categories",
      icon: FolderTree,
    },
    {
      label: "Quản lý feedback",
      path: "/admin/feedbacks",
      icon: MessageSquare,
    },
    {
      label: "Quản lý tài khoản",
      path: "/admin/account",
      icon: UserRound,
    },
  ];

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const idUser = localStorage.getItem("idUser");

        if (!idUser) {
          return;
        }

        const response = await api.get(`/api/user/profile/id=${idUser}`);

        const userData = response.data;

        setAdminName(userData?.fullName || "Administrator");
      } catch (error) {

        // Nếu API lỗi thì vẫn giữ tên mặc định
        setAdminName("Administrator");
      }
    };

    fetchAdminProfile();
  }, []);

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const getPageTitle = () => {
    if (location.pathname.startsWith("/admin/users")) {
      return "Quản lý người dùng";
    }

    if (location.pathname.startsWith("/admin/tours")) {
      return "Quản lý tour";
    }

    if (location.pathname.startsWith("/admin/banners")) {
      return "Quản lý banner";
    }

    if (location.pathname.startsWith("/admin/bookings")) {
      return "Quản lý booking";
    }

    if (location.pathname.startsWith("/admin/categories")) {
      return "Quản lý category";
    }

    if (location.pathname.startsWith("/admin/feedbacks")) {
      return "Quản lý feedback";
    }

    if (location.pathname.startsWith("/admin/account")) {
      return "Quản lý tài khoản";
    }

    return "Quản trị hệ thống";
  };

  const getAvatarLetter = () => {
    if (!adminName || adminName === "Administrator") {
      return "A";
    }

    return adminName.trim().charAt(0).toUpperCase();
  };

  const handleLogout = async () => {
    try {
      await api.post("/api/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("role");
      localStorage.removeItem("fullname");
      localStorage.removeItem("email");
      localStorage.removeItem("idUser");

      // Nếu project có lưu token thì xóa luôn
      localStorage.removeItem("token");

      // Xóa session storage
      sessionStorage.clear();
      navigate("/login", { replace: true });
    }
  };


  if (location.pathname === "/admin") {
    return <Navigate to="/admin/users" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      <aside className="fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-slate-200 bg-white">

        <div className="flex h-[76px] items-center border-b border-slate-200 px-6">
          <Link
            to="/admin/users"
            className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-80"
          >
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-cyan-50">
              <img
                src={logo}
                alt="VietFly Logo"
                className="h-full w-full object-contain p-1.5"
              />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900">
                VietFly
              </h1>

              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-500">
                Administration
              </p>
            </div>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Quản lý
          </p>

          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-3 transition-all duration-200 ${
                    active
                      ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                      : "text-slate-600 hover:bg-cyan-50 hover:text-cyan-600"
                  }`}
                >
                  {/* Icon */}

                  <Icon
                    size={19}
                    strokeWidth={active ? 2.5 : 2}
                    className={
                      active
                        ? "text-white"
                        : "text-slate-400 group-hover:text-cyan-500"
                    }
                  />

                  {/* Label */}

                  <span className="text-sm font-medium">{item.label}</span>

                  {/* Active Arrow */}

                  {active && (
                    <ChevronRight size={16} className="ml-auto text-cyan-100" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-slate-200 p-4">
          {/* Về trang người dùng */}

          <Link
            to="/"
            className="group flex items-center gap-3 rounded-xl px-3.5 py-3 text-slate-500 transition-all duration-200 hover:bg-cyan-50 hover:text-cyan-600"
          >
            <ArrowLeft
              size={19}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />

            <span className="text-sm font-medium">Về trang người dùng</span>
          </Link>

          {/* Logout */}

          <button
            type="button"
            onClick={handleLogout}
            className="group mt-1 flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-slate-500 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut
              size={19}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />

            <span className="text-sm font-medium">Đăng xuất</span>
          </button>

          <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
            {/* Avatar */}

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-sm font-bold text-white shadow-sm">
              {getAvatarLetter()}
            </div>

            {/* Information */}

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">
                {adminName}
              </p>

              <p className="text-xs text-slate-400">Quản trị viên</p>
            </div>

            {/* Online */}

            <div className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
          </div>
        </div>
      </aside>

      <div className="ml-[270px] min-h-screen">

        <header className="sticky top-0 z-40 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/95 px-6 backdrop-blur-xl md:px-8">
          
          <div>
            {/* Breadcrumb */}

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Admin</span>

              <ChevronRight size={13} />

              <span className="font-medium text-cyan-500">
                {getPageTitle()}
              </span>
            </div>

            {/* Page title */}

            <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
              {getPageTitle()}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="mx-1 hidden h-8 w-px bg-slate-200 sm:block" />

            <div className="flex items-center gap-3">
              {/* Name */}

              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-slate-800">
                  {adminName}
                </p>

                <p className="text-xs text-slate-400">Quản trị viên</p>
              </div>

              {/* Avatar */}

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500 font-bold text-white shadow-sm shadow-cyan-500/20">
                {getAvatarLetter()}
              </div>
            </div>
          </div>
        </header>
        <main className="p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
