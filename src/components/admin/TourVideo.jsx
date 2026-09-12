import { ExternalLink, Video } from "lucide-react";
import Section from "./Section";

function getYoutubeEmbedUrl(url) {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);

    // https://youtu.be/VIDEO_ID
    if (parsedUrl.hostname.includes("youtu.be")) {
      const videoId = parsedUrl.pathname.substring(1);

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // https://www.youtube.com/watch?v=VIDEO_ID
    if (parsedUrl.hostname.includes("youtube.com")) {
      const videoId = parsedUrl.searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      // https://www.youtube.com/embed/VIDEO_ID
      if (parsedUrl.pathname.startsWith("/embed/")) {
        return url;
      }
    }

    return null;
  } catch {
    return null;
  }
}

export default function TourVideo({ tour }) {
  if (!tour?.introVideo) {
    return null;
  }

  const embedUrl = getYoutubeEmbedUrl(tour.introVideo);

  if (!embedUrl) {
    return (
      <Section icon={Video} title="Video giới thiệu">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Link video không hợp lệ.</p>

          <a
            href={tour.introVideo}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-cyan-600 hover:text-cyan-700"
          >
            <ExternalLink size={16} />
            Mở video
          </a>
        </div>
      </Section>
    );
  }

  return (
    <Section
      icon={Video}
      title="Video giới thiệu"
      description="Video giới thiệu của tour"
    >
      <div className="overflow-hidden rounded-xl bg-black">
        <div className="aspect-video w-full">
          <iframe
            src={embedUrl}
            title={`Video giới thiệu ${tour.nameTour || "tour"}`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>

      <div className="mt-3">
        <a
          href={tour.introVideo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-cyan-600"
        >
          <ExternalLink size={14} />
          Mở video trên YouTube
        </a>
      </div>
    </Section>
  );
}
