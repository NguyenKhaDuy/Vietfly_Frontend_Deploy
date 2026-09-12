import {
  UserRound,
  Heart,
  MapPin,
  Rocket,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const values = [
  {
    id: 1,
    icon: UserRound,
    number: "01",
    title: "Lấy khách hàng làm trung tâm",
    content:
      "Mỗi hành trình đều được xây dựng từ nhu cầu và trải nghiệm thực tế của khách hàng. Chúng tôi luôn lắng nghe, đồng hành và không ngừng cải thiện chất lượng dịch vụ.",
  },
  {
    id: 2,
    icon: Heart,
    number: "02",
    title: "Chuyên nghiệp trong từng hành trình",
    content:
      "Đội ngũ tư vấn viên, hướng dẫn viên và đối tác luôn làm việc với tinh thần trách nhiệm, tận tâm và chuyên nghiệp. Mọi quy trình đều được thực hiện minh bạch và chu đáo.",
  },
  {
    id: 3,
    icon: MapPin,
    number: "03",
    title: "Phát triển cùng cộng đồng địa phương",
    content:
      "Chúng tôi ưu tiên hợp tác với các đơn vị lưu trú, nhà hàng và người dân bản địa nhằm góp phần thúc đẩy du lịch bền vững, tạo thêm cơ hội việc làm và lan tỏa giá trị văn hóa.",
  },
  {
    id: 4,
    icon: Rocket,
    number: "04",
    title: "Không ngừng đổi mới",
    content:
      "Luôn cập nhật xu hướng du lịch hiện đại, ứng dụng công nghệ vào quy trình đặt tour và chăm sóc khách hàng để mang đến những trải nghiệm thuận tiện, nhanh chóng và chất lượng hơn mỗi ngày.",
  },
  {
    id: 5,
    icon: ShieldCheck,
    number: "05",
    title: "Trách nhiệm và uy tín",
    content:
      "Uy tín là nền tảng cho mọi hoạt động của chúng tôi. Mỗi cam kết với khách hàng đều được thực hiện bằng sự minh bạch, trung thực và trách nhiệm, hướng đến niềm tin lâu dài.",
  },
  {
    id: 6,
    icon: Sparkles,
    number: "06",
    title: "Lan tỏa giá trị tích cực",
    content:
      "Chúng tôi tin rằng mỗi chuyến đi không chỉ là kỳ nghỉ mà còn là cơ hội kết nối con người, khám phá văn hóa và tạo nên những kỷ niệm ý nghĩa.",
  },
];

function TravelValues() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-cyan-100/40 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <div className="mb-5 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-cyan-500" />

            <span className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-600">
              Giá trị cốt lõi
            </span>

            <span className="h-px w-8 bg-cyan-500" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Điều tạo nên <span className="text-cyan-600">VietFly Travel</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Mỗi hành trình không chỉ là một chuyến đi. Đó là sự kết hợp giữa
            trải nghiệm, sự tận tâm và những giá trị mà chúng tôi luôn theo
            đuổi.
          </p>
        </div>

        {/* Values */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {values.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.id}
                className="
      group
      relative
      flex
      min-h-[420px]
      flex-col
      overflow-hidden
      rounded-3xl
      border
      border-slate-200/80
      bg-white
      p-7
      shadow-sm
      transition-all
      duration-500
      hover:-translate-y-2
      hover:border-cyan-200
      hover:shadow-xl
      hover:shadow-cyan-900/10
      sm:p-8
    "
              >
                {/* Top gradient line */}
                <div
                  className="
        absolute
        left-0
        right-0
        top-0
        h-1
        origin-left
        scale-x-0
        bg-gradient-to-r
        from-cyan-500
        via-teal-400
        to-emerald-400
        transition-transform
        duration-500
        group-hover:scale-x-100
      "
                />

                {/* Decorative number */}
                <span
                  className="
        pointer-events-none
        absolute
        right-6
        top-4
        text-6xl
        font-black
        tracking-tighter
        text-slate-100
        transition-colors
        duration-500
        group-hover:text-cyan-50
      "
                >
                  {item.number}
                </span>

                {/* Icon + title */}
                <div className="relative flex items-center gap-4">
                  <div
                    className="
          flex
          h-14
          w-14
          shrink-0
          items-center
          justify-center
          rounded-2xl
          bg-cyan-50
          text-cyan-600
          transition-all
          duration-500
          group-hover:scale-110
          group-hover:bg-cyan-600
          group-hover:text-white
          group-hover:shadow-lg
          group-hover:shadow-cyan-600/25
        "
                  >
                    <Icon
                      size={25}
                      strokeWidth={1.8}
                      className="transition-transform duration-500 group-hover:rotate-3"
                    />
                  </div>

                  <div className="pr-8">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600">
                      Giá trị {item.number}
                    </p>

                    <h3 className="text-base font-bold leading-6 text-slate-900 sm:text-lg">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <p className="relative mt-7 text-justify text-sm leading-7 text-slate-500 sm:text-[15px]">
                  {item.content}
                </p>

                {/* Bottom */}
                <div className="relative mt-auto flex items-center justify-between border-t border-slate-100 pt-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 transition-colors duration-300 group-hover:text-cyan-600">
                    VietFly Travel
                  </span>

                  <div
                    className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-full
          border
          border-slate-200
          text-slate-400
          transition-all
          duration-300
          group-hover:border-cyan-500
          group-hover:bg-cyan-500
          group-hover:text-white
        "
                  >
                    <ArrowUpRight size={15} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TravelValues;
