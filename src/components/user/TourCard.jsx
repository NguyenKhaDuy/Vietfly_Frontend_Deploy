import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  MessageCircle,
  Users,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function formatPrice(price) {
  const number = Number(price);

  if (!Number.isFinite(number)) {
    return "0";
  }

  return new Intl.NumberFormat("vi-VN").format(number);
}

function TourCard({ tour }) {
  const navigate = useNavigate();

  const handleDetail = () => {
    const id = tour?.id || tour?.idTour;

    if (id) {
      navigate(`/tours/${id}`);
    }
  };

  const handleContact = () => {
    if (!tour?.contactPhone) {
      return;
    }

    const phone = String(tour.contactPhone).replace(/\D/g, "");

    window.open(`https://zalo.me/${phone}`, "_blank", "noopener,noreferrer");
  };

  const tourImages = Array.isArray(tour?.tourImageDTOS)
    ? tour.tourImageDTOS
    : [];

  const thumbnail =
    tourImages.find(
      (item) =>
        item?.isThumbnail === true ||
        item?.isThumbnail === "true" ||
        item?.thumbnail === true ||
        item?.thumbnail === "true",
    ) || null;

  const firstImage = tourImages[0] || null;

  const image =
    thumbnail?.imageUrl ||
    thumbnail?.imgaeUrl ||
    thumbnail?.url ||
    firstImage?.imageUrl ||
    firstImage?.imgaeUrl ||
    firstImage?.url ||
    tour?.image ||
    "";

  const title = tour?.title || tour?.nameTour || "Tour chưa có tên";

  const location = tour?.location || tour?.destination || "Chưa cập nhật";

  const duration = tour?.duration || tour?.time || "Chưa cập nhật";

  const people =
    tour?.people ||
    (tour?.maxPeople ? `2 - ${tour.maxPeople} người` : "Chưa cập nhật");

  const dateDepart = tour?.dateDepart || "Lịch linh hoạt";

  const destination = tour?.destination || tour?.location || "Chưa cập nhật";

  const price =
    tour?.price !== undefined && tour?.price !== null
      ? tour.price
      : tour?.priceAdult;

  return (
    <article
      className="
        group
        flex
        h-[580px]
        w-full
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-slate-200/80
        bg-white
        shadow-sm
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-2xl
        hover:shadow-slate-900/10
      "
    >
      <div
        className="
          relative
          h-[245px]
          min-h-[245px]
          w-full
          shrink-0
          overflow-hidden
          bg-slate-100
        "
      >
        {image ? (
          <img
            src={image}
            alt={title}
            className="
              block
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-110
            "
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100">
            <MapPin size={42} className="text-slate-300" />
          </div>
        )}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/65
            via-black/10
            to-transparent
          "
        />

        <div
          className="
            absolute
            bottom-5
            left-5
            right-5
            flex
            items-center
            gap-2
            overflow-hidden
            text-sm
            font-medium
            text-white
          "
        >
          <MapPin size={16} className="shrink-0" />

          <span className="truncate">{location}</span>
        </div>
      </div>

      <div
        className="
          flex
          min-h-0
          flex-1
          flex-col
          p-6
        "
      >
        <h3
          className="
            line-clamp-2
            h-[56px]
            min-h-[56px]
            shrink-0
            overflow-hidden
            text-lg
            font-bold
            leading-7
            text-slate-900
            transition-colors
            duration-300
            group-hover:text-cyan-600
          "
        >
          {title}
        </h3>

        <div
          className="
            mt-5
            h-[88px]
            min-h-[88px]
            shrink-0
            border-b
            border-slate-100
            pb-5
          "
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <div className="flex min-w-0 items-center gap-2 text-sm text-slate-500">
              <Clock3 size={16} className="shrink-0 text-cyan-500" />

              <span className="truncate">{duration}</span>
            </div>

            <div className="flex min-w-0 items-center gap-2 text-sm text-slate-500">
              <Users size={16} className="shrink-0 text-cyan-500" />

              <span className="truncate">{people}</span>
            </div>

            <div className="flex min-w-0 items-center gap-2 text-sm text-slate-500">
              <CalendarDays size={16} className="shrink-0 text-cyan-500" />

              <span className="truncate">{dateDepart}</span>
            </div>

            <div className="flex min-w-0 items-center gap-2 text-sm text-slate-500">
              <MapPin size={16} className="shrink-0 text-cyan-500" />

              <span className="truncate">{destination}</span>
            </div>
          </div>
        </div>

        <div className="mt-auto shrink-0 pt-5">
          <p className="text-xs text-slate-400">Giá từ</p>

          <div className="mt-1 flex h-[30px] items-baseline gap-1">
            <span
              className="
                text-xl
                font-extrabold
                text-cyan-600
              "
            >
              {formatPrice(price)}
            </span>

            <span
              className="
                text-xs
                font-semibold
                text-slate-400
              "
            >
              đ
            </span>
          </div>

          <div className="mt-5 grid h-11 grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleContact}
              disabled={!tour?.contactPhone}
              className="
                group/contact
                flex
                h-11
                items-center
                justify-center
                gap-2
                rounded-full
                border
                border-cyan-500
                bg-white
                px-4
                text-sm
                font-semibold
                text-cyan-600
                transition-all
                duration-300
                hover:bg-cyan-500
                hover:text-white
                disabled:cursor-not-allowed
                disabled:border-slate-200
                disabled:text-slate-300
                disabled:hover:bg-white
                disabled:hover:text-slate-300
              "
            >
              <MessageCircle
                size={16}
                className="
                  transition-transform
                  duration-300
                  group-hover/contact:scale-110
                "
              />

              <span>Liên hệ</span>
            </button>

            <button
              type="button"
              onClick={handleDetail}
              className="
                group/btn
                flex
                h-11
                items-center
                justify-center
                gap-2
                rounded-full
                bg-slate-900
                px-4
                text-sm
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-cyan-600
              "
            >
              <span>Xem tour</span>

              <ArrowRight
                size={16}
                className="
                  transition-transform
                  duration-300
                  group-hover/btn:translate-x-1
                "
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default TourCard;
