import { CalendarDays, Image, Route } from "lucide-react";

import Section from "./Section";

export default function TourItinerary({ tour, navigate }) {
  const itineraries = Array.isArray(tour?.tourItinerariesDTOS)
    ? tour.tourItinerariesDTOS
    : [];

  return (
    <Section
      icon={Route}
      title="Lịch trình"
      description={`${itineraries.length} ngày`}
    >
      {itineraries.length === 0 ? (
        <div className="rounded-xl bg-slate-50 px-5 py-10 text-center">
          <Route className="mx-auto mb-3 text-slate-300" size={32} />

          <p className="text-sm text-slate-400">Tour chưa có lịch trình</p>
        </div>
      ) : (
        <div className="space-y-5">
          {itineraries.map((item, index) => {
            const details = Array.isArray(item.tourItinerariesDetailDTOS)
              ? item.tourItinerariesDetailDTOS
              : [];

            return (
              <div
                key={item.idTourItineraries}
                className="relative rounded-xl border border-slate-200 bg-white p-5 transition hover:border-cyan-200"
              >
                <div className="flex items-start gap-4">
                  {/* Ngày */}
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-cyan-100">
                    <CalendarDays size={20} className="text-cyan-600" />
                  </div>

                  <div className="min-w-0 flex-1">
                    {/* Tiêu đề */}
                    <h3 className="text-base font-semibold text-slate-800">
                      {item.title || `Ngày ${index + 1}`}
                    </h3>

                    {/* Mô tả */}
                    {item.description && (
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {item.description}
                      </p>
                    )}

                    {/* Chi tiết trong ngày */}
                    {details.length > 0 && (
                      <div className="mt-4 space-y-3">
                        {details.map((detail) => (
                          <div
                            key={detail.idTourItinerariesDetail}
                            className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50"
                          >
                            <div className="flex flex-col md:flex-row">
                              {/* Ảnh */}
                              {detail.imageUrl && (
                                <div className="h-40 w-full flex-shrink-0 md:h-auto md:w-48">
                                  <img
                                    src={detail.imageUrl}
                                    alt={detail.title || "Lịch trình"}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              )}

                              {/* Nội dung */}
                              <div className="min-w-0 flex-1 p-4">
                                <h4 className="font-semibold text-slate-700">
                                  {detail.title || "Chi tiết lịch trình"}
                                </h4>

                                {detail.description && (
                                  <p className="mt-2 text-sm leading-6 text-slate-500">
                                    {detail.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Số lượng chi tiết */}
                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                      <Route size={14} />

                      <span>{details.length} hoạt động trong ngày</span>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                {index < itineraries.length - 1 && (
                  <div className="absolute -bottom-5 left-[38px] hidden h-5 w-px bg-slate-200 md:block" />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Button quản lý */}
      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={() => navigate(`/admin/tours/${tour.idTour}/itineraries`)}
          className="flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-600"
        >
          <Route size={17} />
          Xem & quản lý toàn bộ lịch trình
        </button>
      </div>
    </Section>
  );
}
