/* eslint-disable react-hooks/set-state-in-effect */

import { ArrowLeft, Plus, Route, CalendarDays, List } from "lucide-react";

import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import ItineraryCard from "../../components/admin/ItineraryCard";
import ItineraryModal from "../../components/admin/ItineraryModal";
import ItineraryDetailModal from "../../components/admin/ItineraryDetailModal";
import Notification from "../../components/Notification";
import ConfirmModal from "../../components/admin/ConfirmModal";

import api from "../../api/api";

export default function TourItineraryManagement() {
  const navigate = useNavigate();
  const location = useLocation();
  const { idTour } = useParams();

  const [tour, setTour] = useState(location.state?.tour || null);
  const [loading, setLoading] = useState(false);

  const [showItineraryModal, setShowItineraryModal] = useState(false);
  const [editingItinerary, setEditingItinerary] = useState(null);

  const [showDeleteItineraryModal, setShowDeleteItineraryModal] =
    useState(false);

  const [deletingItinerary, setDeletingItinerary] = useState(null);
  const [deletingItineraryLoading, setDeletingItineraryLoading] =
    useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [selectedItinerary, setSelectedItinerary] = useState(null);

  const [editingDetail, setEditingDetail] = useState(null);

  const [showDeleteDetailModal, setShowDeleteDetailModal] = useState(false);

  const [deletingDetail, setDeletingDetail] = useState(null);

  const [deletingDetailLoading, setDeletingDetailLoading] = useState(false);

  const [notification, setNotification] = useState(null);

  const showNotification = (type, title, message) => {
    setNotification({
      type,
      title,
      message,
    });
  };

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification]);

  const parseCreatedAt = (dateString) => {
    if (!dateString) return 0;

    try {
      const [datePart, timePart = "00:00:00"] = dateString.split(" ");

      if (!datePart) return 0;

      const [day, month, year] = datePart.split("/").map(Number);

      const [hour = 0, minute = 0, second = 0] = timePart
        .split(":")
        .map(Number);

      return new Date(year, month - 1, day, hour, minute, second).getTime();
    } catch (error) {
      console.error("Parse createdAt error:", dateString, error);

      return 0;
    }
  };

  const loadItineraries = async () => {
    if (!idTour) return;

    try {
      setLoading(true);

      const response = await api.get(`/api/itinerary/tour/id=${idTour}`);

      const itineraryData = Array.isArray(response.data)
        ? response.data
        : response.data?.data;

      const sortedItineraries = Array.isArray(itineraryData)
        ? [...itineraryData].sort((a, b) => {
            return parseCreatedAt(a.createdAt) - parseCreatedAt(b.createdAt);
          })
        : [];

      setTour((prev) => ({
        ...(prev || {}),
        tourItinerariesDTOS: sortedItineraries,
      }));
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Không thể tải lịch trình của tour.";

      showNotification("error", "Tải lịch trình thất bại", message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItineraries();
  }, [idTour]);

  const itineraries = Array.isArray(tour?.tourItinerariesDTOS)
    ? tour.tourItinerariesDTOS
    : [];

  const totalDetails = itineraries.reduce((total, itinerary) => {
    const details = itinerary.tourItinerariesDetailDTOS;

    return total + (Array.isArray(details) ? details.length : 0);
  }, 0);

  const handleAddItinerary = () => {
    setEditingItinerary(null);
    setShowItineraryModal(true);
  };

  const handleEditItinerary = (itinerary) => {
    setEditingItinerary(itinerary);
    setShowItineraryModal(true);
  };

  const handleDeleteItinerary = (itinerary) => {
    setDeletingItinerary(itinerary);
    setShowDeleteItineraryModal(true);
  };

  const handleConfirmDeleteItinerary = async () => {
    if (!deletingItinerary?.idTourItineraries) {
      return;
    }

    try {
      setDeletingItineraryLoading(true);

      const itineraryId = deletingItinerary.idTourItineraries;

      await api.delete(`/api/admin/tour-itinerary/id=${itineraryId}`);

      setShowDeleteItineraryModal(false);
      setDeletingItinerary(null);

      await loadItineraries();

      showNotification(
        "success",
        "Xóa lịch trình thành công",
        "Lịch trình đã được xóa khỏi tour.",
      );
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Không thể xóa lịch trình. Vui lòng thử lại.";

      showNotification("error", "Xóa lịch trình thất bại", message);
    } finally {
      setDeletingItineraryLoading(false);
    }
  };

  const closeDeleteItineraryModal = () => {
    if (deletingItineraryLoading) return;

    setShowDeleteItineraryModal(false);
    setDeletingItinerary(null);
  };

  const handleSubmitItinerary = async (formData) => {
    try {
      let response;

      if (editingItinerary) {
        // UPDATE
        response = await api.put("/api/tour-itinerary", formData);

        setShowItineraryModal(false);
        setEditingItinerary(null);

        await loadItineraries();

        showNotification(
          "success",
          "Cập nhật lịch trình thành công",
          "Thông tin lịch trình đã được cập nhật.",
        );
      } else {
        // ADD
        response = await api.post("/api/tour-itinerary", formData);

        setShowItineraryModal(false);
        setEditingItinerary(null);

        await loadItineraries();

        showNotification(
          "success",
          "Thêm lịch trình thành công",
          "Lịch trình đã được thêm vào tour.",
        );
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Không thể lưu lịch trình. Vui lòng thử lại.";

      showNotification(
        "error",
        editingItinerary
          ? "Cập nhật lịch trình thất bại"
          : "Thêm lịch trình thất bại",
        message,
      );

      throw error;
    }
  };

  const closeItineraryModal = () => {
    setShowItineraryModal(false);
    setEditingItinerary(null);
  };

  const handleAddDetail = (itinerary) => {
    setSelectedItinerary(itinerary);
    setEditingDetail(null);
    setShowDetailModal(true);
  };

  const handleEditDetail = (itinerary, detail) => {
    setSelectedItinerary(itinerary);
    setEditingDetail(detail);
    setShowDetailModal(true);
  };

  const handleDeleteDetail = (itinerary, detail) => {
    setSelectedItinerary(itinerary);
    setDeletingDetail(detail);
    setShowDeleteDetailModal(true);
  };
  const handleConfirmDeleteDetail = async () => {
    if (!deletingDetail?.idTourItinerariesDetail) {
      return;
    }

    try {
      setDeletingDetailLoading(true);

      const detailId = deletingDetail.idTourItinerariesDetail;
      const response = await api.delete(
        `/api/tour-itinerary-detail/id=${detailId}`,
      );

      // Đóng modal xác nhận
      setShowDeleteDetailModal(false);
      setDeletingDetail(null);
      setSelectedItinerary(null);

      // Load lại danh sách itinerary + detail
      await loadItineraries();

      // Thông báo thành công
      showNotification(
        "success",
        "Xóa hoạt động thành công",
        "Chi tiết hoạt động đã được xóa khỏi lịch trình.",
      );
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Không thể xóa chi tiết lịch trình.";

      showNotification("error", "Xóa hoạt động thất bại", message);
    } finally {
      setDeletingDetailLoading(false);
    }
  };

  const closeDeleteDetailModal = () => {
    if (deletingDetailLoading) return;

    setShowDeleteDetailModal(false);
    setDeletingDetail(null);
  };

  const handleSubmitDetail = async (formData) => {
    try {
      let response;

      if (editingDetail) {
        response = await api.put("/api/tour-itinerary-detail", formData);
      } else {
        response = await api.post("/api/tour-itinerary-detail", formData);
      }

      closeDetailModal();
      await loadItineraries();

      showNotification(
        "success",
        editingDetail
          ? "Cập nhật hoạt động thành công"
          : "Thêm hoạt động thành công",
        editingDetail
          ? "Thông tin hoạt động đã được cập nhật."
          : "Hoạt động đã được thêm vào lịch trình.",
      );
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Không thể lưu chi tiết lịch trình.";

      showNotification(
        "error",
        editingDetail
          ? "Cập nhật hoạt động thất bại"
          : "Thêm hoạt động thất bại",
        message,
      );

      throw error;
    }
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedItinerary(null);
    setEditingDetail(null);
  };

  if (!tour) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
            <Route size={42} className="mx-auto mb-3 text-slate-300" />

            <h2 className="font-semibold text-slate-700">
              Không tìm thấy thông tin tour
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Vui lòng quay lại danh sách tour và thử lại.
            </p>

            <button
              type="button"
              onClick={() => navigate("/admin/tours")}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-600"
            >
              <ArrowLeft size={17} />
              Quay lại danh sách tour
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {notification && (
        <div className="pointer-events-none fixed right-5 top-5 z-[99999] w-[380px] max-w-[calc(100vw-40px)]">
          <div className="pointer-events-auto">
            <Notification
              type={notification.type}
              title={notification.title}
              message={notification.message}
              onClose={() => setNotification(null)}
            />
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100"
            >
              <ArrowLeft size={20} />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <Route size={24} className="text-cyan-500" />

                <h1 className="text-2xl font-bold text-slate-800">
                  Quản lý lịch trình
                </h1>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Quản lý lịch trình và các hoạt động của từng ngày trong tour
              </p>

              <div className="mt-2">
                <p className="text-sm font-semibold text-slate-700">
                  {tour.nameTour}
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  Tour ID: {idTour}
                </p>
              </div>
            </div>
          </div>

          {/* ADD ITINERARY */}

          <button
            type="button"
            onClick={handleAddItinerary}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-600"
          >
            <Plus size={18} />
            Thêm lịch trình
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* SỐ NGÀY */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100">
                <CalendarDays size={22} className="text-cyan-600" />
              </div>

              <div>
                <p className="text-sm text-slate-500">Số ngày</p>

                <p className="text-2xl font-bold text-slate-800">
                  {itineraries.length}
                </p>
              </div>
            </div>
          </div>

          {/* HOẠT ĐỘNG */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
                <List size={22} className="text-blue-500" />
              </div>

              <div>
                <p className="text-sm text-slate-500">Tổng hoạt động</p>

                <p className="text-2xl font-bold text-slate-800">
                  {totalDetails}
                </p>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-500" />

            <p className="mt-3 text-sm text-slate-500">
              Đang tải lịch trình...
            </p>
          </div>
        ) : itineraries.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <Route size={42} className="mx-auto mb-3 text-slate-300" />

            <h3 className="font-semibold text-slate-700">Chưa có lịch trình</h3>

            <p className="mt-1 text-sm text-slate-400">
              Hãy thêm lịch trình đầu tiên cho tour này.
            </p>

            <button
              type="button"
              onClick={handleAddItinerary}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600"
            >
              <Plus size={17} />
              Thêm lịch trình
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {itineraries.map((itinerary, index) => (
              <ItineraryCard
                key={itinerary.idTourItineraries || `itinerary-${index}`}
                itinerary={itinerary}
                day={index + 1}
                onEdit={handleEditItinerary}
                onDelete={handleDeleteItinerary}
                onAddDetail={handleAddDetail}
                onEditDetail={handleEditDetail}
                onDeleteDetail={handleDeleteDetail}
              />
            ))}
          </div>
        )}
      </div>

      {showItineraryModal && (
        <ItineraryModal
          itinerary={editingItinerary}
          idTour={idTour}
          onClose={closeItineraryModal}
          onSubmit={handleSubmitItinerary}
        />
      )}

      {showDetailModal && selectedItinerary && (
        <ItineraryDetailModal
          itinerary={selectedItinerary}
          detail={editingDetail}
          onClose={closeDetailModal}
          onSubmit={handleSubmitDetail}
        />
      )}

      <ConfirmModal
        open={showDeleteItineraryModal}
        title="Xác nhận xóa lịch trình"
        message="Bạn có chắc chắn muốn xóa lịch trình này không?"
        itemName={deletingItinerary?.title}
        onCancel={closeDeleteItineraryModal}
        onConfirm={handleConfirmDeleteItinerary}
        loading={deletingItineraryLoading}
      />

      <ConfirmModal
        open={showDeleteDetailModal}
        title="Xác nhận xóa hoạt động"
        message="Bạn có chắc chắn muốn xóa hoạt động này khỏi lịch trình không?"
        itemName={deletingDetail?.title}
        onCancel={closeDeleteDetailModal}
        onConfirm={handleConfirmDeleteDetail}
        loading={deletingDetailLoading}
      />
    </div>
  );
}
