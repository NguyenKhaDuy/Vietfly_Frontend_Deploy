import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";

export default function TourGallery({
  images = [],
  activeImage = null,
  onImageChange,
  onPrevious,
  onNext,
  onOpenGallery,
}) {
  const imageList = Array.isArray(images) ? images : [];

  const getImageUrl = (image) => {
    return (
      image?.imgaeUrl || image?.imageUrl || image?.image || image?.url || null
    );
  };

  /*
   * ============================================================
   * SẮP XẾP ẢNH
   * ============================================================
   *
   * Ảnh thumbnail luôn đứng đầu.
   * Các ảnh còn lại giữ nguyên thứ tự backend trả về.
   */
  const orderedImages = [...imageList].sort((a, b) => {
    const aThumbnail = a?.thumbnail === true ? 1 : 0;
    const bThumbnail = b?.thumbnail === true ? 1 : 0;

    return bThumbnail - aThumbnail;
  });

  /*
   * ============================================================
   * XÁC ĐỊNH ẢNH ĐANG ACTIVE
   * ============================================================
   *
   * activeImage vẫn là index của imageList gốc.
   */
  const activeOriginalImage =
    activeImage !== null &&
    activeImage !== undefined &&
    activeImage >= 0 &&
    activeImage < imageList.length
      ? imageList[activeImage]
      : null;

  const thumbnailIndex = orderedImages.findIndex(
    (image) => image?.thumbnail === true,
  );

  const orderedCurrentIndex = activeOriginalImage
    ? orderedImages.findIndex(
        (image) => image?.idImage === activeOriginalImage?.idImage,
      )
    : thumbnailIndex >= 0
      ? thumbnailIndex
      : 0;

  const currentIndex = orderedCurrentIndex >= 0 ? orderedCurrentIndex : 0;

  const currentImage = orderedImages[currentIndex];
  const mainImageUrl = getImageUrl(currentImage);

  /*
   * ============================================================
   * KHÔNG CÓ ẢNH
   * ============================================================
   */
  if (orderedImages.length === 0) {
    return (
      <div
        className="
          flex
          min-h-[520px]
          w-full
          items-center
          justify-center
          rounded-3xl
          border
          border-slate-200
          bg-white
        "
      >
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <ImageOff size={46} strokeWidth={1.5} />

          <span className="text-sm font-medium">Chưa có hình ảnh</span>
        </div>
      </div>
    );
  }

  /*
   * ============================================================
   * LẤY INDEX GỐC
   * ============================================================
   */
  const getOriginalIndex = (image) => {
    return imageList.findIndex((item) => item?.idImage === image?.idImage);
  };

  return (
    <div className="w-full">
      {/* ======================================================
          MAIN GALLERY
      ======================================================= */}
      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >
        {/* ====================================================
            MAIN IMAGE AREA
        ===================================================== */}
        <div
          className="
            relative
            flex
            h-[500px]
            w-full
            items-center
            justify-center
            overflow-hidden
            bg-slate-50
            sm:h-[540px]
            lg:h-[580px]
          "
        >
          {/* ==================================================
              BACKGROUND BLUR
          =================================================== */}
          {mainImageUrl && (
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                overflow-hidden
              "
            >
              <img
                src={mainImageUrl}
                alt=""
                aria-hidden="true"
                className="
                  h-full
                  w-full
                  scale-110
                  object-cover
                  opacity-[0.07]
                  blur-3xl
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-slate-50/90
                "
              />
            </div>
          )}

          {/* ==================================================
              MAIN IMAGE
          =================================================== */}
          {mainImageUrl ? (
            <div
              className="
                relative
                z-10
                flex
                h-full
                w-full
                items-center
                justify-center
                px-8
                py-5
                sm:px-10
                sm:py-6
                lg:px-12
                lg:py-7
              "
            >
              <img
                src={mainImageUrl}
                alt="Ảnh tour"
                className="
                  block
                  max-h-full
                  max-w-full
                  object-contain
                  drop-shadow-[0_18px_35px_rgba(15,23,42,0.14)]
                  transition-all
                  duration-500
                "
              />
            </div>
          ) : (
            <div
              className="
                relative
                z-10
                flex
                flex-col
                items-center
                gap-3
                text-slate-400
              "
            >
              <ImageOff size={46} strokeWidth={1.5} />

              <span className="text-sm font-medium">Không có hình ảnh</span>
            </div>
          )}

          {/* ==================================================
              PREVIOUS
          =================================================== */}
          {orderedImages.length > 1 && (
            <button
              type="button"
              onClick={onPrevious}
              aria-label="Ảnh trước"
              className="
                absolute
                left-4
                top-1/2
                z-30
                flex
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-slate-200
                bg-white/95
                text-slate-700
                shadow-md
                backdrop-blur
                transition-all
                duration-200
                hover:scale-105
                hover:border-slate-300
                hover:bg-white
                hover:text-cyan-600
                sm:left-5
              "
            >
              <ChevronLeft size={21} strokeWidth={2} />
            </button>
          )}

          {/* ==================================================
              NEXT
          =================================================== */}
          {orderedImages.length > 1 && (
            <button
              type="button"
              onClick={onNext}
              aria-label="Ảnh tiếp theo"
              className="
                absolute
                right-4
                top-1/2
                z-30
                flex
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-slate-200
                bg-white/95
                text-slate-700
                shadow-md
                backdrop-blur
                transition-all
                duration-200
                hover:scale-105
                hover:border-slate-300
                hover:bg-white
                hover:text-cyan-600
                sm:right-5
              "
            >
              <ChevronRight size={21} strokeWidth={2} />
            </button>
          )}

          {/* ==================================================
              COUNTER
          =================================================== */}
          <div
            className="
              absolute
              bottom-5
              left-5
              z-30
              rounded-lg
              border
              border-slate-200
              bg-white/95
              px-3
              py-1.5
              text-xs
              font-semibold
              text-slate-700
              shadow-sm
              backdrop-blur
            "
          >
            {currentIndex + 1}
            <span className="mx-1 text-slate-300">/</span>
            {orderedImages.length}
          </div>

          {/* ==================================================
              VIEW ALL
          =================================================== */}
          {orderedImages.length > 1 && (
            <button
              type="button"
              onClick={onOpenGallery}
              className="
                absolute
                bottom-5
                right-5
                z-30
                rounded-lg
                bg-slate-900
                px-4
                py-2
                text-sm
                font-semibold
                text-white
                shadow-md
                transition-all
                duration-200
                hover:bg-slate-800
                hover:shadow-lg
              "
            >
              Xem tất cả ảnh
            </button>
          )}
        </div>

        {/* ====================================================
            THUMBNAIL STRIP
        ===================================================== */}
        {orderedImages.length > 1 && (
          <div
            className="
              border-t
              border-slate-100
              bg-white
              px-4
              py-3
              sm:px-5
            "
          >
            <div
              className="
                flex
                gap-3
                overflow-x-auto
                pb-1
                scrollbar-thin
                scrollbar-track-transparent
                scrollbar-thumb-slate-200
              "
            >
              {orderedImages.map((image, index) => {
                const imageUrl = getImageUrl(image);

                if (!imageUrl) {
                  return null;
                }

                const isActive = index === currentIndex;
                const originalIndex = getOriginalIndex(image);

                return (
                  <button
                    key={image?.idImage || `tour-image-${index}`}
                    type="button"
                    onClick={() => onImageChange?.(originalIndex)}
                    aria-label={`Xem ảnh ${index + 1}`}
                    className={`
                      group
                      relative
                      h-[82px]
                      w-[116px]
                      shrink-0
                      overflow-hidden
                      rounded-xl
                      bg-white
                      p-0.5
                      transition-all
                      duration-200
                      ${
                        isActive
                          ? "border border-cyan-500 shadow-sm"
                          : "border border-slate-200 hover:border-slate-300 hover:shadow-sm"
                      }
                    `}
                  >
                    <div
                      className="
                        flex
                        h-full
                        w-full
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-[9px]
                        bg-slate-50
                      "
                    >
                      <img
                        src={imageUrl}
                        alt={`Ảnh tour ${index + 1}`}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-300
                          group-hover:scale-[1.04]
                        "
                      />
                    </div>

                    {/* Active indicator - chỉ 1px */}
                    {isActive && (
                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          rounded-[10px]
                          ring-1
                          ring-inset
                          ring-cyan-500
                        "
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
