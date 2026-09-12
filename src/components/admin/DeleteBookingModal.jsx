export default function DeleteBookingModal({ booking, onClose, onConfirm }) {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="text-lg font-bold text-slate-800">
          Xác nhận xóa booking
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Bạn có chắc chắn muốn xóa booking này không?
          <br />
          Hành động này không thể hoàn tác.
        </p>

        <div className="mt-5 rounded-xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Mã booking</p>

          <p className="mt-1 font-semibold text-slate-800">
            {booking.idBooking}
          </p>

          {booking.fullname && (
            <>
              <p className="mt-3 text-sm text-slate-500">Khách hàng</p>

              <p className="mt-1 font-semibold text-slate-800">
                {booking.fullname}
              </p>
            </>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Hủy
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            Xác nhận xóa
          </button>
        </div>
      </div>
    </div>
  );
}
