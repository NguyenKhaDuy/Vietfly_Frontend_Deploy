import {
  MessageSquare,
  Clock3,
  MessageCircleReply,
  CircleCheck,
} from "lucide-react";

function StatCard({ icon: Icon, title, value, description, iconClass }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>

          <p className="mt-1 text-xs text-slate-400">{description}</p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

export default function FeedbackStats({ feedbacks }) {
  const total = feedbacks.length;

  const pending = feedbacks.filter(
    (item) => item.feedbackStatus === "PENDING",
  ).length;

  const replied = feedbacks.filter(
    (item) => item.feedbackStatus === "REPLIED",
  ).length;

  const resolved = feedbacks.filter(
    (item) => item.feedbackStatus === "RESOLVED",
  ).length;

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        icon={MessageSquare}
        title="Tổng phản hồi"
        value={total}
        description="Tất cả phản hồi"
        iconClass="bg-blue-50 text-cyan-500"
      />

      <StatCard
        icon={Clock3}
        title="Chờ xử lý"
        value={pending}
        description="Cần được phản hồi"
        iconClass="bg-amber-50 text-amber-600"
      />

      <StatCard
        icon={MessageCircleReply}
        title="Đã phản hồi"
        value={replied}
        description="Đã trả lời khách hàng"
        iconClass="bg-violet-50 text-violet-600"
      />

      <StatCard
        icon={CircleCheck}
        title="Đã xử lý"
        value={resolved}
        description="Feedback đã hoàn tất"
        iconClass="bg-emerald-50 text-emerald-600"
      />
    </div>
  );
}
