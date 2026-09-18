import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Image, X, ZoomIn } from "lucide-react";

import Section from "./Section";

export default function TourGallery({ tour }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const images = Array.isArray(tour?.tourImageDTOS) ? tour.tourImageDTOS : [];

  const getImageUrl = (image) => {
    return (
      image?.imgaeUrl || image?.imageUrl || image?.image || image?.url || null
    );
  };

  const validImages = images.filter((image) => getImageUrl(image));

  const selectedImage =
    selectedIndex !== null ? validImages[selectedIndex] : null;

  // =========================
  // MỞ / ĐÓNG LIGHTBOX
  // =========================
  const openLightbox = (index) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  // =========================
  // ẢNH TRƯỚC
  // =========================
  const showPrevious = () => {
    if (selectedIndex === null || validImages.length === 0) return;

    setSelectedIndex((current) =>
      current === 0 ? validImages.length - 1 : current - 1,
    );
  };

  // =========================
  // ẢNH SAU
  // =========================
  const showNext = () => {
    if (selectedIndex === null || validImages.length === 0) return;

    setSelectedIndex((current) =>
      current === validImages.length - 1 ? 0 : current + 1,
    );
  };

  // =========================
  // KEYBOARD
  // =========================
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Không cho scroll background khi lightbox mở
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  return (
    <>
      <Section
        icon={Image}
        title="Hình ảnh tour"
        description={`${images.length} hình ảnh`}
      >
        {images.length === 0 ? (
          <div className="flex min-h-32 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-400">
            Chưa có hình ảnh
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image, index) => {
              const imageUrl = getImageUrl(image);

              return (
                <div
                  key={
                    image?.idImage ||
                    image?.idTourImage ||
                    `tour-image-${index}`
                  }
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-cyan-200
                    hover:shadow-lg
                  "
                >
                  {imageUrl ? (
                    <button
                      type="button"
                      onClick={() => openLightbox(validImages.indexOf(image))}
                      className="
                        relative
                        block
                        h-[260px]
                        w-full
                        cursor-zoom-in
                        overflow-hidden
                        bg-slate-50
                      "
                    >
                      <img
                        src={imageUrl}
                        alt={
                          tour?.nameTour
                            ? `${tour.nameTour} - Ảnh ${index + 1}`
                            : `Ảnh tour ${index + 1}`
                        }
                        className="
                          h-full
                          w-full
                          object-contain
                          p-2
                          transition-transform
                          duration-500
                          group-hover:scale-[1.03]
                        "
                      />

                      {/* LỚP HOVER */}
                      <div
                        className="
                          absolute
                          inset-0
                          flex
                          items-center
                          justify-center
                          bg-slate-900/0
                          transition
                          duration-300
                          group-hover:bg-slate-900/20
                        "
                      >
                        <div
                          className="
                            flex
                            h-10
                            w-10
                            scale-75
                            items-center
                            justify-center
                            rounded-full
                            bg-white/95
                            text-slate-700
                            opacity-0
                            shadow-lg
                            transition-all
                            duration-300
                            group-hover:scale-100
                            group-hover:opacity-100
                          "
                        >
                          <ZoomIn size={18} />
                        </div>
                      </div>

                      {/* SỐ THỨ TỰ */}
                      <div
                        className="
                          absolute
                          bottom-3
                          left-3
                          rounded-lg
                          bg-slate-900/70
                          px-2.5
                          py-1
                          text-[11px]
                          font-semibold
                          text-white
                          backdrop-blur-sm
                        "
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      {/* THUMBNAIL */}
                      {image?.thumbnail === true && (
                        <div
                          className="
                            absolute
                            left-3
                            top-3
                            rounded-lg
                            bg-cyan-600
                            px-2.5
                            py-1.5
                            text-[10px]
                            font-semibold
                            text-white
                            shadow-md
                          "
                        >
                          Ảnh đại diện
                        </div>
                      )}
                    </button>
                  ) : (
                    <div className="flex h-[260px] w-full items-center justify-center text-xs text-slate-400">
                      Không có ảnh
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Section>

      {/* =========================
          LIGHTBOX
      ========================= */}
      {selectedImage && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-slate-950/95
            p-4
            backdrop-blur-sm
          "
          onClick={closeLightbox}
        >
          {/* CLOSE */}
          <button
            type="button"
            onClick={closeLightbox}
            className="
              absolute
              right-4
              top-4
              z-20
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-white/10
              text-white
              transition
              hover:bg-white/20
            "
            aria-label="Đóng"
          >
            <X size={22} />
          </button>

          {/* COUNTER */}
          <div
            className="
              absolute
              left-1/2
              top-5
              -translate-x-1/2
              rounded-full
              bg-white/10
              px-4
              py-2
              text-xs
              font-medium
              text-white
              backdrop-blur-sm
            "
          >
            {selectedIndex + 1} / {validImages.length}
          </div>

          {/* PREVIOUS */}
          {validImages.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              className="
                absolute
                left-3
                top-1/2
                z-20
                flex
                h-12
                w-12
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-white/10
                text-white
                backdrop-blur-sm
                transition
                hover:bg-white/20
                sm:left-6
              "
              aria-label="Ảnh trước"
            >
              <ChevronLeft size={26} />
            </button>
          )}

          {/* IMAGE */}
          <div
            className="
              flex
              max-h-[90vh]
              max-w-[90vw]
              items-center
              justify-center
            "
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={getImageUrl(selectedImage)}
              alt={tour?.nameTour || "Ảnh tour"}
              className="
                max-h-[88vh]
                max-w-[88vw]
                rounded-xl
                object-contain
                shadow-2xl
              "
            />
          </div>

          {/* NEXT */}
          {validImages.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              className="
                absolute
                right-3
                top-1/2
                z-20
                flex
                h-12
                w-12
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-white/10
                text-white
                backdrop-blur-sm
                transition
                hover:bg-white/20
                sm:right-6
              "
              aria-label="Ảnh tiếp theo"
            >
              <ChevronRight size={26} />
            </button>
          )}

          {/* TITLE */}
          {tour?.nameTour && (
            <div
              className="
                absolute
                bottom-5
                left-1/2
                max-w-[80%]
                -translate-x-1/2
                truncate
                rounded-full
                bg-white/10
                px-4
                py-2
                text-center
                text-xs
                font-medium
                text-white
                backdrop-blur-sm
              "
            >
              {tour.nameTour}
            </div>
          )}
        </div>
      )}
    </>
  );
}
