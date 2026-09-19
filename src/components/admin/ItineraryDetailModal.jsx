/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
import {
  X,
  Save,
  Trash2,
  Image as ImageIcon,
  Plus,
  Copy,
} from "lucide-react";

const createEmptyDetail = () => ({
  idTourItinerariesDetail: null,
  title: "",
  description: "",
  image: null,
  previewImage: null,
});

export default function ItineraryDetailModal({
  itinerary,
  detail,
  onClose,
  onSubmit,
}) {
  const [details, setDetails] = useState([createEmptyDetail()]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRefs = useRef({});

  const isEdit = Boolean(detail);

  const getImageUrl = (data) => {
    if (!data) return null;

    return (
      data.imageUrl ||
      data.imgaeUrl ||
      data.image ||
      data.url ||
      data.cloudinaryImage?.url ||
      null
    );
  };

  useEffect(() => {
    if (detail) {
      const imageUrl = getImageUrl(detail);

      setDetails([
        {
          idTourItinerariesDetail:
            detail.idTourItinerariesDetail || null,
          title: detail.title || "",
          description: detail.description || "",
          image: null,
          previewImage: imageUrl,
        },
      ]);
    } else {
      setDetails([createEmptyDetail()]);
    }
  }, [detail]);

  useEffect(() => {
    return () => {
      details.forEach((item) => {
        if (
          item.previewImage &&
          item.previewImage.startsWith("blob:")
        ) {
          URL.revokeObjectURL(item.previewImage);
        }
      });
    };
  }, []);

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    setDetails((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [name]: value,
            }
          : item
      )
    );
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn file hình ảnh.");

      if (fileInputRefs.current[index]) {
        fileInputRefs.current[index].value = "";
      }

      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Kích thước hình ảnh không được vượt quá 10MB.");

      if (fileInputRefs.current[index]) {
        fileInputRefs.current[index].value = "";
      }

      return;
    }

    const oldPreview = details[index]?.previewImage;

    if (oldPreview && oldPreview.startsWith("blob:")) {
      URL.revokeObjectURL(oldPreview);
    }

    const previewUrl = URL.createObjectURL(file);

    setDetails((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              image: file,
              previewImage: previewUrl,
            }
          : item
      )
    );
  };

  const handleRemoveImage = (index) => {
    const currentPreview = details[index]?.previewImage;

    if (
      currentPreview &&
      currentPreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(currentPreview);
    }

    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].value = "";
    }

    setDetails((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              image: null,
              previewImage: null,
            }
          : item
      )
    );
  };

  const handleAddDetail = () => {
    setDetails((prev) => [
      ...prev,
      createEmptyDetail(),
    ]);
  };

  const handleRemoveDetail = (index) => {
    if (details.length === 1) {
      return;
    }

    const preview = details[index]?.previewImage;

    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setDetails((prev) =>
      prev.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const handleDuplicateDetail = (index) => {
    const source = details[index];

    const duplicated = {
      idTourItinerariesDetail: null,
      title: source.title,
      description: source.description,
      image: source.image,
      previewImage: source.previewImage,
    };

    setDetails((prev) => {
      const newList = [...prev];

      newList.splice(index + 1, 0, duplicated);

      return newList;
    });
  };

  const validateDetails = () => {
    if (!itinerary?.idTourItineraries) {
      alert("Không xác định được lịch trình.");
      return false;
    }

    if (details.length === 0) {
      alert("Vui lòng thêm ít nhất một hoạt động.");
      return false;
    }

    for (let i = 0; i < details.length; i++) {
      if (!details[i].title.trim()) {
        alert(
          `Vui lòng nhập tiêu đề cho hoạt động ${i + 1}.`
        );
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!validateDetails()) return;

    try {
      setIsSubmitting(true);

      if (isEdit) {
        const current = details[0];

        const formData = new FormData();

        formData.append(
          "idTourItinerary",
          itinerary.idTourItineraries
        );

        formData.append(
          "idTourItinerariesDetail",
          current.idTourItinerariesDetail
        );

        formData.append(
          "title",
          current.title.trim()
        );

        formData.append(
          "description",
          current.description.trim()
        );

        if (current.image instanceof File) {
          formData.append(
            "image",
            current.image
          );
        }

        await onSubmit(formData);

        return;
      }

      await onSubmit(
        details.map((item) => ({
          title: item.title.trim(),
          description: item.description.trim(),
          image: item.image,
        }))
      );
    } catch (error) {
      console.error(
        "Submit itinerary detail error:",
        error
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div
        className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
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
                ? "Chỉnh sửa thông tin hoạt động"
                : "Có thể thêm nhiều hoạt động cùng lúc"}
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

        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="flex-1 space-y-5 overflow-y-auto p-6">
         
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Lịch trình
              </label>

              <div className="rounded-xl border border-cyan-100 bg-cyan-50/50 px-4 py-3">
                <p className="text-sm font-semibold text-slate-700">
                  {itinerary?.title || "Lịch trình"}
                </p>

                <p className="mt-1 break-all text-xs text-slate-400">
                  ID: {itinerary?.idTourItineraries}
                </p>
              </div>
            </div>

            {!isEdit && (
              <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
                <Plus
                  size={18}
                  className="mt-0.5 flex-shrink-0 text-blue-500"
                />

                <div>
                  <p className="text-sm font-semibold text-blue-700">
                    Thêm nhiều hoạt động
                  </p>

                  <p className="mt-0.5 text-xs leading-5 text-blue-600">
                    Bạn có thể thêm nhiều hoạt động,
                    mỗi hoạt động có hình ảnh riêng.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-5">
              {details.map((item, index) => (
                <div
                  key={
                    item.idTourItinerariesDetail ||
                    `detail-${index}`
                  }
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50"
                >
                  {/* DETAIL HEADER */}

                  <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-100 text-sm font-bold text-cyan-600">
                        {index + 1}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-700">
                          Hoạt động {index + 1}
                        </p>

                        {isEdit &&
                          item.idTourItinerariesDetail && (
                            <p className="mt-0.5 text-[11px] text-slate-400">
                              ID:{" "}
                              {
                                item.idTourItinerariesDetail
                              }
                            </p>
                          )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {!isEdit && (
                        <button
                          type="button"
                          onClick={() =>
                            handleDuplicateDetail(index)
                          }
                          disabled={isSubmitting}
                          title="Nhân bản"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-cyan-50 hover:text-cyan-600 disabled:opacity-50"
                        >
                          <Copy size={16} />
                        </button>
                      )}

                      {!isEdit &&
                        details.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveDetail(index)
                            }
                            disabled={isSubmitting}
                            title="Xóa hoạt động"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                    </div>
                  </div>

                  {/* DETAIL BODY */}

                  <div className="space-y-5 p-5">
                    {/* TITLE */}

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
                        value={item.title}
                        onChange={(e) =>
                          handleChange(index, e)
                        }
                        placeholder="Ví dụ: Tham quan Dinh Độc Lập"
                        disabled={isSubmitting}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 disabled:bg-slate-50"
                      />
                    </div>

                    {/* DESCRIPTION */}

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Mô tả hoạt động
                      </label>

                      <textarea
                        name="description"
                        value={item.description}
                        onChange={(e) =>
                          handleChange(index, e)
                        }
                        rows={4}
                        placeholder="Mô tả chi tiết hoạt động..."
                        disabled={isSubmitting}
                        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 disabled:bg-slate-50"
                      />
                    </div>

                    {/* IMAGE */}

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Hình ảnh hoạt động
                      </label>

                      <input
                        ref={(element) => {
                          fileInputRefs.current[index] =
                            element;
                        }}
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/webp"
                        onChange={(e) =>
                          handleImageChange(index, e)
                        }
                        disabled={isSubmitting}
                        className="hidden"
                      />

                      {item.previewImage ? (
                        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white">
                          <img
                            src={item.previewImage}
                            alt={
                              item.title ||
                              `Hoạt động ${index + 1}`
                            }
                            className="h-56 w-full object-cover"
                          />

                          <div className="absolute right-3 top-3 flex gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                fileInputRefs.current[
                                  index
                                ]?.click()
                              }
                              disabled={isSubmitting}
                              className="rounded-lg bg-white/95 px-3 py-2 text-xs font-semibold text-slate-600 shadow-md backdrop-blur transition hover:bg-white disabled:opacity-50"
                            >
                              Đổi ảnh
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveImage(index)
                              }
                              disabled={isSubmitting}
                              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/95 text-red-500 shadow-md backdrop-blur transition hover:bg-red-50 disabled:opacity-50"
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
                            fileInputRefs.current[
                              index
                            ]?.click()
                          }
                          disabled={isSubmitting}
                          className="flex h-40 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-white text-slate-400 transition hover:border-cyan-300 hover:bg-cyan-50/30 hover:text-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50">
                            <ImageIcon size={23} />
                          </div>

                          <p className="mt-2 text-sm font-semibold">
                            Chọn hình ảnh
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            PNG, JPG, JPEG hoặc WEBP · tối đa
                            10MB
                          </p>
                        </button>
                      )}

                      {item.image && (
                        <p className="mt-2 truncate text-xs text-slate-400">
                          File: {item.image.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ================================================= */}
            {/* THÊM HOẠT ĐỘNG */}
            {/* ================================================= */}

            {!isEdit && (
              <button
                type="button"
                onClick={handleAddDetail}
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-cyan-200 bg-cyan-50/40 px-4 py-3 text-sm font-semibold text-cyan-600 transition hover:border-cyan-400 hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus size={18} />
                Thêm hoạt động
              </button>
            )}
          </div>
          
          <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
            <p className="text-xs text-slate-400">
              {isEdit
                ? "Đang chỉnh sửa 1 hoạt động"
                : `${details.length} hoạt động sẽ được thêm`}
            </p>

            <div className="flex gap-3">
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
          </div>
        </form>
      </div>
    </div>
  );
}