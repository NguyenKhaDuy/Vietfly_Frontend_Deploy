export default function SectionTitle({ title }) {
  return (
    <div>
      <h2
        className="
          text-2xl
          font-extrabold
          tracking-tight
          text-slate-900
        "
      >
        {title}
      </h2>

      <div
        className="
          mt-3
          h-1
          w-10
          rounded-full
          bg-cyan-600
        "
      />
    </div>
  );
}
