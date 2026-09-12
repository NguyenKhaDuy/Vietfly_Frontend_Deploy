/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { X, Save } from "lucide-react";

const emptyForm = {
  title: "",
  description: "",
};

export default function ItineraryModal({
  itinerary,
  idTour,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEdit = !!itinerary;

  useEffect(() => {
    if (itinerary) {
      setForm({
        title: itinerary.title || "",
        description: itinerary.description || "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [itinerary]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idTour) {
      alert("Không xác định được tour.");
      return;
    }

    if (!form.title.trim()) {
      alert("Vui lòng nhập tiêu đề lịch trình.");
      return;
    }

    try {
      setIsSubmitting(true);

      const data = {
        title: form.title.trim(),
        description: form.description.trim(),
      };
      if (isEdit) {
        data.idTourItineraries = itinerary.idTourItineraries;
        data.tourId = itinerary.tourId || idTour;
      } else {
        data.tourId = idTour;
      }

      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              {isEdit ? "Cập nhật lịch trình" : "Thêm lịch trình"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {isEdit
                ? "Chỉnh sửa thông tin lịch trình"
                : "Thêm một ngày lịch trình mới cho tour"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div className="max-h-[70vh] space-y-5 overflow-y-auto p-6">
            {/* TOUR */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Tour
              </label>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-sm font-medium text-slate-700">
                  Tour hiện tại
                </p>

                <p className="mt-1 break-all text-xs text-slate-400">
                  {idTour}
                </p>
              </div>
            </div>

            {/* TITLE */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Tiêu đề
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Ví dụ: Ngày 1 - Khám phá Đà Lạt"
                required
                disabled={isSubmitting}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 disabled:bg-slate-50"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Mô tả
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={6}
                placeholder="Mô tả lịch trình trong ngày..."
                disabled={isSubmitting}
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 disabled:bg-slate-50"
              />
            </div>

            {/* ID KHI EDIT */}
            {isEdit && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  ID lịch trình
                </label>

                <input
                  type="text"
                  value={itinerary.idTourItineraries || ""}
                  readOnly
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-400 outline-none"
                />
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Hủy
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={17} />

              {isSubmitting
                ? "Đang lưu..."
                : isEdit
                  ? "Lưu thay đổi"
                  : "Thêm lịch trình"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
