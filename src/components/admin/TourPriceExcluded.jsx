import { Plus, X, LoaderCircle } from "lucide-react";
import { useState } from "react";

import TourPriceItem from "./TourPriceItem";
import ConfirmModal from "./ConfirmModal";
import api from "../../api/api";

export default function TourPriceExcluded({ excluded, setExcluded, tourId }) {
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [editingIndex, setEditingIndex] = useState(null);

  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [adding, setAdding] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    item: null,
    index: null,
  });

  const handleAdd = async () => {
    const name = newName.trim();
    const description = newDescription.trim();

    if (!name) {
      setError("Vui lòng nhập tên dịch vụ.");
      return;
    }

    if (!tourId) {
      setError("Không tìm thấy ID tour.");
      return;
    }

    try {
      setAdding(true);
      setError("");

      const request = {
        tourId,
        nameService: name,
        description,
        typeTourPrice: "NOT_INCLUDED",
      };

      const response = await api.post("/api/tour-price-inclusion", request);

      const newItem = {
        idTourPriceInclusion:
          response.data?.data?.idTourPriceInclusion ||
          response.data?.idTourPriceInclusion ||
          crypto.randomUUID(),

        nameService: name,
        description,
        typeTourPrice: "NOT_INCLUDED",

        createdAt: new Date().toLocaleString("vi-VN"),

        updatedAt: null,
      };

      setExcluded((prev) => [...prev, newItem]);

      setNewName("");
      setNewDescription("");
    } catch (err) {

      setError(
        err?.response?.data?.message || "Không thể thêm khoản chưa bao gồm.",
      );
    } finally {
      setAdding(false);
    }
  };

  const handleStartEdit = (index) => {
    const item = excluded[index];

    if (!item) return;

    setEditingIndex(index);
    setEditName(item.nameService || "");
    setEditDescription(item.description || "");
    setError("");
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditName("");
    setEditDescription("");
    setError("");
  };

  const handleSaveEdit = async (index) => {
    const name = editName.trim();
    const description = editDescription.trim();

    if (!name) {
      setError("Vui lòng nhập tên dịch vụ.");
      return;
    }

    const item = excluded[index];

    if (!item?.idTourPriceInclusion) {
      setError("Không tìm thấy ID khoản chi phí.");
      return;
    }

    if (!tourId) {
      setError("Không tìm thấy ID tour.");
      return;
    }

    try {
      setUpdating(true);
      setError("");

      const request = {
        idTourPriceInclusion: item.idTourPriceInclusion,

        tourId,

        nameService: name,

        description,

        typeTourPrice: "NOT_INCLUDED",
      };

      const response = await api.put("/api/tour-price-inclusion", request);

      setExcluded((prev) =>
        prev.map((currentItem, i) =>
          i === index
            ? {
                ...currentItem,
                nameService: name,
                description,
                typeTourPrice: "NOT_INCLUDED",
              }
            : currentItem,
        ),
      );

      handleCancelEdit();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Không thể cập nhật khoản chưa bao gồm.",
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = (index) => {
    const item = excluded[index];

    if (!item?.idTourPriceInclusion) {
      setError("Không tìm thấy ID khoản chi phí.");
      return;
    }

    setDeleteModal({
      open: true,
      item,
      index,
    });
  };

  const handleCancelDelete = () => {
    if (deletingId) return;

    setDeleteModal({
      open: false,
      item: null,
      index: null,
    });
  };

  const handleConfirmDelete = async () => {
    const item = deleteModal.item;

    if (!item?.idTourPriceInclusion) {
      return;
    }

    const id = item.idTourPriceInclusion;

    try {
      setDeletingId(id);
      setError("");

      const response = await api.delete(
        `/api/admin/tour-price-inclusion/id=${id}`,
      );

      setExcluded((prev) =>
        prev.filter((currentItem) => currentItem.idTourPriceInclusion !== id),
      );

      if (editingIndex === deleteModal.index) {
        handleCancelEdit();
      }

      setDeleteModal({
        open: false,
        item: null,
        index: null,
      });
    } catch (err) {

      setError(
        err?.response?.data?.message || "Không thể xóa khoản chưa bao gồm.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-red-200 bg-white">
        {/* HEADER */}
        <div className="border-b border-red-100 bg-red-50/60 px-6 py-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <X size={20} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">Giá chưa bao gồm</h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Những dịch vụ khách hàng phải tự chi trả
                </p>
              </div>
            </div>

            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
              {excluded.length} khoản
            </span>
          </div>
        </div>

        <div className="p-6">
          {/* ERROR */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
              {error}
            </div>
          )}

          {/* LIST */}
          <div className="space-y-3">
            {excluded.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 py-10 text-center">
                <X size={24} className="mx-auto text-slate-300" />

                <p className="mt-2 text-sm font-medium text-slate-500">
                  Chưa có khoản chưa bao gồm
                </p>
              </div>
            ) : (
              excluded.map((item, index) => (
                <TourPriceItem
                  key={item.idTourPriceInclusion}
                  item={item}
                  index={index}
                  type="NOT_INCLUDED"
                  isEditing={editingIndex === index}
                  editName={editName}
                  editDescription={editDescription}
                  onEditNameChange={setEditName}
                  onEditDescriptionChange={setEditDescription}
                  onStartEdit={handleStartEdit}
                  onSaveEdit={handleSaveEdit}
                  onCancelEdit={handleCancelEdit}
                  onDelete={handleDelete}
                  saving={updating}
                  deleting={deletingId === item.idTourPriceInclusion}
                />
              ))
            )}
          </div>

          {/* ADD */}
          <div className="mt-5 rounded-xl border border-dashed border-red-200 bg-red-50/30 p-4">
            <p className="mb-3 text-xs font-semibold text-red-700">
              Thêm khoản chưa bao gồm
            </p>

            <div className="space-y-2">
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Tên dịch vụ..."
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
              />

              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                rows={2}
                placeholder="Mô tả dịch vụ..."
                className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
              />

              <button
                type="button"
                onClick={handleAdd}
                disabled={adding}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {adding ? (
                  <>
                    <LoaderCircle size={17} className="animate-spin" />
                    Đang thêm...
                  </>
                ) : (
                  <>
                    <Plus size={17} />
                    Thêm khoản chưa bao gồm
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CONFIRM MODAL */}
      <ConfirmModal
        open={deleteModal.open}
        title="Xác nhận xóa khoản chưa bao gồm"
        message="Bạn có chắc chắn muốn xóa khoản chi phí này không?"
        itemName={deleteModal.item?.nameService}
        itemLabel="Khoản chưa bao gồm sẽ bị xóa"
        confirmText="Xóa khoản"
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        loading={deletingId === deleteModal.item?.idTourPriceInclusion}
      />
    </>
  );
}
