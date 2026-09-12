import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import api from "../../api/api";

function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await api.get("/api/banner");

        const banners = Array.isArray(response?.data) ? response.data : [];

        const formattedSlides = banners
          .filter((item) => item?.cloudinaryImage?.imageUrl)
          .map((item) => ({
            id: item.idBanner,
            image: item.cloudinaryImage.imageUrl,
            title: item.title,
            content: item.description,
            position: "center",
          }));

        setSlides(formattedSlides);
        setCurrent(0);
      } catch (error) {
        setSlides([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const nextSlide = () => {
    if (slides.length <= 1) return;

    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (slides.length <= 1) return;

    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <div className="h-[520px] animate-pulse rounded-[28px] bg-slate-200 sm:h-[580px] lg:h-[650px]" />
      </section>
    );
  }

  if (!slides.length) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <div className="flex h-[520px] items-center justify-center rounded-[28px] bg-slate-900 sm:h-[580px] lg:h-[650px]">
          <div className="text-center text-white">
            <p className="text-lg font-semibold">Chưa có banner</p>
            <p className="mt-2 text-sm text-white/60">
              Hiện chưa có nội dung banner để hiển thị.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const slide = slides[current];

  return (
    <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
      <div
        className="
          group
          relative
          h-[520px]
          overflow-hidden
          rounded-[28px]
          bg-slate-900
          shadow-2xl
          shadow-slate-300/40
          sm:h-[580px]
          lg:h-[650px]
        "
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {slides.map((item, index) => (
          <img
            key={item.id}
            src={item.image}
            alt={item.title}
            draggable={false}
            className={`
              absolute
              inset-0
              h-full
              w-full
              select-none
              object-cover
              transition-all
              duration-[1200ms]
              ease-out
              ${
                index === current
                  ? "scale-100 opacity-100"
                  : "scale-[1.08] opacity-0"
              }
            `}
            style={{
              objectPosition: item.position || "center",
            }}
          />
        ))}

        <div className="absolute inset-0 bg-black/20" />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-black/80
            via-black/50
            to-black/10
          "
        />

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-[55%]
            bg-gradient-to-t
            from-black/65
            via-black/20
            to-transparent
          "
        />

        <div className="absolute inset-0 bg-black/10 sm:hidden" />

        <div className="relative z-10 flex h-full items-center">
          <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20">
            <div className="max-w-3xl">
              <div
                key={`label-${current}`}
                className="
                  mb-5
                  flex
                  items-center
                  gap-3
                  animate-[fadeIn_.6s_ease-out]
                "
              >
                <span className="h-px w-10 bg-cyan-500" />

                <span
                  className="
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.3em]
                    text-cyan-500
                    sm:text-xs
                  "
                >
                  VIETFLY TRAVEL
                </span>
              </div>

              <h1
                key={`title-${current}`}
                className="
                  max-w-3xl
                  text-4xl
                  font-bold
                  leading-[1.08]
                  tracking-tight
                  text-white
                  drop-shadow-[0_3px_15px_rgba(0,0,0,0.35)]
                  animate-[fadeInUp_.7s_ease-out]
                  sm:text-5xl
                  lg:text-6xl
                  xl:text-[68px]
                "
              >
                {slide.title}
              </h1>

              <p
                key={`content-${current}`}
                className="
                  mt-6
                  max-w-2xl
                  text-sm
                  leading-7
                  text-white/85
                  drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]
                  animate-[fadeInUp_.9s_ease-out]
                  sm:text-base
                  sm:leading-8
                  lg:text-lg
                "
              >
                {slide.content}
              </p>

              <button
                type="button"
                className="
                  group/btn
                  mt-8
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-white
                  px-6
                  py-3.5
                  text-sm
                  font-bold
                  text-slate-900
                  shadow-xl
                  shadow-black/10
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-cyan-500
                  hover:text-white
                "
              >
                Khám phá hành trình
                <ArrowRight
                  size={17}
                  className="
                    transition-transform
                    duration-300
                    group-hover/btn:translate-x-1
                  "
                />
              </button>
            </div>
          </div>
        </div>

        {slides.length > 1 && (
          <div
            className="
              absolute
              right-5
              top-1/2
              z-20
              hidden
              -translate-y-1/2
              flex-col
              gap-3
              sm:flex
              lg:right-7
            "
          >
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Slide trước"
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-white/25
                bg-black/20
                text-white
                shadow-lg
                backdrop-blur-md
                transition-all
                duration-300
                hover:scale-105
                hover:bg-cyan-500
                hover:text-white
              "
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Slide tiếp theo"
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-white/25
                bg-black/20
                text-white
                shadow-lg
                backdrop-blur-md
                transition-all
                duration-300
                hover:scale-105
                hover:bg-cyan-500
                hover:text-white
              "
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {slides.length > 1 && (
          <>
            <div
              className="
                absolute
                bottom-7
                right-6
                z-20
                flex
                items-center
                gap-3
                text-white
                sm:bottom-9
                sm:right-10
              "
            >
              <span className="text-2xl font-semibold tracking-tight">
                {String(current + 1).padStart(2, "0")}
              </span>

              <span className="h-px w-8 bg-white/40" />

              <span className="text-sm text-white/60">
                {String(slides.length).padStart(2, "0")}
              </span>
            </div>

            <div
              className="
                absolute
                bottom-8
                left-6
                z-20
                flex
                items-center
                gap-2
                sm:bottom-10
                sm:left-10
              "
            >
              {slides.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrent(index)}
                  aria-label={`Chuyển đến slide ${index + 1}`}
                  className={`
                    h-1.5
                    rounded-full
                    transition-all
                    duration-500
                    ${
                      current === index
                        ? "w-10 bg-cyan-500"
                        : "w-5 bg-white/40 hover:bg-white/70"
                    }
                  `}
                />
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-white/15">
              <div
                key={current}
                className="
                  h-full
                  w-full
                  origin-left
                  bg-cyan-500
                  animate-[progress_6s_linear]
                "
              />
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progress {
          from {
            width: 0%;
          }

          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}

export default HeroSlider;
