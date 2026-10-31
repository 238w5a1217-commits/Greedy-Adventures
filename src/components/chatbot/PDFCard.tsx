"use client";

import MediaAttachmentCard from "./MediaAttachmentCard";
import { MediaAsset } from "@/lib/validation/chat-schema";

interface PDFCardProps {
  asset: MediaAsset;
}

export default function PDFCard({ asset }: PDFCardProps) {
  return <MediaAttachmentCard asset={asset} />;
}
