export default function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
      <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
        <Icon size={15} />
        {label}
      </div>

      <p className="mt-2 text-sm font-semibold text-slate-800">
        {value || "--"}
      </p>
    </div>
  );
}
