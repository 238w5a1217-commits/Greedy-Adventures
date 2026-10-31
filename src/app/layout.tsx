import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Greedy Adventures | Sea View Skydiving – Pattaya, Thailand",
  description:
    "Experience luxury tandem skydiving from 13,000 FT over the Gulf of Thailand. USPA-certified instructors, breathtaking coastal views, and bespoke packages. Book your jump today.",
  keywords: "skydiving Pattaya, tandem skydiving Thailand, sea view skydiving, Gulf of Thailand, Greedy Adventures",
  openGraph: {
    title: "Greedy Adventures | Sea View Skydiving",
    description: "Luxury tandem skydiving from 13,000 FT over the Gulf of Thailand.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Outfit:wght@300;400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        style={{ margin: 0, padding: 0, fontFamily: "'Plus Jakarta Sans', 'Manrope', sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
