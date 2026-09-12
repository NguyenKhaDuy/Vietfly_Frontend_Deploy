import { ArrowUpRight } from "lucide-react";

function AboutCTA() {
  return (
    <section className="border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          {/* CONTENT */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">
              VietFly Travel
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Cùng bắt đầu một hành trình mới.
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              Đội ngũ VietFly sẵn sàng đồng hành và tư vấn cho bạn.
            </p>
          </div>

          {/* BUTTON */}
          <button
            type="button"
            className="group inline-flex w-fit items-center gap-3 border-b-2 border-slate-900 pb-2 text-sm font-bold text-slate-900 transition hover:border-cyan-500 hover:text-cyan-600"
          >
            Liên hệ với chúng tôi
            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
}

export default AboutCTA;
