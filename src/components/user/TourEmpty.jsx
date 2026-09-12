function TourEmpty() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-dashed
        border-slate-300
        bg-white
        py-20
        text-center
      "
    >
      <h3 className="text-lg font-bold text-slate-800">
        Không tìm thấy tour phù hợp
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        Hãy thử chọn một danh mục khác.
      </p>
    </div>
  );
}

export default TourEmpty;
