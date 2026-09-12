import {
  Image as ImageIcon,
  Pencil,
  Trash2,
  Clock3,
  MapPin,
  Plus,
} from "lucide-react";

export default function ItineraryCard({
  itinerary,
  day,
  onEdit,
  onDelete,
  onAddDetail,
  onEditDetail,
  onDeleteDetail,
}) {
  const details = Array.isArray(itinerary?.tourItinerariesDetailDTOS)
    ? itinerary.tourItinerariesDetailDTOS
    : [];

  const parseCreatedAt = (dateString) => {
    if (!dateString) return 0;

    try {
      const [datePart, timePart = "00:00:00"] = String(dateString).split(" ");

      if (!datePart) return 0;

      const [day, month, year] = datePart.split("/").map(Number);

      const [hour = 0, minute = 0, second = 0] = timePart
        .split(":")
        .map(Number);

      return new Date(year, month - 1, day, hour, minute, second).getTime();
    } catch {
      return 0;
    }
  };

  const sortedDetails = [...details].sort((a, b) => {
    return parseCreatedAt(a.createdAt) - parseCreatedAt(b.createdAt);
  });

  const formatTime = (time) => {
    if (!time) return "";

    return String(time).substring(0, 5);
  };

  const handleDeleteDetail = (detail) => {
    if (!onDeleteDetail) return;

    onDeleteDetail(itinerary, detail);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* HEADER */}
      <div className="flex flex-col gap-4 border-b border-slate-200 bg-slate-50 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-cyan-500 font-bold text-white">
            {day}
          </div>

          <div>
            <h3 className="mt-0.5 font-bold text-slate-800">
              {itinerary.title || `Ngày ${day}`}
            </h3>
          </div>
        </div>

        {/* ACTION NGÀY */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(itinerary)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-50 px-3 py-2 text-sm font-medium text-cyan-600 transition hover:bg-cyan-100"
          >
            <Pencil size={16} />
            Sửa ngày
          </button>

          <button
            type="button"
            onClick={() => onDelete(itinerary)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
          >
            <Trash2 size={16} />
            Xóa
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        {/* DESCRIPTION */}
        {itinerary.description && (
          <p className="text-sm leading-6 text-slate-600">
            {itinerary.description}
          </p>
        )}

        {/* DETAIL HEADER */}
        <div className="mt-6 flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-slate-800">
              Chi tiết lịch trình
            </h4>

            <p className="mt-1 text-xs text-slate-400">
              {details.length} hoạt động trong ngày
            </p>
          </div>

          <button
            type="button"
            onClick={() => onAddDetail(itinerary)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600"
          >
            <Plus size={16} />
            Thêm chi tiết
          </button>
        </div>

        {/* DETAILS */}
        {details.length === 0 ? (
          <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 py-10 text-center">
            <ImageIcon size={30} className="mx-auto mb-2 text-slate-300" />

            <p className="text-sm font-medium text-slate-500">
              Chưa có chi tiết lịch trình
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Nhấn "Thêm chi tiết" để thêm hoạt động
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {sortedDetails.map((detail, index) => (
              <div
                key={detail.idTourItinerariesDetail || `detail-${index}`}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-cyan-200 hover:shadow-sm"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* IMAGE */}
                  <div className="h-44 w-full flex-shrink-0 bg-slate-100 sm:h-auto sm:w-52">
                    {detail.imageUrl ? (
                      <img
                        src={detail.imageUrl}
                        alt={detail.title || "Chi tiết lịch trình"}
                        className="h-full min-h-44 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full min-h-44 items-center justify-center">
                        <ImageIcon size={30} className="text-slate-300" />
                      </div>
                    )}
                  </div>

                  {/* DETAIL CONTENT */}
                  <div className="min-w-0 flex-1 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 gap-3">
                        {/* NUMBER */}
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cyan-100 text-sm font-bold text-cyan-600">
                          {index + 1}
                        </div>

                        <div className="min-w-0">
                          <h5 className="font-semibold text-slate-800">
                            {detail.title || "Chi tiết lịch trình"}
                          </h5>

                          {/* TIME */}
                          {(detail.startTime || detail.endTime) && (
                            <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                              <Clock3 size={14} />

                              <span>
                                {formatTime(detail.startTime)}

                                {detail.endTime &&
                                  ` - ${formatTime(detail.endTime)}`}
                              </span>
                            </div>
                          )}

                          {/* LOCATION */}
                          {detail.location && (
                            <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
                              <MapPin size={14} />

                              <span>{detail.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* ACTION DETAIL */}
                      <div className="flex flex-shrink-0 items-center gap-1">
                        <button
                          type="button"
                          onClick={() => onEditDetail(itinerary, detail)}
                          title="Sửa chi tiết"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-cyan-50 hover:text-cyan-600"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteDetail(detail)}
                          title="Xóa chi tiết"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* DESCRIPTION */}
                    {detail.description && (
                      <p className="mt-3 text-sm leading-6 text-slate-500">
                        {detail.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
