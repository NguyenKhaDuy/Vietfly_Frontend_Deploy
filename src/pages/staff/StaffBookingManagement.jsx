/* eslint-disable no-useless-assignment */
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useMemo, useState } from "react";

import BookingHeader from "../../components/admin/BookingHeader";
import BookingStats from "../../components/admin/BookingStats";
import BookingFilter from "../../components/admin/BookingFilter";
import StaffBookingTable from "../../components/staff/StaffBookingTable";
import BookingDetailModal from "../../components/admin/BookingDetailModal";
import BookingStatusModal from "../../components/admin/BookingStatusModal";
import DeleteBookingModal from "../../components/admin/DeleteBookingModal";
import EmptyBooking from "../../components/admin/EmptyBooking";
import Notification from "../../components/Notification";

import api from "../../api/api";

export default function BookingManagement() {
  const [bookings, setBookings] = useState([]);

  const [search, setSearch] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [statusFilter, setStatusFilter] = useState("ALL");

  const [selectedBooking, setSelectedBooking] = useState(null);

  const [showDetail, setShowDetail] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [tourStatuses, setTourStatuses] = useState([]);
  const [loadingStatuses, setLoadingStatuses] = useState(false);

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingMe, setLoadingMe] = useState(false);

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

  const convertDateToApiFormat = (value) => {
    if (!value) return null;

    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return value;
    }

    if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      const [day, month, year] = value.split("/");

      return `${year}-${month}-${day}`;
    }

    return null;
  };

  const convertDateToDisplay = (value) => {
    if (!value) return "";

    if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      return value;
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [year, month, day] = value.split("-");

      return `${day}/${month}/${year}`;
    }

    return value;
  };

  const convertTimeToApiFormat = (value) => {
    if (!value) return null;

    if (/^\d{2}:\d{2}$/.test(value)) {
      return `${value}:00`;
    }

    if (/^\d{2}:\d{2}:\d{2}$/.test(value)) {
      return value;
    }

    return null;
  };

  const normalizeBookingResponse = (response, requestedPage) => {
    let result = null;

    if (
      response &&
      typeof response === "object" &&
      !Array.isArray(response) &&
      (response.totalPages !== undefined ||
        response.currentPage !== undefined ||
        Array.isArray(response.data))
    ) {
      result = response;
    } else if (
      response?.data &&
      typeof response.data === "object" &&
      !Array.isArray(response.data) &&
      (response.data.totalPages !== undefined ||
        response.data.currentPage !== undefined ||
        Array.isArray(response.data.data))
    ) {
      result = response.data;
    } else if (Array.isArray(response)) {
      result = {
        data: response,
        totalPages: response.length > 0 ? 1 : 0,
        currentPage: requestedPage,
        totalElements: response.length,
      };
    } else if (Array.isArray(response?.data)) {
      result = {
        data: response.data,
        totalPages: response.data.length > 0 ? 1 : 0,
        currentPage: requestedPage,
        totalElements: response.data.length,
      };
    } else {
      result = {
        data: [],
        totalPages: 0,
        currentPage: requestedPage,
        totalElements: 0,
      };
    }

    return {
      data: Array.isArray(result?.data) ? result.data : [],

      totalPages: Number(result?.totalPages ?? 0),

      currentPage: Number(result?.currentPage ?? requestedPage),

      totalItems: Number(
        result?.totalElements ??
          result?.totalItems ??
          result?.totalCount ??
          result?.total ??
          (Array.isArray(result?.data) ? result.data.length : 0),
      ),
    };
  };

  const fetchBookings = async (page = 1, keyword = "") => {
    try {
      setLoading(true);
      setError("");

      const trimmedKeyword = keyword.trim();

      let response;

      if (trimmedKeyword) {
        response = await api.get(
          `/api/booking/search/${encodeURIComponent(trimmedKeyword)}`,
          {
            params: {
              pageNo: page,
            },
          },
        );
      } else {
        response = await api.get("/api/booking", {
          params: {
            pageNo: page,
          },
        });
      }

      console.log("BOOKING API RESPONSE:", response);

      const normalized = normalizeBookingResponse(response, page);

      console.log("BOOKING PAGINATION:", {
        currentPage: normalized.currentPage,
        totalPages: normalized.totalPages,
        totalItems: normalized.totalItems,
        data: normalized.data,
      });

      setBookings(normalized.data);

      setCurrentPage(normalized.currentPage);

      setTotalPages(normalized.totalPages);

      setTotalItems(normalized.totalItems);
    } catch (err) {
      setBookings([]);
      setCurrentPage(1);
      setTotalPages(0);
      setTotalItems(0);

      const message = getErrorMessage(err, "Không thể tải danh sách booking.");

      setError(message);

      showNotification("error", "Tải booking thất bại", message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(currentPage, searchKeyword);
  }, [currentPage, searchKeyword]);

  const fetchTourStatuses = async () => {
    try {
      setLoadingStatuses(true);

      const response = await api.get("/api/status/tour");

      const result = response?.data ?? response;

      const data = Array.isArray(result)
        ? result
        : Array.isArray(result?.data)
          ? result.data
          : [];

      const allowedStatuses = data.filter(
        (status) => status === "PENDING" || status === "CONFIRMED",
      );

      setTourStatuses(
        allowedStatuses.length > 0 ? allowedStatuses : ["PENDING", "CONFIRMED"],
      );
    } catch (err) {
      setTourStatuses(["PENDING", "CONFIRMED"]);
    } finally {
      setLoadingStatuses(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);

      const response = await api.get("/api/user/all");

      const result = response?.data ?? response;

      const data = Array.isArray(result)
        ? result
        : Array.isArray(result?.data)
          ? result.data
          : [];

      setUsers(data);
    } catch (err) {
      setUsers([]);

      showNotification(
        "error",
        "Không thể tải nhân viên",
        getErrorMessage(err, "Không thể lấy danh sách nhân viên."),
      );
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      setLoadingMe(true);

      const response = await api.get("/api/me");

      const result = response?.data ?? response;

      const user = result?.data || result?.user || result;

      if (!user || typeof user !== "object") {
        setCurrentUser(null);
        setIsAdmin(false);

        return false;
      }

      setCurrentUser(user);

      let role =
        user.role || user.roleName || user.roles?.[0] || user.authorities?.[0];

      if (typeof role === "object" && role !== null) {
        role = role.authority || role.role || role.name;
      }

      const admin = role === "ADMIN" || role === "ROLE_ADMIN";

      setIsAdmin(admin);

      return admin;
    } catch (err) {
      setCurrentUser(null);
      setIsAdmin(false);

      return false;
    } finally {
      setLoadingMe(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      const admin = await fetchCurrentUser();

      if (admin) {
        await fetchUsers();
      }
    };

    init();
    fetchTourStatuses();
  }, []);

  const filteredBookings = useMemo(() => {
    if (statusFilter === "ALL") {
      return bookings;
    }

    return bookings.filter((booking) => booking.statusTour === statusFilter);
  }, [bookings, statusFilter]);

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);

    setCurrentPage(1);
  };

  const handleDetail = (booking) => {
    setSelectedBooking(booking);
    setShowDetail(true);
  };

  const handleOpenStatus = (booking) => {
    setSelectedBooking(booking);
    setShowDetail(false);
    setShowStatusModal(true);
  };

  const buildBookingPayload = (booking, overrides = {}) => {
    const dateValue =
      overrides.dateDepart !== undefined
        ? overrides.dateDepart
        : booking.dateDepart;

    const timeValue =
      overrides.timeDepart !== undefined
        ? overrides.timeDepart
        : booking.timeDepart;

    const userIdValue =
      overrides.userId !== undefined ? overrides.userId : booking.userId;

    return {
      idBooking: booking.idBooking,

      destination:
        overrides.destination !== undefined
          ? overrides.destination || null
          : booking.destination || null,

      timeDepart: convertTimeToApiFormat(timeValue),

      dateDepart: convertDateToApiFormat(dateValue),

      numberPeople:
        overrides.numberPeople !== undefined
          ? overrides.numberPeople === ""
            ? null
            : Number(overrides.numberPeople)
          : (booking.numberPeople ?? null),

      status:
        overrides.status !== undefined
          ? overrides.status
          : booking.statusTour || "PENDING",

      userId: userIdValue ? String(userIdValue) : null,
    };
  };

  const handleUpdateBooking = async (booking, formData) => {
    if (!booking) return false;

    try {
      setError("");

      const payload = buildBookingPayload(booking, formData);

      await api.put("/api/booking", payload);

      await fetchBookings(currentPage, searchKeyword);

      const assignedUser = users.find(
        (user) => String(user.idUser) === String(payload.userId),
      );

      setSelectedBooking((prev) => {
        if (!prev) return null;

        return {
          ...prev,

          destination: payload.destination,

          timeDepart: payload.timeDepart,

          dateDepart: convertDateToDisplay(payload.dateDepart),

          numberPeople: payload.numberPeople,

          statusTour: payload.status,

          userId: payload.userId,

          userName: assignedUser?.fullName || prev.userName || null,
        };
      });

      showNotification(
        "success",
        "Cập nhật thành công",
        "Thông tin booking đã được cập nhật.",
      );

      return true;
    } catch (err) {
      const message = getErrorMessage(err, "Không thể cập nhật booking.");

      setError(message);

      showNotification("error", "Cập nhật thất bại", message);

      return false;
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    if (!selectedBooking) return;

    if (!["PENDING", "CONFIRMED"].includes(newStatus)) {
      showNotification(
        "error",
        "Trạng thái không hợp lệ",
        "Booking chỉ được cập nhật sang PENDING hoặc CONFIRMED.",
      );

      return;
    }

    const success = await handleUpdateBooking(selectedBooking, {
      status: newStatus,
    });

    if (success) {
      setSelectedBooking((prev) =>
        prev
          ? {
              ...prev,
              statusTour: newStatus,
            }
          : null,
      );

      setShowStatusModal(false);
    }
  };

  const handleAssignBooking = async (booking, userId) => {
    if (!booking || !userId) {
      showNotification(
        "error",
        "Phân công thất bại",
        "Vui lòng chọn nhân viên.",
      );

      return false;
    }

    if (!isAdmin) {
      const message = "Bạn không có quyền phân công booking.";

      setError(message);

      showNotification("error", "Không có quyền", message);

      return false;
    }

    const assignedUser = users.find(
      (user) => String(user.idUser) === String(userId),
    );

    const success = await handleUpdateBooking(booking, {
      userId: String(userId),
    });

    if (!success) {
      return false;
    }

    setSelectedBooking((prev) =>
      prev
        ? {
            ...prev,
            userId: String(userId),
            userName: assignedUser?.fullName || null,
          }
        : null,
    );

    showNotification(
      "success",
      "Phân công thành công",
      assignedUser?.fullName
        ? `Booking đã được phân công cho ${assignedUser.fullName}.`
        : "Booking đã được phân công.",
    );

    return true;
  };

  const handleDelete = async () => {
    if (!selectedBooking?.idBooking) {
      showNotification(
        "error",
        "Xóa thất bại",
        "Không tìm thấy mã booking cần xóa.",
      );

      return;
    }

    try {
      setLoading(true);
      setError("");

      const bookingId = selectedBooking.idBooking;

      await api.delete(`/api/admin/booking/id=${bookingId}`);

      setShowDeleteModal(false);
      setSelectedBooking(null);

      showNotification(
        "success",
        "Xóa thành công",
        "Booking đã được xóa thành công.",
      );

      let pageAfterDelete = currentPage;

      if (bookings.length === 1 && currentPage > 1) {
        pageAfterDelete = currentPage - 1;
        setCurrentPage(pageAfterDelete);
      } else {
        await fetchBookings(currentPage, searchKeyword);
      }
    } catch (err) {
      const message = getErrorMessage(err, "Không thể xóa booking.");

      setError(message);

      showNotification("error", "Xóa thất bại", message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const keyword = search.trim();

    setSearchKeyword(keyword);

    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
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

      <div className="mx-auto max-w-[1500px]">
        <BookingHeader />

        <BookingStats bookings={bookings} />

        <BookingFilter
          search={search}
          setSearch={handleSearchChange}
          statusFilter={statusFilter}
          setStatusFilter={handleStatusChange}
          resultCount={filteredBookings.length}
          totalCount={totalItems}
          onSearch={handleSearch}
        />

        {error && (
          <div className="mb-4 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="ml-4 font-semibold text-red-500 hover:text-red-700"
            >
              Đóng
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-500" />

              <p className="text-sm text-slate-500">
                Đang tải danh sách booking...
              </p>
            </div>
          </div>
        ) : bookings.length > 0 ? (
          <StaffBookingTable
            bookings={filteredBookings}
            totalItems={totalItems}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onDetail={handleDetail}
            onStatus={handleOpenStatus}
            onDelete={(booking) => {
              setSelectedBooking(booking);
              setShowDeleteModal(true);
            }}
          />
        ) : (
          <EmptyBooking />
        )}
      </div>

      {showDetail && selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          isAdmin={isAdmin}
          users={users}
          loadingUsers={loadingUsers}
          onClose={() => setShowDetail(false)}
          onStatus={() => {
            setShowDetail(false);
            setShowStatusModal(true);
          }}
          onAssign={handleAssignBooking}
          onUpdate={handleUpdateBooking}
        />
      )}

      {showStatusModal && selectedBooking && (
        <BookingStatusModal
          booking={selectedBooking}
          statuses={tourStatuses}
          loading={loadingStatuses}
          onClose={() => setShowStatusModal(false)}
          onUpdate={handleUpdateStatus}
        />
      )}

      {showDeleteModal && selectedBooking && (
        <DeleteBookingModal
          booking={selectedBooking}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
