import {
  X,
  UserRound,
  CalendarDays,
  Clock3,
  ImageOff,
} from "lucide-react";

export default function BannerPreviewModal({ banner, onClose }) {
  if (!banner) return null;

  const imageUrl = banner.cloudinaryImage?.imageUrl;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="relative max-h-[95vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-red-500"
          title="Đóng"
        >
          <X size={19} />
        </button>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={banner.title || "Banner"}
            className="max-h-[70vh] w-full object-cover"
          />
        ) : (
          <div className="flex h-[300px] w-full items-center justify-center bg-slate-100">
            <div className="flex flex-col items-center gap-2 text-slate-400">
              <ImageOff size={40} />
              <span className="text-sm">
                Banner không có hình ảnh
              </span>
            </div>
          </div>
        )}

        <div className="p-6">
          <h2 className="text-xl font-bold text-slate-900">
            {banner.title || "Không có tiêu đề"}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {banner.description || "Không có mô tả"}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-xs text-slate-400">

            <span className="flex items-center gap-1.5">
              <UserRound size={14} />

              <span>
                {banner.fullName || "--"}
              </span>
            </span>

            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} />

              <span>
                Tạo: {banner.createdAt || "--"}
              </span>
            </span>

            <span className="flex items-center gap-1.5">
              <Clock3 size={14} />

              <span>
                Cập nhật: {banner.updatedAt || "--"}
              </span>
            </span>

          </div>
        </div>
      </div>
    </div>
  );
}
