"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { label: "EXPERIENCE", href: "#experience", section: "experience" },
  { label: "PACKAGES", href: "#packages", section: "packages" },
  { label: "JOURNEY", href: "#journey", section: "journey" },
  { label: "GALLERY", href: "#gallery", section: "gallery" },
  { label: "DETAILS", href: "#details", section: "details" },
];

const SECTION_IDS = ["experience", "packages", "journey", "gallery", "details"];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("experience");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById("hero");
      if (heroEl) {
        const heroBottom = heroEl.getBoundingClientRect().bottom;
        setScrolled(heroBottom <= 90);
      } else {
        setScrolled(window.scrollY > 300);
      }

      // Determine active section
      let current = "";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
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
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ${
          scrolled
            ? "bg-white/95 text-black shadow-[0_2px_12px_rgba(0,0,0,0.06)] border-b border-black/5 backdrop-blur-md"
            : "bg-transparent text-white border-b border-white/10"
        }`}
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <div className="h-20 w-full px-4 lg:px-16 flex items-center justify-between">
          {/* Brand Name (Text Only) */}
          <Link href="#hero" onClick={() => scrollTo("#hero")} className="flex items-center group">
            <div className="flex flex-col">
              <span
                className={`text-[24px] font-extrabold leading-none tracking-tight transition-colors duration-300 ${
                  scrolled ? "text-black" : "text-white"
                }`}
                style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.02em" }}
              >
                GREEDY
              </span>
              <span
                className={`text-[10px] font-extrabold tracking-[0.25em] uppercase transition-colors duration-300 mt-0.5 ${
                  scrolled ? "text-[#006780]" : "text-[#ffdea6]"
                }`}
              >
                ADVENTURES
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.section;
              let linkClasses = "text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-200 pb-1 border-b-2 ";
              if (scrolled) {
                linkClasses += isActive
                  ? "text-black border-black"
                  : "text-[#43474c] border-transparent hover:text-black hover:border-black/30";
              } else {
                linkClasses += isActive
                  ? "text-[#ffdea6] border-[#ffdea6]"
                  : "text-white/80 border-transparent hover:text-white hover:border-white/50";
              }
              return (
                <button
                  key={link.section}
                  onClick={() => scrollTo(link.href)}
                  className={linkClasses}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("#packages")}
              className={`hidden sm:inline-flex items-center justify-center px-6 py-2.5 text-[11px] font-bold tracking-[0.15em] uppercase rounded transition-all duration-300 ${
                scrolled
                  ? "bg-[#091d2e] text-white hover:bg-[#103C52] shadow-sm"
                  : "bg-[#ffdea6] text-[#091d2e] hover:bg-[#ffeac4] shadow-lg hover:shadow-xl font-extrabold"
              }`}
            >
              BOOK YOUR JUMP
            </button>
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 ${
                scrolled ? "bg-black text-white" : "bg-white/15 text-white hover:bg-white/25"
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "18px" }}
              >
                person
              </span>
            </div>
            {/* Mobile menu button */}
            <button
              className="xl:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`w-6 h-0.5 transition-all duration-300 ${
                  scrolled ? "bg-black" : "bg-white"
                } ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`w-6 h-0.5 transition-all duration-300 ${
                  scrolled ? "bg-black" : "bg-white"
                } ${mobileOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`w-6 h-0.5 transition-all duration-300 ${
                  scrolled ? "bg-black" : "bg-white"
                } ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`xl:hidden transition-all duration-300 overflow-hidden ${
            mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{
            background: scrolled ? "rgba(255,255,255,0.98)" : "rgba(9,29,46,0.98)",
          }}
        >
          <div
            className={`px-4 pb-4 flex flex-col gap-1 border-t ${
              scrolled ? "border-gray-100" : "border-white/10"
            }`}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.section}
                onClick={() => scrollTo(link.href)}
                className={`text-left px-3 py-3 text-[11px] font-bold tracking-[0.15em] uppercase rounded transition-all ${
                  activeSection === link.section
                    ? scrolled
                      ? "bg-black text-white"
                      : "bg-[#ffdea6] text-[#091d2e] font-extrabold"
                    : scrolled
                    ? "text-[#43474c] hover:bg-gray-100"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#packages")}
              className={`mt-2 py-3 text-[11px] font-bold tracking-[0.15em] uppercase rounded font-extrabold ${
                scrolled
                  ? "bg-[#091d2e] text-white"
                  : "bg-[#ffdea6] text-[#091d2e]"
              }`}
            >
              BOOK YOUR JUMP
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
