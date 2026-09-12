import { Clock3, ShieldCheck } from "lucide-react";

import InfoItem from "./InfoItem";

export default function AccountInfoSection({ user, role, status }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h3 className="text-base font-bold text-slate-900">
          Thông tin tài khoản
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Thông tin do hệ thống quản lý, bạn không thể chỉnh sửa.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <ShieldCheck size={15} />
            VAI TRÒ
          </div>
          <span
            className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${role.className}`}
          >
            {role.label}
          </span>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <ShieldCheck size={15} />
            TRẠNG THÁI
          </div>
          <span
            className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${status.className}`}
          >
            {status.label}
          </span>
        </div>
        <InfoItem icon={Clock3} label="NGÀY TẠO" value={user.createdAt} />
        <InfoItem
          icon={Clock3}
          label="CẬP NHẬT GẦN NHẤT"
          value={user.updatedAt}
        />
      </div>
      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50 p-4">
        <ShieldCheck size={18} className="mt-0.5 shrink-0 text-amber-600" />

        <div>
          <p className="text-sm font-semibold text-amber-800">
            Thông tin hệ thống
          </p>

          <p className="mt-1 text-xs leading-5 text-amber-700">
            Vai trò và trạng thái tài khoản được quản lý bởi hệ thống. Bạn không
            thể tự thay đổi các thông tin này.
          </p>
        </div>
      </div>
    </div>
  );
}
