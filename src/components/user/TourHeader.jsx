function TourHeader() {
  return (
    <div className="mb-12 text-center">
      <div className="mb-5 flex items-center justify-center gap-3">
        <span className="h-px w-10 bg-cyan-500" />

        <span className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-600">
          Khám phá hành trình
        </span>

        <span className="h-px w-10 bg-cyan-500" />
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
        Khám phá{" "}
        <span className="text-cyan-600">tour du lịch khắp Việt Nam</span>
      </h1>

      <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
        Miền Bắc vùng cao, miền Trung đầy nắng gió, miền Nam sôi động, miền Tây
        sông nước và những thiên đường biển đang chờ bạn khám phá.
      </p>
    </div>
  );
}

export default TourHeader;
