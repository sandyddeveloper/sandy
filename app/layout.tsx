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

  description:
    "Santhoshraj is a Full Stack Developer specializing in React, Next.js, Python, Django, and scalable web applications. Building fast, modern, and performance-focused digital experiences.",

  keywords: [
    "Santhoshraj",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Python Developer",
    "Django Developer",
    "Web Developer Portfolio",
    "Frontend Engineer",
    "Backend Engineer",
  ],

  authors: [{ name: "Santhoshraj K" }],
  creator: "Santhoshraj K",

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sandy-smoky.vercel.app/",
    siteName: "Santhoshraj Portfolio",
    title: "Santhoshraj | Full Stack Developer",
    description:
      "Full Stack Developer crafting high-performance, scalable, and modern web applications.",
    images: [
      {
        url: "/og-image.png",
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
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${inter.variable}
          ${inter.className}
          antialiased
          bg-black
          text-white
        `}
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
