/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, X, Route } from "lucide-react";

import TourStats from "../../components/admin/TourStats";
import TourFilter from "../../components/admin/TourFilter";
import StaffTourTable from "../../components/staff/StaffTourTable";
import TourFormModal from "../../components/admin/TourFormModal";
import api from "../../api/api";
import Notification from "../../components/Notification";

export default function TourManagement() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [status, setStatus] = useState("ALL");

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("ALL");
  const [loadingCategories, setLoadingCategories] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [deleteTour, setDeleteTour] = useState(null);

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

  const getErrorMessage = (error, fallback) => {
    const data = error?.response?.data;

    if (typeof data === "string" && data.trim()) {
      return data;
    }

    if (data?.message) {
      return data.message;
    }

    if (data?.error) {
      return data.error;
    }

    return fallback;
  };

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);

      const response = await api.get("/api/category");

      const responseData = response?.data;

      if (Array.isArray(responseData)) {
        setCategories(responseData);
      } else if (Array.isArray(responseData?.data)) {
        setCategories(responseData.data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      setCategories([]);

      showNotification(
        "error",
        "Không thể tải danh mục",
        getErrorMessage(error, "Không thể lấy danh sách danh mục."),
      );
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchTours = async (
    page = 1,
    keyword = searchKeyword,
    cateId = categoryId,
  ) => {
    try {
      setLoading(true);

      let response;

      if (keyword?.trim()) {
        response = await api.get(
          `/api/tour/search/${encodeURIComponent(keyword.trim())}`,
          {
            params: {
              pageNo: page,
            },
          },
        );
      } else if (cateId && cateId !== "ALL") {
        response = await api.get(`/api/tour/idcate=${cateId}`, {
          params: {
            pageNo: page,
          },
        });
      } else {
        response = await api.get("/api/tour", {
          params: {
            pageNo: page,
          },
        });
      }

      const responseData =
        response?.data?.data &&
        Array.isArray(response.data.data) &&
        response?.data?.totalPages !== undefined
          ? response.data
          : response;

      if (
        responseData &&
        typeof responseData === "object" &&
        !Array.isArray(responseData) &&
        Array.isArray(responseData.data)
      ) {
        const backendData = responseData.data;

        const backendTotalPages = Number(responseData.totalPages ?? 0);

        const backendCurrentPage = Number(responseData.currentPage ?? page);

        setTours(backendData);

        setTotalPages(backendTotalPages);

        setCurrentPage(backendCurrentPage);

        return;
      }

      if (Array.isArray(responseData)) {
        setTours(responseData);

        setTotalPages(responseData.length > 0 ? 1 : 0);

        setCurrentPage(1);

        return;
      }

      setTours([]);

      setTotalPages(0);

      setCurrentPage(1);
    } catch (error) {
      setTours([]);

      setTotalPages(0);

      showNotification(
        "error",
        "Không thể tải danh sách tour",
        getErrorMessage(error, "Không thể lấy danh sách tour."),
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchTours(currentPage, searchKeyword, categoryId);
  }, [currentPage, searchKeyword, categoryId]);

  const handleSearch = () => {
    const keyword = search.trim();

    setCategoryId("ALL");
    setSearchKeyword(keyword);
    setCurrentPage(1);
  };
  const handleClearSearch = () => {
    setSearch("");
    setSearchKeyword("");
    setCategoryId("ALL");
    setCurrentPage(1);
  };

  const handleCategoryChange = (value) => {
    setSearch("");
    setSearchKeyword("");
    setCategoryId(value);
    setCurrentPage(1);
  };

  const stats = useMemo(() => {
    return {
      total: tours.length,

      active: tours.filter((tour) => tour.statusTour === "ACTIVE").length,

      hide: tours.filter((tour) => tour.statusTour === "HIDE").length,
    };
  }, [tours]);

  const handleAdd = () => {
    setEditingTour(null);
    setShowModal(true);
  };

  const handleEdit = (tour) => {
    setEditingTour(tour);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTour(null);
  };

  const handleSave = async () => {
    await fetchTours(currentPage, searchKeyword, categoryId);

    setShowModal(false);
    setEditingTour(null);
  };

  const handleDelete = async () => {
    if (!deleteTour?.idTour) {
      return;
    }

    try {
      setLoading(true);

      await api.delete(`/api/admin/tour/id=${deleteTour.idTour}`);

      showNotification(
        "success",
        "Xóa tour thành công",
        `Tour "${deleteTour.nameTour}" đã được xóa.`,
      );

      setDeleteTour(null);

      if (tours.length === 1 && currentPage > 1) {
        const previousPage = currentPage - 1;

        setCurrentPage(previousPage);
      } else {
        await fetchTours(currentPage, searchKeyword, categoryId);
      }
    } catch (error) {
      showNotification(
        "error",
        "Xóa tour thất bại",
        getErrorMessage(error, "Không thể xóa tour. Vui lòng thử lại."),
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500 text-white shadow-lg shadow-blue-600/20">
              <Route size={19} />
            </div>

            <span className="text-sm font-semibold text-cyan-500">
              TOUR MANAGEMENT
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Quản lý Tour
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Quản lý tour, lịch trình, giá và các dịch vụ đi kèm trên hệ thống
            VietFly.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-cyan-600"
        >
          <Plus size={18} />
          Thêm tour
        </button>
      </div>

      <TourStats stats={stats} />

      <div className="mt-7">
        <TourFilter
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          categoryId={categoryId}
          categories={categories}
          loadingCategories={loadingCategories}
          onCategoryChange={handleCategoryChange}
          onSearch={handleSearch}
          onClearSearch={handleClearSearch}
          loading={loading}
        />
      </div>

      <div className="mt-5">
        <StaffTourTable
          tours={tours}
          onEdit={handleEdit}
          onDelete={setDeleteTour}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
          loading={loading}
        />
      </div>

      {showModal && (
        <TourFormModal
          tour={editingTour}
          onClose={handleCloseModal}
          onSave={handleSave}
          onSuccess={(message) => {
            showNotification(
              "success",
              editingTour ? "Cập nhật tour thành công" : "Thêm tour thành công",
              message,
            );
          }}
          onError={(message) => {
            showNotification(
              "error",
              editingTour ? "Cập nhật tour thất bại" : "Thêm tour thất bại",
              message,
            );
          }}
        />
      )}

      {deleteTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Trash2 size={20} />
              </div>

              <button
                type="button"
                onClick={() => setDeleteTour(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <h2 className="text-lg font-bold text-slate-900">Xóa tour?</h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Bạn có chắc muốn xóa tour{" "}
              <strong className="text-slate-700">{deleteTour.nameTour}</strong>?
            </p>

            <p className="mt-2 text-xs text-red-500">
              Dữ liệu lịch trình, hình ảnh và các thông tin liên quan có thể bị
              ảnh hưởng.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTour(null)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Hủy
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Đang xóa..." : "Xóa tour"}
              </button>
            </div>
          </div>
        </div>
      )}

      {notification && (
        <div className="pointer-events-none fixed right-5 top-5 z-[9999] w-[380px] max-w-[calc(100vw-40px)]">
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
    </div>
  );
}
