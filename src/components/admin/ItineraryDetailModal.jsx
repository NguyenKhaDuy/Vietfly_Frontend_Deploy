/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useRef, useState } from "react";

import {
  X,
  Save,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";

const emptyForm = {
  title: "",
  description: "",
};

export default function ItineraryDetailModal({
  itinerary,
  detail,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState(emptyForm);

  // File ảnh mới được chọn
  const [selectedImage, setSelectedImage] = useState(null);

  // URL preview
  const [previewImage, setPreviewImage] = useState(null);

  // Ảnh cũ khi edit
  const [oldImage, setOldImage] = useState(null);

  // Trạng thái đang submit
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  const isEdit = Boolean(detail);
  const getImageUrl = (data) => {
    if (!data) return null;

    return (
      data.imageUrl ||
      data.imgaeUrl ||
      data.image ||
      data.url ||
      null
    );
  };

  useEffect(() => {
    const imageUrl = getImageUrl(detail);

    if (detail) {
      // EDIT
      setForm({
        title: detail.title || "",
        description: detail.description || "",
      });

      // Lưu ảnh cũ
      setOldImage(imageUrl);

      // Hiển thị ảnh cũ
      setPreviewImage(imageUrl);

      // Chưa chọn ảnh mới
      setSelectedImage(null);
    } else {
      // ADD
      setForm({
        ...emptyForm,
      });

      setOldImage(null);
      setPreviewImage(null);
      setSelectedImage(null);
    }

    // Reset input file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [detail]);

  useEffect(() => {
    return () => {
      if (previewImage && previewImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // CHECK TYPE
    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn file hình ảnh.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    // CHECK SIZE
    if (file.size > 10 * 1024 * 1024) {
      alert("Kích thước hình ảnh không được vượt quá 10MB.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    // Xóa blob preview cũ nếu có
    if (previewImage && previewImage.startsWith("blob:")) {
      URL.revokeObjectURL(previewImage);
    }

    // Tạo preview
    const previewUrl = URL.createObjectURL(file);

    setSelectedImage(file);
    setPreviewImage(previewUrl);
  };

  const handleRemoveImage = () => {
    // Xóa file đang chọn
    setSelectedImage(null);

    // Reset input file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Xóa blob preview
    if (previewImage && previewImage.startsWith("blob:")) {
      URL.revokeObjectURL(previewImage);
    }

    // Quan trọng:
    // Không khôi phục oldImage.
    // Sau khi bấm Xóa thì preview phải biến mất.
    setPreviewImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!itinerary?.idTourItineraries) {
      alert("Không xác định được lịch trình cha.");

      return;
    }

    if (!form.title.trim()) {
      alert("Vui lòng nhập tiêu đề hoạt động.");

      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();

      formData.append(
        "idTourItinerary",
        itinerary.idTourItineraries,
      );

      if (isEdit && detail?.idTourItinerariesDetail) {
        formData.append(
          "idTourItinerariesDetail",
          detail.idTourItinerariesDetail,
        );
      }

      formData.append(
        "title",
        form.title.trim(),
      );

      formData.append(
        "description",
        form.description.trim(),
      );

      if (selectedImage) {
        formData.append(
          "image",
          selectedImage,
        );
      }

      await onSubmit(formData);
    } catch (error) {
      console.error(
        "Submit detail error:",
        error,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) {
      return;
    }

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
      
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              {isEdit
                ? "Cập nhật hoạt động"
                : "Thêm hoạt động"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {isEdit
                ? "Chỉnh sửa thông tin hoạt động của lịch trình"
                : "Thêm một hoạt động vào lịch trình"}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="max-h-[75vh] space-y-5 overflow-y-auto p-6">

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Lịch trình
              </label>

              <div className="rounded-xl border border-cyan-100 bg-cyan-50/50 px-4 py-3">
                <p className="text-sm font-semibold text-slate-700">
                  {itinerary?.title || "Lịch trình"}
                </p>

                <p className="mt-1 break-all text-xs text-slate-400">
                  ID lịch trình:{" "}
                  {itinerary?.idTourItineraries}
                </p>
              </div>
            </div>

            {isEdit &&
              detail?.idTourItinerariesDetail && (
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    ID hoạt động
                  </label>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="break-all text-xs text-slate-500">
                      {detail.idTourItinerariesDetail}
                    </p>
                  </div>
                </div>
              )}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Tiêu đề hoạt động
                <span className="ml-1 text-red-500">
                  *
                </span>
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Ví dụ: Tham quan Dinh Độc Lập"
                required
                disabled={isSubmitting}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 disabled:bg-slate-50"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Mô tả hoạt động
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                placeholder="Mô tả chi tiết hoạt động..."
                disabled={isSubmitting}
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 disabled:bg-slate-50"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Hình ảnh hoạt động
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleImageChange}
                disabled={isSubmitting}
                className="hidden"
              />

              {previewImage ? (
                <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  <img
                    src={previewImage}
                    alt={
                      form.title ||
                      "Preview"
                    }
                    className="h-64 w-full object-cover"
                  />

                  <div className="absolute right-3 top-3">
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      disabled={isSubmitting}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/95 text-red-500 shadow-md backdrop-blur transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      title="Xóa ảnh"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              ) : (
               
                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  disabled={isSubmitting}
                  className="flex h-48 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400 transition hover:border-cyan-300 hover:bg-cyan-50/30 hover:text-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                    <ImageIcon size={25} />
                  </div>

                  <p className="mt-3 text-sm font-semibold">
                    Chọn hình ảnh
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    PNG, JPG, JPEG hoặc WEBP
                  </p>
                </button>
              )}

              {selectedImage && (
                <p className="mt-2 truncate text-xs text-slate-400">
                  File đã chọn:{" "}
                  {selectedImage.name}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Hủy
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save size={17} />

                  {isEdit
                    ? "Lưu thay đổi"
                    : "Thêm hoạt động"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
