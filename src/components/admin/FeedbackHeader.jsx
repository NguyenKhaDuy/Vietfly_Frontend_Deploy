import { MessageSquareText } from "lucide-react";

export default function FeedbackHeader() {
  return (
    <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500 text-white shadow-lg shadow-blue-600/20">
            <MessageSquareText size={19} />
          </div>

          <span className="text-sm font-semibold text-cyan-500">
            FEEDBACK MANAGEMENT
          </span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          Quản lý phản hồi
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Tiếp nhận, phản hồi và quản lý ý kiến từ khách hàng trên hệ thống
          VietFly.
        </p>
      </div>
    </div>
  );
}
