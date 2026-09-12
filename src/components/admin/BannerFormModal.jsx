/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { X, Upload } from "lucide-react";

export default function BannerFormModal({ banner, onClose, onSave }) {
  const [title, setTitle] = useState(banner?.title || "");

  const [description, setDescription] = useState(banner?.description || "");

  const [image, setImage] = useState(
    banner?.cloudinaryImage?.imageUrl || banner?.cloudinaryImage?.url || "",
  );

  const [imageFile, setImageFile] = useState(null);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTitle(banner?.title || "");

    setDescription(banner?.description || "");

    setImage(
      banner?.cloudinaryImage?.imageUrl || banner?.cloudinaryImage?.url || "",
    );

    setImageFile(null);
  }, [banner]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn file hình ảnh.");

      e.target.value = "";

      return;
    }

    if (image && image.startsWith("blob:")) {
      URL.revokeObjectURL(image);
    }

    setImageFile(file);

    const preview = URL.createObjectURL(file);

    setImage(preview);

    e.target.value = "";
  };

  const removeImage = () => {
    if (image && image.startsWith("blob:")) {
      URL.revokeObjectURL(image);
    }

    setImage("");

    setImageFile(null);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Vui lòng nhập tiêu đề banner.");

      return;
    }

    if (!description.trim()) {
      alert("Vui lòng nhập mô tả banner.");

      return;
    }

    if (!banner && !(imageFile instanceof File)) {
      alert("Vui lòng chọn hình ảnh cho banner.");

      return;
    }

    try {
      setSaving(true);

      await onSave({
        idBanner: banner?.idBanner || null,
        title: title.trim(),
        description: description.trim(),
        image: imageFile,
        userId: banner?.idUser || null,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {banner ? "Chỉnh sửa Banner" : "Thêm Banner mới"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Quản lý nội dung banner VietFly
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={submit} className="space-y-6 p-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Tiêu đề Banner
            </label>

            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề banner..."
              disabled={saving}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 disabled:bg-slate-50"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Mô tả
            </label>

            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả cho banner..."
              disabled={saving}
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 disabled:bg-slate-50"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Hình ảnh Banner
              {!banner && <span className="ml-1 text-red-500">*</span>}
            </label>

            {image ? (
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                <img
                  src={image}
                  alt="Banner preview"
                  className="aspect-[16/7] w-full object-cover"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  disabled={saving}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white shadow-lg transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                  title="Xóa ảnh"
                >
                  <X size={17} />
                </button>

                {imageFile && (
                  <div className="absolute bottom-3 left-3 max-w-[80%] truncate rounded-lg bg-black/60 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm">
                    {imageFile.name}
                  </div>
                )}
              </div>
            ) : (
              <label
                className={`flex aspect-[16/7] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 text-slate-400 transition hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-500 ${
                  saving ? "pointer-events-none opacity-50" : ""
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Upload size={22} />
                </div>

                <span className="mt-3 text-sm font-semibold">
                  Chọn hình ảnh
                </span>

                <span className="mt-1 text-xs text-slate-400">
                  PNG, JPG, WEBP
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
            {image && (
              <label
                className={`mt-3 flex w-fit cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-600 ${
                  saving ? "pointer-events-none opacity-50" : ""
                }`}
              >
                <Upload size={16} />
                Đổi ảnh
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Hủy
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex min-w-[130px] items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Đang lưu...
                </>
              ) : banner ? (
                "Lưu thay đổi"
              ) : (
                "Tạo Banner"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
