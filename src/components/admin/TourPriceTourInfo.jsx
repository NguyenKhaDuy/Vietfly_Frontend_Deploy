import { CalendarDays, MapPin, Tag } from "lucide-react";

export default function TourPriceTourInfo({ tour, idTour }) {
  const formatPrice = (value) => {
    if (value === null || value === undefined) {
      return "0";
    }

    return new Intl.NumberFormat("vi-VN").format(value);
  };

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
        {/* TOUR */}
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Tour đang quản lý
          </p>

          <h2 className="mt-1 text-lg font-bold text-slate-900">
            {tour?.nameTour || "Không xác định"}
          </h2>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 text-sm text-slate-500">
              <MapPin size={14} />
              {tour?.destination || "--"}
            </span>

            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <Tag size={13} />
              ID: {idTour || "--"}
            </span>
          </div>
        </div>

        {/* PRICES */}
        <div className="flex flex-wrap gap-4">
          <div className="min-w-[150px] rounded-xl bg-slate-50 px-5 py-3">
            <p className="text-xs text-slate-400">Giá người lớn</p>

            <p className="mt-1 text-lg font-bold text-slate-800">
              {formatPrice(tour?.priceAdult)} ₫
            </p>
          </div>

          <div className="min-w-[150px] rounded-xl bg-slate-50 px-5 py-3">
            <p className="text-xs text-slate-400">Giá trẻ em</p>

            <p className="mt-1 text-lg font-bold text-slate-800">
              {formatPrice(tour?.priceChildren)} ₫
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
