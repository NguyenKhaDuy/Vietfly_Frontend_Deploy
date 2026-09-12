import { useLocation, useNavigate, useParams } from "react-router-dom";

import TourHeader from "../../components/admin/TourHeader";
import TourHero from "../../components/admin/TourHero";
import TourGallery from "../../components/admin/TourGallery";
import TourInformation from "../../components/admin/TourInformation";
import TourContact from "../../components/admin/TourContact";
import TourManagement from "../../components/admin/TourManagement";
import TourWeather from "../../components/admin/TourWeather";
import TourVideo from "../../components/admin/TourVideo";
import TourItinerary from "../../components/admin/TourItinerary";
import TourPriceInclusion from "../../components/admin/TourPriceInclusion";
import TourSystemInfo from "../../components/admin/TourSystemInfo";
import TourPromotion from "../../components/user/TourPromotion";

function getStatus(status) {
  const map = {
    ACTIVE: {
      label: "Đang hoạt động",
      className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },

    HIDE: {
      label: "Đã đóng",
      className: "bg-slate-100 text-slate-600 border-slate-200",
    },
  };

  return (
    map[status] || {
      label: status || "Chưa xác định",
      className: "bg-slate-100 text-slate-600 border-slate-200",
    }
  );
}

export default function TourDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { idTour } = useParams();
  const tour = location.state?.tour;

  if (!tour) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-sm font-medium text-slate-700">
              Không tìm thấy thông tin tour
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Vui lòng quay lại danh sách tour và chọn lại tour.
            </p>

            <button
              onClick={() => navigate("/admin/tours")}
              className="mt-5 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-600"
            >
              Quay lại danh sách
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (tour.idTour !== idTour) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-sm font-medium text-red-600">
              Thông tin tour không hợp lệ.
            </p>

            <button
              onClick={() => navigate("/admin/tours")}
              className="mt-5 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-white"
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  const status = getStatus(tour.statusTour);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-5">
        <TourHeader tour={tour} status={status} navigate={navigate} />

        <TourHero tour={tour} />

        <TourGallery tour={tour} />

        <TourInformation tour={tour} />

        <TourPromotion promotionLink={tour.promotionLink} />

        <TourContact tour={tour} />

        <TourManagement tour={tour} />

        <TourWeather tour={tour} />

        <TourVideo tour={tour} />

        <TourItinerary tour={tour} navigate={navigate} />

        <TourPriceInclusion tour={tour} />

        <TourSystemInfo tour={tour} status={status} />
      </div>
    </div>
  );
}
