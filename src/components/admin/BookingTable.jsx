import { ChevronLeft, ChevronRight } from "lucide-react";

import BookingRow from "./BookingRow";

export default function BookingTable({
  bookings,
  totalItems,
  currentPage,
  totalPages,
  onPageChange,
  onDetail,
  onStatus,
  onDelete,
}) {
  const getPages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const startPage = Math.max(2, currentPage - 1);

    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    onPageChange(page);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] table-fixed">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              <th className="w-[19%] px-5 py-3.5 text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Booking
                </span>
              </th>

              <th className="w-[19%] px-4 py-3.5 text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Khách hàng
                </span>
              </th>

              <th className="w-[15%] px-4 py-3.5 text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Điểm đến
                </span>
              </th>

              <th className="w-[17%] px-4 py-3.5 text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Khởi hành
                </span>
              </th>

              <th className="w-[10%] px-3 py-3.5 text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Số người
                </span>
              </th>

              <th className="w-[12%] px-3 py-3.5 text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Trạng thái
                </span>
              </th>

              <th className="w-[12%] px-4 py-3.5 text-right">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Thao tác
                </span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {bookings.map((booking) => (
              <BookingRow
                key={booking.idBooking}
                booking={booking}
                onDetail={() => onDetail(booking)}
                onStatus={() => onStatus(booking)}
                onDelete={() => onDelete(booking)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 0 && (
        <div className="flex min-h-[62px] items-center justify-between border-t border-slate-100 bg-white px-5">
          <div className="text-xs text-slate-400">
            Tổng cộng{" "}
            <span className="font-semibold text-slate-600">{totalItems}</span>{" "}
            booking
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="
                flex h-8 w-8 items-center justify-center
                rounded-lg
                border border-slate-200
                bg-white
                text-slate-400
                transition
                hover:border-cyan-200
                hover:bg-cyan-50
                hover:text-cyan-500
                disabled:pointer-events-none
                disabled:opacity-35
              "
            >
              <ChevronLeft size={16} />
            </button>

            {getPages().map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`dots-${index}`}
                    className="
                        flex h-8 w-8
                        items-center justify-center
                        text-xs
                        text-slate-400
                      "
                  >
                    ...
                  </span>
                );
              }

              const active = currentPage === page;

              return (
                <button
                  type="button"
                  key={page}
                  disabled={active}
                  onClick={() => handlePageChange(page)}
                  className={`
                      flex h-8 w-8
                      items-center justify-center
                      rounded-lg
                      text-xs font-semibold
                      transition
                      ${
                        active
                          ? "bg-cyan-500 text-white shadow-sm shadow-cyan-500/20"
                          : "border border-slate-200 bg-white text-slate-500 hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-500"
                      }
                    `}
                >
                  {page}
                </button>
              );
            })}

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="
                flex h-8 w-8 items-center justify-center
                rounded-lg
                border border-slate-200
                bg-white
                text-slate-400
                transition
                hover:border-cyan-200
                hover:bg-cyan-50
                hover:text-cyan-500
                disabled:pointer-events-none
                disabled:opacity-35
              "
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
