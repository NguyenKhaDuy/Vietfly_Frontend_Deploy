import { Check } from "lucide-react";

const commitments = [
  "Tư vấn dựa trên nhu cầu thực tế",
  "Thông tin dịch vụ rõ ràng, minh bạch",
  "Đội ngũ hỗ trợ trong suốt hành trình",
  "Không ngừng lắng nghe và cải thiện",
];

function AboutCommitment() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        {/* IMAGE */}
        <div className="overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1504150558240-0b4fd8946624?auto=format&fit=crop&w=1400&q=90"
            alt="VietFly journey"
            className="h-[440px] w-full object-cover"
          />
        </div>

        {/* CONTENT */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">
            05 — Cam kết
          </p>

          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">
            Mỗi chuyến đi
            <br />
            đều xứng đáng.
          </h2>

          <p className="mt-6 text-[15px] leading-8 text-slate-600 text-justify">
            VietFly luôn chú trọng từng chi tiết trong hành trình — từ việc lựa
            chọn điểm đến, dịch vụ lưu trú, phương tiện di chuyển cho đến cách
            đội ngũ đồng hành cùng khách hàng.
          </p>

          <div className="mt-8 space-y-4">
            {commitments.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
                  <Check size={14} strokeWidth={3} />
                </div>

                <span className="text-sm font-medium text-slate-700">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutCommitment;
