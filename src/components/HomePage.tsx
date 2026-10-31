"use client";

// Using native <img> tags for all external Google CDN images
// because lh3.googleusercontent.com/aida/* URLs require browser cookies
// and return null when fetched server-side by Next.js Image optimization.

const IMG = {
  hero: "https://images.unsplash.com/photo-1521673845931-7b0fb2a78dd9?q=80&w=2070&auto=format&fit=crop",
  canopy: "https://pub-89f493a2b50b4e43b99552a737bef138.r2.dev/offerings/apex-gallery/tandem-with-sea-view.webp",
  deluxe: "https://images.unsplash.com/photo-1601024445121-e5b82f020549?q=80&w=1200&auto=format&fit=crop",
  freefall: "https://pub-89f493a2b50b4e43b99552a737bef138.r2.dev/offerings/sea-view-tandem-skydive-pattaya/108d38.jpg",
  parachute: "https://pub-89f493a2b50b4e43b99552a737bef138.r2.dev/offerings/apex-gallery/tandem-with-sea-view.webp",
  coast: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
  plane: "https://pub-89f493a2b50b4e43b99552a737bef138.r2.dev/offerings/apex-gallery/plane.webp",
  logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCw15RJP5TbRviO92rvY0Mt3FTyPWeMdusZuImwwewcDL_ikrF6YAGstxt-hUBvHtvqsyw538LwCQTU753qXLGpauH1h-YB-XN24XCPlmwAuKO0aXI48cwd7oxAagPvgvLe2qwnAHIctISL1_kyexQcIuwvwgjwKSlqHHMY4L1MX2SXHDgfZRWraL4unv0KyjwSwcxJaDoKa8N48RWJ1-t_nZUYId8PrVa-whMdTjM",
  step1: "https://www.greedyadventures.com/greedy/trips/dropzone-thailand-check-in.jpg",
  step2: "https://pub-89f493a2b50b4e43b99552a737bef138.r2.dev/offerings/sea-view-tandem-skydive-pattaya/108d38.jpg",
  step3: "https://pub-89f493a2b50b4e43b99552a737bef138.r2.dev/offerings/apex-gallery/plane.webp",
  step4: "https://pub-89f493a2b50b4e43b99552a737bef138.r2.dev/offerings/apex-gallery/tandem-with-sea-view.webp",
  step5: "https://www.greedyadventures.com/greedy/trips/tandem-canopy-landing-g0250281.jpg",
  galleryTandem: "https://pub-89f493a2b50b4e43b99552a737bef138.r2.dev/offerings/apex-gallery/tandem-with-sea-view.webp",
  gallerySunset: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1200&auto=format&fit=crop",
  ecoLandscape: "https://www.greedyadventures.com/greedy/package-previews/eco-landscape.jpg",
  deluxeVideo: "https://www.greedyadventures.com/greedy/package-previews/deluxe-landscape.mp4",
  vipVideo: "https://www.greedyadventures.com/greedy/package-previews/vip-landscape.mp4",
};

