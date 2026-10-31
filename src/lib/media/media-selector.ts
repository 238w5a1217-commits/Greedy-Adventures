import { MediaAsset, PackageItem } from "../validation/chat-schema";

export const availableMediaAssets: MediaAsset[] = [
  {
    id: "brochure-pdf",
    type: "pdf",
    title: "Sea View Skydiving Brochure",
    description: "Official guide to all 3 tandem packages, flight gear, safety regulations, and booking policies.",
    url: "/media/demo-skydiving-brochure.pdf",
    fileSize: "1.7 KB",
    isDemo: true,
  },
  {
    id: "experience-video",
    type: "video",
    title: "Sea View Skydiving Experience",
    description: "4K cinematic footage of tandem jump from 13,000 FT above the Gulf of Thailand coastline.",
    url: "https://www.youtube.com/embed/tJS3geMbbQ4",
    thumbnailUrl: "https://img.youtube.com/vi/tJS3geMbbQ4/maxresdefault.jpg",
    isDemo: false,
  },
];

export const MEDIA_ASSETS = availableMediaAssets;

export const OFFICIAL_PACKAGES: PackageItem[] = [
  {
    id: "eco-tandem",
    name: "ECO TANDEM",
    price: "฿9,500",
    currency: "THB",
    inclusions: [
      "13,000 FT Tandem High-Altitude Jump",
      "Full Safety Briefing & USPA Flight Gear",
      "Commemorative Achievement Certificate",
    ],
    photoVideoNote: "Photo and video media files are NOT included.",
    ctaText: "Inquire About ECO",
  },
  {
    id: "deluxe-media",
    name: "DELUXE MEDIA",
    price: "฿12,500",
    currency: "THB",
    inclusions: [
      "Everything included in ECO",
      "4K Wide-Angle Handcam Video & Photos",
      "Instructor wrist-camera footage",
      "Instant Digital AirDrop & Cloud Delivery",
      "USPA Flight Certification Document",
    ],
    photoVideoNote: "Full 4K handcam media package included.",
    ctaText: "Inquire About DELUXE",
  },
  {
    id: "vip-cinematic",
    name: "VIP CINEMATIC SUITE",
    price: "฿14,000",
    currency: "THB",
    tag: "MOST REQUESTED",
    inclusions: [
      "Everything included in DELUXE",
      "Dedicated Aerial Cameraman in Freefall",
      "Multi-angle 4K Cinematic Cut + Teaser Reel",
      "Priority Flight Manifest & Hangar Lounge Access",
      "Touchdown Champagne Welcome Toast",
    ],
    photoVideoNote: "Premier cinematic multi-angle cut with dedicated flyer.",
    ctaText: "Inquire About VIP",
  },
];

export type ResponseType = "text" | "pdf" | "video" | "media_bundle" | "packages";

export interface ParsedModelResult {
  responseType: ResponseType;
  selectedMedia: MediaAsset[];
  packages?: PackageItem[];
  suggestedQuestions?: string[];
  cleanMessage: string;
}

/**
 * Parses tags from raw model text and user intent:
 * - [SHOW_PACKAGES] -> attaches all 3 OFFICIAL_PACKAGES
 * - [SHOW_PACKAGES: id1, id2] -> attaches specific packages
 * - Specific package queries ("cheapest", "deluxe", "4k video", "vip") -> attaches relevant packages
 * - [SEND_PDF] -> attaches official brochure
 * - [SEND_VIDEO] -> attaches official experience video
 * - [SUGGEST: Q1 | Q2] -> extracts suggested follow-up chips
 */
