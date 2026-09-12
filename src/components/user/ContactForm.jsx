import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import api from "../../api/api";
import Notification from "../../components/Notification";
import Loading from "../../components/Loading";

function ContactForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    subject: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

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
      !formData.subject ||
      !formData.description.trim()
    ) {
      setNotification({
        type: "warning",
        title: "Thiếu thông tin",
        message: "Vui lòng điền đầy đủ các thông tin.",
      });

      return;
    }

    try {
      setLoading(true);
      const subjectMap = {
        tour: "Tư vấn tour du lịch",
        booking: "Đặt tour",
        flight: "Vé máy bay",
        other: "Nội dung khác",
      };

      const subjectText = subjectMap[formData.subject] || "Nội dung khác";
      const feedbackData = {
        fullname: formData.fullname.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        description:
          `Nội dung quan tâm: ${subjectText}\n\n` + formData.description.trim(),
      };
      await api.post("/api/user/feedback", feedbackData);
      setNotification({
        type: "success",
        title: "Gửi yêu cầu thành công",
        message:
          "Cảm ơn bạn đã liên hệ. VietFly sẽ phản hồi và hỗ trợ bạn trong thời gian sớm nhất.",
      });

      // Reset form
      setFormData({
        fullname: "",
        email: "",
        phone: "",
        subject: "",
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

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        {/* HEADER */}
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
            Gửi yêu cầu
          </span>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Hãy để chúng tôi
            <br />
            <span className="text-cyan-600">đồng hành cùng bạn.</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-500">
            Điền thông tin bên dưới và đội ngũ VietFly sẽ liên hệ với bạn sớm
            nhất.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* NAME */}
          <div>
            <label
              htmlFor="fullname"
              className="mb-2 block text-sm font-semibold text-slate-800"
            >
              Họ và tên
            </label>

            <input
              id="fullname"
              name="fullname"
              type="text"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Nhập họ và tên của bạn"
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
              required
            />
          </div>

          {/* EMAIL + PHONE */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Số điện thoại
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0xxx xxx xxx"
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                required
              />
            </div>
          </div>

          {/* SUBJECT */}
          <div>
            <label
              htmlFor="subject"
              className="mb-2 block text-sm font-semibold text-slate-800"
            >
              Bạn quan tâm đến
            </label>

            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-500 outline-none transition-all focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
              required
            >
              <option value="" disabled>
                Chọn nội dung cần hỗ trợ
              </option>

              <option value="tour">Tư vấn tour du lịch</option>
              <option value="booking">Đặt tour</option>
              <option value="flight">Vé máy bay</option>
              <option value="other">Nội dung khác</option>
            </select>
          </div>

          {/* MESSAGE */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-slate-800"
            >
              Nội dung cần hỗ trợ
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder="Vui lòng mô tả nhu cầu của bạn..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
              required
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 text-sm font-bold text-white shadow-sm transition-all hover:bg-cyan-700 hover:shadow-lg hover:shadow-cyan-600/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Đang gửi..." : "Gửi yêu cầu"}

            {!loading && (
              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            )}
          </button>

          <p className="text-center text-xs text-slate-400">
            Thông tin của bạn được bảo mật và chỉ sử dụng để hỗ trợ yêu cầu.
          </p>
        </form>
      </div>
    </>
  );
}

export default ContactForm;
