import { Clock3, Mail, MapPin, Phone } from "lucide-react";

const contactItems = [
  {
    icon: Phone,
    title: "Hotline",
    value: "0943 296 296 - 0978.744.888",
    description: "Tư vấn tour & hỗ trợ nhanh chóng",
  },
  {
    icon: Mail,
    title: "Email",
    value: "thuylinhvietfly@gmail.com",
    description: "Phản hồi trong thời gian sớm nhất",
  },
  {
    icon: MapPin,
    title: "Văn phòng",
    value: "Hà Nội & TP. Hồ Chí Minh",
    description: "Hỗ trợ khách hàng trực tiếp tại văn phòng",
  },
  {
    icon: Clock3,
    title: "Giờ làm việc",
    value: "24/7",
    description: "Thứ Hai - Chủ nhật",
  },
];

function ContactInfo() {
  return (
    <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
      {/* HEADER */}
      <div>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">
          Thông tin liên hệ
        </span>

        <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          Kết nối cùng
          <br />
          <span className="text-cyan-600">VietFly Travel.</span>
        </h2>

        <p className="mt-4 text-sm leading-7 text-slate-500 text-justify">
          Đội ngũ VietFly luôn sẵn sàng lắng nghe và hỗ trợ bạn trong việc lựa
          chọn hành trình phù hợp.
        </p>
      </div>

      {/* CONTACT ITEMS */}
      <div className="mt-8 space-y-3">
        {contactItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="group rounded-2xl border border-slate-100 bg-slate-50 p-5 transition-all duration-300 hover:border-cyan-100 hover:bg-cyan-50/40"
            >
              <div className="flex gap-4">
                {/* ICON */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-cyan-600 shadow-sm transition-colors group-hover:bg-cyan-600 group-hover:text-white">
                  <Icon size={19} strokeWidth={1.8} />
                </div>

                {/* CONTENT */}
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900">
                    {item.title}
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {item.value}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ADDRESS */}
      <div className="mt-6 border-t border-slate-200 pt-6">
        <div className="space-y-3 text-sm leading-6 text-slate-500">
          <div>
            <span className="font-semibold text-slate-800">VP Hà Nội:</span>{" "}
            <br />
            HH03C - 3 Tòa Mới - KĐT Thanh Hà
            <br />
            31 Tố Hữu, Nguyễn Trãi, Hà Đông
          </div>

          <div>
            <span className="font-semibold text-slate-800">VP TP.HCM:</span>{" "}
            <br />
            A3/68 Ấp 1 Bình Hưng, TP. Hồ Chí Minh
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;
