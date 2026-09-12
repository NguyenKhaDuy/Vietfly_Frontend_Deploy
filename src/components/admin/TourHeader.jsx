import { ArrowLeft, Route } from "lucide-react";

export default function TourHeader({ tour, status, navigate }) {
  return (
    <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      {/* LEFT */}
      <div className="flex items-start gap-4">
        {/* TRỞ VỀ */}
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-xl
                         bg-white border border-slate-200 text-slate-600
                         hover:bg-slate-100 transition"
        >
          <ArrowLeft size={20} />
        </button>

        {/* TOUR INFO */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500 text-white shadow-lg shadow-blue-600/20">
              <Route size={19} />
            </div>

            <span className="text-sm font-semibold text-cyan-500">
              TOUR MANAGEMENT
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Chi tiết Tour
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Xem thông tin chi tiết và quản lý lịch trình của tour VietFly.
          </p>

          <div className="mt-2 flex items-center gap-3">
            <span className="text-xs text-slate-400">ID: {tour.idTour}</span>

            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${status.className}`}
            >
              {status.label}
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() =>
            navigate(`/staff/tours/${tour.idTour}/itineraries`, {
              state: { tour },
            })
          }
          className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-cyan-600"
        >
          <Route size={18} />
          Quản lý lịch trình
        </button>
      </div>
    </div>
  );
}
