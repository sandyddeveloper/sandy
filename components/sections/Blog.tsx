"use client"

import { useRef, useState, useEffect } from "react"
import { useAnimationFrame } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, Eye, ArrowRight } from "lucide-react"
import { cn } from "@/utils/utils"

/* ================= TYPES ================= */

interface BlogTimelineItem {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: number
  views: number
  image: string
  slug: string
  category?: string
}

interface BlogTimelineSectionProps {
  posts: BlogTimelineItem[]
}

/* ================= CONSTANTS ================= */

const CARD_WIDTH = 340
const GAP = 24
const SPEED = 40

/* ================= COMPONENT ================= */

export default function BlogTimelineSection({
  posts,
}: BlogTimelineSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const x = useRef(0)

  const [paused, setPaused] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [hasMounted, setHasMounted] = useState(false)

  /* ================= THEME DETECTION ================= */

  useEffect(() => {
    setHasMounted(true)

    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }

    checkTheme()

    const observer = new MutationObserver(() => checkTheme())
    observer.observe(document.documentElement, { attributes: true })

    return () => observer.disconnect()
  }, [])

  /* ================= INFINITE MARQUEE ================= */

  const loopPosts = [...posts, ...posts]

  useAnimationFrame((_, delta) => {
    if (paused || !trackRef.current) return

    x.current -= (SPEED * delta) / 1000

    const halfWidth = (CARD_WIDTH + GAP) * posts.length
    if (Math.abs(x.current) >= halfWidth) x.current = 0

    trackRef.current.style.transform = `translate3d(${x.current}px,0,0)`
  })

  /* ================= THEME HELPERS ================= */

  const getBackgroundGradient = () =>
    isDark
      ? "bg-gradient-to-b from-black via-black to-black"
      : "bg-gradient-to-b from-emerald-50 via-white to-white"

  const getTitleGradient = () =>
    isDark
      ? "from-emerald-400 to-lime-400"
      : "from-emerald-600 to-green-600"

  const getSubtitleColor = () =>
    isDark ? "text-gray-400" : "text-gray-600"

  const getCardBg = () =>
    isDark ? "bg-black" : "bg-white"

  const getBorderColor = () =>
    isDark
      ? "border-emerald-500/30 hover:border-emerald-400"
      : "border-emerald-200 hover:border-emerald-400"

  const getMetaText = () =>
    isDark ? "text-gray-400" : "text-gray-500"

  const getTitleText = () =>
    isDark ? "text-white" : "text-gray-900"

  const getExcerptText = () =>
    isDark ? "text-gray-400" : "text-gray-600"

  const getAccentText = () =>
    isDark ? "text-emerald-400" : "text-emerald-600"

  if (!hasMounted) return null

  /* ================= RENDER ================= */

  return (
    <section
      suppressHydrationWarning
      className={cn("relative py-24 overflow-hidden", getBackgroundGradient())}
    >
      {/* ================= HEADER ================= */}
      <div className="max-w-7xl mx-auto px-6 mb-12 relative">
        <div className="text-center">
          <h2
            className={cn(
              "text-3xl sm:text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
              getTitleGradient()
            )}
          >
            Blog Timeline
          </h2>
          <p className={cn("mt-3", getSubtitleColor())}>
            Explore recent articles, tutorials, and deep dives
          </p>
        </div>

        {/* View All (Desktop) */}
        <div className="hidden sm:block absolute right-6 top-1/2 -translate-y-1/2">
          <Link
            href="/blog"
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl transition",
              isDark
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
                : "bg-emerald-600/10 text-emerald-700 border border-emerald-200 hover:bg-emerald-600/20"
            )}
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* ================= VIEWPORT ================= */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* ================= TRACK ================= */}
        <div
          ref={trackRef}
          className="flex gap-6 px-6 will-change-transform"
        >
          {loopPosts.map((post, index) => (
            <Link
              key={`${post.id}-${index}`}
              href={`/blog/${post.slug}`}
              className="min-w-[340px] max-w-[340px]"
            >
              <article
                className={cn(
                  "h-full rounded-2xl overflow-hidden border transition-all",
                  getCardBg(),
                  getBorderColor()
                )}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {post.category && (
                    <span
                      className={cn(
                        "absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold",
                        isDark
                          ? "bg-emerald-500 text-black"
                          : "bg-emerald-600 text-white"
                      )}
                    >
                      {post.category}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className={cn("flex gap-4 text-xs mb-3", getMetaText())}>
                    <span className="flex items-center gap-1">
                      <Calendar className={cn("h-3.5 w-3.5", getAccentText())} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className={cn("h-3.5 w-3.5", getAccentText())} />
                      {post.readTime} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className={cn("h-3.5 w-3.5", getAccentText())} />
                      {post.views}
                    </span>
                  </div>

                  <h3
                    className={cn(
                      "text-lg font-semibold mb-2 line-clamp-2",
                      getTitleText()
                    )}
                  >
                    {post.title}
                  </h3>

                  <p className={cn("text-sm line-clamp-2 mb-4", getExcerptText())}>
                    {post.excerpt}
                  </p>

                  <span
                    className={cn(
                      "inline-flex items-center gap-2 text-sm font-medium",
                      getAccentText()
                    )}
                  >
                    Read article
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      {/* ================= MOBILE VIEW ALL ================= */}
      <div className="mt-10 flex justify-center sm:hidden">
        <Link
          href="/blog"
          className={cn(
            "inline-flex items-center gap-2 px-6 py-3 rounded-xl transition",
            isDark
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
              : "bg-emerald-600/10 text-emerald-700 border border-emerald-200 hover:bg-emerald-600/20"
          )}
        >
          View all blogs
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* ================= EDGE FADE ================= */}
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 w-32",
          isDark
            ? "bg-gradient-to-r from-black to-transparent"
            : "bg-gradient-to-r from-white to-transparent"
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 w-32",
          isDark
            ? "bg-gradient-to-l from-black to-transparent"
            : "bg-gradient-to-l from-white to-transparent"
        )}
      />
    </section>
  )
}
