import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import TourDetailHeader from "../../components/user/TourDetailHeader";
import TourGallery from "../../components/user/TourGallery";
import TourQuickInfo from "../../components/user/TourQuickInfo";
import TourIntroduction from "../../components/user/TourIntroduction";
import TourItinerary from "../../components/user/TourItinerary";
import TourIncluded from "../../components/user/TourIncluded";
import TourExcluded from "../../components/user/TourExcluded";
import TourBookingCard from "../../components/user/TourBookingCard";
import GalleryModal from "../../components/user/GalleryModal";
import TourWeather from "../../components/user/TourWeather";
import Loading from "../../components/Loading";
import api from "../../api/api";
import TourTrailer from "../../components/user/TourTrailer";
import TourPromotion from "../../components/user/TourPromotion";

export default function TourDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeImage, setActiveImage] = useState(null);
  const [showGallery, setShowGallery] = useState(false);

  const [adultGuests, setAdultGuests] = useState(2);
  const [childGuests, setChildGuests] = useState(0);

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchTourDetail = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/api/tour/id=${id}`);
        const tourData = response?.data;

        if (!tourData) {
          setTour(null);
          return;
        }

        const images = Array.isArray(tourData.tourImageDTOS)
          ? tourData.tourImageDTOS
          : [];

        const thumbnailIndex = images.findIndex(
          (image) => image?.thumbnail === true,
        );

        const firstImageIndex = thumbnailIndex >= 0 ? thumbnailIndex : 0;

        setActiveImage(firstImageIndex);

        const formattedTour = {
          ...tourData,

          id: tourData.idTour,
          idTour: tourData.idTour,

          nameTour: tourData.nameTour,

          title: tourData.nameTour || "Tour du lịch",

          description: tourData.description || "Chưa có thông tin mô tả.",

          description2: tourData.description || "Chưa có thông tin mô tả.",

          time: tourData.time,

          duration: tourData.time || "Chưa cập nhật",

          timeDepart: tourData.timeDepart,

          dateDepart: tourData.dateDepart,

          departure: tourData.dateDepart || "Lịch linh hoạt",

          maxPeople: tourData.maxPeople,

          people: `2 - ${tourData.maxPeople || 0} người`,

          priceAdult: tourData.priceAdult,

          priceChildren: tourData.priceChildren,

          pricing: {
            adult: tourData.priceAdult || 0,
            child: tourData.priceChildren || 0,
          },

          contactPhone: tourData.contactPhone,

          contactEmail: tourData.contactEmail,

          destination: tourData.destination || "Việt Nam",

          location: tourData.destination || "Việt Nam",

          introVideo: tourData.introVideo,

          promotionLink: tourData.promotionLink,

          weather: tourData.weather,

          weatherForDate: tourData.weatherForDate,

          weatherUpdatedAt: tourData.weatherUpdatedAt,

          weatherType: tourData.weatherType,

          temperatureMin: tourData.temperatureMin,

          temperatureMax: tourData.temperatureMax,

          precipitationProbability: tourData.precipitationProbability,

          precipitationSum: tourData.precipitationSum,

          windSpeedMax: tourData.windSpeedMax,

          statusTour: tourData.statusTour,

          staffId: tourData.staffId,

          nameStaff: tourData.nameStaff,

          categoryId: tourData.categoryId,

          nameCategory: tourData.nameCategory,

          category: tourData.nameCategory || "Du lịch",

          tourImageDTOS: images,

          images: images.map((image) => image?.imgaeUrl).filter(Boolean),

          image: images[firstImageIndex]?.imgaeUrl || null,

          tourItinerariesDTOS: Array.isArray(tourData.tourItinerariesDTOS)
            ? tourData.tourItinerariesDTOS
            : [],

          tourPriceInclusionDTOS: Array.isArray(tourData.tourPriceInclusionDTOS)
            ? tourData.tourPriceInclusionDTOS
            : [],

          includes: Array.isArray(tourData.tourPriceInclusionDTOS)
            ? tourData.tourPriceInclusionDTOS
                .filter((item) => item?.typeTourPrice === "INCLUDED")
                .map((item) => ({
                  ...item,
                  text: item.nameService,
                }))
            : [],

          excludes: Array.isArray(tourData.tourPriceInclusionDTOS)
            ? tourData.tourPriceInclusionDTOS
                .filter((item) => item?.typeTourPrice === "NOT_INCLUDED")
                .map((item) => ({
                  ...item,
                  text: item.nameService,
                }))
            : [],

          itinerary: Array.isArray(tourData.tourItinerariesDTOS)
            ? tourData.tourItinerariesDTOS.map((itinerary, index) => {
                const details = Array.isArray(
                  itinerary?.tourItinerariesDetailDTOS,
                )
                  ? itinerary.tourItinerariesDetailDTOS
                  : [];

                return {
                  ...itinerary,

                  idTourItineraries: itinerary.idTourItineraries,

                  title: itinerary.title || `Ngày ${index + 1}`,

                  description: itinerary.description || "",

                  day: `Ngày ${String(index + 1).padStart(2, "0")}`,

                  image: details[0]?.imageUrl || null,

                  createdAt: itinerary.createdAt,

                  updatedAt: itinerary.updatedAt,

                  tourItinerariesDetailDTOS: details,

                  meals: [],

                  sessions: details.map((detail) => ({
                    ...detail,

                    idTourItinerariesDetail: detail.idTourItinerariesDetail,

                    title: detail.title || "Hoạt động",

                    time: detail.title || "",

                    description: detail.description || "",

                    image: detail.imageUrl || null,

                    imageUrl: detail.imageUrl || null,

                    imagePublicId: detail.imagePublicId,

                    createdAt: detail.createdAt,

                    updatedAt: detail.updatedAt,
                  })),
                };
              })
            : [],

          createdAt: tourData.createdAt,

          updatedAt: tourData.updatedAt,
        };

        setTour(formattedTour);
      } catch (error) {
        setTour(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTourDetail();
    }
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!tour) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-800">
            Không tìm thấy tour
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Tour bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>

          <button
            type="button"
            onClick={() => navigate("/tours")}
            className="
              mt-6
              rounded-xl
              bg-cyan-600
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-cyan-700
            "
          >
            Quay lại danh sách tour
          </button>
        </div>
      </div>
    );
  }

  const adultTotal = (tour.pricing?.adult || 0) * adultGuests;

  const childTotal = (tour.pricing?.child || 0) * childGuests;

  const totalPrice = adultTotal + childTotal;

  const nextImage = () => {
    const images = tour.tourImageDTOS || [];

    if (images.length <= 1) {
      return;
    }

    setActiveImage((prev) => {
      const current = prev === null || prev === undefined ? 0 : prev;

      return current >= images.length - 1 ? 0 : current + 1;
    });
  };

  const previousImage = () => {
    const images = tour.tourImageDTOS || [];

    if (images.length <= 1) {
      return;
    }

    setActiveImage((prev) => {
      const current = prev === null || prev === undefined ? 0 : prev;

      return current <= 0 ? images.length - 1 : current - 1;
    });
  };

  const handleImageChange = (index) => {
    const images = tour.tourImageDTOS || [];

    if (index < 0 || index >= images.length) {
      return;
    }

    setActiveImage(index);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <div
        className="
          mx-auto
          max-w-7xl
          px-4
          pt-6
          sm:px-6
          lg:px-8
        "
      >
        <TourDetailHeader
          tour={tour}
          liked={liked}
          onLike={() => setLiked((prev) => !prev)}
          onBack={() => navigate("/tours")}
        />

        <div className="mb-6 mt-4 flex items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-cyan-50 px-4 py-2 text-sm font-bold text-cyan-700">
            {tour?.nameCategory || "Chưa phân loại"}
          </span>

          {tour?.destination && (
            <span className="text-sm text-slate-500">{tour.destination}</span>
          )}
        </div>

        <div
          className="
            grid
            items-start
            gap-8
            lg:grid-cols-[minmax(0,1fr)_380px]
          "
        >
          <div className="min-w-0">
            <TourGallery
              images={tour.tourImageDTOS || []}
              activeImage={activeImage}
              onImageChange={handleImageChange}
              onPrevious={previousImage}
              onNext={nextImage}
              onOpenGallery={() => setShowGallery(true)}
            />

            <div className="mt-5">
              <TourQuickInfo tour={tour} />
            </div>

            <div className="mt-6">
              <TourPromotion promotionLink={tour.promotionLink} />
            </div>

            <div className="mt-6">
              <TourWeather tour={tour} />
            </div>

            <div className="mt-10">
              <TourIntroduction tour={tour} />
            </div>

            <div className="mt-10">
              <TourTrailer videoUrl={tour.introVideo} />
            </div>

            <div className="mt-10">
              <TourItinerary itinerary={tour.itinerary} />
            </div>

            <div className="mt-10">
              <TourIncluded includes={tour.includes} />
            </div>

            <div className="mt-10">
              <TourExcluded excludes={tour.excludes} />
            </div>
          </div>

          <div className="min-w-0">
            <TourBookingCard
              tour={tour}
              adultGuests={adultGuests}
              childGuests={childGuests}
              adultTotal={adultTotal}
              childTotal={childTotal}
              totalPrice={totalPrice}
              setAdultGuests={setAdultGuests}
              setChildGuests={setChildGuests}
            />
          </div>
        </div>
      </div>

      {showGallery && (
        <GalleryModal
          images={tour.tourImageDTOS || []}
          activeImage={activeImage}
          onImageChange={handleImageChange}
          onPrevious={previousImage}
          onNext={nextImage}
          onClose={() => setShowGallery(false)}
        />
      )}
    </div>
  );
}
