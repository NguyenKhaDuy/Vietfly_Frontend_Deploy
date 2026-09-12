/* eslint-disable react-hooks/set-state-in-effect */

import {
  X,
  Mail,
  Phone,
  UserRound,
  MapPin,
  CalendarDays,
  Clock3,
  Users,
  FileText,
  UserCircle,
  History,
  Pencil,
  Copy,
  Check,
  Hash,
  UserPlus,
  LoaderCircle,
  UserCheck,
  Save,
} from "lucide-react";

import { useEffect, useState } from "react";
import BookingStatusBadge from "./BookingStatusBadge";

export default function BookingDetailModal({
  booking,
  isAdmin,
  users = [],
  loadingUsers = false,
  onClose,
  onStatus,
  onAssign,
  onUpdate,
}) {
  const [copied, setCopied] = useState(false);

  const [showAssignModal, setShowAssignModal] = useState(false);

  const [selectedStaff, setSelectedStaff] = useState("");

  const [assigning, setAssigning] = useState(false);

  const [saving, setSaving] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    destination: "",
    dateDepart: "",
    timeDepart: "",
    numberPeople: "",
    status: "PENDING",
    userId: "",
  });

  useEffect(() => {
    if (!booking) return;

    setSelectedStaff(booking.userId ? String(booking.userId) : "");

    setForm({
      destination: booking.destination || "",

      dateDepart: booking.dateDepart || "",

      timeDepart: booking.timeDepart || "",

      numberPeople:
        booking.numberPeople != null ? String(booking.numberPeople) : "",

      status: booking.statusTour || "PENDING",

      userId: booking.userId ? String(booking.userId) : "",
    });

    setEditMode(false);
  }, [booking]);

  if (!booking) return null;

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(booking.idBooking || "");

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Không thể copy:", error);
    }
  };

  const handleOpenAssign = () => {
    setSelectedStaff(booking.userId ? String(booking.userId) : "");

    setShowAssignModal(true);
  };

  const handleCloseAssign = () => {
    if (assigning) return;

    setShowAssignModal(false);

    setSelectedStaff(booking.userId ? String(booking.userId) : "");
  };

  const handleConfirmAssign = async () => {
    if (!selectedStaff) return;
    if (!onAssign) return;

    try {
      setAssigning(true);

      const success = await onAssign(booking, String(selectedStaff));

      if (success !== false) {
        setForm((prev) => ({
          ...prev,
          userId: String(selectedStaff),
        }));

        setShowAssignModal(false);
      }
    } catch (error) {
      console.error("Không thể phân công nhân viên:", error);
    } finally {
      setAssigning(false);
    }
  };

  const handleSave = async () => {
    if (!onUpdate) return;

    if (!form.destination.trim()) {
      alert("Vui lòng nhập điểm đến.");
      return;
    }

    if (!form.dateDepart.trim()) {
      alert("Vui lòng nhập ngày khởi hành.");
      return;
    }

    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(form.dateDepart)) {
      alert("Ngày khởi hành phải có dạng DD/MM/YYYY.");
      return;
    }

    if (!form.timeDepart.trim()) {
      alert("Vui lòng nhập giờ khởi hành.");
      return;
    }

    if (!/^\d{2}:\d{2}(:\d{2})?$/.test(form.timeDepart)) {
      alert("Giờ khởi hành không hợp lệ.");
      return;
    }

    if (form.numberPeople === "" || Number(form.numberPeople) <= 0) {
      alert("Số người phải lớn hơn 0.");
      return;
    }

    if (!["PENDING", "CONFIRMED"].includes(form.status)) {
      alert("Trạng thái booking không hợp lệ.");
      return;
    }

    try {
      setSaving(true);

      const success = await onUpdate(booking, {
        destination: form.destination.trim(),

        dateDepart: form.dateDepart.trim(),

        timeDepart: form.timeDepart.trim(),

        numberPeople: Number(form.numberPeople),

        status: form.status,

        userId: form.userId || null,
      });

      if (success !== false) {
        setEditMode(false);
      }
    } catch (error) {
      console.error("Không thể cập nhật booking:", error);
    } finally {
      setSaving(false);
    }
  };

  const dateDisplayValue = (() => {
    if (!form.dateDepart) {
      return "";
    }

    if (/^\d{2}\/\d{2}\/\d{4}$/.test(form.dateDepart)) {
      return form.dateDepart;
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(form.dateDepart)) {
      const [year, month, day] = form.dateDepart.split("-");

      return `${day}/${month}/${year}`;
    }

    return "";
  })();

  const datePickerValue = (() => {
    if (!form.dateDepart) {
      return "";
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(form.dateDepart)) {
      return form.dateDepart;
    }

    if (/^\d{2}\/\d{2}\/\d{4}$/.test(form.dateDepart)) {
      const [day, month, year] = form.dateDepart.split("/");

      return `${year}-${month}-${day}`;
    }

    return "";
  })();

  const timeDisplayValue = (() => {
    if (!form.timeDepart) {
      return "";
    }

    if (/^\d{2}:\d{2}$/.test(form.timeDepart)) {
      return `${form.timeDepart}:00`;
    }

    return form.timeDepart;
  })();

  const timePickerValue = (() => {
    if (!form.timeDepart) {
      return "";
    }

    if (/^\d{2}:\d{2}:\d{2}$/.test(form.timeDepart)) {
      return form.timeDepart.slice(0, 5);
    }

    return form.timeDepart;
  })();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="shrink-0 border-b border-slate-100 bg-white px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                  <Hash size={19} />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900">
                      Chi tiết Booking
                    </h2>

                    <BookingStatusBadge status={booking.statusTour} />
                  </div>

                  <div className="mt-1.5 flex items-center gap-2">
                    <p
                      className="max-w-[430px] truncate font-mono text-xs text-slate-400"
                      title={booking.idBooking}
                    >
                      #{booking.idBooking || "--"}
                    </p>

                    <button
                      type="button"
                      onClick={handleCopyId}
                      title="Sao chép mã booking"
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-cyan-600"
                    >
                      {copied ? (
                        <Check size={13} className="text-emerald-500" />
                      ) : (
                        <Copy size={13} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={19} />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto">
          <div className="space-y-5 p-6">
            <section>
              <SectionTitle
                icon={<UserRound size={16} />}
                title="Thông tin khách hàng"
              />

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <InfoItem
                  icon={<UserRound size={15} />}
                  label="Họ và tên"
                  value={booking.fullname}
                />

                <InfoItem
                  icon={<Mail size={15} />}
                  label="Email"
                  value={booking.email}
                />

                <InfoItem
                  icon={<Phone size={15} />}
                  label="Số điện thoại"
                  value={booking.phone}
                />

                <div className="rounded-xl border border-slate-100 bg-slate-50/70 px-3.5 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400">
                        <UserCircle size={15} />
                      </span>

                      <p className="text-[11px] font-medium text-slate-400">
                        Nhân viên xử lý
                      </p>
                    </div>

                    {isAdmin && (
                      <button
                        type="button"
                        onClick={handleOpenAssign}
                        className="flex items-center gap-1.5 rounded-lg border border-cyan-200 bg-cyan-50 px-2.5 py-1.5 text-[11px] font-semibold text-cyan-600 transition hover:border-cyan-300 hover:bg-cyan-100"
                      >
                        {booking.userId ? (
                          <>
                            <Pencil size={12} />
                            Đổi
                          </>
                        ) : (
                          <>
                            <UserPlus size={12} />
                            Phân công
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <div className="mt-2.5">
                    {booking.userName ? (
                      <div className="flex items-center gap-3 rounded-lg border border-emerald-100 bg-emerald-50/70 px-3 py-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                          <UserCheck size={15} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-[10px] font-medium text-emerald-500">
                            Nhân viên hiện tại
                          </p>

                          <p className="mt-0.5 truncate text-sm font-semibold text-slate-700">
                            {booking.userName}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-lg border border-dashed border-slate-200 bg-white px-3 py-2.5">
                        <p className="text-sm text-slate-400">
                          Chưa phân công nhân viên
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between">
                <SectionTitle
                  icon={<MapPin size={16} />}
                  title="Thông tin chuyến đi"
                />

                {!editMode && (
                  <button
                    type="button"
                    onClick={() => setEditMode(true)}
                    className="flex items-center gap-1.5 rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-600 transition hover:bg-cyan-100"
                  >
                    <Pencil size={13} />
                    Chỉnh sửa
                  </button>
                )}
              </div>

              {editMode ? (
                <div className="mt-3 space-y-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                      Điểm đến
                    </label>

                    <input
                      type="text"
                      value={form.destination}
                      onChange={(e) =>
                        handleChange("destination", e.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                      placeholder="Nhập điểm đến"
                    />
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                        Ngày khởi hành
                      </label>

                      <div className="relative">
                        <CalendarDays
                          size={17}
                          className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          id="dateDepartDisplay"
                          type="text"
                          value={dateDisplayValue}
                          placeholder="DD/MM/YYYY"
                          maxLength={10}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "");

                            if (value.length > 2) {
                              value = value.slice(0, 2) + "/" + value.slice(2);
                            }

                            if (value.length > 5) {
                              value = value.slice(0, 5) + "/" + value.slice(5);
                            }

                            value = value.slice(0, 10);

                            handleChange("dateDepart", value);
                          }}
                          onClick={() => {
                            document
                              .getElementById("dateDepartPicker")
                              ?.showPicker?.();
                          }}
                          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 pl-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10"
                        />

                        <input
                          id="dateDepartPicker"
                          type="date"
                          value={datePickerValue}
                          onChange={(e) => {
                            handleChange("dateDepart", e.target.value);
                          }}
                          className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-0"
                          tabIndex={-1}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                        Giờ khởi hành
                      </label>

                      <div className="relative">
                        <Clock3
                          size={17}
                          className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          id="timeDepartDisplay"
                          type="text"
                          value={timeDisplayValue}
                          placeholder="HH:mm:ss"
                          maxLength={8}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "");

                            if (value.length > 2) {
                              value = value.slice(0, 2) + ":" + value.slice(2);
                            }

                            if (value.length > 5) {
                              value = value.slice(0, 5) + ":" + value.slice(5);
                            }

                            value = value.slice(0, 8);

                            handleChange("timeDepart", value);
                          }}
                          onClick={() => {
                            document
                              .getElementById("timeDepartPicker")
                              ?.showPicker?.();
                          }}
                          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 pl-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10"
                        />

                        <input
                          id="timeDepartPicker"
                          type="time"
                          step="1"
                          value={timePickerValue}
                          onChange={(e) => {
                            handleChange("timeDepart", e.target.value);
                          }}
                          className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-0"
                          tabIndex={-1}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                        Số người
                      </label>

                      <input
                        type="number"
                        min="1"
                        value={form.numberPeople}
                        onChange={(e) =>
                          handleChange("numberPeople", e.target.value)
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                        placeholder="Số người"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                      Trạng thái
                    </label>

                    <select
                      value={form.status}
                      onChange={(e) => handleChange("status", e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                    >
                      <option value="PENDING">Chờ xác nhận</option>

                      <option value="CONFIRMED">Đã xác nhận</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => setEditMode(false)}
                      className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                    >
                      Hủy
                    </button>

                    <button
                      type="button"
                      disabled={saving}
                      onClick={handleSave}
                      className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {saving ? (
                        <>
                          <LoaderCircle size={15} className="animate-spin" />
                          Đang lưu...
                        </>
                      ) : (
                        <>
                          <Save size={15} />
                          Lưu cập nhật
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <InfoItem
                    icon={<MapPin size={15} />}
                    label="Điểm đến"
                    value={booking.destination}
                  />

                  <InfoItem
                    icon={<Users size={15} />}
                    label="Số người"
                    value={
                      booking.numberPeople != null
                        ? `${booking.numberPeople} người`
                        : "--"
                    }
                  />

                  <InfoItem
                    icon={<CalendarDays size={15} />}
                    label="Ngày khởi hành"
                    value={booking.dateDepart}
                  />

                  <InfoItem
                    icon={<Clock3 size={15} />}
                    label="Giờ khởi hành"
                    value={booking.timeDepart}
                  />
                </div>
              )}
            </section>

            <section>
              <SectionTitle
                icon={<FileText size={16} />}
                title="Ghi chú / yêu cầu"
              />

              <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5">
                {booking.description ? (
                  <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
                    {booking.description}
                  </p>
                ) : (
                  <p className="text-sm italic text-slate-400">
                    Không có ghi chú.
                  </p>
                )}
              </div>
            </section>

            <section>
              <SectionTitle
                icon={<History size={16} />}
                title="Thông tin hệ thống"
              />

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <InfoItem
                  label="Mã người dùng"
                  value={booking.userId || "Không có tài khoản"}
                  mono={Boolean(booking.userId)}
                  muted={!booking.userId}
                />

                <InfoItem label="Ngày tạo" value={booking.createdAt} />

                <InfoItem label="Cập nhật lần cuối" value={booking.updatedAt} />

                <InfoItem
                  label="Trạng thái"
                  value={getStatusLabel(booking.statusTour)}
                />
              </div>
            </section>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-3.5">
          <p className="text-xs text-slate-400">
            Booking được tạo lúc{" "}
            <span className="font-medium text-slate-500">
              {booking.createdAt || "--"}
            </span>
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Đóng
            </button>

            <button
              type="button"
              onClick={onStatus}
              className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-cyan-500/20 transition hover:bg-cyan-600"
            >
              <Pencil size={15} />
              Cập nhật trạng thái
            </button>
          </div>
        </div>
      </div>

      {showAssignModal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseAssign();
            }
          }}
        >
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                  <UserPlus size={17} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Phân công nhân viên
                  </h3>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Chọn nhân viên xử lý booking
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseAssign}
                disabled={assigning}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-50"
              >
                <X size={17} />
              </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto p-5">
              {loadingUsers ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <LoaderCircle
                    size={28}
                    className="animate-spin text-cyan-500"
                  />

                  <p className="mt-3 text-sm text-slate-400">
                    Đang tải danh sách nhân viên...
                  </p>
                </div>
              ) : users.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center">
                  <UserCircle size={30} className="mx-auto text-slate-300" />

                  <p className="mt-2 text-sm font-medium text-slate-500">
                    Không có nhân viên
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {users.map((user) => {
                    const userId = user?.idUser ? String(user.idUser) : "";

                    const isSelected = selectedStaff === userId;

                    return (
                      <button
                        key={userId}
                        type="button"
                        disabled={assigning || !userId}
                        onClick={() => setSelectedStaff(userId)}
                        className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition ${
                          isSelected
                            ? "border-cyan-300 bg-cyan-50"
                            : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                            isSelected
                              ? "bg-cyan-100 text-cyan-600"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          <UserCircle size={18} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-slate-700">
                            {user.fullName || "Không có tên"}
                          </p>

                          {user.email && (
                            <p className="mt-0.5 truncate text-xs text-slate-400">
                              {user.email}
                            </p>
                          )}
                        </div>

                        {isSelected && (
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-white">
                            <Check size={14} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-3.5">
              <button
                type="button"
                onClick={handleCloseAssign}
                disabled={assigning}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              >
                Hủy
              </button>

              <button
                type="button"
                onClick={handleConfirmAssign}
                disabled={!selectedStaff || loadingUsers || assigning}
                className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {assigning ? (
                  <>
                    <LoaderCircle size={15} className="animate-spin" />
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <Check size={15} />
                    Xác nhận
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionTitle({ icon, title }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
        {icon}
      </div>

      <h3 className="text-sm font-bold text-slate-800">{title}</h3>
    </div>
  );
}

function InfoItem({ icon, label, value, muted = false, mono = false }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/70 px-3.5 py-3 transition hover:border-slate-200 hover:bg-slate-50">
      <div className="flex items-center gap-1.5">
        {icon && <span className="text-slate-400">{icon}</span>}

        <p className="text-[11px] font-medium text-slate-400">{label}</p>
      </div>

      <p
        className={`mt-1.5 break-words text-[13px] font-semibold ${
          muted ? "text-slate-400" : "text-slate-700"
        } ${mono ? "font-mono text-xs" : ""}`}
      >
        {value || "--"}
      </p>
    </div>
  );
}

function getStatusLabel(status) {
  const labels = {
    PENDING: "Chờ xác nhận",
    CONFIRMED: "Đã xác nhận",
    CANCELLED: "Đã hủy",
    COMPLETED: "Hoàn thành",
    CLOSED: "Đã đóng",
  };

  return labels[status] || status || "Không xác định";
}
