import { MessageSquareText, Search } from "lucide-react";

export default function EmptyFeedback({ search }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        {search ? <Search size={28} /> : <MessageSquareText size={28} />}
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-800">
        {search ? "Không tìm thấy feedback" : "Chưa có feedback nào"}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {search
          ? `Không có phản hồi phù hợp với từ khóa "${search}".`
          : "Hiện tại hệ thống chưa nhận được phản hồi nào từ khách hàng."}
      </p>
    </div>
  );
}
