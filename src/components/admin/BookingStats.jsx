import { CalendarCheck, Clock3, CheckCircle2, XCircle } from "lucide-react";

import BookingStatCard from "./BookingStatCard";

export default function BookingStats({ bookings }) {
  const pending = bookings.filter(
    (item) => item.statusTour === "PENDING",
  ).length;

  const confirmed = bookings.filter(
    (item) => item.statusTour === "CONFIRMED",
  ).length;

  const cancelled = bookings.filter(
    (item) => item.statusTour === "CANCELLED",
  ).length;

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <BookingStatCard
        icon={<CalendarCheck size={20} />}
        title="Tổng Booking"
        value={bookings.length}
        description="Tất cả đơn đặt tour"
      />

      <BookingStatCard
        icon={<Clock3 size={20} />}
        title="Chờ xác nhận"
        value={pending}
        description="Booking đang chờ xử lý"
        variant="warning"
      />

      <BookingStatCard
        icon={<CheckCircle2 size={20} />}
        title="Đã xác nhận"
        value={confirmed}
        description="Booking đã được xác nhận"
        variant="success"
      />

      <BookingStatCard
        icon={<XCircle size={20} />}
        title="Đã hủy"
        value={cancelled}
        description="Booking đã bị hủy"
        variant="danger"
      />
    </div>
  );
}
