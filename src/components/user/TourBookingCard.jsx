import { CalendarDays, ShieldCheck } from "lucide-react";

import GuestCounter from "./GuestCounter";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN").format(price || 0) + "đ";

export default function TourBookingCard({
  tour,
  adultGuests,
  childGuests,
  adultTotal,
  childTotal,
  totalPrice,
  setAdultGuests,
  setChildGuests,
}) {
  const adultPrice =
    tour?.priceAdult ?? tour?.pricing?.adult ?? 0;

  const childPrice =
    tour?.priceChildren ?? tour?.pricing?.child ?? 0;

  const dateDepart =
    tour?.dateDepart || "Chưa cập nhật";

  const timeDepart = tour?.timeDepart
    ? tour.timeDepart.slice(0, 5)
    : "";

  const handleContactZalo = () => {
    const phone = tour?.contactPhone;

    if (!phone) {
      alert("Tour chưa có số điện thoại liên hệ.");
      return;
    }

    // Chỉ giữ lại số
    let zaloPhone = String(phone).replace(/\D/g, "");

    // Nếu số dạng 84xxxxxxxxx -> đổi thành 0xxxxxxxxx
    if (zaloPhone.startsWith("84")) {
      zaloPhone = "0" + zaloPhone.slice(2);
    }

    // Kiểm tra số điện thoại Việt Nam cơ bản
    if (!/^0\d{9}$/.test(zaloPhone)) {
      alert("Số điện thoại liên hệ không hợp lệ.");
      return;
    }

    window.open(
      `https://zalo.me/${zaloPhone}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <aside className="lg:relative">
      <div
        className="
          sticky
          top-6
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-xl
          shadow-slate-200/50
        "
      >
        <div
          className="
            border-b
            border-slate-100
            p-6
          "
        >
          <div className="text-sm text-slate-400">
            Giá tour từ
          </div>

          <div className="mt-3">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-slate-600">
                Người lớn
              </span>

              <span className="text-2xl font-extrabold text-cyan-600">
                {formatPrice(adultPrice)}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-slate-600">
                Trẻ em
              </span>

              <span className="text-xl font-bold text-cyan-600">
                {formatPrice(childPrice)}
              </span>
            </div>

            <p className="mt-1 text-right text-xs text-slate-400">
              Trẻ em từ 5 - 11 tuổi
            </p>
          </div>
        </div>
        <div className="space-y-6 p-6">

          {/* NGÀY KHỞI HÀNH */}
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-700
              "
            >
              Ngày khởi hành
            </label>

            <button
              type="button"
              className="
                flex
                h-12
                w-full
                items-center
                gap-3
                rounded-xl
                border
                border-slate-200
                px-4
                text-left
                transition
                hover:border-cyan-400
              "
            >
              <CalendarDays
                size={18}
                className="text-cyan-600"
              />

              <span className="text-sm text-slate-500">
                {dateDepart}
                {timeDepart && ` - ${timeDepart}`}
              </span>
            </button>
          </div>

          {/* SỐ LƯỢNG KHÁCH */}
          <div>
            <label
              className="
                mb-3
                block
                text-sm
                font-semibold
                text-slate-700
              "
            >
              Số lượng khách
            </label>

            <div className="space-y-4">
              <GuestCounter
                label="Người lớn"
                description="Từ 12 tuổi"
                price={adultPrice}
                value={adultGuests}
                min={1}
                onDecrease={() =>
                  setAdultGuests((v) =>
                    Math.max(1, v - 1)
                  )
                }
                onIncrease={() =>
                  setAdultGuests((v) => v + 1)
                }
              />

              <GuestCounter
                label="Trẻ em"
                description="Từ 5 - 11 tuổi"
                price={childPrice}
                value={childGuests}
                min={0}
                onDecrease={() =>
                  setChildGuests((v) =>
                    Math.max(0, v - 1)
                  )
                }
                onIncrease={() =>
                  setChildGuests((v) => v + 1)
                }
              />
            </div>
          </div>
          <div
            className="
              rounded-2xl
              bg-slate-50
              p-4
            "
          >
            <div
              className="
                flex
                justify-between
                gap-4
                text-sm
                text-slate-500
              "
            >
              <span>
                Người lớn × {adultGuests}
              </span>

              <span className="font-semibold text-slate-700">
                {formatPrice(adultTotal)}
              </span>
            </div>

            {childGuests > 0 && (
              <div
                className="
                  mt-2
                  flex
                  justify-between
                  gap-4
                  text-sm
                  text-slate-500
                "
              >
                <span>
                  Trẻ em × {childGuests}
                </span>

                <span className="font-semibold text-slate-700">
                  {formatPrice(childTotal)}
                </span>
              </div>
            )}

            <div className="my-4 border-t border-slate-200" />

            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">
                Tổng cộng
              </span>

              <span className="text-xl font-extrabold text-cyan-600">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleContactZalo}
            className="
              flex
              h-12
              w-full
              items-center
              justify-center
              rounded-xl
              border
              border-cyan-200
              bg-cyan-50
              font-semibold
              text-cyan-700
              transition
              hover:border-cyan-300
              hover:bg-cyan-100
              active:scale-[0.98]
            "
          >
            Liên hệ tư vấn
          </button>

          {/* BẢO MẬT */}
          <div
            className="
              flex
              items-center
              justify-center
              gap-2
              text-xs
              text-slate-400
            "
          >
            <ShieldCheck
              size={15}
              className="text-emerald-500"
            />

            Đặt tour an toàn và bảo mật
          </div>
        </div>
      </div>
    </aside>
  );
}