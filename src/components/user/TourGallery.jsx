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

  const thumbnailIndex = imageList.findIndex(
    (image) => image?.thumbnail === true,
  );

  const currentIndex =
    activeImage !== null &&
    activeImage !== undefined &&
    activeImage >= 0 &&
    activeImage < imageList.length
      ? activeImage
      : thumbnailIndex >= 0
        ? thumbnailIndex
        : 0;

  const currentImage = imageList[currentIndex];

  const mainImageUrl = currentImage?.imgaeUrl || null;

  const thumbnailImages = imageList.filter(
    (_, index) => index !== currentIndex,
  );

  if (imageList.length === 0) {
    return (
      <div
        className="
          flex
          h-[500px]
          w-full
          items-center
          justify-center
          overflow-hidden
          rounded-3xl
          bg-slate-100
        "
      >
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <ImageOff size={48} strokeWidth={1.5} />
          <span className="text-sm font-medium">
            Chưa có hình ảnh
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        h-[500px]
        grid-cols-1
        gap-3
        overflow-hidden
        rounded-3xl
        lg:grid-cols-4
      "
    >
      <div
        className="
          group
          relative
          overflow-hidden
          bg-slate-100
          lg:col-span-2
          lg:row-span-2
        "
      >
        {mainImageUrl ? (
          <img
            src={mainImageUrl}
            alt="Ảnh tour"
            className="
              h-full
              w-full
              object-cover
              transition
              duration-700
              group-hover:scale-105
            "
          />
        ) : (
          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
              text-slate-400
            "
          >
            <div className="flex flex-col items-center gap-2">
              <ImageOff size={40} />
              <span className="text-sm">
                Không có hình ảnh
              </span>
            </div>
          </div>
        )}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/40
            via-transparent
            to-transparent
          "
        />

        {imageList.length > 1 && (
          <>
            <GalleryButton
              position="left"
              onClick={onPrevious}
            >
              <ChevronLeft size={20} />
            </GalleryButton>

            <GalleryButton
              position="right"
              onClick={onNext}
            >
              <ChevronRight size={20} />
            </GalleryButton>
          </>
        )}

        {imageList.length > 1 && (
          <button
            type="button"
            onClick={onOpenGallery}
            className="
              absolute
              bottom-5
              right-5
              z-10
              rounded-xl
              bg-black/60
              px-4
              py-2
              text-sm
              font-semibold
              text-white
              backdrop-blur
              transition
              hover:bg-black/80
            "
          >
            Xem tất cả ảnh
          </button>
        )}
      </div>

      {thumbnailImages.slice(0, 4).map((image, index) => {
        if (!image?.imgaeUrl) {
          return null;
        }

        const realIndex = imageList.findIndex(
          (item) => item?.idImage === image?.idImage,
        );

        return (
          <button
            key={
              image?.idImage ||
              `tour-image-${index}`
            }
            type="button"
            onClick={() =>
              onImageChange?.(realIndex)
            }
            className="
              group
              relative
              hidden
              overflow-hidden
              bg-slate-100
              lg:block
            "
          >
            <img
              src={image.imgaeUrl}
              alt={`Ảnh tour ${index + 1}`}
              className="
                h-full
                w-full
                object-cover
                transition
                duration-500
                group-hover:scale-105
              "
            />

            {index === 3 &&
              thumbnailImages.length > 4 && (
                <div
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    bg-black/45
                  "
                >
                  <span
                    className="
                      rounded-xl
                      bg-white/90
                      px-4
                      py-2
                      text-sm
                      font-bold
                      text-slate-800
                      shadow-lg
                    "
                  >
                    Xem thêm ảnh
                  </span>
                </div>
              )}
          </button>
        );
      })}
    </div>
  );
}

function GalleryButton({
  position,
  children,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        absolute
        ${position}-4
        top-1/2
        z-20
        flex
        h-10
        w-10
        -translate-y-1/2
        items-center
        justify-center
        rounded-full
        bg-white/90
        text-slate-700
        opacity-0
        shadow-lg
        transition
        duration-200
        hover:scale-105
        hover:bg-white
        group-hover:opacity-100
      `}
    >
      {children}
    </button>
  );
}
