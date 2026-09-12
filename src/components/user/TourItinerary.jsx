import { Clock3, MapPin } from "lucide-react";

import SectionTitle from "./SectionTitle";

export default function TourItinerary({ itinerary = [] }) {
  const itineraryList = Array.isArray(itinerary) ? itinerary : [];

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
        <div className="absolute bottom-6 left-[22px] top-6 hidden w-px bg-slate-200 md:block" />

        <div className="space-y-12">
          {itineraryList.map((day, dayIndex) => {
            const sessions = Array.isArray(day?.sessions) ? day.sessions : [];

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
                      {day.title}
                    </div>

                    {dayDescription && (
                      <p
                        className="
                          mt-2
                          max-w-3xl
                          text-sm
                          leading-7
                          text-slate-500
                        "
                      >
                        {dayDescription}
                      </p>
                    )}
                  </div>
                </div>

                {sessions.length > 0 && (
                  <div className="mt-6 space-y-5 pl-0 md:pl-[60px]">
                    {sessions.map((session, sessionIndex) => {
                      const image = session?.image || null;

                      const title =
                        session?.title || `Hoạt động ${sessionIndex + 1}`;

                      const description = session?.description || "";
                      const time = session?.time || "";

                      return (
                        <div
                          key={
                            session?.idTourItinerariesDetail ||
                            `session-${dayIndex}-${sessionIndex}`
                          }
                          className="
                            h-[220px]
                            w-full
                            overflow-hidden
                            rounded-2xl
                            border
                            border-slate-100
                            bg-white
                            shadow-sm
                            transition
                            hover:border-cyan-100
                            hover:shadow-md
                          "
                        >
                          <div className="grid h-full lg:grid-cols-[325px_1fr]">
                            <div
                              className="
                                h-[220px]
                                w-full
                                overflow-hidden
                                bg-slate-100
                              "
                            >
                              {image ? (
                                <img
                                  src={image}
                                  alt={title}
                                  className="
                                    h-full
                                    w-full
                                    object-cover
                                    transition
                                    duration-500
                                    hover:scale-105
                                  "
                                />
                              ) : (
                                <div
                                  className="
                                    flex
                                    h-full
                                    w-full
                                    items-center
                                    justify-center
                                    text-sm
                                    text-slate-400
                                  "
                                >
                                  Chưa có hình ảnh
                                </div>
                              )}
                            </div>

                            <div
                              className="
                                flex
                                h-[220px]
                                min-w-0
                                flex-col
                                overflow-hidden
                                p-6
                              "
                            >
                              {time && (
                                <div
                                  className="
                                    mb-3
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
                                  {time}
                                </div>
                              )}

                              {description && (
                                <p
                                  className="
                                    mt-3
                                    line-clamp-4
                                    overflow-hidden
                                    text-sm
                                    leading-7
                                    text-slate-500
                                  "
                                >
                                  {description}
                                </p>
                              )}

                              {day?.destination && (
                                <div
                                  className="
                                    mt-auto
                                    flex
                                    shrink-0
                                    items-center
                                    gap-2
                                    pt-4
                                    text-xs
                                    font-medium
                                    text-slate-400
                                  "
                                >
                                  <MapPin size={14} />
                                  <span className="truncate">
                                    {day.destination}
                                  </span>
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
