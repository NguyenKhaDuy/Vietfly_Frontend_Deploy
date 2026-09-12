/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useMemo, useState } from "react";

import BannerHeader from "../../components/admin/BannerHeader";
import BannerStats from "../../components/admin/BannerStats";
import BannerSearch from "../../components/admin/BannerSearch";
import BannerList from "../../components/admin/BannerList";
import BannerFormModal from "../../components/admin/BannerFormModal";
import BannerPreviewModal from "../../components/admin/BannerPreviewModal";
import DeleteBannerModal from "../../components/admin/DeleteBannerModal";
import EmptyBanner from "../../components/admin/EmptyBanner";
import Notification from "../../components/Notification";

import api from "../../api/api";

export default function BannerManagement() {

  const [banners, setBanners] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedBanner, setSelectedBanner] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [previewBanner, setPreviewBanner] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [notification, setNotification] = useState(null);

  const showNotification = (type, title, message) => {
    setNotification({
      type,
      title,
      message,
    });

    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const fetchBanners = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/banner");

      const data = response.data;

      if (Array.isArray(data)) {
        setBanners(data);
      } else {
        setBanners([]);
        setError("Dữ liệu banner không đúng định dạng.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Không thể lấy danh sách banner.",
      );

      setBanners([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const filteredBanners = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) {
      return banners;
    }

    return banners.filter(
      (banner) =>
        banner.title?.toLowerCase().includes(keyword) ||
        banner.description?.toLowerCase().includes(keyword) ||
        banner.fullName?.toLowerCase().includes(keyword),
    );
  }, [banners, search]);

  const handleCreate = () => {
    setSelectedBanner(null);
    setShowModal(true);
  };

  const handleEdit = (banner) => {
    setSelectedBanner(banner);
    setShowModal(true);
  };

  const handleSave = async (data) => {
    try {
      setError("");

      const userId = localStorage.getItem("idUser");

      if (!userId) {
        showNotification(
          "error",
          "Không thể lưu banner",
          "Không tìm thấy thông tin người dùng đăng nhập.",
        );

        return;
      }

      const formData = new FormData();

      if (data.idBanner) {
        formData.append("idBanner", data.idBanner);
      }

      formData.append("title", data.title);

      formData.append("description", data.description);

      formData.append("userId", userId);

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      if (data.idBanner) {
        const response = await api.put("/api/banner", formData);

        showNotification(
          "success",
          "Cập nhật thành công",
          "Banner đã được cập nhật thành công.",
        );
      } else {

        if (!(data.image instanceof File)) {
          showNotification(
            "error",
            "Thêm banner thất bại",
            "Vui lòng chọn hình ảnh cho banner.",
          );

          return;
        }

        const response = await api.post("/api/banner", formData);

        showNotification(
          "success",
          "Thêm banner thành công",
          "Banner mới đã được thêm thành công.",
        );
      }

      setShowModal(false);
      setSelectedBanner(null);

      await fetchBanners();
    } catch (err) {

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Không thể lưu banner. Vui lòng thử lại.";

      showNotification(
        "error",
        data.idBanner ? "Cập nhật thất bại" : "Thêm banner thất bại",
        message,
      );
    }
  };

  const handleDelete = async () => {
    if (!selectedBanner?.idBanner) {
      return;
    }

    try {
      setError("");

      const idBanner = selectedBanner.idBanner;
      setLoading(true);

      const response = await api.delete(`/api/admin/banner/id=${idBanner}`);

      setShowDeleteModal(false);
      setSelectedBanner(null);

      showNotification(
        "success",
        "Xóa thành công",
        "Banner đã được xóa thành công.",
      );

      await fetchBanners();
    } catch (err) {

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Không thể xóa banner. Vui lòng thử lại.";

      showNotification("error", "Xóa banner thất bại", message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-500" />

              <p className="text-sm text-slate-500">
                Đang tải danh sách banner...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        <BannerHeader onCreate={handleCreate} />

        {error && (
          <div className="mb-5 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="font-semibold hover:text-red-800"
            >
              ×
            </button>
          </div>
        )}

        <BannerStats banners={banners} />

        <BannerSearch
          search={search}
          setSearch={setSearch}
          resultCount={filteredBanners.length}
          totalCount={banners.length}
        />

        {filteredBanners.length > 0 ? (
          <BannerList
            banners={filteredBanners}
            onPreview={(banner) => {
              setPreviewBanner(banner);
            }}
            onEdit={handleEdit}
            onDelete={(banner) => {
              setSelectedBanner(banner);
              setShowDeleteModal(true);
            }}
          />
        ) : (
          <EmptyBanner />
        )}
      </div>

      {notification && (
        <div className="fixed right-5 top-5 z-[100] w-[380px] max-w-[calc(100vw-40px)]">
          <Notification
            type={notification.type}
            title={notification.title}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        </div>
      )}

      {showModal && (
        <BannerFormModal
          banner={selectedBanner}
          onClose={() => {
            setShowModal(false);
            setSelectedBanner(null);
          }}
          onSave={handleSave}
        />
      )}

      {previewBanner && (
        <BannerPreviewModal
          banner={previewBanner}
          onClose={() => {
            setPreviewBanner(null);
          }}
        />
      )}

      {showDeleteModal && selectedBanner && (
        <DeleteBannerModal
          banner={selectedBanner}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedBanner(null);
          }}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