import { useState } from "react";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const scrollTo = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col w-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* ─── HERO SECTION ─── */}
      <section
        id="hero"
        className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden"
        style={{ background: "#091d2e" }}
      >
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            suppressHydrationWarning
            autoPlay
            loop
            muted
            playsInline
            poster={IMG.hero}
            className="w-full h-full object-cover object-center scale-105"
            style={{ position: "absolute", inset: 0 }}
          >
            <source
              src="https://www.greedyadventures.com/greedy/films/sea-view-studio-hero.mp4"
              type="video/mp4"
            />
          </video>
          {/* Subtle cinematic tint so video is vibrant & fully visible */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(9,29,46,0.65) 0%, rgba(9,29,46,0.15) 50%, rgba(9,29,46,0.4) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, transparent 30%, rgba(9,29,46,0.35) 100%)",
            }}
          />
        </div>

        {/* Spacer for header */}
        <div className="h-24 w-full z-10" />

        {/* Content */}
        <div className="relative z-10 w-full px-4 lg:px-16 max-w-7xl mx-auto flex flex-col items-center text-center my-auto py-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
            style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }}
          >
            <span className="w-2 h-2 rounded-full bg-[#ffdea6] animate-pulse" />
            <span className="text-[#ffdea6] text-[11px] font-bold tracking-[0.15em] uppercase">
              PATTAYA, THAILAND — TANDEM SKYDIVING EXPERIENCE
            </span>
          </div>

          <h1
            className="text-white text-[40px] sm:text-[56px] md:text-[72px] leading-[1.05] font-normal mb-6 max-w-5xl"
            style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.02em" }}
          >
            FIND YOUR FREEDOM.<br className="hidden sm:block" />
            <span className="italic font-light text-[#f5f4ee]/90">ABOVE THE ORDINARY.</span>
          </h1>

          <p className="text-[#e9e8e2]/90 text-[16px] sm:text-[18px] font-light max-w-2xl mb-10 leading-relaxed">
            Take the leap above Pattaya and experience the extraordinary freedom of freefall over the breathtaking Gulf of Thailand.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => scrollTo("packages")}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#ffdea6] text-[#271900] text-[11px] font-bold tracking-[0.15em] uppercase rounded hover:bg-white transition-all duration-300 shadow-xl group"
            >
              EXPLORE PACKAGES
              <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform" style={{ fontSize: "16px" }}>east</span>
            </button>
            <button
              onClick={() => scrollTo("experience")}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-[11px] font-bold tracking-[0.15em] uppercase rounded transition-all duration-300 text-white hover:bg-white/20"
              style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)" }}
            >
              <span className="material-symbols-outlined mr-2" style={{ fontSize: "18px" }}>play_circle</span>
              WATCH THE EXPERIENCE
            </button>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: THE EXPERIENCE ─── */}
      <section id="experience" className="w-full py-20 lg:py-32 px-4 lg:px-16 scroll-mt-20" style={{ background: "#f5f4ee" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 relative">
            <div className="relative overflow-hidden rounded-xl shadow-2xl">
              <img
                src={IMG.canopy}
                alt="Parachute canopy gliding over turquoise sea"
                className="w-full h-[460px] sm:h-[580px] object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                style={{ display: "block" }}
              />
              <div
                className="absolute bottom-6 left-6 px-5 py-3 rounded-lg text-white max-w-xs shadow-md"
                style={{ background: "rgba(9,29,46,0.85)", backdropFilter: "blur(12px)" }}
              >
                <span className="text-[#ffdea6] text-[11px] font-bold tracking-[0.12em] block mb-1">GULF OF THAILAND VIEW</span>
                <p className="text-[#e9e8e2] text-[12px] leading-snug">Unobstructed aerial horizons extending beyond Koh Larn island.</p>
              </div>
            </div>
            <div
              className="hidden sm:block absolute -top-6 -right-6 w-32 h-32 rounded-full blur-2xl -z-0"
              style={{ background: "rgba(255,222,166,0.3)" }}
            />
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-[#006780] text-[11px] font-bold tracking-[0.15em] uppercase mb-3">THE EXPERIENCE</span>
            <h2
              className="text-black text-[32px] sm:text-[48px] leading-tight mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              NOT JUST A JUMP.<br />
              <span className="italic font-light text-[#43474c]">A DIFFERENT WAY TO SEE THE WORLD.</span>
            </h2>
            <p className="text-[#43474c] text-[17px] font-light leading-relaxed mb-10">
              Discover the incredible feeling of flying above Pattaya. From the aircraft ascent to the exhilarating freefall and peaceful canopy descent, every moment creates a memory worth keeping.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { num: "01", title: "EXPERIENCED TANDEM INSTRUCTORS", desc: "USPA-certified tandem flight masters with thousands of jumps ensuring pure serenity and safety." },
                { num: "02", title: "BREATHTAKING COASTAL VIEWS", desc: "Gaze upon crystal emerald waters, Pattaya city curves, and panoramic islands from two miles high." },
                { num: "03", title: "AN UNFORGETTABLE EXPERIENCE", desc: "Seamless luxury concierge, bespoke flight suits, and unforgettable memories from boarding to landing." },
              ].map((item) => (
                <div key={item.num} className="flex items-start gap-4 p-5 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div
                    className="w-12 h-12 rounded-full bg-[#091d2e] flex items-center justify-center flex-shrink-0 text-[#ffdea6] text-[18px]"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                  >
                    {item.num}
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-black tracking-wide mb-1">{item.title}</h3>
                    <p className="text-[14px] text-[#43474c] leading-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: PACKAGES ─── */}
      <section id="packages" className="w-full py-20 lg:py-32 px-4 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#006780] text-[11px] font-bold tracking-[0.15em] uppercase block mb-2">FIND YOUR EXPERIENCE</span>
            <h2
              className="text-black text-[32px] sm:text-[48px] mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              CHOOSE YOUR WAY TO FLY
            </h2>
            <p className="text-[#43474c] text-[17px] font-light">Three tailored aviation tiers curated to make your Gulf skydiving passage unforgettable.</p>
          </div>

          {/* Packages: Mobile Horizontal Snap Slider / Desktop Grid */}
          <div
            className="flex md:grid md:grid-cols-3 gap-5 md:gap-8 items-stretch overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 px-4 -mx-4 md:px-0 md:mx-0 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* ECO */}
            <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-[#c4c6cd]/20 w-[85vw] max-w-[340px] flex-shrink-0 snap-center md:w-auto md:max-w-none md:flex-shrink md:snap-align-none">
              <div className="h-[190px] sm:h-[220px] w-full overflow-hidden relative">
                <img src={IMG.ecoLandscape} alt="Eco tandem package preview" className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded text-[11px] font-bold" style={{ background: "rgba(255,255,255,0.9)" }}>TIER 01 — ESSENTIAL</span>
                </div>
              </div>
              <div className="p-5 sm:p-8 flex flex-col flex-grow">
                <h3 className="text-[24px] text-black mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>ECO TANDEM</h3>
                <p className="text-[#43474c] text-[14px] mb-6">The essential skydiving experience.</p>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-[32px] font-bold text-black" style={{ fontFamily: "'Cormorant Garamond', serif" }}>฿9,500</span>
                  <span className="text-[12px] text-[#43474c]">THB / Jumper</span>
                </div>
                <div className="w-full h-px bg-[#efeee8] mb-6" />
                <ul className="flex flex-col gap-3 text-[14px] mb-8 flex-grow">
                  {["13,000 FT Tandem High-Altitude Jump", "Full Safety Briefing & USPA Flight Gear", "Commemorative Achievement Certificate"].map((feat) => (
                    <li key={feat} className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#006780]" style={{ fontSize: "18px" }}>check_circle</span>
                      {feat}
                    </li>
                  ))}
                  <li className="flex items-center gap-3 text-[#74777d]">
                    <span className="material-symbols-outlined text-[#74777d]" style={{ fontSize: "18px" }}>cancel</span>
                    <span className="line-through">Photo &amp; Video Media Files</span>
                  </li>
                </ul>
                <button
                  onClick={() => scrollTo("details")}
                  className="w-full py-3.5 rounded text-black text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-[#efeee8] transition-colors"
                  style={{ background: "#f5f4ee" }}
                >
                  BOOK ECO JUMP
                </button>
              </div>
            </div>

            {/* DELUXE */}
            <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-[#c4c6cd]/20 w-[85vw] max-w-[340px] flex-shrink-0 snap-center md:w-auto md:max-w-none md:flex-shrink md:snap-align-none">
              <div className="h-[190px] sm:h-[220px] w-full overflow-hidden relative bg-black">
                <video
                  suppressHydrationWarning
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={IMG.deluxe}
                  className="w-full h-full object-cover"
                >
                  <source src={IMG.deluxeVideo} type="video/mp4" />
                </video>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded text-[11px] font-bold" style={{ background: "rgba(255,255,255,0.9)" }}>TIER 02 — HANDCAM 4K</span>
                </div>
              </div>
              <div className="p-5 sm:p-8 flex flex-col flex-grow">
                <h3 className="text-[24px] text-black mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>DELUXE MEDIA</h3>
                <p className="text-[#43474c] text-[14px] mb-6">Capture every smile, scream, and coastal sweep directly from your instructor&apos;s wrist camera.</p>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-[32px] font-bold text-black" style={{ fontFamily: "'Cormorant Garamond', serif" }}>฿12,500</span>
                  <span className="text-[12px] text-[#43474c]">THB / Jumper</span>
                </div>
                <div className="w-full h-px bg-[#efeee8] mb-6" />
                <ul className="flex flex-col gap-3 text-[14px] mb-8 flex-grow">
                  {[
                    "13,000 FT Tandem High-Altitude Jump",
                    "4K Wide-Angle Handcam Video & Photos",
                    "Instant Digital AirDrop & Cloud Delivery",
                    "USPA Flight Certification Document",
                  ].map((feat) => (
                    <li key={feat} className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#006780]" style={{ fontSize: "18px" }}>check_circle</span>
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollTo("details")}
                  className="w-full py-3.5 rounded text-white text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-[#103C52] transition-colors"
                  style={{ background: "#091d2e" }}
                >
                  BOOK DELUXE
                </button>
              </div>
            </div>

            {/* VIP */}
            <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-2 border-[#ffdea6] relative w-[85vw] max-w-[340px] flex-shrink-0 snap-center md:w-auto md:max-w-none md:flex-shrink md:snap-align-none">
              <div className="h-[190px] sm:h-[220px] w-full overflow-hidden relative bg-black">
                <video
                  suppressHydrationWarning
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={IMG.freefall}
                  className="w-full h-full object-cover"
                >
                  <source src={IMG.vipVideo} type="video/mp4" />
                </video>
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded text-[11px] font-bold" style={{ background: "rgba(255,255,255,0.9)" }}>TIER 03 — SIGNATURE</span>
                  <span className="px-3 py-1 rounded text-[11px] font-bold text-[#271900]" style={{ background: "#ffdea6" }}>MOST REQUESTED</span>
                </div>
              </div>
              <div className="p-5 sm:p-8 flex flex-col flex-grow">
                <h3 className="text-[24px] text-black mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>VIP CINEMATIC SUITE</h3>
                <p className="text-[#43474c] text-[14px] mb-6">Your personal aerial cameraman flying alongside you for cinematic documentary perfection.</p>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-[32px] font-bold text-black" style={{ fontFamily: "'Cormorant Garamond', serif" }}>฿14,000</span>
                  <span className="text-[12px] text-[#43474c]">THB / Jumper</span>
                </div>
                <div className="w-full h-px bg-[#efeee8] mb-6" />
                <ul className="flex flex-col gap-3 text-[14px] mb-8 flex-grow">
                  {[
                    "Dedicated Aerial Cameraman in Freefall",
                    "Multi-angle 4K Cinematic Cut + Teaser Reel",
                    "Priority Flight Manifest & Hangar Lounge",
                    "Touchdown Champagne Welcome Toast",
                  ].map((feat) => (
                    <li key={feat} className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#e5c283]" style={{ fontSize: "18px" }}>star</span>
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollTo("details")}
                  className="w-full py-3.5 rounded text-[#271900] text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-white transition-colors shadow-md"
                  style={{ background: "#ffdea6" }}
                >
                  BOOK VIP EXPERIENCE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: STATS ─── */}
      <section className="w-full py-24 px-4 lg:px-16 relative overflow-hidden" style={{ background: "#091d2e" }}>
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(16,60,82,0.6)" }} />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(255,222,166,0.1)" }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#ffdea6] text-[11px] font-bold tracking-[0.15em] uppercase block mb-2">MARITIME FLIGHT METRICS</span>
            <h2 className="text-white text-[32px] sm:text-[48px]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>THE EXPERIENCE OF A LIFETIME</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { val: "13,000", unit: "FT", title: "Exit Altitude", desc: "Soaring above cloud tier over the vibrant Gulf of Thailand coastline with full horizon arc visibility." },
              { val: "60", unit: "SEC", title: "Pure Freefall", desc: "Pure kinetic velocity at 220 km/h. Unrivaled sensory clarity and absolute euphoric exhilaration." },
              { val: "5–7", unit: "MIN", title: "Canopy Glide", desc: "Graceful steered descent overlooking secluded coves, turquoise reefs, and palm-fringed shorelines." },
            ].map((m) => (
              <div key={m.title} className="flex flex-col items-center p-8 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
                <span className="text-[#ffdea6] text-[56px] sm:text-[72px] font-normal leading-none mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {m.val}<span className="text-[20px] font-light">{m.unit}</span>
                </span>
                <h3 className="text-white text-[18px] font-semibold mb-2">{m.title}</h3>
                <p className="text-[#73869b] text-[14px] font-light max-w-xs">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: JOURNEY ─── */}
      <section id="journey" className="w-full py-20 lg:py-32 px-4 lg:px-16" style={{ background: "#f5f4ee" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#006780] text-[11px] font-bold tracking-[0.15em] uppercase block mb-2">PRE-FLIGHT TO TOUCHDOWN</span>
              <h2 className="text-black text-[32px] sm:text-[48px]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>THE 5-STEP JOURNEY</h2>
            </div>
            <p className="text-[#43474c] text-[14px] max-w-md">
              Meticulously structured for flawless peace of mind, allowing you to immerse completely in the sensation of flight.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-6">
            {[
              {
                step: "Step 1",
                num: "01",
                title: "Arrival and check-in",
                desc: "Sign in at the dropzone and bring your photo ID.",
                img: IMG.step1,
              },
              {
                step: "Step 2",
                num: "02",
                title: "Safety briefing and gear fitting",
                desc: "Meet your instructor for the safety briefing and harness fitting.",
                img: IMG.step2,
              },
              {
                step: "Step 3",
                num: "03",
                title: "Boarding and the climb",
                desc: "Board the aircraft and climb to jump altitude.",
                img: IMG.step3,
              },
              {
                step: "Step 4",
                num: "04",
                title: "Exit and freefall",
                desc: "Exit with your instructor for freefall over the Gulf of Thailand.",
                img: IMG.step4,
              },
              {
                step: "Step 5",
                num: "05",
                title: "Canopy flight and landing",
                desc: "Fly under the parachute with your instructor and land back at the dropzone.",
                img: IMG.step5,
              },
            ].map((step) => (
              <div
                key={step.num}
                className="flex flex-row sm:flex-col items-center sm:items-stretch bg-white rounded-xl shadow-xs overflow-hidden border border-[#c4c6cd]/25 hover:shadow-md transition-all p-3 sm:p-0 gap-3.5 sm:gap-0"
              >
                <div className="w-24 h-24 sm:w-full sm:h-36 flex-shrink-0 rounded-lg sm:rounded-none overflow-hidden bg-gray-100 relative">
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="sm:hidden absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[9px] font-bold text-[#ffdea6]">
                    {step.num}
                  </div>
                </div>
                <div className="flex-1 min-w-0 sm:p-5 flex flex-col justify-center">
                  <span
                    className="text-[10px] sm:text-[11px] font-bold tracking-[0.15em] text-[#006780] uppercase mb-0.5 sm:mb-1 block"
                  >
                    {step.step}
                  </span>
                  <h3 className="text-[14px] sm:text-[15px] font-bold text-black mb-1 sm:mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-[12px] sm:text-[12.5px] text-[#43474c] leading-snug sm:leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: GALLERY ─── */}
      <section id="gallery" className="w-full py-20 lg:py-32 px-4 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#006780] text-[11px] font-bold tracking-[0.15em] uppercase block mb-2">
              EXPERIENCE ARCHIVE
            </span>
            <h2
              className="text-black text-[36px] sm:text-[52px] tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              GALLERY
            </h2>
            <p className="text-[#43474c] text-[15px] font-light mt-2">
              Moments of freefall and coastal skies over the Gulf of Thailand.
            </p>
          </div>

          {/* Gallery: Mobile Horizontal Snap Slider / Desktop Grid */}
          <div
            className="flex md:grid md:grid-cols-12 gap-4 md:gap-6 items-stretch overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 px-4 -mx-4 md:px-0 md:mx-0 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {[
              {
                col: "md:col-span-8",
                src: IMG.freefall,
                alt: "Tandem freefall over azure waters",
                label: "FREEFALL DYNAMICS",
                caption: "Pure adrenaline suspended above tropical coral shallows",
                h: "md:h-[460px]",
              },
              {
                col: "md:col-span-4",
                src: IMG.parachute,
                alt: "Parachute canopy open high above Thailand",
                label: "CANOPY GLIDE",
                caption: "Smooth nautical glide across the archipelago",
                h: "md:h-[460px]",
              },
              {
                col: "md:col-span-4",
                src: IMG.plane,
                alt: "Turboprop skydiving aircraft ascending over Pattaya",
                label: "CABIN ASCENT",
                caption: "Climbing to 13,000 feet above the Gulf of Thailand",
                h: "md:h-80",
              },
              {
                col: "md:col-span-4",
                src: IMG.deluxe,
                alt: "Handcam 4K capture in freefall",
                label: "HANDCAM 4K",
                caption: "Exhilarating aerial selfies with master instructor",
                h: "md:h-80",
              },
              {
                col: "md:col-span-4",
                src: IMG.galleryTandem,
                alt: "Skydivers floating over tropical coastline",
                label: "HORIZON DESCENT",
                caption: "Breathtaking panoramic arc of Pattaya bay",
                h: "md:h-80",
              },
              {
                col: "md:col-span-7",
                src: IMG.coast,
                alt: "Panoramic aerial vista of tropical coastline",
                label: "DROP ZONE GEOGRAPHY",
                caption: "Pattaya coastline and offshore reef views",
                h: "md:h-80",
              },
              {
                col: "md:col-span-5",
                src: IMG.step5,
                alt: "Gentle dropzone touchdown on seaside lawn",
                label: "OCEAN TOUCHDOWN",
                caption: "Smooth coastal landing with champagne welcome",
                h: "md:h-80",
              },
            ].map((item) => (
              <div
                key={item.label}
                className={`${item.col} group relative rounded-2xl md:rounded-xl overflow-hidden shadow-md w-[82vw] max-w-[340px] flex-shrink-0 snap-center h-[380px] md:w-auto md:max-w-none md:flex-shrink md:snap-align-none ${item.h}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
                  }}
                />
                <div className="absolute bottom-5 left-5 right-5 md:bottom-6 md:left-6 md:right-6 text-white">
                  <span className="text-[#ffdea6] text-[10px] font-bold tracking-[0.14em] block mb-1">
                    {item.label}
                  </span>
                  <p className="text-[14px] font-semibold leading-snug">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: THE DETAILS ─── */}
      <section id="details" className="w-full py-20 lg:py-32 px-4 lg:px-16" style={{ background: "#faf9f3" }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <span className="text-[#006780] text-[11px] font-bold tracking-[0.15em] uppercase block mb-2">
              EXPEDITION ESSENTIALS
            </span>
            <h2
              className="text-black text-[36px] sm:text-[52px] leading-tight mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              The details
            </h2>
            <p className="text-[#43474c] text-[17px] font-light">
              Everything that comes with this experience, and what to plan for yourself.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Highlights */}
            <div className="bg-white p-5 sm:p-7 rounded-2xl shadow-xs border border-[#c4c6cd]/30 flex flex-col hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-[#091d2e] flex items-center justify-center text-[#ffdea6] mb-5 shadow-xs">
                <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>flare</span>
              </div>
              <h3
                className="text-[20px] font-bold text-black mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Highlights
              </h3>
              <ul className="flex flex-col gap-3 text-[13px] text-[#43474c] leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006780] mt-2 flex-shrink-0" />
                  <span>Exit at 13,000 ft with the Gulf of Thailand on the horizon</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006780] mt-2 flex-shrink-0" />
                  <span>Around sixty seconds of freefall, then five to seven minutes under canopy along the coast</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006780] mt-2 flex-shrink-0" />
                  <span>No experience needed: your USPA-certified instructor flies the jump</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006780] mt-2 flex-shrink-0" />
                  <span>Same aircraft, altitude and instructors in every package</span>
                </li>
              </ul>
            </div>

            {/* What's included */}
            <div className="bg-white p-5 sm:p-7 rounded-2xl shadow-xs border border-[#c4c6cd]/30 flex flex-col hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-[#006780] flex items-center justify-center text-white mb-5 shadow-xs">
                <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>check_circle</span>
              </div>
              <h3
                className="text-[20px] font-bold text-black mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                What&apos;s included
              </h3>
              <ul className="flex flex-col gap-3 text-[13px] text-[#43474c] leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-emerald-600 flex-shrink-0 mt-0.5" style={{ fontSize: "16px" }}>add</span>
                  <span>Tandem skydive experience in Pattaya, Thailand</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-emerald-600 flex-shrink-0 mt-0.5" style={{ fontSize: "16px" }}>add</span>
                  <span>Safety briefing and tandem instructor support</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-emerald-600 flex-shrink-0 mt-0.5" style={{ fontSize: "16px" }}>add</span>
                  <span>Aircraft ascent and ocean-view jump experience</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-emerald-600 flex-shrink-0 mt-0.5" style={{ fontSize: "16px" }}>add</span>
                  <span>Certificate of completion</span>
                </li>
              </ul>
            </div>

            {/* Sea View Tandem Skydive - Pattaya */}
            <div className="bg-white p-5 sm:p-7 rounded-2xl shadow-xs border border-[#c4c6cd]/30 flex flex-col hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-[#103C52] flex items-center justify-center text-[#ffdea6] mb-5 shadow-xs">
                <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>flight_takeoff</span>
              </div>
              <h3
                className="text-[20px] font-bold text-black mb-3"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Sea View Tandem Skydive - Pattaya
              </h3>
              <p className="text-[13px] text-[#43474c] leading-relaxed mb-4">
                A tandem skydiving experience over Pattaya with ocean views. Guests receive a safety briefing, fly to jump altitude, complete the tandem jump with a certified instructor, and choose from ECO, Deluxe, or VIP package options depending on the media coverage they want.
              </p>
              <div className="mt-auto pt-3 border-t border-gray-100 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-[#f5f4ee] text-[11px] font-bold text-[#091d2e]">ECO</span>
                <span className="px-2.5 py-1 rounded-full bg-[#f5f4ee] text-[11px] font-bold text-[#091d2e]">Deluxe</span>
                <span className="px-2.5 py-1 rounded-full bg-[#ffdea6] text-[11px] font-bold text-[#271900]">VIP Suite</span>
              </div>
            </div>

            {/* Where you jump & Operated by */}
            <div className="bg-white p-5 sm:p-7 rounded-2xl shadow-xs border border-[#c4c6cd]/30 flex flex-col hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-[#271900] flex items-center justify-center text-[#ffdea6] mb-5 shadow-xs">
                <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>location_on</span>
              </div>
              <h3
                className="text-[20px] font-bold text-black mb-3"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Where you jump
              </h3>
              <div className="text-[13px] text-[#43474c] leading-relaxed space-y-2 mb-5">
                <p className="font-bold text-black text-[14px]">Pattaya Sea View</p>
                <p className="text-[12px] text-[#006780] font-semibold">Pattaya, Thailand</p>
                <p className="text-[12px] text-[#53575c] bg-[#faf9f3] p-3 rounded-xl border border-[#e9e8e2] leading-snug">
                  95 M.4, Chakphong, Klaeng District, Rayong 21190, Thailand
                </p>
              </div>

              <div className="mt-auto pt-3 border-t border-gray-100">
                <span className="text-[10px] text-[#74777d] uppercase tracking-wider block font-bold mb-1">
                  OPERATED BY
                </span>
                <p className="text-[14px] font-bold text-[#091d2e] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#006780]" style={{ fontSize: "16px" }}>verified</span>
                  Dropzone Thailand
                </p>
              </div>
            </div>
          </div>

          {/* Interactive GOOD TO KNOW Accordion */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-xs border border-[#c4c6cd]/30">
            <h3
              className="text-[24px] sm:text-[30px] font-bold text-black tracking-tight mb-6 uppercase"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              GOOD TO KNOW
            </h3>

            <div className="divide-y divide-gray-200">
              {[
                {
                  q: "WHERE DOES THE ACTIVITY TAKE PLACE?",
                  a: "The tandem skydive is listed for Pattaya Sea View dropzone, located at 95 M.4, Chakphong, Klaeng District, Rayong 21190, Thailand. Operated by Dropzone Thailand.",
                },
                {
                  q: "WHICH PACKAGE SHOULD I CHOOSE?",
                  a: "Choose ECO Tandem (฿9,500 THB) for the pure high-altitude jump thrill, DELUXE Media (฿12,500 THB) for 4K wrist handcam photos & video, or VIP Cinematic Suite (฿14,000 THB) for a dedicated aerial cameraman flying in freefall alongside you.",
                },
                {
                  q: "IS BANGKOK PICKUP AVAILABLE?",
                  a: "Yes! Private roundtrip hotel transfers from both Bangkok and Pattaya central hotels can be pre-arranged with our flight concierge.",
                },
                {
                  q: "NO EXPERIENCE NEEDED: HOW DOES IT WORK?",
                  a: "Zero skydiving experience required. You are harnessed securely to a USPA-certified master instructor who handles the jump ascent, 60-second freefall stability, and parachute canopy navigation all the way to touchdown.",
                },
              ].map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={faq.q} className="py-4">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left gap-4 py-1 group"
                    >
                      <span className="text-[13px] font-bold text-black tracking-wider uppercase group-hover:text-[#006780] transition-colors">
                        {faq.q}
                      </span>
                      <span className="text-[20px] font-light text-black flex-shrink-0 w-6 h-6 flex items-center justify-center">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <p className="mt-2 text-[13.5px] text-[#53575c] leading-relaxed max-w-3xl pr-8 animate-fade-in-up">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: CTA ─── */}
      <section className="w-full py-24 lg:py-36 px-4 lg:px-16 relative overflow-hidden text-white" style={{ background: "#091d2e" }}>
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src={IMG.freefall} alt="Sky background" className="w-full h-full object-cover grayscale contrast-125" style={{ filter: "grayscale(1) contrast(1.25)" }} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          <span className="text-[#ffdea6] text-[11px] font-bold tracking-[0.15em] uppercase mb-4">RESERVE YOUR FLIGHT PROFILE</span>
          <h2
            className="text-[40px] sm:text-[56px] md:text-[72px] font-normal mb-6 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            THE SKY IS CALLING.
          </h2>
          <p className="text-[#73869b] text-[17px] font-light max-w-xl mb-10 leading-relaxed">
            Make your journey to Thailand unforgettable. Reserve your tandem jump with Southeast Asia&apos;s foremost luxury sea view skydiving expedition.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => scrollTo("packages")}
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-[#271900] text-[11px] font-bold tracking-[0.15em] uppercase rounded hover:bg-white transition-all duration-300 shadow-2xl"
              style={{ background: "#ffdea6" }}
            >
              RESERVE YOUR EXPERIENCE
            </button>
            <a
              href="tel:+66800948586"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-white text-[11px] font-bold tracking-[0.15em] uppercase rounded transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)" }}
            >
              <span className="material-symbols-outlined mr-2 text-[#ffdea6]" style={{ fontSize: "18px" }}>chat</span>
              WHATSAPP CONCIERGE
            </a>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-[#73869b] text-[12px]">
            {["Instant Confirmation", "Flexible Rescheduling", "Hotel Pickup Available"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#ffdea6]" style={{ fontSize: "16px" }}>check</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="w-full text-white px-4 lg:px-16 pt-16 pb-12" style={{ background: "#091d2e" }}>
        <div className="max-w-7xl mx-auto">
          {/* Top Brand & Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-12 border-b border-white/10">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={IMG.logo}
                  alt="Greedy Adventures"
                  className="h-8 w-auto object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
                <div className="flex flex-col">
                  <span className="text-[20px] font-bold text-white leading-none">GREEDY</span>
                  <span className="text-[#ffdea6] text-[10px] font-bold tracking-[0.15em]">ADVENTURES</span>
                </div>
              </div>
              <p className="text-[#73869b] text-[12.5px] leading-relaxed">
                Elevating human flight over Southeast Asia&apos;s most breathtaking coastlines.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <a
                  href="https://instagram.com/greedy_adventures"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#103C52] flex items-center justify-center text-[#ffdea6] hover:bg-[#ffdea6] hover:text-[#091d2e] transition-colors"
                  aria-label="Instagram"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>photo_camera</span>
                </a>
                <a
                  href="https://www.greedyadventures.com/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#103C52] flex items-center justify-center text-[#ffdea6] hover:bg-[#ffdea6] hover:text-[#091d2e] transition-colors"
                  aria-label="Contact"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>mail</span>
                </a>
              </div>
            </div>

            {/* Column 1: Adventures */}
            <div className="flex flex-col gap-3">
              <span className="text-[#ffdea6] text-[11px] font-bold tracking-[0.15em] uppercase">
                Adventures
              </span>
              <ul className="flex flex-col gap-2 text-[13px]">
                <li>
                  <a
                    href="https://www.greedyadventures.com/adventures/skydiving"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8ba2b9] hover:text-white transition-colors"
                  >
                    Skydiving
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.greedyadventures.com/coming-soon/paragliding"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8ba2b9] hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    Paragliding
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-[#ffdea6]">Soon</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.greedyadventures.com/coming-soon/scuba-diving"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8ba2b9] hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    Scuba Diving
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-[#ffdea6]">Soon</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.greedyadventures.com/coming-soon/snowboarding"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8ba2b9] hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    Snowboarding
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-[#ffdea6]">Soon</span>
                  </a>
                </li>
                <li className="pt-1">
                  <a
                    href="https://www.greedyadventures.com/adventures"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#ffdea6] font-semibold transition-colors flex items-center gap-1"
                  >
                    All adventures
                    <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>arrow_forward</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Book a tandem */}
            <div className="flex flex-col gap-3">
              <span className="text-[#ffdea6] text-[11px] font-bold tracking-[0.15em] uppercase">
                Book a tandem
              </span>
              <ul className="flex flex-col gap-2 text-[13px]">
                <li>
                  <a
                    href="https://www.greedyadventures.com/book"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8ba2b9] hover:text-white transition-colors"
                  >
                    Book a tandem
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.greedyadventures.com/experiences/sea-view-skydiving"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8ba2b9] hover:text-white transition-colors"
                  >
                    Tandem in Thailand
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.greedyadventures.com/experiences/mount-abu-tandem-skydiving"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8ba2b9] hover:text-white transition-colors"
                  >
                    Tandem in India
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.greedyadventures.com/escapes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8ba2b9] hover:text-white transition-colors"
                  >
                    Where we jump
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Escapes */}
            <div className="flex flex-col gap-3">
              <span className="text-[#ffdea6] text-[11px] font-bold tracking-[0.15em] uppercase">
                Escapes
              </span>
              <ul className="flex flex-col gap-2 text-[13px]">
                <li>
                  <a
                    href="https://www.greedyadventures.com/escapes/thailand/pattaya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8ba2b9] hover:text-white transition-colors"
                  >
                    Pattaya Dropzone
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.greedyadventures.com/escapes/india/mount-abu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8ba2b9] hover:text-white transition-colors"
                  >
                    Mount Abu
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.greedyadventures.com/escapes/thailand"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8ba2b9] hover:text-white transition-colors"
                  >
                    Thailand
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.greedyadventures.com/escapes/india"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8ba2b9] hover:text-white transition-colors"
                  >
                    India
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Company */}
            <div className="flex flex-col gap-3">
              <span className="text-[#ffdea6] text-[11px] font-bold tracking-[0.15em] uppercase">
                Company
              </span>
              <ul className="flex flex-col gap-2 text-[13px]">
                <li>
                  <a
                    href="https://www.greedyadventures.com/about"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8ba2b9] hover:text-white transition-colors"
                  >
                    About us
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.greedyadventures.com/blog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8ba2b9] hover:text-white transition-colors"
                  >
                    Guides and stories
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.greedyadventures.com/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8ba2b9] hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 5: Get in touch */}
            <div className="flex flex-col gap-3">
              <span className="text-[#ffdea6] text-[11px] font-bold tracking-[0.15em] uppercase">
                Get in touch
              </span>
              <ul className="flex flex-col gap-2 text-[13px]">
                <li>
                  <a
                    href="https://www.greedyadventures.com/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8ba2b9] hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[#ffdea6]" style={{ fontSize: "15px" }}>mail</span>
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/greedy_adventures"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8ba2b9] hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[#ffdea6]" style={{ fontSize: "15px" }}>photo_camera</span>
                    Instagram
                  </a>
                </li>
                <li className="pt-2">
                  <a
                    href="tel:+66800948586"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#103C52] text-[#ffdea6] text-[11px] font-bold hover:bg-[#ffdea6] hover:text-[#091d2e] transition-colors"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>call</span>
                    +66 80 094 8586
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#73869b] text-[12px]">
            <p>© 2025 Greedy Adventures. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="https://www.greedyadventures.com/about" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy</a>
              <a href="https://www.greedyadventures.com/about" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Terms</a>
              <a href="https://www.greedyadventures.com/contact" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
