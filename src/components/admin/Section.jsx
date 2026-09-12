export default function Section({ icon: Icon, title, description, children }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
            <Icon size={19} className="text-cyan-500" />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">{title}</h2>

            {description && (
              <p className="mt-0.5 text-xs text-slate-400">{description}</p>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">{children}</div>
    </section>
  );
}
