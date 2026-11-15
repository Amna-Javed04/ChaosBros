import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron, Rajdhani,DM_Sans,} from "next/font/google";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import "./globals.css";
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ChaosBro ESports - Where Legends Rise",
  description: "Official website of ChaosBro ESports team. Competitive gaming team competing in Call of Duty, Valorant, and Apex Legends.",
  keywords: "esports, gaming, chaosbro, call of duty, valorant, apex legends, competitive gaming",
  authors: [{ name: "ChaosBro ESports" }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: "ChaosBro ESports - Where Legends Rise",
    description: "Competitive. Creative. Chaos.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    // card: "summary_large_image",
    title: "ChaosBro ESports",
    description: "Where Legends Rise",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${rajdhani.variable} ${dmSans.variable} antialiased bg-gray-950 text-gray-50 font-sans overflow-x-hidden`}
        suppressHydrationWarning={true}
      >
        <div className="min-h-screen flex flex-col overflow-x-hidden">
          <Navigation />

          <main className="flex-1 overflow-x-hidden">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
