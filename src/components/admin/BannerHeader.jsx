import { Image, Plus } from "lucide-react";

export default function BannerHeader({ onCreate }) {
  return (
    <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500 text-white shadow-lg shadow-blue-600/20">
            <Image size={19} />
          </div>

          <span className="text-sm font-semibold text-cyan-500">
            CONTENT MANAGEMENT
          </span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          Quản lý Banner
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Quản lý hình ảnh và nội dung banner hiển thị trên hệ thống VietFly.
        </p>
      </div>

      <button
        onClick={onCreate}
        className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-cyan-700"
      >
        <Plus size={18} />
        Thêm Banner
      </button>
    </div>
  );
}
