import { Users } from "lucide-react";
import UserRow from "./UserRow";

export default function UserTable({ users, onView, onEdit, onDelete }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[1050px] table-fixed text-left">
        <colgroup>
          <col className="w-[320px]" />
          <col className="w-[250px]" />
          <col className="w-[100px]" />
          <col className="w-[140px]" />
          <col className="w-[130px]" />
          <col className="w-[150px]" />
        </colgroup>

        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/70">
            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Người dùng
            </th>

            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Liên hệ
            </th>

            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Vai trò
            </th>

            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Trạng thái
            </th>

            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Ngày tạo
            </th>

            <th className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
              Thao tác
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {users.length > 0 ? (
            users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-6 py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                  <Users size={25} className="text-slate-400" />
                </div>

                <p className="mt-4 font-semibold text-slate-700">
                  Không tìm thấy người dùng
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Thử thay đổi từ khóa hoặc bộ lọc.
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
