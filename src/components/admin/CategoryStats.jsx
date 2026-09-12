import { FolderTree, Layers3, Clock3 } from "lucide-react";

function StatCard({ icon: Icon, title, value, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>

          <p className="mt-1 text-xs text-slate-400">{description}</p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-cyan-500">
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

export default function CategoryStats({ categories }) {
  const total = categories.length;

  const recentlyUpdated = categories.filter(
    (category) => category.updatedAt !== category.createdAt,
  ).length;

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      <StatCard
        icon={FolderTree}
        title="Tổng danh mục"
        value={total}
        description="Danh mục đang quản lý"
      />

      <StatCard
        icon={Layers3}
        title="Danh mục hoạt động"
        value={total}
        description="Sẵn sàng sử dụng"
      />

      <StatCard
        icon={Clock3}
        title="Đã cập nhật"
        value={recentlyUpdated}
        description="Có thay đổi gần đây"
      />
    </div>
  );
}
