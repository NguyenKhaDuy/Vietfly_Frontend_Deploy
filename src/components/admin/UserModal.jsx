import { useEffect, useState } from "react";
import { CalendarDays, X } from "lucide-react";

import Input from "./Input";
import api from "../../api/api";

export default function UserModal({
  form,
  setForm,
  editingUser,
  onClose,
  onSubmit,
}) {
  const [accountStatuses, setAccountStatuses] = useState([]);
  const [roles, setRoles] = useState([]);

  const [loadingStatus, setLoadingStatus] = useState(false);
  const [loadingRole, setLoadingRole] = useState(false);
  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    const fetchAccountStatus = async () => {
      try {
        setLoadingStatus(true);

        const response = await api.get("/api/account-status");

        const responseData = response?.data ?? response;

        const data = Array.isArray(responseData)
          ? responseData
          : Array.isArray(responseData?.data)
            ? responseData.data
            : [];

        setAccountStatuses(data);
      } catch (error) {
        console.error("Lỗi lấy danh sách trạng thái:", error);
        setAccountStatuses([]);
      } finally {
        setLoadingStatus(false);
      }
    };

    fetchAccountStatus();
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoadingRole(true);

        const response = await api.get("/api/role");

        const responseData = response?.data ?? response;

        const data = Array.isArray(responseData)
          ? responseData
          : Array.isArray(responseData?.data)
            ? responseData.data
            : [];

        setRoles(data);
      } catch (error) {
        console.error("Lỗi lấy danh sách role:", error);
        setRoles([]);
      } finally {
        setLoadingRole(false);
      }
    };

    fetchRoles();
  }, []);

  const getStatusLabel = (status) => {
    const labels = {
      ACTIVE: "Hoạt động",
      INACTIVE: "Không hoạt động",
      LOCKED: "Bị khóa",
      SUSPENDED: "Tạm ngưng",
    };

    return labels[status] || status;
  };

  const getRoleLabel = (role) => {
    const labels = {
      ADMIN: "Admin",
      STAFF: "Staff",
    };

    return labels[role] || role;
  };

  const formatDobDisplay = (dob) => {
    if (!dob) {
      return "";
    }

    // yyyy-MM-dd
    if (/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
      const [year, month, day] = dob.split("-");

      return `${day}/${month}/${year}`;
    }

    // dd/MM/yyyy
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dob)) {
      return dob;
    }

    return "";
  };

  const handleDobTextChange = (value) => {
    // Chỉ lấy số
    const digits = value.replace(/\D/g, "").slice(0, 8);

    // Không có dữ liệu
    if (digits.length === 0) {
      handleChange("dob", "");
      return;
    }

    // DD
    if (digits.length <= 2) {
      handleChange("dob", digits);
      return;
    }

    // DD/MM
    if (digits.length <= 4) {
      handleChange("dob", `${digits.slice(0, 2)}/${digits.slice(2)}`);
      return;
    }

    // DD/MM/YYYY
    const day = digits.slice(0, 2);
    const month = digits.slice(2, 4);
    const year = digits.slice(4, 8);

    const displayValue = `${day}/${month}/${year}`;

    // Chưa đủ năm
    if (year.length < 4) {
      handleChange("dob", displayValue);
      return;
    }
    handleChange("dob", `${year}-${month}-${day}`);
  };

  const dobDisplayValue = formatDobDisplay(form.dob);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {editingUser ? "Cập nhật người dùng" : "Thêm người dùng"}
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              {editingUser
                ? "Cập nhật thông tin tài khoản"
                : "Tạo tài khoản người dùng mới"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* FORM */}

        <form onSubmit={onSubmit} className="p-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* HỌ TÊN */}

            <Input
              label="Họ và tên"
              required
              value={form.fullName || ""}
              onChange={(value) => handleChange("fullName", value)}
              placeholder="Nguyễn Văn A"
            />

            {/* EMAIL */}

            <Input
              label="Email"
              type="email"
              required
              value={form.email || ""}
              onChange={(value) => handleChange("email", value)}
              placeholder="example@gmail.com"
            />

            {/* PHONE */}

            <Input
              label="Số điện thoại"
              value={form.phone || ""}
              onChange={(value) => handleChange("phone", value)}
              placeholder="0901234567"
            />

            {/* NGÀY SINH */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Ngày sinh
              </label>

              <div className="relative">
                <CalendarDays
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="dobDisplay"
                  type="text"
                  value={dobDisplayValue}
                  placeholder="DD/MM/YYYY"
                  maxLength={10}
                  onChange={(e) => handleDobTextChange(e.target.value)}
                  onClick={() => {
                    document.getElementById("dobPicker")?.showPicker?.();
                  }}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 pl-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10"
                />

                <input
                  id="dobPicker"
                  type="date"
                  value={
                    /^\d{4}-\d{2}-\d{2}$/.test(form.dob || "") ? form.dob : ""
                  }
                  onChange={(e) => {
                    handleChange("dob", e.target.value);
                  }}
                  className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-0"
                  tabIndex={-1}
                />
              </div>
            </div>

            {/* ROLE */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Vai trò
              </label>

              <select
                value={form.role || ""}
                onChange={(e) => handleChange("role", e.target.value)}
                disabled={loadingRole}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
              >
                {loadingRole ? (
                  <option value="">Đang tải vai trò...</option>
                ) : roles.length > 0 ? (
                  roles.map((role) => (
                    <option key={role} value={role}>
                      {getRoleLabel(role)}
                    </option>
                  ))
                ) : (
                  <option value="">Không có vai trò</option>
                )}
              </select>
            </div>

            {/* STATUS */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Trạng thái
              </label>

              <select
                value={form.status || "ACTIVE"}
                onChange={(e) => handleChange("status", e.target.value)}
                disabled={loadingStatus}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
              >
                {loadingStatus ? (
                  <option value="ACTIVE">Đang tải trạng thái...</option>
                ) : accountStatuses.length > 0 ? (
                  accountStatuses.map((status) => (
                    <option key={status} value={status}>
                      {getStatusLabel(status)}
                    </option>
                  ))
                ) : (
                  <option value="">Không có trạng thái</option>
                )}
              </select>
            </div>
          </div>

          {/* BUTTON */}

          <div className="mt-7 flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Hủy
            </button>

            <button
              type="submit"
              className="rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition hover:bg-cyan-700"
            >
              {editingUser ? "Lưu thay đổi" : "Tạo người dùng"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
