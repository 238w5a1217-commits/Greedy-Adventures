import { NextResponse } from "next/server";
import { websiteSources } from "@/lib/knowledge/sources";
import { availableMediaAssets } from "@/lib/media/media-selector";

export async function GET() {
  return NextResponse.json({
    sources: websiteSources,
    media: availableMediaAssets,
    timestamp: new Date().toISOString(),
  });
}
