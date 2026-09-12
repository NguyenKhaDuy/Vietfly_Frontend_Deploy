import {
  Eye,
  Pencil,
  Route,
  ChevronLeft,
  ChevronRight,
  BadgeDollarSign,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function formatPrice(price) {
  if (price === null || price === undefined) {
    return "0";
  }

  return new Intl.NumberFormat("vi-VN").format(price);
}

function formatDate(date) {
  if (!date) {
    return "--";
  }

  if (
    typeof date === "string" &&
    date.includes("/") &&
    date.split("/").length === 3
  ) {
    return date;
  }

  if (typeof date === "string") {
    const parts = date.split("-");

    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
  }

  return date;
}

function formatTime(time) {
  if (!time) {
    return "--";
  }

  return time.substring(0, 5);
}

function getStatus(status) {
  const map = {
    ACTIVE: {
      label: "Đang hoạt động",
      className: "bg-emerald-50 text-emerald-600",
    },

    HIDE: {
      label: "Đã đóng",
      className: "bg-slate-100 text-slate-500",
    },
  };

  return (
    map[status] || {
      label: status || "Chưa xác định",
      className: "bg-slate-100 text-slate-500",
    }
  );
}

export default function TourTable({
  tours = [],
  onEdit,

  currentPage = 1,
  totalPages = 0,

  onPageChange,
  onPreviousPage,
  onNextPage,

  loading = false,
}) {
  const navigate = useNavigate();

  const handleItinerary = (tour) => {
    navigate(`/staff/tours/${tour.idTour}/itineraries`, {
      state: {
        tour,
      },
    });
  };

  const handleTourPrice = (tour) => {
    navigate(`/staff/tours/${tour.idTour}/price`, {
      state: {
        tour,
      },
    });
  };

  const handleViewDetail = (tour) => {
    navigate(`/staff/tours/${tour.idTour}`, {
      state: {
        tour,
      },
    });
  };

  const getPageNumbers = () => {
    if (totalPages <= 1) {
      return [];
    }

    if (totalPages <= 5) {
      return Array.from(
        {
          length: totalPages,
        },
        (_, index) => index + 1,
      );
    }

    const pages = [];

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const startPage = Math.max(2, currentPage - 1);

    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between px-6 py-5">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Danh sách Tour
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Quản lý các tour trong hệ thống
          </p>
        </div>

        <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-500">
          <span className="font-semibold text-slate-800">{tours.length}</span>{" "}
          tour
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="border-y border-slate-100 bg-slate-50/50">
              <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Tour
              </th>

              <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Điểm đến
              </th>

              <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Khởi hành
              </th>

              <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Giá
              </th>

              <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Khách
              </th>

              <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Trạng thái
              </th>

              <th className="px-6 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {tours.map((tour) => {
              const status = getStatus(tour.statusTour);

              const thumbnailImage =
                tour.tourImageDTOS?.find((image) => image.thumbnail === true) ||
                tour.tourImageDTOS?.[0];

              const image =
                thumbnailImage?.imgaeUrl ||
                thumbnailImage?.imageUrl ||
                thumbnailImage?.image ||
                thumbnailImage?.url ||
                null;

              return (
                <tr
                  key={tour.idTour}
                  className="transition-colors hover:bg-slate-50/60"
                >
                  {/* TOUR */}

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                        {image ? (
                          <img
                            src={image}
                            alt={tour.nameTour || "Tour"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[10px] text-slate-400">
                            No image
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="max-w-[220px] truncate text-sm font-semibold text-slate-800">
                          {tour.nameTour || "--"}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {tour.nameCategory || "Chưa phân loại"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* DESTINATION */}

                  <td className="px-4 py-4">
                    <p className="max-w-[150px] truncate text-sm text-slate-600">
                      {tour.destination || "--"}
                    </p>
                  </td>

                  {/* DEPARTURE */}

                  <td className="px-4 py-4">
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        {formatDate(tour.dateDepart)}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {formatTime(tour.timeDepart)}
                      </p>
                    </div>
                  </td>

                  {/* PRICE */}

                  <td className="px-4 py-4">
                    <p className="whitespace-nowrap text-sm font-semibold text-slate-800">
                      {formatPrice(tour.priceAdult)} ₫
                    </p>

                    {tour.priceChildren !== null &&
                      tour.priceChildren !== undefined && (
                        <p className="mt-1 whitespace-nowrap text-xs text-slate-400">
                          Trẻ em {formatPrice(tour.priceChildren)} ₫
                        </p>
                      )}
                  </td>

                  {/* MAX PEOPLE */}

                  <td className="px-4 py-4">
                    <span className="text-sm text-slate-600">
                      {tour.maxPeople ?? 0}
                    </span>

                    <span className="ml-1 text-xs text-slate-400">người</span>
                  </td>

                  {/* STATUS */}

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </td>

                  {/* ACTIONS */}

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* ITINERARY */}

                      <button
                        type="button"
                        onClick={() => handleItinerary(tour)}
                        title="Quản lý lịch trình"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-cyan-50 hover:text-cyan-500"
                      >
                        <Route size={16} />
                      </button>

                      {/* PRICE */}

                      <button
                        type="button"
                        onClick={() => handleTourPrice(tour)}
                        title="Quản lý giá tour"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-amber-50 hover:text-amber-500"
                      >
                        <BadgeDollarSign size={16} />
                      </button>

                      {/* DETAIL */}

                      <button
                        type="button"
                        onClick={() => handleViewDetail(tour)}
                        title="Xem chi tiết"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      >
                        <Eye size={16} />
                      </button>

                      {/* EDIT */}

                      <button
                        type="button"
                        onClick={() => onEdit(tour)}
                        title="Chỉnh sửa"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-cyan-50 hover:text-blue-500"
                      >
                        <Pencil size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {tours.length === 0 && !loading && (
        <div className="px-6 py-14 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
            <Route size={21} className="text-slate-400" />
          </div>

          <p className="mt-3 text-sm font-semibold text-slate-700">
            Không tìm thấy tour
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Thử thay đổi từ khóa hoặc bộ lọc.
          </p>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
        {/* LEFT */}

        <div className="text-xs text-slate-400">
          Trang{" "}
          <span className="font-semibold text-slate-700">{currentPage}</span>
          {" / "}
          <span className="font-semibold text-slate-700">{totalPages}</span>
        </div>

        {/* RIGHT */}

        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            {/* PREVIOUS */}

            <button
              type="button"
              onClick={onPreviousPage}
              disabled={currentPage <= 1 || loading}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
              title="Trang trước"
            >
              <ChevronLeft size={17} />
            </button>

            {/* PAGE NUMBERS */}

            {pageNumbers.map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`dots-${index}`}
                    className="flex h-9 min-w-9 items-center justify-center px-1 text-sm text-slate-400"
                  >
                    ...
                  </span>
                );
              }

              const active = page === currentPage;

              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => onPageChange(page)}
                  disabled={loading}
                  className={`flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm font-medium transition ${
                    active
                      ? "border-cyan-500 bg-cyan-500 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  {page}
                </button>
              );
            })}

            {/* NEXT */}

            <button
              type="button"
              onClick={onNextPage}
              disabled={currentPage >= totalPages || loading}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
              title="Trang sau"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
