import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import api from "../api/api";

function ProtectedRoute({ allowedRoles = [] }) {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      // Không có thông tin đăng nhập ở frontend
      const savedRole = localStorage.getItem("role");

      if (!savedRole) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/api/me");

        // /api/me trả trực tiếp LoginDTO
        const userData = response;

        if (!userData?.role) {
          setUser(null);

          localStorage.removeItem("role");
          localStorage.removeItem("fullname");
          localStorage.removeItem("idUser");

          return;
        }

        setUser(userData);

        // Không lưu token
        localStorage.setItem("role", userData.role);

        if (userData.fullname) {
          localStorage.setItem("fullname", userData.fullname);
        }

        if (userData.idUser) {
          localStorage.setItem("idUser", userData.idUser);
        }
      } catch (error) {
        setUser(null);

        localStorage.removeItem("role");
        localStorage.removeItem("fullname");
        localStorage.removeItem("idUser");
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  // Đang kiểm tra
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-500" />
      </div>
    );
  }

  // Chưa đăng nhập
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Sai quyền
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
