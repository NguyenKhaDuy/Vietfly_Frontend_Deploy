/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BadgeDollarSign, LoaderCircle } from "lucide-react";

import api from "../../api/api";

import TourPriceTourInfo from "../../components/admin/TourPriceTourInfo";
import TourPriceIncluded from "../../components/admin/TourPriceIncluded";
import TourPriceExcluded from "../../components/admin/TourPriceExcluded";

export default function TourPriceManagement() {
  const navigate = useNavigate();
  const { idTour } = useParams();
  const { state } = useLocation();

  const tour = state?.tour;

  const [included, setIncluded] = useState([]);
  const [excluded, setExcluded] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!idTour) {
      setError("Không tìm thấy ID tour.");
      setLoading(false);
      return;
    }

    const fetchTourPriceInclusion = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/api/price-inclusion/tour/id=${idTour}`,
        );

        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.data || [];

        const includedData = data.filter(
          (item) => item.typeTourPrice === "INCLUDED",
        );

        const excludedData = data.filter(
          (item) => item.typeTourPrice === "NOT_INCLUDED",
        );

        setIncluded(includedData);
          setExcluded(excludedData);
      } catch (err) {
        const message =
          err?.response?.data?.message || "Không thể tải thông tin giá tour.";

        setError(message);

        setIncluded([]);
        setExcluded([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTourPriceInclusion();
  }, [idTour]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <LoaderCircle size={32} className="animate-spin text-cyan-500" />

          <p className="text-sm text-slate-500">
            Đang tải thông tin giá tour...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-800"
          >
            <ArrowLeft size={17} />
            Quay lại
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500 text-white shadow-lg shadow-cyan-500/20">
              <BadgeDollarSign size={22} />
            </div>

            <div>
              <p className="text-sm font-semibold text-cyan-500">
                TOUR PRICE MANAGEMENT
              </p>

              <h1 className="text-2xl font-bold text-slate-900">
                Quản lý giá tour
              </h1>
            </div>
          </div>

          <p className="mt-3 text-sm text-slate-500">
            Quản lý các khoản chi phí đã bao gồm và chưa bao gồm trong giá tour.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* TOUR INFO */}
        <TourPriceTourInfo tour={tour} idTour={idTour} />

        {/* INCLUDED / EXCLUDED */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TourPriceIncluded
            included={included}
            setIncluded={setIncluded}
            tourId={idTour}
          />

          <TourPriceExcluded
            excluded={excluded}
            setExcluded={setExcluded}
            tourId={idTour}
          />
        </div>
      </div>
    </div>
  );
}
