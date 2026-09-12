import { Image } from "lucide-react";
import Section from "./Section";

export default function TourGallery({ tour }) {
  const images = Array.isArray(tour?.tourImageDTOS) ? tour.tourImageDTOS : [];

  const getImageUrl = (image) => {
    return (
      image?.imgaeUrl || image?.imageUrl || image?.image || image?.url || null
    );
  };

  return (
    <Section
      icon={Image}
      title="Hình ảnh tour"
      description={`${images.length} hình ảnh`}
    >
      {images.length === 0 ? (
        <div className="flex min-h-32 items-center justify-center rounded-xl bg-slate-50 text-sm text-slate-400">
          Chưa có hình ảnh
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((image) => {
            const imageUrl = getImageUrl(image);

            return (
              <div
                key={image.idImage}
                className="group relative aspect-video overflow-hidden rounded-xl bg-slate-100"
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={tour?.nameTour || "Tour"}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                    Không có ảnh
                  </div>
                )}

                {/* THUMBNAIL */}
                {image.thumbnail === true && (
                  <div className="absolute left-2 top-2 rounded-md bg-cyan-500 px-2 py-1 text-[10px] font-semibold text-white shadow-sm">
                    Ảnh đại diện
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Section>
  );
}
