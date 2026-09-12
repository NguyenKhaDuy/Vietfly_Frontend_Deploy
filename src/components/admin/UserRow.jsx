import { Eye, Pencil, Trash2 } from "lucide-react";

import RoleBadge from "./RoleBadge";
import StatusBadge from "./StatusBadge";

export default function UserRow({ user, onView, onEdit, onDelete }) {
  const initials = user.fullName
    .split(" ")
    .map((word) => word[0])
    .slice(-2)
    .join("")
    .toUpperCase();

  return (
    <tr className="group transition hover:bg-slate-50/70">
      {/* USER */}

      <td className="px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-sm font-bold text-white">
            {initials}
          </div>

          <div className="min-w-0">
            <p
              className="truncate text-sm font-semibold text-slate-800"
              title={user.fullName}
            >
              {user.fullName}
            </p>

            <p
              className="mt-0.5 truncate text-xs text-slate-400"
              title={user.id}
            >
              ID #{user.id}
            </p>
          </div>
        </div>
      </td>

      {/* CONTACT */}

      <td className="px-5 py-4">
        <div className="min-w-0">
          <p
            className="truncate whitespace-nowrap text-sm font-medium text-slate-700"
            title={user.email}
          >
            {user.email || "-"}
          </p>

          <p className="mt-1 whitespace-nowrap text-xs text-slate-400">
            {user.phone || "-"}
          </p>
        </div>
      </td>

      {/* ROLE */}

      <td className="px-4 py-4">
        <div className="whitespace-nowrap">
          <RoleBadge role={user.role} />
        </div>
      </td>

      {/* STATUS */}

      <td className="px-4 py-4">
        <div className="whitespace-nowrap">
          <StatusBadge status={user.status} />
        </div>
      </td>

      {/* DATE */}

      <td className="px-4 py-4">
        <p
          className="whitespace-nowrap text-sm text-slate-500"
          title={user.createdAt}
        >
          {user.createdAt || "-"}
        </p>
      </td>

      {/* ACTION */}

      <td className="px-4 py-4">
        <div className="flex items-center justify-end gap-1.5">
          {/* XEM */}

          <button
            type="button"
            onClick={() => onView(user)}
            title="Xem chi tiết"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-600"
          >
            <Eye size={16} />
          </button>

          {/* SỬA */}

          <button
            type="button"
            onClick={() => onEdit(user)}
            title="Chỉnh sửa"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-blue-200 hover:bg-cyan-50 hover:text-cyan-500"
          >
            <Pencil size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
