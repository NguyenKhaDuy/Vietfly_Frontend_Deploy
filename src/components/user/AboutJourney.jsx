const milestones = [
  {
    year: "01",
    title: "Khởi đầu",
    description:
      "VietFly Travel được xây dựng với định hướng trở thành đơn vị cung cấp các sản phẩm và dịch vụ du lịch chất lượng.",
  },
  {
    year: "02",
    title: "Mở rộng hành trình",
    description:
      "Không ngừng phát triển các tour trong nước, quốc tế và các dịch vụ hỗ trợ hành trình cho khách hàng.",
  },
  {
    year: "03",
    title: "Lấy trải nghiệm làm trọng tâm",
    description:
      "Tập trung hoàn thiện chất lượng dịch vụ, quy trình tư vấn và trải nghiệm của khách hàng.",
  },
  {
    year: "04",
    title: "Hướng đến tương lai",
    description:
      "Tiếp tục xây dựng hệ sinh thái du lịch hiện đại, linh hoạt và phù hợp với nhu cầu ngày càng đa dạng.",
  },
];

function AboutJourney() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        {/* LEFT */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">
            03 — Hành trình
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Từ một ý tưởng
            <br />
            <span className="text-slate-400">đến một hành trình.</span>
          </h2>

          <p className="mt-6 max-w-sm text-sm leading-7 text-slate-500 text-justify">
            VietFly phát triển từng bước với một định hướng xuyên suốt: mang đến
            những sản phẩm du lịch có giá trị thực tế và trải nghiệm tốt cho
            khách hàng.
          </p>
        </div>

        {/* TIMELINE */}
        <div className="relative">
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-slate-200" />

          <div className="space-y-12">
            {milestones.map((item) => (
              <div
                key={item.year}
                className="relative grid grid-cols-[40px_1fr] gap-6"
              >
                <div className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full border-4 border-white bg-cyan-500 shadow-sm" />

                <div className="grid gap-4 sm:grid-cols-[100px_1fr]">
                  <div>
                    <span className="text-lg font-bold tracking-[0.12em] text-cyan-600">
                      {item.year}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-500 text-justify">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutJourney;
