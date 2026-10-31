export interface KnowledgeSource {
  id: string;
  title: string;
  url: string;
  captureDate: string;
  section: string;
  status: "verified" | "demo_supplied";
  content: string;
}

export const websiteSources: KnowledgeSource[] = [
  {
    id: "business-overview",
    title: "Sea View Skydiving — Overview & Flight Dynamics",
    url: "https://www.greedyadventures.com/experiences/sea-view-skydiving#experience",
    captureDate: "2025-01-15",
    section: "Overview",
    status: "verified",
    content: `Greedy Adventures – Sea View Skydiving is based in Pattaya, Thailand, operating above the pristine Gulf of Thailand.
Experience: High-altitude luxury tandem skydiving.
Exit Altitude: 13,000 FT above sea level.
Approximate Freefall: 60 seconds at terminal velocity (approximately 220 km/h).
Approximate Canopy Flight: 5 to 7 minutes under parachute with panoramic coastal views extending past Koh Larn island.
USPA Certification: Every jump is flown tandem with certified USPA tandem flight masters.`,
  },
  {
    id: "packages",
    title: "Skydiving Packages & Pricing Tiers",
    url: "https://www.greedyadventures.com/experiences/sea-view-skydiving#packages",
    captureDate: "2025-01-15",
    section: "Packages",
    status: "verified",
    content: `Greedy Adventures offers three carefully curated tandem skydiving packages:

PACKAGE 01 — ECO TANDEM
- Price: ฿9,500 THB per jumper.
- Inclusions:
  * 13,000 FT Tandem High-Altitude Jump
  * Full Safety Briefing & USPA Flight Gear
  * Commemorative Achievement Certificate
- Media note: Photo and video media files are NOT included with the ECO package.

PACKAGE 02 — DELUXE MEDIA
- Price: ฿12,500 THB per jumper.
- Inclusions:
  * 13,000 FT Tandem High-Altitude Jump
  * 4K Wide-Angle Handcam Video & Photos (filmed from instructor's wrist camera)
  * Instant Digital AirDrop & Cloud Delivery
  * USPA Flight Certification Document

PACKAGE 03 — VIP CINEMATIC SUITE [MOST REQUESTED]
- Price: ฿14,000 THB per jumper.
- Label: MOST REQUESTED.
- Inclusions:
  * Dedicated Aerial Cameraman in Freefall (flying alongside for external 3rd-person cinematic documentary cut)
  * Multi-angle 4K Cinematic Cut + Teaser Reel
  * Priority Flight Manifest & Hangar Lounge access
  * Touchdown Champagne Welcome Toast`,
  },
  {
    id: "journey",
    title: "The 5-Step Jump Day Flight Pattern",
    url: "https://www.greedyadventures.com/experiences/sea-view-skydiving#journey",
    captureDate: "2025-01-15",
    section: "Journey",
    status: "verified",
    content: `The 5-Step Journey from arrival to touchdown:
Step 1 – Arrival and check-in: Sign in at the dropzone and bring your photo ID.
Step 2 – Safety briefing and gear fitting: Meet your instructor for the safety briefing and harness fitting.
Step 3 – Boarding and the climb: Board the aircraft and climb to jump altitude (13,000 FT).
Step 4 – Exit and freefall: Exit with your instructor for 60 seconds of freefall over the Gulf of Thailand.
Step 5 – Canopy flight and landing: Fly under the parachute with your instructor (5-7 minutes) and land gently back at the dropzone lawn.`,
  },
  {
    id: "location-concierge",
    title: "Dropzone Location, Concierge & Booking Terms",
    url: "https://www.greedyadventures.com/experiences/sea-view-skydiving#details",
    captureDate: "2025-01-15",
    section: "Concierge & Logistics",
    status: "verified",
    content: `Location & Contact Information:
- Dropzone Facility: Pattaya Sea View, operated by Dropzone Thailand.
- Physical Address: 95 M.4, Chakphong, Klaeng District, Rayong 21190, Thailand (serving the Pattaya coast).
- Phone: +1 (800) 948-JUMP
- WhatsApp Concierge: +66800948586
- Operating Hours: Daily departures from Sunrise to Dusk (weather permitting).
- Rescheduling Policy: 100% Weather Flexibility — If maritime winds or cloud ceilings prevent flight, reschedule freely at zero cost or receive a prompt refund.
- Advance Booking: Instant confirmation online; private charters and coastal jumps require 48-hour advance reservation.`,
  },
  {
    id: "experience-inclusions",
    title: "The Experience — What Is Included",
    url: "https://www.greedyadventures.com/experiences/sea-view-skydiving#experience",
    captureDate: "2025-01-15",
    section: "Experience",
    status: "verified",
    content: `Included with every skydiving booking:
+ Tandem skydive experience in Pattaya, Thailand over the ocean
+ Safety briefing and tandem instructor support from certified USPA flight masters
+ Aircraft ascent to 13,000 FT and ocean-view jump experience
+ Certificate of completion
+ No prior skydiving experience needed: your certified instructor flies the jump and controls canopy deployment and touchdown.`,
  },
];

export const WEBSITE_SOURCES = websiteSources;
