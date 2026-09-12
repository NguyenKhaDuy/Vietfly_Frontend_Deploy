import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
  Users,
} from "lucide-react";

import api from "../../api/api";
import Notification from "../../components/Notification";
import Loading from "../../components/Loading";

const inputClass =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-cyan-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10";

const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

function CustomTourRequest() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    destination: "",
    timeDepart: "",
    dateDepart: "",
    numberPeople: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState(null);

  // Tự động tắt notification sau 4 giây
  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [notification]);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.fullname.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.destination.trim() ||
      !formData.timeDepart ||
      !formData.dateDepart ||
      !formData.numberPeople
    ) {
      setNotification({
        type: "warning",
        title: "Thiếu thông tin",
        message: "Vui lòng điền đầy đủ các thông tin bắt buộc.",
      });

      return;
    }

    const numberPeople = Number(formData.numberPeople);

    if (!Number.isInteger(numberPeople) || numberPeople <= 0) {
      setNotification({
        type: "warning",
        title: "Số lượng khách không hợp lệ",
        message: "Vui lòng nhập số lượng khách lớn hơn 0.",
      });

      return;
    }

    try {
      setLoading(true);
      const bookingData = {
        fullname: formData.fullname.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        destination: formData.destination.trim(),
        timeDepart: `${formData.timeDepart}:00`,
        dateDepart: formData.dateDepart,
        numberPeople: numberPeople,
        description: formData.description.trim(),
      };
      await api.post("/api/booking", bookingData);
      setNotification({
        type: "success",
        title: "Gửi yêu cầu thành công",
        message:
          "VietFly Travel đã nhận được yêu cầu. Chúng tôi sẽ liên hệ với bạn sớm.",
      });
      setFormData({
        fullname: "",
        email: "",
        phone: "",
        destination: "",
        timeDepart: "",
        dateDepart: "",
        numberPeople: "",
        description: "",
      });
    } catch (error) {

      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Không thể gửi yêu cầu. Vui lòng thử lại sau.";
      setNotification({
        type: "error",
        title: "Gửi yêu cầu thất bại",
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}
      {notification && (
        <div className="fixed right-5 top-5 z-[10000] w-[380px] max-w-[calc(100vw-2rem)]">
          <Notification
            type={notification.type}
            title={notification.title}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        </div>
      )}

      <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan-100/50 blur-3xl" />

          <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-cyan-500" />

              <span className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-600">
                Tour theo yêu cầu
              </span>

              <span className="h-px w-10 bg-cyan-500" />
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Thiết kế chuyến đi{" "}
              <span className="text-cyan-600">theo cách của bạn</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              Chia sẻ mong muốn của bạn, VietFly Travel sẽ tư vấn và thiết kế
              hành trình phù hợp với thời gian, ngân sách và sở thích riêng.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
                      <Send size={19} />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                        Thông tin chuyến đi
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Hãy để lại thông tin, chúng tôi sẽ liên hệ với bạn sớm.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Fullname */}
                  <div>
                    <label htmlFor="fullname" className={labelClass}>
                      Họ và tên <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="fullname"
                      name="fullname"
                      type="text"
                      value={formData.fullname}
                      onChange={handleChange}
                      placeholder="Nguyễn Văn A"
                      className={inputClass}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <Mail
                        size={17}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={`${inputClass} pl-11`}
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <Phone
                        size={17}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="0987 654 321"
                        className={`${inputClass} pl-11`}
                        required
                      />
                    </div>
                  </div>

                  {/* Destination */}
                  <div>
                    <label htmlFor="destination" className={labelClass}>
                      Điểm đến mong muốn <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <MapPin
                        size={17}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="destination"
                        name="destination"
                        type="text"
                        value={formData.destination}
                        onChange={handleChange}
                        placeholder="Ví dụ: Đà Nẵng, Phú Quốc..."
                        className={`${inputClass} pl-11`}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="dateDepartDisplay" className={labelClass}>
                      Ngày khởi hành <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <CalendarDays
                        size={17}
                        className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                      />

                      {/* Input hiển thị DD/MM/YYYY */}
                      <input
                        id="dateDepartDisplay"
                        type="text"
                        value={
                          formData.dateDepart
                            ? formData.dateDepart.split("-").reverse().join("/")
                            : ""
                        }
                        placeholder="DD/MM/YYYY"
                        readOnly
                        onClick={() =>
                          document
                            .getElementById("dateDepartPicker")
                            ?.showPicker()
                        }
                        className={`${inputClass} cursor-pointer pl-11`}
                        required
                      />

                      {/* Date picker thật */}
                      <input
                        id="dateDepartPicker"
                        type="date"
                        value={formData.dateDepart}
                        onChange={handleChange}
                        name="dateDepart"
                        className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-0"
                        tabIndex={-1}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="timeDepart" className={labelClass}>
                      Giờ khởi hành <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <Clock3
                        size={17}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="timeDepart"
                        name="timeDepart"
                        type="time"
                        value={formData.timeDepart}
                        onChange={handleChange}
                        className={`${inputClass} pl-11`}
                        required
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="numberPeople" className={labelClass}>
                      Số lượng khách <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <Users
                        size={17}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="numberPeople"
                        name="numberPeople"
                        type="number"
                        min="1"
                        value={formData.numberPeople}
                        onChange={handleChange}
                        placeholder="Nhập số lượng khách"
                        className={`${inputClass} pl-11`}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-7">
                  <div className="flex items-center justify-between">
                    <label htmlFor="description" className={labelClass}>
                      Yêu cầu chi tiết
                    </label>

                    <span className="text-xs text-slate-400">
                      Không bắt buộc
                    </span>
                  </div>

                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Ví dụ: muốn nghỉ dưỡng, ưu tiên khách sạn gần biển, có trẻ nhỏ..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-cyan-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10"
                  />
                </div>
                <div className="mt-8 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-md text-xs leading-5 text-slate-400">
                    Thông tin của bạn được bảo mật và chỉ sử dụng cho mục đích
                    tư vấn hành trình.
                  </p>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-slate-900 px-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Đang gửi..." : "Gửi yêu cầu"}

                    {!loading && (
                      <ArrowRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    )}
                  </button>
                </div>
              </form>
            </div>
            <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
                <Phone size={20} />
              </div>

              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-600">
                  Liên hệ nhanh
                </p>

                <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Cần tư vấn ngay?
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-500">
                  Đội ngũ VietFly Travel luôn sẵn sàng hỗ trợ bạn lựa chọn hành
                  trình phù hợp nhất.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                {/* Hotline */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 transition-all hover:border-cyan-200 hover:bg-cyan-50/50">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-cyan-600 shadow-sm">
                      <Phone size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Hotline tư vấn
                      </p>

                      <div className="mt-3 space-y-2">
                        <a
                          href="tel:0943296296"
                          className="block text-sm font-semibold text-slate-700 transition hover:text-cyan-600"
                        >
                          0943 296 296
                        </a>
                        <a
                          href="tel:0943296296"
                          className="block text-sm font-semibold text-slate-700 transition hover:text-cyan-600"
                        >
                          0978.744.888
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Office */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 transition-all hover:border-cyan-200 hover:bg-cyan-50/50">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-cyan-600 shadow-sm">
                      <MapPin size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Trụ sở & văn phòng
                      </p>

                      <div className="mt-4 space-y-4">
                        <div>
                          <p className="text-sm font-bold text-slate-800">
                            Trụ sở chính
                          </p>

                          <p className="mt-1 text-sm leading-6 text-slate-600">
                            A3/68 - Bình Hưng - Hồ Chí Minh
                          </p>
                        </div>

                        <div className="border-t border-slate-200 pt-4">
                          <p className="text-sm font-bold text-slate-800">
                            Văn phòng giao dịch
                          </p>

                          <div className="mt-2 space-y-2 text-sm leading-6 text-slate-600">
                            <p>
                              217/4 Thích Quảng Đức - Đức Nhuận - Hồ Chí Minh
                            </p>

                            <p>31 Tô Hiệu - Nguyễn Trãi - Hà Đông - Hà Nội</p>

                            <p>HH03-KĐT Thanh Hà - Hà Đông - Hà Nội</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Working time */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 transition-all hover:border-cyan-200 hover:bg-cyan-50/50">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-cyan-600 shadow-sm">
                      <Clock3 size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Giờ làm việc
                      </p>

                      <p className="mt-3 text-sm font-semibold text-slate-700">
                        Thứ Hai - Chủ nhật
                      </p>

                      <p className="mt-1 text-sm text-slate-500">24/7</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <CheckCircle2 size={17} className="text-cyan-500" />
                  Tư vấn miễn phí · Không cam kết
                </div>
              </div>
            </aside>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {[
              "Thiết kế theo nhu cầu",
              "Lịch trình linh hoạt",
              "Tư vấn miễn phí",
              "Hỗ trợ tận tâm",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm font-medium text-slate-500"
              >
                <CheckCircle2 size={16} className="text-cyan-500" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default CustomTourRequest;