export function selectMedia(rawModelText: string, userPrompt: string = ""): ParsedModelResult {
  const lowerPrompt = userPrompt.toLowerCase().trim();
  const lowerModel = rawModelText.toLowerCase();

  const textHasPdf = rawModelText.includes("[SEND_PDF]");
  const textHasVideo = rawModelText.includes("[SEND_VIDEO]");

  const promptWantsPdf =
    lowerPrompt.includes("brochure") ||
    lowerPrompt.includes("pdf") ||
    lowerPrompt.includes("document");

  const promptWantsVideo =
    lowerPrompt.includes("video") ||
    lowerPrompt.includes("watch") ||
    lowerPrompt.includes("see the jump") ||
    lowerPrompt.includes("footage") ||
    lowerPrompt.includes("film");

  const wantsPdf = textHasPdf || promptWantsPdf;
  const wantsVideo = textHasVideo || promptWantsVideo;

  const selectedMedia: MediaAsset[] = [];
  const brochureAsset = availableMediaAssets.find((a) => a.id === "brochure-pdf");
  const videoAsset = availableMediaAssets.find((a) => a.id === "experience-video");

  if (wantsPdf && brochureAsset) {
    selectedMedia.push(brochureAsset);
  }

  if (wantsVideo && videoAsset) {
    selectedMedia.push(videoAsset);
  }

  // Check specific package queries
  let matchedPackages: PackageItem[] | undefined = undefined;

  // Check explicit model tag with args e.g. [SHOW_PACKAGES: eco-tandem]
  const specificPkgTagMatch = rawModelText.match(/\[SHOW_PACKAGES?:\s*([^\]]+)\]/i);
  if (specificPkgTagMatch && specificPkgTagMatch[1]) {
    const requestedIds = specificPkgTagMatch[1].split(/[,|]/).map((s) => s.trim().toLowerCase());
    matchedPackages = OFFICIAL_PACKAGES.filter((p) =>
      requestedIds.some((id) => p.id.toLowerCase().includes(id) || p.name.toLowerCase().includes(id))
    );
  }

  // All packages inquiry
  const isAllPackagesQuery =
    rawModelText.includes("[SHOW_PACKAGES]") ||
    lowerPrompt.includes("explore skydiving packages") ||
    lowerPrompt.includes("what packages do you offer") ||
    lowerPrompt.includes("show all packages") ||
    lowerPrompt.includes("packages and pricing") ||
    lowerPrompt.includes("compare packages") ||
    lowerPrompt.includes("what are the packages") ||
    (lowerPrompt.includes("packages") && (lowerPrompt.includes("what") || lowerPrompt.includes("list") || lowerPrompt.includes("all")));

  if (!matchedPackages) {
    if (isAllPackagesQuery) {
      matchedPackages = OFFICIAL_PACKAGES;
    } else if (
      lowerPrompt.includes("cheapest") ||
      lowerPrompt.includes("lowest price") ||
      lowerPrompt.includes("most affordable") ||
      lowerPrompt === "eco" ||
      lowerPrompt.includes("eco tandem") ||
      (lowerPrompt.includes("eco") && !lowerPrompt.includes("deluxe") && !lowerPrompt.includes("vip"))
    ) {
      matchedPackages = OFFICIAL_PACKAGES.filter((p) => p.id === "eco-tandem");
    } else if (
      lowerPrompt.includes("what does deluxe include") ||
      lowerPrompt.includes("deluxe include") ||
      lowerPrompt.includes("tell me about deluxe") ||
      lowerPrompt.includes("inquire about deluxe") ||
      (lowerPrompt.includes("deluxe") && !lowerPrompt.includes("vip") && !lowerPrompt.includes("eco") && !lowerPrompt.includes("4k"))
    ) {
      matchedPackages = OFFICIAL_PACKAGES.filter((p) => p.id === "deluxe-media");
    } else if (
      lowerPrompt.includes("which package has 4k video") ||
      lowerPrompt.includes("package has 4k") ||
      lowerPrompt.includes("packages have video") ||
      lowerPrompt.includes("which package includes video") ||
      lowerPrompt.includes("package with 4k")
    ) {
      matchedPackages = OFFICIAL_PACKAGES.filter((p) => p.id === "deluxe-media" || p.id === "vip-cinematic");
    } else if (
      lowerPrompt.includes("tell me about vip") ||
      lowerPrompt.includes("what is included in vip") ||
      lowerPrompt.includes("why should i choose vip") ||
      lowerPrompt.includes("why choose vip") ||
      lowerPrompt.includes("inquire about vip") ||
      (lowerPrompt.includes("vip") && !lowerPrompt.includes("deluxe") && !lowerPrompt.includes("eco") && !lowerPrompt.includes("4k"))
    ) {
      matchedPackages = OFFICIAL_PACKAGES.filter((p) => p.id === "vip-cinematic");
    }
  }

  // Determine Response Type
  let responseType: ResponseType = "text";
  if (matchedPackages && matchedPackages.length > 0) {
    responseType = "packages";
  } else if (wantsPdf && wantsVideo) {
    responseType = "media_bundle";
  } else if (wantsPdf) {
    responseType = "pdf";
  } else if (wantsVideo) {
    responseType = "video";
  }

  // Extract suggested questions if present
  let suggestedQuestions: string[] | undefined = undefined;
  const suggestMatch = rawModelText.match(/\[SUGGEST:\s*([^\]]+)\]/i);
  if (suggestMatch && suggestMatch[1]) {
    suggestedQuestions = suggestMatch[1]
      .split("|")
      .map((q) => q.trim())
      .filter((q) => q.length > 0);
  }

  // Contextual fallback suggestions if model didn't provide them
  if (!suggestedQuestions || suggestedQuestions.length === 0) {
    if (isAllPackagesQuery) {
      suggestedQuestions = [
        "What is included in VIP?",
        "Which package includes 4K video?",
        "Can I get the brochure?",
      ];
    } else if (matchedPackages && matchedPackages.some((p) => p.id === "eco-tandem") && matchedPackages.length === 1) {
      suggestedQuestions = [
        "What does Deluxe include?",
        "Which package has 4K video?",
        "Can I get the brochure?",
      ];
    } else if (matchedPackages && matchedPackages.some((p) => p.id === "deluxe-media") && matchedPackages.length === 1) {
      suggestedQuestions = [
        "What is included in VIP?",
        "Can I get the brochure?",
        "Watch the experience video",
      ];
    } else if (matchedPackages && matchedPackages.some((p) => p.id === "vip-cinematic") && matchedPackages.length === 1) {
      suggestedQuestions = [
        "Which package has 4K video?",
        "Can I get the brochure?",
        "Where is the drop zone?",
      ];
    } else if (responseType === "pdf") {
      suggestedQuestions = [
        "Show me the packages",
        "Can I watch a video?",
        "Where is the drop zone?",
      ];
    } else if (responseType === "video") {
      suggestedQuestions = [
        "What packages do you offer?",
        "Can you send the brochure?",
        "How long is the freefall?",
      ];
    } else if (responseType === "media_bundle") {
      suggestedQuestions = [
        "What packages do you offer?",
        "What should I bring?",
        "Where is the drop zone?",
      ];
    } else {
      suggestedQuestions = [
        "Explore Skydiving Packages",
        "How long is the freefall?",
        "Where is the drop zone?",
      ];
    }
  }

  // Clean tags from final message
  let cleanMessage = rawModelText
    .replace(/\[SEND_PDF\]/g, "")
    .replace(/\[SEND_VIDEO\]/g, "")
    .replace(/\[SHOW_PACKAGES(?::[^\]]+)?\]/g, "")
    .replace(/\[SUGGEST:[^\]]+\]/g, "")
    .trim();

  // If user asks "What packages do you offer?", ensure exact intro
  if (lowerPrompt === "what packages do you offer?" || lowerPrompt === "what packages do you offer") {
    cleanMessage = "We offer three tandem skydiving experiences, each designed to make your jump unforgettable. Choose the experience that suits you best.";
  } else if (!cleanMessage) {
    if (responseType === "packages") {
      cleanMessage = "We offer three tandem skydiving experiences, each designed to make your jump unforgettable. Choose the experience that suits you best.";
    } else if (responseType === "pdf") {
      cleanMessage = "Here is our official Sea View Skydiving brochure:";
    } else if (responseType === "video") {
      cleanMessage = "Here is our 4K experience video from 13,000 FT over Pattaya:";
    } else if (responseType === "media_bundle") {
      cleanMessage = "Here is our brochure along with the experience video:";
    }
  }

  return {
    responseType,
    selectedMedia,
    packages: matchedPackages,
    suggestedQuestions,
    cleanMessage,
  };
}
