/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useMemo, useRef, useState } from "react";

import api from "../../api/api";

import FeedbackHeader from "../../components/admin/FeedbackHeader";
import FeedbackStats from "../../components/admin/FeedbackStats";
import FeedbackFilter from "../../components/admin/FeedbackFilter";
import FeedbackTable from "../../components/admin/FeedbackTable";
import FeedbackDetailModal from "../../components/admin/FeedbackDetailModal";
import FeedbackReplyModal from "../../components/admin/FeedbackReplyModal";
import DeleteFeedbackModal from "../../components/admin/DeleteFeedbackModal";
import EmptyFeedback from "../../components/admin/EmptyFeedback";
import Notification from "../../components/Notification";

export default function FeedbackManagement() {
  const [feedbacks, setFeedbacks] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const [showDetail, setShowDetail] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [submittingReply, setSubmittingReply] = useState(false);
  const [deletingFeedback, setDeletingFeedback] = useState(false);

  const [notification, setNotification] = useState(null);

  const notificationTimerRef = useRef(null);

  const showNotification = (type, title, message) => {
    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current);
    }

    setNotification({
      type,
      title,
      message,
    });

    notificationTimerRef.current = setTimeout(() => {
      setNotification(null);
      notificationTimerRef.current = null;
    }, 3000);
  };

  const closeNotification = () => {
    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current);
      notificationTimerRef.current = null;
    }

    setNotification(null);
  };

  useEffect(() => {
    return () => {
      if (notificationTimerRef.current) {
        clearTimeout(notificationTimerRef.current);
      }
    };
  }, []);

  const getErrorMessage = (err, fallback) => {
    const data = err?.response?.data;

    if (typeof data === "string") {
      return data;
    }

    return data?.message || data?.error || err?.message || fallback;
  };

  const normalizeResponse = (response, page) => {
    if (
      response &&
      typeof response === "object" &&
      !Array.isArray(response) &&
      (response.totalPages !== undefined || response.currentPage !== undefined)
    ) {
      return response;
    }

    if (
      response?.data &&
      typeof response.data === "object" &&
      !Array.isArray(response.data) &&
      (response.data.totalPages !== undefined ||
        response.data.currentPage !== undefined)
    ) {
      return response.data;
    }

    if (Array.isArray(response)) {
      return {
        data: response,
        totalPages: response.length > 0 ? 1 : 0,
        currentPage: page,
      };
    }

    if (Array.isArray(response?.data)) {
      return {
        data: response.data,
        totalPages: response.data.length > 0 ? 1 : 0,
        currentPage: page,
      };
    }

    return {
      data: [],
      totalPages: 0,
      currentPage: page,
    };
  };

  const fetchFeedbacks = async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/feedback", {
        params: {
          pageNo: page,
        },
      });

      const result = normalizeResponse(response, page);

      const data = Array.isArray(result.data) ? result.data : [];

      const backendCurrentPage = Number(result.currentPage ?? page);

      const backendTotalPages = Number(result.totalPages ?? 0);

      setFeedbacks(data);

      setCurrentPage(backendCurrentPage > 0 ? backendCurrentPage : page);

      setTotalPages(
        backendTotalPages > 0 ? backendTotalPages : data.length > 0 ? 1 : 0,
      );
    } catch (err) {
      const message = getErrorMessage(err, "Không thể lấy danh sách feedback.");

      setError(message);
      setFeedbacks([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks(1);
  }, []);

  const filteredFeedbacks = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return feedbacks.filter((feedback) => {
      const matchesSearch =
        !keyword ||
        feedback.idFeedback?.toLowerCase().includes(keyword) ||
        feedback.fullname?.toLowerCase().includes(keyword) ||
        feedback.email?.toLowerCase().includes(keyword) ||
        feedback.phone?.toLowerCase().includes(keyword) ||
        feedback.description?.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "ALL" || feedback.feedbackStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [feedbacks, search, statusFilter]);

  const handleDetail = (feedback) => {
    setSelectedFeedback(feedback);
    setShowDetail(true);
  };

  const handleOpenReply = (feedback) => {
    if (feedback.feedbackStatus === "REPLIED") {
      return;
    }

    setSelectedFeedback(feedback);
    setShowDetail(false);
    setShowReply(true);
  };

  const handleReply = async (replyContent) => {
    if (!selectedFeedback || submittingReply) {
      return;
    }

    if (selectedFeedback.feedbackStatus === "REPLIED") {
      showNotification(
        "warning",
        "Feedback đã được trả lời",
        "Feedback này không thể trả lời thêm.",
      );

      return;
    }

    try {
      setSubmittingReply(true);
      setError("");

      const userId = localStorage.getItem("idUser");

      if (!userId) {
        throw new Error("Không tìm thấy userId của người trả lời.");
      }

      const payload = {
        feedbackId: selectedFeedback.idFeedback,
        content: replyContent,
        userId,
      };

      await api.post("/api/feedback", payload);

      setShowReply(false);
      setSelectedFeedback(null);

      showNotification(
        "success",
        "Gửi phản hồi thành công",
        "Phản hồi đã được gửi đến khách hàng.",
      );

      await fetchFeedbacks(currentPage);
    } catch (err) {
      const message = getErrorMessage(
        err,
        "Không thể gửi phản hồi cho khách hàng.",
      );

      showNotification("error", "Gửi phản hồi thất bại", message);
    } finally {
      setSubmittingReply(false);
    }
  };

  const handleResolve = (feedback) => {
    setFeedbacks((prev) =>
      prev.map((item) =>
        item.idFeedback === feedback.idFeedback
          ? {
              ...item,
              feedbackStatus: "RESOLVED",
            }
          : item,
      ),
    );
  };

  const handleOpenDelete = (feedback) => {
    if (deletingFeedback) {
      return;
    }

    setSelectedFeedback(feedback);
    setShowDelete(true);
  };

  const handleDelete = async () => {
    if (!selectedFeedback || deletingFeedback) {
      return;
    }

    try {
      setDeletingFeedback(true);
      setError("");

      const feedbackId = selectedFeedback.idFeedback;

      await api.delete(`/api/admin/feedback/id=${feedbackId}`);

      setShowDelete(false);
      setSelectedFeedback(null);

      showNotification(
        "success",
        "Xóa feedback thành công",
        "Feedback đã được xóa khỏi hệ thống.",
      );

      const remainingItems = filteredFeedbacks.length - 1;

      const targetPage =
        remainingItems <= 0 && currentPage > 1 ? currentPage - 1 : currentPage;

      await fetchFeedbacks(targetPage);
    } catch (err) {
      const message = getErrorMessage(err, "Không thể xóa feedback.");

      showNotification("error", "Xóa feedback thất bại", message);
    } finally {
      setDeletingFeedback(false);
    }
  };

  const handlePreviousPage = () => {
    if (loading || currentPage <= 1) {
      return;
    }

    fetchFeedbacks(currentPage - 1);
  };

  const handleNextPage = () => {
    if (loading || totalPages <= 0 || currentPage >= totalPages) {
      return;
    }

    fetchFeedbacks(currentPage + 1);
  };

  const handlePageChange = (page) => {
    if (loading || page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    fetchFeedbacks(page);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      {notification && (
        <div className="fixed right-5 top-5 z-[9999] w-[380px] max-w-[calc(100vw-40px)]">
          <Notification
            type={notification.type}
            title={notification.title}
            message={notification.message}
            onClose={closeNotification}
          />
        </div>
      )}

      <div className="mx-auto max-w-[1500px]">
        <FeedbackHeader />

        <FeedbackStats feedbacks={feedbacks} />

        <FeedbackFilter
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          resultCount={filteredFeedbacks.length}
          totalCount={feedbacks.length}
        />

        {error && !loading && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-500" />

              <span className="text-sm text-slate-400">
                Đang tải danh sách feedback...
              </span>
            </div>
          </div>
        ) : feedbacks.length > 0 || totalPages > 0 ? (
          <FeedbackTable
            feedbacks={filteredFeedbacks}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
            onDetail={handleDetail}
            onReply={handleOpenReply}
            onResolve={handleResolve}
            onDelete={handleOpenDelete}
          />
        ) : (
          <EmptyFeedback search={search} />
        )}
      </div>

      {showDetail && selectedFeedback && (
        <FeedbackDetailModal
          feedback={selectedFeedback}
          onClose={() => {
            setShowDetail(false);
            setSelectedFeedback(null);
          }}
          onReply={() => handleOpenReply(selectedFeedback)}
        />
      )}

      {showReply && selectedFeedback && (
        <FeedbackReplyModal
          feedback={selectedFeedback}
          submitting={submittingReply}
          onClose={() => {
            if (submittingReply) {
              return;
            }

            setShowReply(false);
            setSelectedFeedback(null);
          }}
          onReply={handleReply}
        />
      )}

      {showDelete && selectedFeedback && (
        <DeleteFeedbackModal
          feedback={selectedFeedback}
          onClose={() => {
            if (deletingFeedback) {
              return;
            }

            setShowDelete(false);
            setSelectedFeedback(null);
          }}
          onConfirm={handleDelete}
          deleting={deletingFeedback}
        />
      )}
    </div>
  );
}
