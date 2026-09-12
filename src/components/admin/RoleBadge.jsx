export default function RoleBadge({ role }) {
  const config = {
    ADMIN: "bg-purple-50 text-purple-700 ring-purple-600/10",

    STAFF: "bg-blue-50 text-blue-700 ring-blue-600/10",

    USER: "bg-slate-100 text-slate-600 ring-slate-500/10",
  };

  const labels = {
    ADMIN: "Admin",
    STAFF: "Staff",
    USER: "Người dùng",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        config[role]
      }`}
    >
      {labels[role]}
    </span>
  );
}
