import { FolderTree, Search } from "lucide-react";

export default function EmptyCategory({ search }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        {search ? <Search size={28} /> : <FolderTree size={28} />}
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-800">
        {search ? "Không tìm thấy danh mục" : "Chưa có danh mục nào"}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {search
          ? `Không có danh mục phù hợp với từ khóa "${search}". Hãy thử một từ khóa khác.`
          : "Hiện tại hệ thống chưa có danh mục tour nào."}
      </p>
    </div>
  );
}
