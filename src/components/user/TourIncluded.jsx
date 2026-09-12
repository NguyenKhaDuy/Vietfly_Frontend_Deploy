import {
  Bus,
  Hotel,
  ShieldCheck,
  Ticket,
  Users,
  Utensils,
} from "lucide-react";

import SectionTitle from "./SectionTitle";

const icons = [
  Hotel,
  Bus,
  Utensils,
  Ticket,
  Users,
  ShieldCheck,
];

export default function TourIncluded({ includes = [] }) {
  const includeList = Array.isArray(includes) ? includes : [];

  if (includeList.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-slate-100 py-12">
      <SectionTitle title="Dịch vụ bao gồm" />

      <div
        className="
          mt-7
          grid
          gap-3
          md:grid-cols-2
        "
      >
        {includeList.map((item, index) => {
          const Icon = icons[index % icons.length];

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
                    `included-${index}`
                  : `included-${index}`
              }
              className="
                flex
                items-start
                gap-4
                rounded-2xl
                border
                border-slate-100
                bg-slate-50
                p-4
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-white
                  text-cyan-600
                  shadow-sm
                "
              >
                <Icon size={18} />
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
