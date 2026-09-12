import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import TourCard from "./TourCard";
import Loading from "../Loading";
import api from "../../api/api";

function shuffleTours(tours) {
  return [...tours].sort(() => Math.random() - 0.5);
}

function FeaturedTours() {
  const sliderRef = useRef(null);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await api.get("/api/tour");

        const responseData =
          response &&
          typeof response === "object" &&
          !Array.isArray(response) &&
          (response.totalPages !== undefined ||
            response.currentPage !== undefined)
            ? response
            : response?.data;

        const tourData = Array.isArray(responseData?.data)
          ? responseData.data
          : Array.isArray(responseData)
            ? responseData
            : Array.isArray(response?.data?.data)
              ? response.data.data
              : Array.isArray(response?.data)
                ? response.data
                : [];

        const randomTours = shuffleTours(tourData)
          .slice(0, 6)
          .map((tour) => {
            const tourImages = Array.isArray(tour?.tourImageDTOS)
              ? tour.tourImageDTOS
              : [];

            const thumbnail =
              tourImages.find(
                (image) =>
                  image?.thumbnail === true || image?.isThumbnail === true,
              ) || tourImages[0];

            return {
              ...tour,
              id: tour?.idTour,
              image:
                thumbnail?.imgaeUrl ||
                thumbnail?.imageUrl ||
                thumbnail?.url ||
                "",
              location: tour?.destination || "Việt Nam",
              destination: tour?.destination || "Việt Nam",
              title: tour?.nameTour || "Tour du lịch",
              duration: tour?.time || "Chưa cập nhật",
              people: tour?.maxPeople
                ? `2 - ${tour.maxPeople} người`
                : "Chưa cập nhật",
              dateDepart: tour?.dateDepart || "Lịch linh hoạt",
              price:
                tour?.priceAdult !== null && tour?.priceAdult !== undefined
                  ? Number(tour.priceAdult)
                  : 0,
            };
          });

        setTours(randomTours);
      } catch (error) {
        console.error("Lỗi lấy danh sách tour:", error);
        setTours([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    const cardWidth =
      window.innerWidth >= 1024 ? 390 : window.innerWidth >= 640 ? 360 : 300;

    const gap = 20;

    sliderRef.current.scrollBy({
      left: direction === "next" ? cardWidth + gap : -(cardWidth + gap),
      behavior: "smooth",
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan-100/50 blur-3xl" />

        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-cyan-500" />

              <span className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-600">
                Khám phá hành trình
              </span>

              <span className="h-px w-10 bg-cyan-500" />
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Tour <span className="text-cyan-600">nổi bật</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              Những hành trình được yêu thích tại VietFly Travel, được lựa chọn
              để mang đến cho bạn những trải nghiệm đáng nhớ.
            </p>
          </div>

          <div className="mt-7 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => scroll("prev")}
              aria-label="Tour trước"
              className="
                flex h-11 w-11 items-center justify-center
                rounded-full
                border border-slate-200
                bg-white
                text-slate-600
                shadow-sm
                transition-all duration-300
                hover:border-cyan-500
                hover:bg-cyan-500
                hover:text-white
                hover:shadow-lg
                hover:shadow-cyan-500/20
              "
            >
              <ChevronLeft size={19} />
            </button>

            <button
              type="button"
              onClick={() => scroll("next")}
              aria-label="Tour tiếp theo"
              className="
                flex h-11 w-11 items-center justify-center
                rounded-full
                border border-slate-200
                bg-white
                text-slate-600
                shadow-sm
                transition-all duration-300
                hover:border-cyan-500
                hover:bg-cyan-500
                hover:text-white
                hover:shadow-lg
                hover:shadow-cyan-500/20
              "
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </div>

        {tours.length > 0 ? (
          <div
            ref={sliderRef}
            className="
              flex
              items-stretch
              gap-5
              overflow-x-auto
              scroll-smooth
              pb-6
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="
                  h-[555px]
                  w-[300px]
                  shrink-0
                  sm:h-[555px]
                  sm:w-[360px]
                  lg:h-[555px]
                  lg:w-[390px]
                "
              >
                <TourCard tour={tour} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
            <p className="text-base font-semibold text-slate-700">
              Chưa có tour nổi bật
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Hiện chưa có tour nào được cập nhật.
            </p>
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Link
            to="/tours"
            className="
              group
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-slate-200
              bg-white
              px-6
              py-3
              text-sm
              font-bold
              text-slate-700
              shadow-sm
              transition-all duration-300
              hover:border-cyan-500
              hover:bg-cyan-500
              hover:text-white
              hover:shadow-lg
              hover:shadow-cyan-500/20
            "
          >
            <span>Khám phá tất cả tour</span>

            <ArrowRight
              size={17}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedTours;
