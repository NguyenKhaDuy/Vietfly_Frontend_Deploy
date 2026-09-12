import { FolderTree, Plus } from "lucide-react";

export default function CategoryHeader({ onAdd }) {
  return (
    <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500 text-white shadow-lg shadow-blue-600/20">
            <FolderTree size={19} />
          </div>

          <span className="text-sm font-semibold text-cyan-500">
            CATEGORY MANAGEMENT
          </span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          Quản lý danh mục
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Quản lý các danh mục tour trên hệ thống VietFly.
        </p>
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-cyan-700 active:scale-[0.98]"
      >
        <Plus size={18} />
        Thêm danh mục
      </button>
    </div>
  );
}
