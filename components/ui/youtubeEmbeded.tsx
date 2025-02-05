// components/YouTubeEmbed.tsx
import React from "react";

interface YouTubeEmbedProps {
  videoId: string;
  caption: string;
}

export default function YouTubeEmbed({ videoId, caption }: YouTubeEmbedProps) {
  return (
    <div className="relative w-full aspect-video mt-5">
      <iframe
        className="inset-0 w-full h-full border-0"
        src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&controls=1&iv_load_policy=3`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      ></iframe>
      <p className="text-caption !text-text-tertiary mt-2">{caption}</p>
    </div>
  );
}
