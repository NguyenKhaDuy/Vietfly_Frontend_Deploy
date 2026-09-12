function AboutHeader() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-20">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan-100/50 blur-3xl" />

        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          {/* LABEL */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-cyan-500" />

            <span className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-600">
              Về VietFly Travel
            </span>

            <span className="h-px w-10 bg-cyan-500" />
          </div>

          {/* TITLE */}
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Kiến tạo những{" "}
            <span className="text-cyan-600">hành trình đáng nhớ</span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            VietFly Travel mang đến những hành trình được xây dựng chỉn chu, phù
            hợp với nhu cầu của từng khách hàng và giàu trải nghiệm.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutHeader;
