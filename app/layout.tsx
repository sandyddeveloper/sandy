import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import "./globals.css"

const SITE_URL = "https://sandy-smoky.vercel.app"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

/* ============================
   METADATA (SEO + SOCIAL)
============================ */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Santhoshraj | Full Stack Developer",
    template: "%s | Santhoshraj",
  },

  description:
    "Santhoshraj is a Full Stack Developer specializing in React, Next.js, Python, Django, and scalable web applications.",

  keywords: [
    "Santhoshraj",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Django Developer",
    "Portfolio",
  ],

  authors: [{ name: "Santhoshraj K", url: SITE_URL }],
  creator: "Santhoshraj K",
  publisher: "Santhoshraj",

  alternates: {
    canonical: SITE_URL,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Santhoshraj Portfolio",
    title: "Santhoshraj | Full Stack Developer",
    description:
      "Full Stack Developer crafting high-performance, scalable, and modern web applications.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Santhoshraj Portfolio Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Santhoshraj | Full Stack Developer",
    description:
      "Building scalable, fast, and modern web applications using React, Next.js, Python & Django.",
    images: [`${SITE_URL}/og-image.png`],
    creator: "@santhoshraj", // optional (remove if not used)
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

  verification: {
    google: "GOOGLE_SITE_VERIFICATION_CODE", // optional
  },
}

/* ============================
   VIEWPORT CONFIG
============================ */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#041b13" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
}

/* ============================
   ROOT LAYOUT
============================ */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className="!overflow-x-hidden"
      suppressHydrationWarning
    >
      <head>
        {/* Inline critical CSS for mobile stability */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body {
                overflow-x: hidden !important;
                position: relative !important;
                width: 100% !important;
                max-width: 100vw !important;
              }

              @media (max-width: 768px) {
                * {
                  -webkit-tap-highlight-color: transparent !important;
                }

                .nav-resize-optimized * {
                  transition: none !important;
                  animation: none !important;
                }
              }
            `,
          }}
        />
      </head>

      <body
        className={`${inter.variable} ${inter.className} antialiased bg-black text-white`}
      >
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
