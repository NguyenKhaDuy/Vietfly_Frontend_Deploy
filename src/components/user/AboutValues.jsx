import { Award, HeartHandshake, Lightbulb, ShieldCheck } from "lucide-react";

const coreValues = [
  {
    icon: HeartHandshake,
    title: "Tận tâm",
    description:
      "Đặt trải nghiệm và sự hài lòng của khách hàng làm ưu tiên trong mọi dịch vụ.",
  },
  {
    icon: Award,
    title: "Chuyên nghiệp",
    description:
      "Xây dựng quy trình rõ ràng, đội ngũ trách nhiệm và phong cách phục vụ chỉn chu.",
  },
  {
    icon: ShieldCheck,
    title: "Uy tín",
    description:
      "Minh bạch trong tư vấn, cam kết đúng chất lượng và đồng hành cùng khách hàng.",
  },
  {
    icon: Lightbulb,
    title: "Đổi mới",
    description:
      "Không ngừng cập nhật xu hướng và cải tiến sản phẩm để tạo ra trải nghiệm tốt hơn.",
  },
];

function AboutValues() {
  return (
    <section className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          {/* LEFT */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
              04 — Giá trị cốt lõi
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Những điều
              <br />
              VietFly tin tưởng.
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400 text-justify">
              Giá trị không nằm trên khẩu hiệu. Chúng được thể hiện qua cách
              VietFly phục vụ khách hàng và xây dựng từng hành trình.
            </p>
          </div>

          {/* VALUES */}
          <div className="grid border-t border-white/10 sm:grid-cols-2">
            {coreValues.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`border-b border-white/10 py-8 sm:px-7 ${
                    index % 2 === 0 ? "sm:border-r sm:pr-10" : "sm:pl-10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Icon
                      size={24}
                      strokeWidth={1.5}
                      className="text-cyan-400"
                    />

                    <span className="text-xs font-medium text-slate-600">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-7 text-lg font-bold">{item.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400 text-justify">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutValues;
