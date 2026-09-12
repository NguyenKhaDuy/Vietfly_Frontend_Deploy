import { Image } from "lucide-react";

export default function EmptyBanner() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <Image size={28} />
      </div>

      <h3 className="mt-4 text-lg font-bold text-slate-800">
        Không tìm thấy Banner
      </h3>

      <p className="mt-1 text-sm text-slate-400">
        Thử thay đổi từ khóa tìm kiếm.
      </p>
    </div>
  );
}
