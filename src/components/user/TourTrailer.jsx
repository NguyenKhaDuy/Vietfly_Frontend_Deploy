import { Play } from "lucide-react";

export default function TourTrailer({ videoUrl }) {
  if (!videoUrl) {
    return null;
  }

  const getYoutubeEmbedUrl = (url) => {
    try {
      const parsedUrl = new URL(url);

      // https://www.youtube.com/watch?v=XXXXXXXX
      if (parsedUrl.hostname.includes("youtube.com")) {
        const videoId = parsedUrl.searchParams.get("v");

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }

        // https://www.youtube.com/embed/XXXXXXXX
        if (parsedUrl.pathname.startsWith("/embed/")) {
          return url;
        }
      }

      // https://youtu.be/XXXXXXXX
      if (parsedUrl.hostname === "youtu.be") {
        const videoId = parsedUrl.pathname.substring(1);

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }

      return null;
    } catch (error) {
      console.error("YouTube URL không hợp lệ:", error);
      return null;
    }
  };

  const embedUrl = getYoutubeEmbedUrl(videoUrl);

  if (!embedUrl) {
    return null;
  }

  return (
    <section className="mt-10">
      <div className="mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
            <Play size={20} fill="currentColor" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">Trailer tour</h2>

            <p className="mt-1 text-sm text-slate-500">
              Khám phá trước hành trình của bạn
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-black shadow-sm">
        <div className="relative aspect-video w-full">
          <iframe
            src={embedUrl}
            title="Trailer tour"
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
