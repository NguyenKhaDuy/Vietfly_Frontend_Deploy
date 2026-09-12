import { X } from "lucide-react";

import SectionTitle from "./SectionTitle";

export default function TourExcluded({ excludes = [] }) {
  const excludeList = Array.isArray(excludes) ? excludes : [];

  if (excludeList.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <SectionTitle title="Không bao gồm" />

      <div
        className="
          mt-7
          grid
          gap-3
          md:grid-cols-2
        "
      >
        {excludeList.map((item, index) => {
          const name =
            typeof item === "string"
              ? item
              : item?.nameService || "Chưa cập nhật";

          const description =
            typeof item === "object"
              ? item?.description || ""
              : "";

          return (
            <div
              key={
                typeof item === "object"
                  ? item?.idTourPriceInclusion ||
                    `excluded-${index}`
                  : `excluded-${index}`
              }
              className="
                flex
                items-start
                gap-3
                rounded-2xl
                bg-slate-50
                p-4
              "
            >
              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-rose-50
                  text-rose-500
                "
              >
                <X size={16} />
              </div>

              <div className="min-w-0">
                <span
                  className="
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  {name}
                </span>

                {description && (
                  <p
                    className="
                      mt-1
                      text-sm
                      leading-6
                      text-slate-500
                    "
                  >
                    {description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
