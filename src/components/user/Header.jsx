import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronDown, MapPin, BookOpen } from "lucide-react";
import logo from "../../assets/logo.png";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `group relative flex items-center px-1 py-2 text-[15px] font-semibold transition-all duration-300 ${
      isActive ? "text-cyan-500" : "text-slate-700 hover:text-cyan-500"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[82px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link
          to="/"
          className="group flex h-full items-center"
          onClick={() => setIsOpen(false)}
        >
          <img
            src={logo}
            alt="VietFly Travel"
            className="h-[72px] w-auto max-w-[190px] object-contain transition-all duration-300 group-hover:scale-[1.03]"
          />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          <NavLink to="/" className={navLinkClass}>
            {({ isActive }) => (
              <>
                <span>Trang chủ</span>

                <span
                  className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-cyan-500 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </>
            )}
          </NavLink>

          <NavLink to="/tours" className={navLinkClass}>
            {({ isActive }) => (
              <>
                <span>Tour</span>

                <span
                  className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-cyan-500 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </>
            )}
          </NavLink>

          <NavLink to="/about" className={navLinkClass}>
            {({ isActive }) => (
              <>
                <span>Về VietFly</span>

                <span
                  className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-cyan-500 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </>
            )}
          </NavLink>

          <NavLink to="/contact" className={navLinkClass}>
            {({ isActive }) => (
              <>
                <span>Liên hệ</span>

                <span
                  className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-cyan-500 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </>
            )}
          </NavLink>
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-all duration-200 hover:border-cyan-500 hover:bg-[color:var(--primary-soft)] hover:text-cyan-500 lg:hidden"
          aria-label="Mở menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X size={23} strokeWidth={2} />
          ) : (
            <Menu size={23} strokeWidth={2} />
          )}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-slate-100 bg-white transition-all duration-300 lg:hidden ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-5 py-4">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `mb-1 flex items-center rounded-xl px-4 py-3.5 text-[15px] font-semibold transition ${
                isActive
                  ? "bg-[color:var(--primary-soft)] text-cyan-500"
                  : "text-slate-700 hover:bg-slate-50 hover:text-cyan-500"
              }`
            }
          >
            Trang chủ
          </NavLink>

          <NavLink
            to="/tours"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `mb-1 flex items-center rounded-xl px-4 py-3.5 text-[15px] font-semibold transition ${
                isActive
                  ? "bg-[color:var(--primary-soft)] text-cyan-500"
                  : "text-slate-700 hover:bg-slate-50 hover:text-cyan-500"
              }`
            }
          >
            Tour
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `mb-1 flex items-center rounded-xl px-4 py-3.5 text-[15px] font-semibold transition ${
                isActive
                  ? "bg-[color:var(--primary-soft)] text-cyan-500"
                  : "text-slate-700 hover:bg-slate-50 hover:text-cyan-500"
              }`
            }
          >
            Về VietFly
          </NavLink>

          <NavLink
            to="/contact"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `mb-1 flex items-center rounded-xl px-4 py-3.5 text-[15px] font-semibold transition ${
                isActive
                  ? "bg-[color:var(--primary-soft)] text-cyan-500"
                  : "text-slate-700 hover:bg-slate-50 hover:text-cyan-500"
              }`
            }
          >
            Liên hệ
          </NavLink>

          <div className="mt-2 border-t border-slate-100 pt-2">
            <button
              type="button"
              onClick={() => setIsExploreOpen(!isExploreOpen)}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-cyan-500"
            >
              <span>Khám phá</span>

              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${
                  isExploreOpen ? "rotate-180 text-cyan-500" : ""
                }`}
              />
            </button>

            {isExploreOpen && (
              <div className="mt-1 space-y-1 pl-3">
                <Link
                  to="/destinations"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 transition hover:bg-[color:var(--primary-soft)] hover:text-cyan-500"
                >
                  <MapPin size={17} />
                  Điểm đến
                </Link>

                <Link
                  to="/blogs"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 transition hover:bg-[color:var(--primary-soft)] hover:text-cyan-500"
                >
                  <BookOpen size={17} />
                  Cẩm nang du lịch
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
