// Knowledge base for the Greedy Adventures chatbot
// This data is used both by the AI backend and displayed in the Knowledge View

export interface KnowledgeSource {
  id: string;
  title: string;
  url: string;
  captureDate: string;
  content: string;
  section: string;
}

export interface MediaAsset {
  id: string;
  type: "pdf" | "video";
  title: string;
  description: string;
  url: string;
  thumbnailUrl?: string;
  isDemo: boolean;
}

export const knowledgeSources: KnowledgeSource[] = [
  {
    id: "hero",
    title: "Hero – Sea View Skydiving Overview",
    url: "https://greedyadventures.com/#experience",
    captureDate: "2025-01-15",
    section: "Hero",
    content: `Greedy Adventures Sea View Skydiving is based in Pattaya, Thailand. We offer tandem skydiving experiences over the breathtaking Gulf of Thailand. Exit altitude is 13,000 FT. Freefall lasts 60 seconds. Canopy flight lasts 5–7 minutes. Certified USPA tandem instructors guide every jump. This is Southeast Asia's foremost luxury sea view skydiving expedition.`,
  },
  {
    id: "experience",
    title: "The Experience – Overview & Highlights",
    url: "https://greedyadventures.com/#experience",
    captureDate: "2025-01-15",
    section: "Experience",
    content: `The Greedy Adventures experience starts with the aircraft ascent and continues through exhilarating freefall and a peaceful canopy descent over Pattaya's coastline. Key highlights:
1. EXPERIENCED TANDEM INSTRUCTORS: USPA-certified tandem flight masters with thousands of jumps, ensuring pure serenity and safety.
2. BREATHTAKING COASTAL VIEWS: Crystal emerald waters, Pattaya city curves, and panoramic views of islands from two miles high. Unobstructed aerial horizons extending beyond Koh Larn island.
3. AN UNFORGETTABLE EXPERIENCE: Seamless luxury concierge, bespoke flight suits, and unforgettable memories from boarding to landing.`,
  },
  {
    id: "packages",
    title: "Packages – Choose Your Way to Fly",
    url: "https://greedyadventures.com/#packages",
    captureDate: "2025-01-15",
    section: "Packages",
    content: `Three packages available:

TIER 01 – ECO TANDEM (฿9,500 THB / Jumper):
- 13,000 FT Tandem High-Altitude Jump
- Full Safety Briefing & USPA Flight Gear
- Commemorative Achievement Certificate
- Photo & Video Media Files NOT included

TIER 02 – DELUXE MEDIA (฿12,500 THB / Jumper):
- 13,000 FT Tandem High-Altitude Jump
- 4K Wide-Angle Handcam Video & Photos
- Instant Digital AirDrop & Cloud Delivery
- USPA Flight Certification Document

TIER 03 – VIP CINEMATIC SUITE (฿14,000 THB / Jumper) [MOST REQUESTED]:
- Dedicated Aerial Cameraman in Freefall
- Multi-angle 4K Cinematic Cut + Teaser Reel
- Priority Flight Manifest & Hangar Lounge
- Touchdown Champagne Welcome Toast

100% Weather Flexibility Guarantee: If maritime coastal winds or cloud ceilings prevent flight, reschedule freely at zero cost or receive a prompt refund.`,
  },
  {
    id: "stats",
    title: "Flight Metrics & Stats",
    url: "https://greedyadventures.com/#experience",
    captureDate: "2025-01-15",
    section: "Stats",
    content: `Key metrics:
- Exit Altitude: 13,000 FT – soaring above cloud tier over the vibrant Gulf of Thailand coastline with full horizon arc visibility.
- Pure Freefall: 60 seconds at 220 km/h. Unrivaled sensory clarity and absolute euphoric exhilaration.
- Canopy Glide: 5–7 minutes of graceful steered descent overlooking secluded coves, turquoise reefs, and palm-fringed shorelines.`,
  },
  {
    id: "journey",
    title: "The 5-Step Journey – Pre-flight to Touchdown",
    url: "https://greedyadventures.com/#journey",
    captureDate: "2025-01-15",
    section: "Journey",
    content: `Step 01 – ARRIVAL & LOUNGE: Welcome at our private Pattaya coastal airfield lounge. Registration, gear sizing, and espresso bar service.
Step 02 – SAFETY BRIEFING: Meet your dedicated USPA master instructor. Custom harness fitment and body position walkthrough.
Step 03 – TURBOPROP CLIMB: A breathtaking 20-minute panoramic flight rising above Pattaya's bays up to jump altitude.
Step 04 – THE LEAP & FALL: Door rolls open at 13,000 feet. The jump into pure sky, feeling 60 seconds of unhindered rush.
Step 05 – OCEAN TOUCHDOWN: Canopy deploys smoothly. A tranquil 6-minute glide and a soft, controlled landing on our coastal lawn.`,
  },
  {
    id: "details",
    title: "Contact & Details – Flight Concierge",
    url: "https://greedyadventures.com/#details",
    captureDate: "2025-01-15",
    section: "Details",
    content: `Contact details:
- Location: Hangar 04, Azure Coastal Strip, Pattaya, Thailand
- Phone: +1 (800) 948-JUMP
- WhatsApp Concierge: +66800948586
- Operating Hours: Sunrise to Dusk departures daily
- USPA Group Member #44802
- Booking: Instant Confirmation, Flexible Rescheduling, Hotel Pickup Available
- Private charter and coastal tandem appointments require 48-hour advance registration.`,
  },
];

export const mediaAssets: MediaAsset[] = [
  {
    id: "brochure-pdf",
    type: "pdf",
    title: "Greedy Adventures – Official Skydiving Brochure",
    description:
      "Complete overview of all packages, safety information, booking process, and frequently asked questions.",
    url: "/demo-brochure.pdf",
    isDemo: true,
  },
  {
    id: "experience-video",
    type: "video",
    title: "The Skydiving Experience – Pattaya, Thailand",
    description:
      "Aerial cinematic footage of a full tandem jump from 13,000 FT over the Gulf of Thailand coastline.",
    url: "https://www.youtube.com/embed/tJS3geMbbQ4",
    thumbnailUrl:
      "https://img.youtube.com/vi/tJS3geMbbQ4/maxresdefault.jpg",
    isDemo: false,
  },
];

export const systemPrompt = `You are a friendly and knowledgeable booking concierge for Greedy Adventures Sea View Skydiving in Pattaya, Thailand. You help customers learn about our skydiving experiences and guide them toward booking.

ABOUT US:
${knowledgeSources.map((s) => s.content).join("\n\n")}

RESPONSE GUIDELINES:
- Be warm, enthusiastic, and professional
- Answer questions using only the information provided above
- If asked something you don't know, say so clearly instead of guessing
- For pricing, always include the currency (THB)
- Format package tiers cleanly: use numbered items for tiers (e.g. 1. **TIER 01 – ECO TANDEM** (฿9,500 THB / Jumper):) followed by clear bullet points (* Feature)
- Keep responses concise, clean, and beautifully structured
- Encourage customers to book or contact the WhatsApp concierge for specific questions

MEDIA CAPABILITIES:
- If asked for a brochure or PDF, respond with: [SEND_PDF]
- If asked to see a video or experience video, respond with: [SEND_VIDEO]
- If asked for both, include both: [SEND_PDF] [SEND_VIDEO]
- These markers will be replaced with the actual media in the chat interface
- Do NOT describe or make up what the PDF/video contains — just include the marker

AVAILABILITY:
- If asked about something not in the knowledge base, say you're unable to answer that and suggest contacting the concierge directly via WhatsApp at +66800948586`;
