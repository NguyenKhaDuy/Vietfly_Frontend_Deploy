import { MapPin } from "lucide-react";

function ContactMap() {
  return (
    <section className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">
            Văn phòng VietFly
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Tìm chúng tôi
            <br />
            <span className="text-slate-400">tại văn phòng gần bạn.</span>
          </h2>
        </div>

        <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[1fr_1.5fr]">
          {/* OFFICE INFO */}
          <div className="p-7 sm:p-9">
            <div className="space-y-7">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                    <MapPin size={18} />
                  </div>

                  <h3 className="font-bold text-slate-950">Văn phòng Hà Nội</h3>
                </div>

                <p className="mt-4 pl-[52px] text-sm leading-7 text-slate-500">
                  HH03C - 3 Tòa Mới - KĐT Thanh Hà
                  <br />
                  31 Tố Hữu - Nguyễn Trãi - Hà Đông
                </p>
              </div>

              <div className="border-t border-slate-100 pt-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <MapPin size={18} />
                  </div>

                  <h3 className="font-bold text-slate-950">
                    Văn phòng TP. Hồ Chí Minh
                  </h3>
                </div>

                <p className="mt-4 pl-[52px] text-sm leading-7 text-slate-500">
                  A3/68 Ấp 1 Bình Hưng, TP. Hồ Chí Minh
                </p>
              </div>
            </div>
          </div>

          {/* MAP */}
          <div className="min-h-[350px] bg-slate-200">
            <iframe
              title="VietFly Travel Map"
              src="https://www.google.com/maps?q=A3%2F68%20Ấp%201%2C%20Bình%20Hưng%2C%20TP.%20Hồ%20Chí%20Minh&output=embed"
              className="h-full min-h-[350px] w-full border-0 grayscale-[20%]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactMap;
