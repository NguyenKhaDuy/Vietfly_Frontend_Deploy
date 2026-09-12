export default function InputField({
  icon: Icon,
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">
        <Icon
          size={17}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`h-11 w-full rounded-xl border pl-10 pr-4 text-sm outline-none transition ${
            disabled
              ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
              : "border-slate-200 bg-white text-slate-800 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10"
          }`}
        />
      </div>
    </div>
  );
}
