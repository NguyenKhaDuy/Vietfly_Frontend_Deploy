import { Check, Compass, Target } from "lucide-react";

const missionItems = [
  "Mang đến những chương trình du lịch chất lượng với chi phí hợp lý.",
  "Tư vấn tận tâm để mỗi khách hàng có hành trình phù hợp.",
  "Xây dựng trải nghiệm du lịch an toàn, chuyên nghiệp và đáng nhớ.",
  "Không ngừng nâng cao chất lượng dịch vụ.",
];

function AboutVisionMission() {
  return (
    <section className="border-y border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        {/* HEADER */}
        <div className="mb-16 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">
            02 — Định hướng
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Điều chúng tôi
            <br />
            <span className="text-slate-400">hướng đến mỗi ngày.</span>
          </h2>
        </div>

        <div className="grid gap-0 lg:grid-cols-2">
          {/* VISION */}
          <div className="border-t border-slate-300 py-10 lg:border-r lg:pr-16">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">
                  Tầm nhìn
                </p>

                <h3 className="mt-4 text-3xl font-bold text-slate-950">
                  Kết nối con người
                  <br />
                  với những hành trình.
                </h3>
              </div>

              <Target size={30} strokeWidth={1.5} className="text-cyan-600" />
            </div>

            <p className="mt-7 max-w-xl text-[15px] leading-8 text-slate-600 text-justify">
              Trở thành đơn vị cung cấp dịch vụ du lịch và trải nghiệm uy tín,
              không ngừng đổi mới để mang đến những hành trình chất lượng, góp
              phần kết nối con người với những giá trị văn hóa, thiên nhiên và
              cộng đồng.
            </p>
          </div>

          {/* MISSION */}
          <div className="border-t border-slate-300 py-10 lg:pl-16">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                  Sứ mệnh
                </p>

                <h3 className="mt-4 text-3xl font-bold text-slate-950">
                  Mang đến giá trị
                  <br />
                  trong từng trải nghiệm.
                </h3>
              </div>

              <Compass
                size={30}
                strokeWidth={1.5}
                className="text-emerald-600"
              />
            </div>

            <div className="mt-7 space-y-4">
              {missionItems.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-[15px] leading-7 text-slate-600"
                >
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <Check size={12} strokeWidth={3} />
                  </div>

                  <span className="text-justify">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutVisionMission;
