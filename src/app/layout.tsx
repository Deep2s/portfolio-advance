import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio – Creative Developer",
  description:
    "A creative developer crafting immersive digital experiences with modern web technologies, 3D graphics, and thoughtful design.",
  keywords: [
    "developer",
    "portfolio",
    "Next.js",
    "Three.js",
    "React",
    "TypeScript",
  ],
  openGraph: {
    title: "Portfolio – Creative Developer",
    description:
      "A creative developer crafting immersive digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${poppins.variable} antialiased`}>
      <body
        className={`${poppins.className} h-screen bg-background text-foreground overflow-hidden`}
      >
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
