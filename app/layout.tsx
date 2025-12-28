import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://sandy-smoky.vercel.app/"),
  title: {
    default: "Santhoshraj | Full Stack Developer",
    template: "%s | Santhoshraj",
  },
  description: "Santhoshraj is a Full Stack Developer specializing in React, Next.js, Python, Django, and scalable web applications.",
  keywords: ["Santhoshraj", "Full Stack Developer", "React Developer", "Next.js Developer"],
  authors: [{ name: "Santhoshraj K" }],
  creator: "Santhoshraj K",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sandy-smoky.vercel.app/",
    siteName: "Santhoshraj Portfolio",
    title: "Santhoshraj | Full Stack Developer",
    description: "Full Stack Developer crafting high-performance, scalable, and modern web applications.",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Santhoshraj Portfolio Preview",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Santhoshraj | Full Stack Developer",
    description: "Building scalable, fast, and modern web applications using React, Next.js, Python & Django.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#041b13",
  userScalable: false, // This prevents zooming which can interfere with resize
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="!overflow-x-hidden" suppressHydrationWarning>
      <head>
        {/* Critical CSS for instant mobile resize */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Prevent layout shift on mobile */
            html, body {
              overflow-x: hidden !important;
              position: relative !important;
              width: 100% !important;
              max-width: 100vw !important;
            }
            
            /* Mobile-specific optimizations */
            @media (max-width: 768px) {
              * {
                -webkit-tap-highlight-color: transparent !important;
              }
              
              /* Disable heavy animations during resize */
              .nav-resize-optimized * {
                transition: none !important;
                animation: none !important;
              }
            }
          `
        }} />
      </head>
      <body className={`${inter.variable} ${inter.className} antialiased bg-black text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}