import { CalendarDays, Clock3, MapPin, Users } from "lucide-react";

import InfoItem from "./InfoItem";

function formatPrice(price) {
  if (price === null || price === undefined) {
    return "0";
  }

  return new Intl.NumberFormat("vi-VN").format(price);
}

function formatTime(time) {
  if (!time) return "--";

  return time.substring(0, 5);
}

export default function TourHero({ tour }) {
  const images = Array.isArray(tour?.tourImageDTOS) ? tour.tourImageDTOS : [];

  const thumbnailImage =
    images.find((image) => image?.thumbnail === true) || images[0] || null;

  const image =
    thumbnailImage?.imgaeUrl ||
    thumbnailImage?.imageUrl ||
    thumbnailImage?.image ||
    thumbnailImage?.url ||
    null;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[380px] bg-slate-100">
          {image ? (
            <img
              src={image}
              alt={tour?.nameTour || "Tour"}
              className="h-full min-h-[380px] w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-[380px] items-center justify-center text-sm text-slate-400">
              Chưa có hình ảnh
            </div>
          )}

          {/* SỐ LƯỢNG ẢNH */}
          <div className="absolute bottom-4 left-4 rounded-lg bg-black/60 px-3 py-2 text-xs font-medium text-white">
            {images.length} hình ảnh
          </div>
        </div>

        <div className="p-7">
          {/* DESTINATION */}
          <div className="flex items-center gap-2 text-sm font-medium text-cyan-500">
            <MapPin size={17} />

            <span>{tour?.destination || "--"}</span>
          </div>

          {/* NAME */}
          <h2 className="mt-3 text-2xl font-bold leading-tight text-slate-900">
            {tour?.nameTour || "--"}
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-4 text-sm leading-7 text-slate-500">
            {tour?.description || "Chưa có mô tả."}
          </p>

          <div className="my-6 h-px bg-slate-100" />

          {/* BASIC DATA */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            <InfoItem
              icon={CalendarDays}
              label="Ngày khởi hành"
              value={tour?.dateDepart || "--"}
              iconClass="text-blue-500"
            />

            <InfoItem
              icon={Clock3}
              label="Giờ khởi hành"
              value={formatTime(tour?.timeDepart)}
              iconClass="text-blue-500"
            />

            <InfoItem
              icon={Clock3}
              label="Thời lượng"
              value={tour?.time || "--"}
              iconClass="text-violet-500"
            />

            <InfoItem
              icon={Users}
              label="Số khách tối đa"
              value={
                tour?.maxPeople !== null && tour?.maxPeople !== undefined
                  ? `${tour.maxPeople} người`
                  : "--"
              }
              iconClass="text-emerald-500"
            />
          </div>

          {/* PRICE */}
          <div className="mt-7 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-xs font-medium text-blue-500">Giá người lớn</p>

              <p className="mt-1 text-xl font-bold text-blue-700">
                {formatPrice(tour?.priceAdult)} ₫
              </p>
            </div>

            <div className="rounded-xl bg-orange-50 p-4">
              <p className="text-xs font-medium text-orange-500">Giá trẻ em</p>

              <p className="mt-1 text-xl font-bold text-orange-700">
                {formatPrice(tour?.priceChildren)} ₫
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
