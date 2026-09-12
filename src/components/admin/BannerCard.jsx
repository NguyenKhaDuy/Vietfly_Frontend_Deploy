import {
  Eye,
  Pencil,
  Trash2,
  CalendarDays,
  UserRound,
  MoreVertical,
} from "lucide-react";

function formatDate(date) {
  if (!date) return "--";

  return date;
}

export default function BannerCard({ banner, onPreview, onEdit, onDelete }) {
  const imageUrl = banner?.cloudinaryImage?.imageUrl;

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[16/7] overflow-hidden bg-slate-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={banner?.title || "Banner"}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100">
            <span className="text-sm text-slate-400">Không có hình ảnh</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
        <button
          type="button"
          onClick={onPreview}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 text-slate-700 opacity-0 shadow-lg backdrop-blur transition group-hover:opacity-100 hover:bg-white"
          title="Xem banner"
        >
          <Eye size={17} />
        </button>
      </div>

      <div className="p-5">

        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-bold text-slate-900">
              {banner?.title || "Không có tiêu đề"}
            </h3>

            <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">
              {banner?.description || "Không có mô tả"}
            </p>
          </div>

          <button
            type="button"
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <MoreVertical size={18} />
          </button>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm">
              <UserRound size={15} />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                Người tạo
              </p>

              <p className="truncate text-xs font-semibold text-slate-700">
                {banner?.fullName || "--"}
              </p>
            </div>
          </div>
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm">
              <CalendarDays size={15} />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                Cập nhật
              </p>

              <p className="truncate text-xs font-semibold text-slate-700">
                {formatDate(banner?.updatedAt)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={onPreview}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            <Eye size={16} />
            Xem
          </button>
          <button
            type="button"
            onClick={onEdit}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-50 px-3 py-2.5 text-sm font-semibold text-cyan-500 transition hover:bg-cyan-100"
          >
            <Pencil size={16} />
            Sửa
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-100"
            title="Xóa"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
