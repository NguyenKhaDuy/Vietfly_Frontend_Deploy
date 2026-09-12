import SectionTitle from "./SectionTitle";

export default function TourIntroduction({ tour }) {
  const description =
    tour?.description?.trim() || "Chưa có thông tin mô tả.";

  return (
    <section className="border-b border-slate-100 pb-12">
      <SectionTitle title="Giới thiệu tour" />

      <p
        className="
          mt-6
          text-[15px]
          leading-8
          text-slate-600
        "
      >
        {description}
      </p>
    </section>
  );
}
