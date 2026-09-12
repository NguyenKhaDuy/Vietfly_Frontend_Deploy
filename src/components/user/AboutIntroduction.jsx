function AboutIntroduction() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        {/* LEFT */}
        <div>
          <div className="sticky top-28">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">
              01 — Giới thiệu
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">
              Chúng tôi là
              <br />
              <span className="text-cyan-600">VietFly Travel.</span>
            </h2>

            <div className="mt-7 h-px w-20 bg-slate-300" />

            <p className="text-justify mt-6 max-w-sm text-sm leading-7 text-slate-500">
              Không chỉ đưa bạn đến một điểm đến, VIETFLY TRAVEL kiến tạo những
              hành trình đáng nhớ – nơi mỗi chuyến đi là một cơ hội để khám phá,
              trải nghiệm và kết nối.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <div className="overflow-hidden rounded-[4px]">
            <img
              src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=90"
              alt="VietFly Travel"
              className="h-[460px] w-full object-cover"
            />
          </div>

          {/* STATS */}
          {/* STATS */}
          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-4xl font-bold tracking-tight text-slate-950">
                1,000<span className="text-cyan-600">+</span>
              </p>

              <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
                Tour du lịch cá nhân
              </p>
            </div>

            <div>
              <p className="text-4xl font-bold tracking-tight text-slate-950">
                200<span className="text-cyan-600">+</span>
              </p>

              <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
                Tour du lịch doanh nghiệp
              </p>
            </div>

            <div>
              <p className="text-4xl font-bold tracking-tight text-slate-950">
                100<span className="text-cyan-600">+</span>
              </p>

              <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
                Sự kiện đã xây dựng
              </p>
            </div>

            <div>
              <p className="text-4xl font-bold tracking-tight text-slate-950">
                50<span className="text-cyan-600">+</span>
              </p>

              <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
                Đối tác doanh nghiệp
              </p>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-10 space-y-5 border-t border-slate-200 pt-8 text-[15px] leading-8 text-slate-600">
            <p>
              <strong className="font-semibold text-slate-950">
                VIETFLY TRAVEL
              </strong>{" "}
              <p className="text-justify">
                là đơn vị cung cấp giải pháp Du lịch & Tổ chức sự kiện chuyên
                nghiệp, đồng hành cùng khách hàng trong những hành trình từ cá
                nhân, gia đình đến doanh nghiệp. Chúng tôi cung cấp đa dạng dịch
                vụ: tour trong nước & quốc tế, tour thiết kế riêng, vé máy bay,
                khách sạn, xe du lịch, Team Building, Gala Dinner, hội nghị và
                các chương trình sự kiện trọn gói.
              </p>
            </p>

            <p className="text-justify">
              Bên cạnh đó, VIETFLY PRODUCTION mang đến các giải pháp quay chụp,
              TVC, livestream và media sự kiện, giúp mỗi hành trình và sự kiện
              được lưu giữ bằng những hình ảnh chân thực, chỉn chu và giàu cảm
              xúc.
            </p>

            <p className="text-justify">
              Chúng tôi tin rằng, một hành trình đáng nhớ không chỉ nằm ở nơi
              bạn đến, mà còn ở những gì bạn cảm nhận trên suốt hành trình.
            </p>

            <p className="text-justify">
              Đó có thể là một cảnh sắc khiến bạn dừng lại, một món ăn khiến bạn
              nhớ mãi, một câu chuyện văn hóa khiến bạn hiểu hơn về vùng đất,
              hay một cuộc gặp gỡ với những con người bản địa chân thành.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutIntroduction;
