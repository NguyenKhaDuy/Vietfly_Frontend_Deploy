import { Minus, Plus } from "lucide-react";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN").format(price) + "đ";

export default function GuestCounter({
  label,
  description,
  price,
  value,
  min,
  onDecrease,
  onIncrease,
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-100
        bg-slate-50
        p-4
      "
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p
            className="
              text-sm
              font-bold
              text-slate-800
            "
          >
            {label}
          </p>

          <p
            className="
              mt-1
              text-xs
              text-slate-400
            "
          >
            {description}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={value <= min}
            onClick={onDecrease}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              border
              border-slate-200
              bg-white
              text-slate-500
              transition
              hover:border-cyan-300
              hover:text-cyan-600
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <Minus size={15} />
          </button>

          <span
            className="
              w-5
              text-center
              text-sm
              font-bold
              text-slate-800
            "
          >
            {value}
          </span>

          <button
            type="button"
            onClick={onIncrease}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              border
              border-slate-200
              bg-white
              text-slate-500
              transition
              hover:border-cyan-300
              hover:text-cyan-600
            "
          >
            <Plus size={15} />
          </button>
        </div>
      </div>

      <div className="mt-3 text-right">
        <span
          className="
            text-sm
            font-bold
            text-cyan-600
          "
        >
          {formatPrice(price)}
        </span>

        <span className="ml-1 text-xs text-slate-400">/ người</span>
      </div>
    </div>
  );
}
