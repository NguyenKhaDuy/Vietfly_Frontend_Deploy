import { Clock3, MapPin } from "lucide-react";

import SectionTitle from "./SectionTitle";

function parseDateTime(value) {
  if (!value) return 0;

  // Backend: dd/MM/yyyy HH:mm:ss
  const match = String(value).match(
    /^(\d{2})\/(\d{2})\/(\d{4})(?:\s+(\d{2}):(\d{2}):(\d{2}))?$/,
  );

  if (!match) {
    return 0;
  }

  const [, day, month, year, hour = "00", minute = "00", second = "00"] = match;

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second),
  ).getTime();
}

export default function TourItinerary({ itinerary = [] }) {
  const itineraryList = Array.isArray(itinerary)
    ? [...itinerary].sort(
        (a, b) => parseDateTime(a?.createdAt) - parseDateTime(b?.createdAt),
      )
    : [];

  if (itineraryList.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-slate-100 py-12">
      <SectionTitle title="Lịch trình chi tiết" />

      <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
        Theo dõi hành trình theo từng ngày và các hoạt động được sắp xếp trong
        suốt chuyến đi.
      </p>

      <div className="relative mt-10">
        {/* Timeline */}
        <div
          className="
            absolute
            bottom-6
            left-[22px]
            top-6
            hidden
            w-px
            bg-slate-200
            md:block
          "
        />

        <div className="space-y-12">
          {itineraryList.map((day, dayIndex) => {
            const sessions = Array.isArray(day?.sessions)
              ? [...day.sessions].sort(
                  (a, b) =>
                    parseDateTime(a?.createdAt) - parseDateTime(b?.createdAt),
                )
              : [];

            const dayDescription = day?.description || "";

            return (
              <div
                key={day?.idTourItineraries || `day-${dayIndex}`}
                className="relative"
              >
                <div className="relative z-10 flex items-start gap-4">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      bg-cyan-600
                      text-sm
                      font-bold
                      text-white
                      shadow-lg
                      shadow-cyan-600/20
                    "
                  >
                    {String(dayIndex + 1).padStart(2, "0")}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div
                      className="
                        text-xs
                        font-bold
                        uppercase
                        tracking-[0.15em]
                        text-cyan-600
                      "
                    >
                      {day?.title}
                    </div>

                    {dayDescription && (
                      <p
                        className="
                          mt-2
                          max-w-3xl
                          text-sm
                          leading-7
                          text-slate-500
                          text-justify
                        "
                      >
                        {dayDescription}
                      </p>
                    )}
                  </div>
                </div>
                {sessions.length > 0 && (
                  <div
                    className="
                      mt-6
                      space-y-5
                      pl-0
                      md:pl-[60px]
                    "
                  >
                    {sessions.map((session, sessionIndex) => {
                      const image = session?.image || session?.imageUrl || null;

                      const title =
                        session?.title || `Hoạt động ${sessionIndex + 1}`;

                      const description = session?.description || "";

                      const time = session?.time || "";

                      /*
                       * Chỉ render khu vực ảnh khi thực sự
                       * có URL ảnh.
                       */
                      const hasImage =
                        typeof image === "string" && image.trim() !== "";

                      return (
                        <div
                          key={
                            session?.idTourItinerariesDetail ||
                            `session-${dayIndex}-${sessionIndex}`
                          }
                          className="
                            w-full
                            overflow-hidden
                            rounded-2xl
                            border
                            border-slate-100
                            bg-white
                            shadow-sm
                            transition
                            duration-200
                            hover:border-cyan-100
                            hover:shadow-md
                          "
                        >
                          <div
                            className={`
                              grid
                              ${
                                hasImage
                                  ? "lg:grid-cols-[325px_1fr]"
                                  : "grid-cols-1"
                              }
                            `}
                          >
                           
                            {hasImage && (
                              <div
                                className="
                                  min-h-[220px]
                                  w-full
                                  overflow-hidden
                                  bg-slate-100
                                  lg:min-h-[260px]
                                "
                              >
                                <img
                                  src={image}
                                  alt={title}
                                  className="
                                    h-full
                                    min-h-[220px]
                                    w-full
                                    object-cover
                                    transition
                                    duration-500
                                    hover:scale-105
                                  "
                                />
                              </div>
                            )}

                            <div
                              className="
                                flex
                                min-w-0
                                flex-col
                                p-6
                                sm:p-7
                              "
                            >
                              {/* TIME */}
                              {time && (
                                <div
                                  className="
                                    mb-4
                                    inline-flex
                                    w-fit
                                    shrink-0
                                    items-center
                                    gap-2
                                    rounded-full
                                    bg-cyan-50
                                    px-3
                                    py-1.5
                                    text-xs
                                    font-bold
                                    text-cyan-600
                                  "
                                >
                                  <Clock3 size={14} />
                                  <span>{time}</span>
                                </div>
                              )}

                              {/* TITLE */}
                              <h3
                                className="
                                  text-lg
                                  font-bold
                                  leading-7
                                  text-slate-800
                                "
                              >
                                {title}
                              </h3>

                              {/* DESCRIPTION */}
                              {description && (
                                <p
                                  className="
                                    mt-3
                                    whitespace-pre-line
                                    text-sm
                                    leading-7
                                    text-justify
                                    text-slate-600
                                  "
                                >
                                  {description}
                                </p>
                              )}

                              {/* DESTINATION */}
                              {day?.destination && (
                                <div
                                  className="
                                    mt-6
                                    flex
                                    items-center
                                    gap-2
                                    border-t
                                    border-slate-100
                                    pt-4
                                    text-xs
                                    font-medium
                                    text-slate-400
                                  "
                                >
                                  <MapPin size={14} className="shrink-0" />

                                  <span>{day.destination}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
