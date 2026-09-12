import {
  Eye,
  Pencil,
  Trash2,
  CalendarDays,
  Clock3,
  Users,
  MapPin,
} from "lucide-react";

import BookingStatusBadge from "../admin/BookingStatusBadge";

export default function BookingRow({ booking, onDetail, onStatus, onDelete }) {
  const bookingId = booking.idBooking
    ? `${booking.idBooking.slice(0, 8)}...${booking.idBooking.slice(-4)}`
    : "—";

  const avatarLetter =
    booking.fullname?.trim()?.charAt(0)?.toUpperCase() || "?";

  return (
    <tr
      className="
        group
        h-[76px]
        border-slate-100
        transition-colors
        hover:bg-slate-50/70
      "
    >
      <td className="px-5 py-3">
        <div className="min-w-0">
          <button
            type="button"
            onClick={onDetail}
            title={booking.idBooking}
            className="
              max-w-full
              truncate
              text-left
              text-[13px]
              font-bold
              text-slate-700
              transition
              hover:text-cyan-600
            "
          >
            #{bookingId}
          </button>

          <div className="mt-1 flex items-center gap-1.5">
            <span className="text-[11px] text-slate-400">Đặt</span>

            <span className="truncate text-[11px] text-slate-400">
              {booking.createdAt || "—"}
            </span>
          </div>
        </div>
      </td>

      <td className="px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          {/* AVATAR */}

          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-cyan-50
              text-xs
              font-bold
              text-cyan-600
              ring-1
              ring-cyan-100
            "
          >
            {avatarLetter}
          </div>

          {/* INFO */}

          <div className="min-w-0">
            <p
              className="
                truncate
                text-[13px]
                font-semibold
                text-slate-700
              "
              title={booking.fullname}
            >
              {booking.fullname || "—"}
            </p>

            <p
              className="
                mt-0.5
                truncate
                text-[11px]
                text-slate-400
              "
              title={booking.phone}
            >
              {booking.phone || "Chưa có SĐT"}
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-emerald-50
              text-emerald-600
            "
          >
            <MapPin size={14} />
          </div>

          <span
            className="
              truncate
              text-[13px]
              font-medium
              text-slate-700
            "
            title={booking.destination}
          >
            {booking.destination || "—"}
          </span>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          {/* DATE */}

          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-slate-50
              text-slate-400
            "
          >
            <CalendarDays size={14} />
          </div>

          {/* DATE + TIME */}

          <div className="min-w-0">
            <p
              className="
                whitespace-nowrap
                text-[13px]
                font-semibold
                text-slate-700
              "
            >
              {booking.dateDepart || "—"}
            </p>

            <div
              className="
                mt-0.5
                flex
                items-center
                gap-1
                text-[11px]
                text-slate-400
              "
            >
              <Clock3 size={12} />

              <span>{booking.timeDepart || "—"}</span>
            </div>
          </div>
        </div>
      </td>

      <td className="px-3 py-3 text-center">
        <div
          className="
            inline-flex
            items-center
            gap-1.5
            rounded-lg
            bg-slate-100
            px-2.5
            py-1.5
            text-[12px]
            font-semibold
            text-slate-600
          "
        >
          <Users size={13} className="text-slate-400" />

          <span>{booking.numberPeople ?? 0}</span>
        </div>
      </td>

      <td className="px-3 py-3 whitespace-nowrap">
        <BookingStatusBadge status={booking.statusTour} />
      </td>

      <td className="px-4 py-3">
        <div className="flex justify-end gap-1.5">
          {/* DETAIL */}

          <button
            type="button"
            onClick={onDetail}
            title="Xem chi tiết"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              border
              border-slate-200
              bg-white
              text-slate-400
              transition
              hover:border-cyan-200
              hover:bg-cyan-50
              hover:text-cyan-600
            "
          >
            <Eye size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
}
