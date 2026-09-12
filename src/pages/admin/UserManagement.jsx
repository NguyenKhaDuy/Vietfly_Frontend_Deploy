/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  Users,
  UserCheck,
  UserX,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

import StatCard from "../../components/admin/StatCard";
import UserTable from "../../components/admin/UserTable";
import UserModal from "../../components/admin/UserModal";
import DeleteModal from "../../components/admin/DeleteModal";
import UserDetailModal from "../../components/admin/UserDetailModal";
import Notification from "../../components/Notification";
import Loading from "../../components/Loading";
import api from "../../api/api";

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  dob: "",
  role: "ADMIN",
  status: "ACTIVE",
};

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [editingUser, setEditingUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const [form, setForm] = useState({ ...emptyForm });
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

  const convertDobToISO = (dob) => {
    if (!dob) {
      return "";
    }

    if (typeof dob !== "string") {
      return "";
    }

    const value = dob.trim();

    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return value;
    }

    if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      const [day, month, year] = value.split("/");

      return `${year}-${month}-${day}`;
    }

    return "";
  };

  const fetchUsers = async (page = 1, keyword = searchKeyword) => {
    try {
      setLoading(true);

      const trimmedKeyword = String(keyword || "").trim();

      let response;

      if (trimmedKeyword) {
        response = await api.get(
          `/api/user/search/${encodeURIComponent(trimmedKeyword)}`,
          {
            params: {
              pageNo: page,
            },
          },
        );
      } else {
        response = await api.get("/api/admin/user", {
          params: {
            pageNo: page,
          },
        });
      }

      const responseData =
        response &&
        typeof response === "object" &&
        !Array.isArray(response) &&
        response.totalPages !== undefined
          ? response
          : response?.data &&
              typeof response.data === "object" &&
              !Array.isArray(response.data)
            ? response.data
            : response;

      const userData = Array.isArray(responseData)
        ? responseData
        : Array.isArray(responseData?.data)
          ? responseData.data
          : [];

      const mappedUsers = userData.map((user) => ({
        ...user,
        id: user.idUser,
        idUser: user.idUser,
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "ADMIN",
        accountStatus: user.accountStatus,
        status: user.accountStatus || "ACTIVE",
        dob: user.dob || "",
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }));

      setUsers(mappedUsers);

      const backendTotalPages = Number(responseData?.totalPages);
      const backendCurrentPage = Number(responseData?.currentPage);

      setTotalPages(
        Number.isFinite(backendTotalPages) && backendTotalPages > 0
          ? backendTotalPages
          : 0,
      );

      setCurrentPage(
        Number.isFinite(backendCurrentPage) && backendCurrentPage > 0
          ? backendCurrentPage
          : page,
      );
    } catch (error) {
      setUsers([]);
      setTotalPages(0);

      showNotification(
        "error",
        "Lỗi tải dữ liệu",
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Không thể tải danh sách người dùng.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, searchKeyword);
  }, [currentPage, searchKeyword]);

  const handleSearch = () => {
    const keyword = search.trim();

    setCurrentPage(1);
    setSearchKeyword(keyword);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearch("");
    setSearchKeyword("");
    setCurrentPage(1);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchRole = roleFilter === "ALL" || user.role === roleFilter;

      const matchStatus =
        statusFilter === "ALL" || user.status === statusFilter;

      return matchRole && matchStatus;
    });
  }, [users, roleFilter, statusFilter]);

  const totalUsers = users.length;

  const activeUsers = users.filter((user) => user.status === "ACTIVE").length;

  const lockedUsers = users.filter((user) => user.status === "LOCKED").length;

  const staffUsers = users.filter(
    (user) => user.role === "STAFF" || user.role === "ADMIN",
  ).length;

  const openCreateModal = () => {
    setEditingUser(null);

    setForm({
      ...emptyForm,
    });

    setShowModal(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);

    setForm({
      fullName: user.fullName || "",
      email: user.email || "",
      phone: user.phone || "",
      dob: convertDobToISO(user.dob),
      role: user.role || "ADMIN",
      status: user.status || "ACTIVE",
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);

    setForm({
      ...emptyForm,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const requestData = {
        fullName: form.fullName.trim(),
        phone: form.phone?.trim() || "",
        email: form.email.trim(),
        dob: form.dob || null,
        role: form.role,
        status: form.status,
      };

      if (!editingUser) {
        const response = await api.post("/api/admin/user", requestData);

        showNotification(
          "success",
          "Thêm thành công",
          response?.data?.message ||
            response?.message ||
            "Người dùng đã được thêm thành công.",
        );
      } else {
        const updateData = {
          idUser: editingUser.idUser,
          ...requestData,
        };

        const response = await api.put("/api/user", updateData);

        showNotification(
          "success",
          "Cập nhật thành công",
          response?.data?.message ||
            response?.message ||
            "Thông tin người dùng đã được cập nhật.",
        );
      }

      setShowModal(false);
      setEditingUser(null);

      setForm({
        ...emptyForm,
      });

      await fetchUsers(currentPage, searchKeyword);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Có lỗi xảy ra khi lưu người dùng.";

      showNotification(
        "error",
        editingUser ? "Cập nhật thất bại" : "Thêm người dùng thất bại",
        message,
      );
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const handleDelete = async () => {
    if (!selectedUser) {
      return;
    }

    try {
      setLoading(true);

      const response = await api.delete(
        `/api/admin/user/id=${selectedUser.idUser}`,
      );

      closeDeleteModal();

      showNotification(
        "success",
        "Xóa thành công",
        response?.data?.message ||
          response?.message ||
          "Người dùng đã được xóa thành công.",
      );

      await fetchUsers(currentPage, searchKeyword);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Không thể xóa người dùng.";

      showNotification("error", "Xóa thất bại", message);
    } finally {
      setLoading(false);
    }
  };

  const openViewModal = (user) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedUser(null);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1 && !loading) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages && !loading) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage && !loading) {
      setCurrentPage(page);
    }
  };

  const pageNumbers = useMemo(() => {
    if (totalPages <= 0) {
      return [];
    }

    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  }, [totalPages]);

  if (loading && users.length === 0) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#f6f8fb] p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500 text-white shadow-lg shadow-blue-600/20">
                <Users size={19} />
              </div>

              <span className="text-sm font-semibold text-cyan-500">
                USER MANAGEMENT
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Quản lý người dùng
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Quản lý tài khoản, phân quyền và trạng thái người dùng trên hệ
              thống VietFly.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-cyan-700 active:scale-[0.98]"
          >
            <Plus size={18} />
            Thêm người dùng
          </button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Tổng người dùng"
            value={totalUsers}
            icon={<Users size={22} />}
            description="Tất cả tài khoản"
          />

          <StatCard
            title="Đang hoạt động"
            value={activeUsers}
            icon={<UserCheck size={22} />}
            description="Tài khoản hoạt động"
            positive
          />

          <StatCard
            title="Đang bị khóa"
            value={lockedUsers}
            icon={<UserX size={22} />}
            description="Tài khoản bị khóa"
          />

          <StatCard
            title="Nhân sự quản trị"
            value={staffUsers}
            icon={<ShieldCheck size={22} />}
            description="Admin & Staff"
          />
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-4 md:p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex w-full gap-2 xl:max-w-xl">
                <div className="relative flex-1">
                  <Search
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Tìm theo tên, email hoặc số điện thoại..."
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={loading}
                  className="h-11 rounded-xl bg-cyan-500 px-5 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Tìm kiếm
                </button>

                {searchKeyword && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    disabled={loading}
                    className="h-11 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Xóa
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Filter size={17} />
                  Bộ lọc
                </div>

                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none focus:border-cyan-500"
                >
                  <option value="ALL">Tất cả vai trò</option>

                  <option value="ADMIN">Admin</option>

                  <option value="STAFF">Staff</option>

                  <option value="USER">User</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none focus:border-cyan-500"
                >
                  <option value="ALL">Tất cả trạng thái</option>

                  <option value="ACTIVE">Hoạt động</option>

                  <option value="INACTIVE">Không hoạt động</option>

                  <option value="LOCKED">Bị khóa</option>

                  <option value="SUSPENDED">Tạm ngưng</option>
                </select>
              </div>
            </div>

            {searchKeyword && (
              <div className="mt-3 text-xs text-slate-500">
                Kết quả tìm kiếm cho:{" "}
                <span className="font-semibold text-cyan-600">
                  "{searchKeyword}"
                </span>
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-cyan-500" />
                Đang tải danh sách người dùng...
              </div>
            </div>
          ) : (
            <UserTable
              users={filteredUsers}
              onView={openViewModal}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
            />
          )}

          <div className="flex flex-col gap-3 border-t border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Hiển thị{" "}
              <span className="font-semibold text-slate-700">
                {filteredUsers.length}
              </span>{" "}
              người dùng
            </p>

            {totalPages > 0 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1 || loading}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 ${
                    currentPage === 1 || loading
                      ? "cursor-not-allowed text-slate-300"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <ChevronLeft size={17} />
                </button>

                {pageNumbers.map((page) => (
                  <button
                    type="button"
                    key={page}
                    onClick={() => goToPage(page)}
                    disabled={loading}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition ${
                      currentPage === page
                        ? "bg-cyan-600 text-white"
                        : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                    } ${loading ? "cursor-not-allowed opacity-60" : ""}`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages || loading}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 ${
                    currentPage === totalPages || loading
                      ? "cursor-not-allowed text-slate-300"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <UserModal
          form={form}
          setForm={setForm}
          editingUser={editingUser}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      )}

      {showDeleteModal && selectedUser && (
        <DeleteModal
          user={selectedUser}
          onClose={closeDeleteModal}
          onConfirm={handleDelete}
        />
      )}

      {showDetailModal && selectedUser && (
        <UserDetailModal user={selectedUser} onClose={closeDetailModal} />
      )}

      {notification && (
        <div className="fixed right-6 top-6 z-[100] w-[380px] max-w-[calc(100vw-2rem)]">
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
