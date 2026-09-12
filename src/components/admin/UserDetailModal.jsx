import {
  X,
  User,
  Mail,
  Phone,
  CalendarDays,
  ShieldCheck,
  CircleUserRound,
  Clock3,
} from "lucide-react";

import RoleBadge from "./RoleBadge";
import StatusBadge from "./StatusBadge";

export default function UserDetailModal({ user, onClose }) {
  if (!user) return null;

  const initials =
    user.fullName
      ?.split(" ")
      .map((word) => word[0])
      .slice(-2)
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Chi tiết người dùng
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Thông tin chi tiết tài khoản người dùng
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

        <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-6">
          <div className="flex items-center gap-4">
            {/* AVATAR */}

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-lg font-bold text-white shadow-md">
              {initials}
            </div>

            {/* NAME */}

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-xl font-bold text-slate-900">
                {user.fullName || "Chưa cập nhật"}
              </h3>

              <p className="mt-1 truncate text-sm text-slate-400">
                ID #{user.idUser || user.id}
              </p>
            </div>

            {/* STATUS */}

            <div className="shrink-0">
              <StatusBadge status={user.status} />
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <CircleUserRound size={18} className="text-cyan-500" />

            <h3 className="text-sm font-bold text-slate-800">
              Thông tin tài khoản
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* FULL NAME */}

            <InfoItem
              icon={<User size={17} />}
              label="Họ và tên"
              value={user.fullName}
            />

            {/* EMAIL */}

            <InfoItem
              icon={<Mail size={17} />}
              label="Email"
              value={user.email}
            />

            {/* PHONE */}

            <InfoItem
              icon={<Phone size={17} />}
              label="Số điện thoại"
              value={user.phone}
            />

            {/* DOB */}

            <InfoItem
              icon={<CalendarDays size={17} />}
              label="Ngày sinh"
              value={user.dob}
            />

            {/* ROLE */}

            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400">
                <ShieldCheck size={16} />
                Vai trò
              </div>

              <RoleBadge role={user.role} />
            </div>

            {/* STATUS */}

            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400">
                <CircleUserRound size={16} />
                Trạng thái tài khoản
              </div>

              <StatusBadge status={user.status} />
            </div>

            {/* CREATED AT */}

            <InfoItem
              icon={<Clock3 size={17} />}
              label="Ngày tạo"
              value={user.createdAt}
            />

            {/* UPDATED AT */}

            <InfoItem
              icon={<Clock3 size={17} />}
              label="Cập nhật lần cuối"
              value={user.updatedAt}
            />
          </div>
        </div>

        <div className="flex justify-end border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
      <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400">
        {icon}

        <span>{label}</span>
      </div>

      <p
        className="truncate text-sm font-semibold text-slate-700"
        title={value || ""}
      >
        {value || "Chưa cập nhật"}
      </p>
    </div>
  );
}
