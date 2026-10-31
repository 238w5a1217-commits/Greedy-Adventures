"use client";

import React from "react";
import { MediaAsset } from "@/lib/validation/chat-schema";
import MediaAttachmentCard from "./MediaAttachmentCard";
import VideoPlayer from "./VideoPlayer";

interface MediaAttachmentProps {
  media?: MediaAsset[];
}

export default function MediaAttachment({ media }: MediaAttachmentProps) {
  if (!media || media.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 w-full">
      {media.map((asset, index) => {
        if (asset.type === "pdf") {
          return (
            <MediaAttachmentCard
              key={asset.id || `pdf-${index}`}
              asset={asset}
            />
          );
        }
        if (asset.type === "video") {
          return (
            <VideoPlayer
              key={asset.id || `video-${index}`}
              asset={asset}
            />
          );
        }
        return null;
      })}
    </div>
  );
}
