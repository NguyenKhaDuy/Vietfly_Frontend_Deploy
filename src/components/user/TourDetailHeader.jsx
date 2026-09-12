import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Heart,
  MapPin,
  Share2,
  Star,
  Users,
} from "lucide-react";

export default function TourDetailHeader({ tour, liked, onLike, onBack }) {
  return (
    <div className="mb-7">
      {/* BACK */}

      <button
        type="button"
        onClick={onBack}
        className="
          mb-6
          inline-flex
          items-center
          gap-2
          text-sm
          font-medium
          text-slate-500
          transition
          hover:text-cyan-600
        "
      >
        <ArrowLeft size={18} />
        Quay lại danh sách tour
      </button>

      <div
        className="
          flex
          flex-col
          gap-5
          lg:flex-row
          lg:items-end
          lg:justify-between
        "
      >
        <div>
          {/* CATEGORY + RATING */}

          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span
              className="
                rounded-full
                bg-cyan-50
                px-3
                py-1.5
                text-xs
                font-bold
                text-cyan-700
              "
            >
              {tour.category}
            </span>

            <span
              className="
                flex
                items-center
                gap-1.5
                text-sm
                font-semibold
                text-amber-500
              "
            >
              <Star size={15} fill="currentColor" />

              {tour.rating}

              <span className="font-normal text-slate-400">
                ({tour.reviews} đánh giá)
              </span>
            </span>
          </div>

          {/* TITLE */}

          <h1
            className="
              max-w-4xl
              text-3xl
              font-extrabold
              tracking-tight
              text-slate-900
              md:text-4xl
              lg:text-5xl
            "
          >
            {tour.title}
          </h1>

          {/* META */}

          <div
            className="
              mt-5
              flex
              flex-wrap
              gap-x-6
              gap-y-3
              text-sm
              text-slate-500
            "
          >
            <MetaItem icon={<MapPin size={17} />} text={tour.location} />

            <MetaItem icon={<Clock3 size={17} />} text={tour.duration} />

            <MetaItem icon={<Users size={17} />} text={tour.people} />

            <MetaItem icon={<CalendarDays size={17} />} text={tour.departure} />
          </div>
        </div>

        {/* ACTIONS */}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onLike}
            className={`
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              transition

              ${
                liked
                  ? "border-rose-200 bg-rose-50 text-rose-500"
                  : "border-slate-200 bg-white text-slate-500 hover:border-cyan-200 hover:text-cyan-600"
              }
            `}
          >
            <Heart size={19} fill={liked ? "currentColor" : "none"} />
          </button>

          <button
            type="button"
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-500
              transition
              hover:border-cyan-200
              hover:text-cyan-600
            "
          >
            <Share2 size={19} />
          </button>
        </div>
      </div>
    </div>
  );
}

function MetaItem({ icon, text }) {
  return (
    <span className="flex items-center gap-2">
      <span className="text-cyan-600">{icon}</span>

      {text}
    </span>
  );
}
