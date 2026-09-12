/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Plus, FolderTree } from "lucide-react";

import api from "../../api/api";

import CategoryTable from "../../components/admin/CategoryTable";
import CategoryModal from "../../components/admin/CategoryModal";
import DeleteCategoryModal from "../../components/admin/DeleteCategoryModal";
import Notification from "../../components/Notification";

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalMode, setModalMode] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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

  const getErrorMessage = (err, fallback) => {
    const data = err?.response?.data;

    if (typeof data === "string") {
      return data;
    }

    return data?.message || data?.error || err?.message || fallback;
  };

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      setError("");

      const response = await api.get("/api/category");

      const result = response.data;

      if (Array.isArray(result)) {
        setCategories(result);
      } else {
        setCategories([]);
      }
    } catch (err) {
      const message = getErrorMessage(err, "Không thể lấy danh sách danh mục.");

      setError(message);
      setCategories([]);

      showNotification("error", "Lỗi tải danh mục", message);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = () => {
    setSelectedCategory(null);
    setModalMode("add");
  };

  const handleDetail = (category) => {
    setSelectedCategory(category);
    setModalMode("detail");
  };

  const handleEdit = (category) => {
    setSelectedCategory({ ...category });
    setModalMode("edit");
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setModalMode(null);
    setSelectedCategory(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedCategory(null);
  };

  const handleUpdateCategory = async (formData) => {
    if (!selectedCategory?.idCategory) {
      showNotification(
        "error",
        "Cập nhật thất bại",
        "Không tìm thấy mã danh mục.",
      );
      return;
    }

    const nameCategory = String(formData?.nameCategory || "").trim();

    if (!nameCategory) {
      showNotification(
        "error",
        "Dữ liệu không hợp lệ",
        "Tên danh mục không được để trống.",
      );
      return;
    }

    try {
      setError("");

      const payload = {
        idCategory: selectedCategory.idCategory,
        nameCategory,
      };

      await api.put("/api/category", payload);

      handleCloseModal();

      await fetchCategories();

      showNotification(
        "success",
        "Cập nhật thành công",
        "Danh mục đã được cập nhật thành công.",
      );
    } catch (err) {
      const message = getErrorMessage(err, "Không thể cập nhật danh mục.");

      setError(message);

      showNotification("error", "Cập nhật thất bại", message);
    }
  };

  const handleCreateCategory = async (formData) => {
    const nameCategory = String(formData?.nameCategory || "").trim();

    if (!nameCategory) {
      showNotification(
        "error",
        "Dữ liệu không hợp lệ",
        "Tên danh mục không được để trống.",
      );
      return;
    }

    try {
      setError("");

      const payload = {
        nameCategory,
      };

      const response = await api.post("/api/category", payload);

      handleCloseModal();

      await fetchCategories();

      showNotification(
        "success",
        "Thêm thành công",
        "Danh mục mới đã được thêm.",
      );
    } catch (err) {

      const message = getErrorMessage(err, "Không thể thêm danh mục.");

      setError(message);

      showNotification("error", "Thêm thất bại", message);
    }
  };

  const handleSaveCategory = async (formData) => {
    if (modalMode === "edit") {
      await handleUpdateCategory(formData);
      return;
    }

    if (modalMode === "add") {
      await handleCreateCategory(formData);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-500">
              <FolderTree size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Quản lý danh mục
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Quản lý các danh mục tour trong hệ thống
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-cyan-500/20 transition hover:bg-cyan-600 active:scale-[0.98]"
        >
          <Plus size={18} />
          Thêm danh mục
        </button>
      </div>

      {error && !loadingCategories && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <CategoryTable
        categories={categories}
        loading={loadingCategories}
        onDetail={handleDetail}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {modalMode && (
        <CategoryModal
          mode={modalMode}
          category={selectedCategory}
          onClose={handleCloseModal}
          onSave={handleSaveCategory}
        />
      )}

      {showDeleteModal && selectedCategory && (
        <DeleteCategoryModal
          category={selectedCategory}
          onClose={handleCloseDeleteModal}
          onSuccess={async () => {
            handleCloseDeleteModal();

            await fetchCategories();

            showNotification(
              "success",
              "Xóa thành công",
              "Danh mục đã được xóa thành công.",
            );
          }}
          onError={(message) => {
            showNotification("error", "Xóa thất bại", message);
          }}
        />
      )}

      {notification && (
        <div className="fixed right-5 top-5 z-[100] w-[360px] max-w-[calc(100vw-40px)]">
          <Notification
            type={notification.type}
            title={notification.title}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        </div>
      )}
    </div>
  );
}
