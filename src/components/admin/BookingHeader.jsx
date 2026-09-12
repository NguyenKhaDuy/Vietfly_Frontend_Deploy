import { CalendarCheck, Plus } from "lucide-react";

export default function BookingHeader() {
  return (
    <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500 text-white shadow-lg shadow-blue-600/20">
            <CalendarCheck size={19} />
          </div>

          <span className="text-sm font-semibold text-cyan-500">
            BOOKING MANAGEMENT
          </span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          Quản lý Booking
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Theo dõi, kiểm tra và quản lý các đơn đặt tour trên hệ thống VietFly.
        </p>
      </div>
    </div>
  );
}
