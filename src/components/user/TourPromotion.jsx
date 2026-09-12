import { Gift, ExternalLink, ArrowRight } from "lucide-react";

export default function TourPromotion({ promotionLink }) {
  if (!promotionLink) {
    return null;
  }

  const handleOpenPromotion = () => {
    window.open(promotionLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-50 via-white to-blue-50">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-600 text-white shadow-sm">
            <Gift size={24} />
          </div>

          <div className="min-w-0">
            <h3 className="text-base font-bold text-slate-800 sm:text-lg">
              Ưu đãi tặng kèm
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Xem ngay các ưu đãi đặc biệt dành cho tour này.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenPromotion}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-700 hover:shadow-md"
        >
          Xem ưu đãi
          <ArrowRight size={17} />
          <ExternalLink size={15} />
        </button>
      </div>
    </div>
  );
}
