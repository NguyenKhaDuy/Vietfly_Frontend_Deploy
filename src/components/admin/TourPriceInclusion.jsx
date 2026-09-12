import { CheckCircle2, CircleOff } from "lucide-react";

import Section from "./Section";

export default function TourPriceInclusion({ tour }) {
  const items = Array.isArray(tour?.tourPriceInclusionDTOS)
    ? tour.tourPriceInclusionDTOS
    : [];

  const includedItems = items.filter(
    (item) => item.typeTourPrice === "INCLUDED",
  );

  const notIncludedItems = items.filter(
    (item) => item.typeTourPrice === "NOT_INCLUDED",
  );

  return (
    <Section
      icon={CheckCircle2}
      title="Giá tour bao gồm"
      description={`${items.length} nội dung`}
    >
      {items.length === 0 ? (
        <div className="rounded-xl bg-slate-50 px-5 py-10 text-center">
          <CheckCircle2 size={32} className="mx-auto mb-3 text-slate-300" />

          <p className="text-sm text-slate-400">Chưa có thông tin dịch vụ</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* BAO GỒM */}
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100">
                <CheckCircle2 size={20} className="text-emerald-600" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-800">Bao gồm</h3>

                <p className="mt-0.5 text-xs text-slate-400">
                  {includedItems.length} nội dung
                </p>
              </div>
            </div>

            {includedItems.length === 0 ? (
              <div className="rounded-xl bg-white px-4 py-8 text-center">
                <p className="text-sm text-slate-400">Chưa có thông tin</p>
              </div>
            ) : (
              <div className="space-y-3">
                {includedItems.map((item) => (
                  <div
                    key={item.idTourPriceInclusion}
                    className="rounded-xl bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 flex-shrink-0 text-emerald-500"
                      />

                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-semibold text-slate-700">
                          {item.nameService || "--"}
                        </h4>

                        {item.description && (
                          <p className="mt-1.5 text-xs leading-5 text-slate-500">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* KHÔNG BAO GỒM */}
          <div className="rounded-2xl border border-red-100 bg-red-50/40 p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-100">
                <CircleOff size={20} className="text-red-500" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Không bao gồm
                </h3>

                <p className="mt-0.5 text-xs text-slate-400">
                  {notIncludedItems.length} nội dung
                </p>
              </div>
            </div>

            {notIncludedItems.length === 0 ? (
              <div className="rounded-xl bg-white px-4 py-8 text-center">
                <p className="text-sm text-slate-400">Chưa có thông tin</p>
              </div>
            ) : (
              <div className="space-y-3">
                {notIncludedItems.map((item) => (
                  <div
                    key={item.idTourPriceInclusion}
                    className="rounded-xl bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <CircleOff
                        size={18}
                        className="mt-0.5 flex-shrink-0 text-red-400"
                      />

                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-semibold text-slate-700">
                          {item.nameService || "--"}
                        </h4>

                        {item.description && (
                          <p className="mt-1.5 text-xs leading-5 text-slate-500">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </Section>
  );
}
