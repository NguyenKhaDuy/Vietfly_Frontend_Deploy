export default function InfoItem({ icon, label, value }) {
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
      <div
        className="
          mb-3
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-xl
          bg-white
          text-cyan-600
          shadow-sm
        "
      >
        {icon}
      </div>

      <div className="text-xs text-slate-400">{label}</div>

      <div
        className="
          mt-1
          text-sm
          font-bold
          text-slate-700
        "
      >
        {value}
      </div>
    </div>
  );
}
