import { ChevronLeft, ChevronRight, X, ImageOff } from "lucide-react";

export default function GalleryModal({
  images = [],
  activeImage = 0,
  onImageChange,
  onPrevious,
  onNext,
  onClose,
}) {
  const imageList = Array.isArray(images)
    ? images.filter((image) => image?.imgaeUrl)
    : [];

  const currentIndex =
    imageList.length > 0 && activeImage >= 0 && activeImage < imageList.length
      ? activeImage
      : 0;

  const currentImage = imageList[currentIndex];

  if (imageList.length === 0) {
    return (
      <div
        className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/95
          p-4
        "
      >
        <button
          type="button"
          onClick={onClose}
          className="
            absolute
            right-5
            top-5
            z-10
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            bg-white/10
            text-white
            backdrop-blur
            transition
            hover:bg-white/20
          "
        >
          <X size={22} />
        </button>

        <div className="flex flex-col items-center gap-3 text-white/50">
          <ImageOff size={48} strokeWidth={1.5} />
          <span className="text-sm">Không có hình ảnh</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/95
        p-4
      "
    >
      <button
        type="button"
        onClick={onClose}
        className="
          absolute
          right-5
          top-5
          z-30
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          bg-white/10
          text-white
          backdrop-blur
          transition
          hover:bg-white/20
        "
      >
        <X size={22} />
      </button>

      {imageList.length > 1 && (
        <button
          type="button"
          onClick={onPrevious}
          className="
            absolute
            left-4
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
            backdrop-blur
            transition
            hover:bg-white/20
            sm:left-6
          "
        >
          <ChevronLeft size={25} />
        </button>
      )}

      <div
        className="
          flex
          h-[calc(100vh-150px)]
          w-full
          items-center
          justify-center
          px-12
          sm:px-16
        "
      >
        <img
          src={currentImage.imgaeUrl}
          alt={`Ảnh tour ${currentIndex + 1}`}
          className="
            max-h-full
            max-w-full
            rounded-2xl
            object-contain
            shadow-2xl
          "
        />
      </div>

      {imageList.length > 1 && (
        <button
          type="button"
          onClick={onNext}
          className="
            absolute
            right-4
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
            backdrop-blur
            transition
            hover:bg-white/20
            sm:right-6
          "
        >
          <ChevronRight size={25} />
        </button>
      )}

      {imageList.length > 1 && (
        <div
          className="
            absolute
            bottom-5
            left-1/2
            z-20
            flex
            max-w-[90vw]
            -translate-x-1/2
            gap-2
            overflow-x-auto
            rounded-2xl
            bg-black/50
            p-2
            backdrop-blur
          "
        >
          {imageList.map((image, index) => (
            <button
              key={image.idImage || index}
              type="button"
              onClick={() => onImageChange?.(index)}
              className={`
                h-14
                w-20
                shrink-0
                overflow-hidden
                rounded-lg
                border-2
                transition
                ${
                  currentIndex === index
                    ? "border-cyan-400"
                    : "border-transparent opacity-60 hover:opacity-100"
                }
              `}
            >
              <img
                src={image.imgaeUrl}
                alt={`Ảnh tour ${index + 1}`}
                className="
                  h-full
                  w-full
                  object-cover
                "
              />
            </button>
          ))}
        </div>
      )}

      {imageList.length > 1 && (
        <div
          className="
            absolute
            left-1/2
            top-5
            -translate-x-1/2
            rounded-full
            bg-black/50
            px-4
            py-1.5
            text-sm
            font-medium
            text-white
            backdrop-blur
          "
        >
          {currentIndex + 1} / {imageList.length}
        </div>
      )}
    </div>
  );
}
