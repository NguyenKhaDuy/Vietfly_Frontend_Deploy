import { Link } from "react-router-dom";
import { MapPin, Phone, Building2, ArrowRight } from "lucide-react";

import { FaFacebookF, FaTiktok, FaYoutube } from "react-icons/fa";

import logo from "../../assets/logo.png";

function Footer() {
  const usefulLinks = [
    { to: "/", label: "Về VietFly Travel" },
    { to: "/tours", label: "Câu hỏi thường gặp" },
    { to: "/about", label: "Điều khoản thanh toán" },
    { to: "/contact", label: "Cẩm nang du lịch" },
    { to: "/destinations", label: "Tuyển dụng" },
  ];

  const policyLinks = [
    { to: "/booking", label: "Chính sách đại lý" },
    { to: "/faq", label: "Chính sách hoàn hủy" },
    { to: "/terms", label: "Chính sách riêng tư" },
    { to: "/privacy", label: "Chính sách đối tác" },
    { to: "/policy", label: "Điều khoản website" },
  ];

  const socialLinks = [
    {
      href: "https://web.facebook.com/share/1UFEvYWk9W/?mibextid=wwXIfr&_rdc=1&_rdr",
      label: "Facebook",
      icon: <FaFacebookF size={17} />,
      hover: "hover:border-blue-500 hover:bg-cyan-500 hover:text-white",
    },
    {
      href: "https://www.tiktok.com/@vietflytravel?_r=1&_t=ZS-99f9hhVK8iS",
      label: "TikTok",
      icon: <FaTiktok size={18} />,
      hover: "hover:border-slate-400 hover:bg-black hover:text-white",
    },
    {
      href: "https://www.youtube.com/@vietflytravel?si=D7VFwcu-SgKYnvZu",
      label: "Youtube",
      icon: <FaYoutube size={18} />,
      hover: "hover:border-red-500 hover:bg-red-600 hover:text-white",
    },
  ];

  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Link to="/" className="inline-flex items-center">
              <img
                src={logo}
                alt="VietFly Travel"
                className="h-[72px] w-auto object-contain"
              />
            </Link>

            <p className="mt-5 max-w-sm text-[15px] leading-7 text-slate-400">
              VietFly Travel là thương hiệu hàng đầu về du lịch trải nghiệm
              chuyên sâu, mang đến hành trình an toàn, độc đáo và thân thiện với
              địa phương.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition duration-300 hover:-translate-y-1 ${social.hover}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Thông tin hữu ích
            </h3>

            <ul className="mt-6 space-y-4">
              {usefulLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group flex items-center gap-2 text-[15px] text-slate-400 transition hover:text-white"
                  >
                    <ArrowRight
                      size={15}
                      className="shrink-0 transition-transform group-hover:translate-x-1"
                    />

                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Điều khoản & Chính sách
            </h3>

            <ul className="mt-6 space-y-4">
              {policyLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group flex items-center gap-2 text-[15px] text-slate-400 transition hover:text-white"
                  >
                    <ArrowRight
                      size={15}
                      className="shrink-0 transition-transform group-hover:translate-x-1"
                    />

                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Văn phòng
            </h3>

            <div className="mt-6 space-y-5">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-cyan-600">
                  <MapPin size={22} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium text-cyan-600">
                    Trụ sở chính:
                  </p>

                  <p className="mt-1 whitespace-nowrap text-[15px] leading-6 text-slate-300">
                    A3/68 - Bình Hưng
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-cyan-600">
                  <Building2 size={22} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium text-cyan-600">
                    Phòng giao dịch Hồ Chí Minh:
                  </p>

                  <p className="mt-1 whitespace-nowrap text-[15px] leading-6 text-slate-300">
                    217/4 Thích Quảng Đức - Đức Nhuận
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-cyan-600">
                  <Building2 size={22} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium text-cyan-600">
                    Phòng giao dịch Hà Nội:
                  </p>

                  <p className="mt-1 whitespace-nowrap text-[15px] leading-6 text-slate-300">
                    31 Tô Hiệu - Nguyễn Trãi - Hà Đông
                  </p>

                  <p className="mt-1 whitespace-nowrap text-[15px] leading-6 text-slate-300">
                    HH03-KĐT Thanh Hà Đông
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-cyan-600">
                  <Phone size={22} />
                </div>

                <div>
                  <p className="text-sm font-medium text-cyan-600">
                    Điện thoại:
                  </p>

                  <p className="mt-1 whitespace-nowrap text-[15px] leading-6 text-slate-300">
                    {/* <span className="font-medium text-white">
                      VietFly Travel:
                    </span>{" "} */}
                    0943 296 296 - 0978.744.888
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-[15px] lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p className="text-center text-slate-500 lg:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-slate-300">VietFly Travel</span>
            . All rights reserved.
          </p>

          <div className="flex justify-center gap-6">
            <Link
              to="/privacy"
              className="text-slate-500 transition hover:text-white"
            >
              Bảo mật
            </Link>

            <Link
              to="/terms"
              className="text-slate-500 transition hover:text-white"
            >
              Điều khoản
            </Link>

            <Link
              to="/contact"
              className="text-slate-500 transition hover:text-white"
            >
              Liên hệ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
