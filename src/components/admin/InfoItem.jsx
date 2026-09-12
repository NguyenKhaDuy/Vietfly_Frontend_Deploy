export default function InfoItem({
  icon: Icon,
  label,
  value,
  iconClass = "text-slate-400",
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={17} className={`mt-0.5 flex-shrink-0 ${iconClass}`} />

      <div className="min-w-0">
        <p className="text-xs text-slate-400">{label}</p>

        <p className="mt-1 break-words text-sm font-medium text-slate-700">
          {value || "--"}
        </p>
      </div>
    </div>
  );
}
