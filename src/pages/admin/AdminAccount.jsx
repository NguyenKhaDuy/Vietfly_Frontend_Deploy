/* eslint-disable preserve-caught-error */
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useRef, useState } from "react";

import api from "../../api/api";

import PersonalInfoHeader from "../../components/admin/PersonalInfoHeader";
import ProfileCard from "../../components/admin/ProfileCard";
import PersonalInfoSection from "../../components/admin/PersonalInfoSection";
import AccountInfoSection from "../../components/admin/AccountInfoSection";
import ChangePasswordModal from "../../components/admin/ChangePasswordModal";
import OtpVerificationModal from "../../components/OtpVerificationModal";
import Notification from "../../components/Notification";

const ROLE_MAP = {
  ADMIN: {
    label: "Quản trị viên",
    className: "bg-violet-50 text-violet-700 border-violet-200",
  },

  STAFF: {
    label: "Nhân viên",
    className: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },

  CUSTOMER: {
    label: "Khách hàng",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
};

const STATUS_MAP = {
  ACTIVE: {
    label: "Đang hoạt động",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },

  INACTIVE: {
    label: "Không hoạt động",
    className: "bg-slate-100 text-slate-600 border-slate-200",
  },

  LOCKED: {
    label: "Đã khóa",
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

const convertDobToInputDate = (value) => {
  if (!value) {
    return "";
  }

  // Đã là YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  // API trả DD/MM/YYYY
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    const [day, month, year] = value.split("/");

    return `${year}-${month}-${day}`;
  }

  return "";
};

export default function AdminAccount() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    dob: "",
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpError, setOtpError] = useState("");
  // Lưu password để dùng lại khi "Gửi lại OTP"
  const [passwordData, setPasswordData] = useState(null);

  const [notification, setNotification] = useState(null);

  const notificationTimerRef = useRef(null);

  const showNotification = (type, title, message) => {
    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current);
    }

    setNotification({
      type,
      title,
      message,
    });

    notificationTimerRef.current = setTimeout(() => {
      setNotification(null);
      notificationTimerRef.current = null;
    }, 3000);
  };

  const closeNotification = () => {
    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current);
      notificationTimerRef.current = null;
    }

    setNotification(null);
  };

  useEffect(() => {
    return () => {
      if (notificationTimerRef.current) {
        clearTimeout(notificationTimerRef.current);
      }
    };
  }, []);

  const getErrorMessage = (err, fallback) => {
    return (
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      fallback
    );
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const idUser = localStorage.getItem("idUser");

      if (!idUser) {
        throw new Error("Không tìm thấy idUser trong localStorage.");
      }

      const response = await api.get(`/api/user/profile/id=${idUser}`);

      const userData = response.data;

      if (!userData || !userData.idUser) {
        throw new Error("Dữ liệu thông tin người dùng không hợp lệ.");
      }

      setUser(userData);

      setForm({
        fullName: userData.fullName || "",
        phone: userData.phone || "",
        dob: convertDobToInputDate(userData.dob),
      });
    } catch (err) {

      const message = getErrorMessage(
        err,
        "Không thể lấy thông tin tài khoản.",
      );

      setError(message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleEdit = () => {
    if (!user || saving) {
      return;
    }

    setForm({
      fullName: user.fullName || "",
      phone: user.phone || "",
      dob: convertDobToInputDate(user.dob),
    });

    setError("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (!user || saving) {
      return;
    }

    setForm({
      fullName: user.fullName || "",
      phone: user.phone || "",
      dob: convertDobToInputDate(user.dob),
    });

    setError("");
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!user || saving) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      const idUser = localStorage.getItem("idUser");

      if (!idUser) {
        throw new Error("Không tìm thấy idUser trong localStorage.");
      }

      if (!form.fullName.trim()) {
        throw new Error("Họ và tên không được để trống.");
      }

      const payload = {
        userId: idUser,
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        dob: form.dob || null,
      };

      const response = await api.put("/api/user/profile", payload);

      setUser((prev) => ({
        ...prev,
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        dob: form.dob || null,
      }));

      setIsEditing(false);

      showNotification(
        "success",
        "Cập nhật thành công",
        "Thông tin cá nhân đã được cập nhật.",
      );
    } catch (err) {

      const message = getErrorMessage(
        err,
        "Không thể cập nhật thông tin tài khoản.",
      );

      setError(message);

      showNotification("error", "Cập nhật thất bại", message);
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (passwordForm) => {
    try {
      setPasswordLoading(true);

      if (!user?.email) {
        throw new Error("Không tìm thấy email tài khoản.");
      }

      const payload = {
        email: user.email,
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword,
      };

      const response = await api.post("/api/change-password", payload);

      setPasswordData({
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword,
      });

      setShowPasswordModal(false);

      setOtpError("");

      setShowOtpModal(true);

      // Không báo success ở đây vì password
      // chưa thực sự được đổi.
    } catch (err) {

      const message = getErrorMessage(err, "Không thể gửi mã OTP.");

      // Throw để ChangePasswordModal hiển thị lỗi
      throw new Error(message);
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleVerifyOtp = async (otpCode) => {
    try {
      setPasswordLoading(true);
      setOtpError("");

      if (!otpCode || otpCode.length !== 6) {
        setOtpError("Vui lòng nhập đủ 6 chữ số OTP.");
        return;
      }

      const response = await api.post(
        `/api/verify-otp?otpCode=${encodeURIComponent(otpCode)}`,
      );

      setShowOtpModal(false);
      setPasswordData(null);
      setOtpError("");
      showNotification(
        "success",
        "Đổi mật khẩu thành công",
        "Mật khẩu đã được thay đổi. Bạn sẽ được đăng xuất.",
      );

      setTimeout(async () => {
        try {
          // Gọi API logout backend
          const logoutResponse = await api.post("/api/logout");

        } catch (logoutError) {
          console.error("Lỗi API logout:", logoutError);
        } finally {
        
          localStorage.removeItem("token");
          localStorage.removeItem("idUser");
          localStorage.removeItem("user");
          localStorage.removeItem("role");

          // Xóa session storage
          sessionStorage.clear();

          window.location.href = "/login";
        }
      }, 1500);
    } catch (err) {

      const message = getErrorMessage(err, "Xác thực OTP thất bại.");

      // OTP sai thì vẫn giữ modal
      setOtpError(message);

      showNotification("error", "Xác thực thất bại", message);
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setPasswordLoading(true);
      setOtpError("");

      if (!user?.email) {
        throw new Error("Không tìm thấy email tài khoản.");
      }

      if (!passwordData) {
        throw new Error("Không tìm thấy thông tin đổi mật khẩu.");
      }

      const payload = {
        email: user.email,
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      };

      const response = await api.post("/api/change-password", payload);

      setOtpError("");

      showNotification(
        "success",
        "Đã gửi lại OTP",
        "Mã OTP mới đã được gửi đến email của bạn.",
      );
    } catch (err) {

      const message = getErrorMessage(err, "Không thể gửi lại mã OTP.");

      setOtpError(message);

      showNotification("error", "Gửi OTP thất bại", message);

      // Để OtpVerificationModal biết request thất bại
      throw err;
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleCloseOtp = () => {
    if (passwordLoading) {
      return;
    }

    setShowOtpModal(false);
    setOtpError("");
  };

  const role = user ? ROLE_MAP[user.role] || ROLE_MAP.ADMIN : ROLE_MAP.ADMIN;

  const status = user
    ? STATUS_MAP[user.accountStatus] || STATUS_MAP.INACTIVE
    : STATUS_MAP.INACTIVE;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
        <div className="mx-auto flex min-h-[500px] max-w-6xl items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-500" />

            <p className="text-sm text-slate-400">
              Đang tải thông tin tài khoản...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <p className="text-sm font-semibold text-red-700">
              Không thể tải thông tin tài khoản
            </p>

            <p className="mt-2 text-sm text-red-600">{error}</p>

            <button
              type="button"
              onClick={fetchProfile}
              className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
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

      <div className="mx-auto max-w-6xl space-y-6">
    
        <PersonalInfoHeader
          isEditing={isEditing}
          saving={saving}
          onEdit={handleEdit}
          onCancel={handleCancel}
          onSave={handleSave}
          onChangePassword={() => setShowPasswordModal(true)}
        />

        {error && isEditing && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <ProfileCard user={user} role={role} status={status} />

        <PersonalInfoSection
          user={user}
          form={form}
          isEditing={isEditing}
          setForm={setForm}
        />

        <AccountInfoSection user={user} role={role} status={status} />
      </div>

      <ChangePasswordModal
        open={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSubmit={handleChangePassword}
        loading={passwordLoading}
      />

      <OtpVerificationModal
        open={showOtpModal}
        email={user.email}
        onClose={handleCloseOtp}
        onVerify={handleVerifyOtp}
        onResend={handleResendOtp}
        loading={passwordLoading}
        error={otpError}
      />
    </div>
  );
}
