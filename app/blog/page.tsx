"use client"

import { motion } from "framer-motion";
import Link from "next/link"
import { useState, useMemo, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import {
  Leaf,
  Clock,
  Calendar,
  User,
  ArrowRight,
  Tag,
  BookOpen,
  Sparkles,
  Search,
  Terminal,
  Code2,
  FileCode,
  Braces,
  ArrowLeft,
  Home,
} from "lucide-react";
import BlogFooter from "@/components/blog/BlogFooter";
import { blogPosts } from "@/types/blog";
import ThemeToggle from "@/components/shared/ThemeToggle";
import Footer from "@/components/layout/Footer";
import MiniTerminal from "@/components/blog/ui/InteractiveTerminal";

// Import Vanta.js type declarations
declare global {
  interface Window {
    VANTA: any;
  }
}

// Django Theme Colors - Light Mode
const DJANGO_COLORS_LIGHT = {
  primary: '#092E20',      // Dark Django Green
  primaryLight: '#0C3A28',
  primaryLighter: '#104532',
  secondary: '#44B78B',    // Django Green
  accent: '#F5DD5D',       // Django Yellow
  accentDark: '#D4B445',
  background: '#F8F9FA',
  card: '#FFFFFF',
  border: 'rgba(68, 183, 139, 0.2)',
  text: '#092E20',
  textMuted: 'rgba(9, 46, 32, 0.8)',
  textSubtle: 'rgba(9, 46, 32, 0.6)',
  destructive: '#EF4444',
  success: '#10B981',
  // Terminal/Coding Colors
  terminalBg: '#F1F5F9',
  terminalBorder: '#CBD5E1',
  terminalText: '#065F46',
  terminalMuted: '#64748B',
  terminalAccent: '#059669',
  terminalCaret: '#10B981',
  codeBg: '#F8FAFC',
  codeBorder: '#E2E8F0',
  codeText: '#065F46',
  codeComment: '#64748B',
  codeKeyword: '#DC2626',
  codeString: '#059669',
  codeNumber: '#D97706',
  codeFunction: '#7C3AED',
}

// Django Theme Colors - Dark Mode
const DJANGO_COLORS_DARK = {
  primary: '#44B78B',      // Django Green
  primaryLight: '#5AC9A2',
  primaryLighter: '#70DBB9',
  secondary: '#092E20',    // Dark Django Green
  accent: '#F5DD5D',       // Django Yellow
  accentDark: '#D4B445',
  background: '#0A0A0A',
  card: '#1A1A1A',
  border: 'rgba(68, 183, 139, 0.3)',
  text: '#F8F9FA',
  textMuted: 'rgba(248, 249, 250, 0.8)',
  textSubtle: 'rgba(248, 249, 250, 0.6)',
  destructive: '#EF4444',
  success: '#10B981',
  // Terminal/Coding Colors
  terminalBg: '#0F172A',
  terminalBorder: 'rgba(68, 183, 139, 0.3)',
  terminalText: '#34D399',
  terminalMuted: '#94A3B8',
  terminalAccent: '#10B981',
  terminalCaret: '#34D399',
  codeBg: '#0B0F14',
  codeBorder: 'rgba(68, 183, 139, 0.3)',
  codeText: '#34D399',
  codeComment: '#94A3B8',
  codeKeyword: '#F87171',
  codeString: '#34D399',
  codeNumber: '#FBBF24',
  codeFunction: '#A78BFA',
}

const categories = ["All", "Backend", "Performance", "Security", "Python", "Database"];

export default function BlogListPage() {
  const { theme, systemTheme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  // Determine current theme
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';
  const colors = isDark ? DJANGO_COLORS_DARK : DJANGO_COLORS_LIGHT;

  useEffect(() => {
    setMounted(true);

    // Load Vanta.js for both light and dark modes
    const loadVanta = () => {
      if (typeof window !== 'undefined' && !window.VANTA) {
        // Load Three.js first
        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
        threeScript.async = true;
        threeScript.onload = () => {
          // Load Vanta Clouds after Three.js
          const vantaScript = document.createElement('script');
          vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js';
          vantaScript.async = true;
          vantaScript.onload = initVanta;
          document.head.appendChild(vantaScript);
        };
        document.head.appendChild(threeScript);
      } else if (window.VANTA) {
        initVanta();
      }
    };

    const initVanta = () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }

      if (vantaRef.current && window.VANTA) {
        vantaEffect.current = window.VANTA.CLOUDS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          speed: isDark ? 1.50 : 1.00, // Slower speed for dark mode
          // Light mode colors (softer, lighter)
          skyColor: isDark ? 0x0a0a0a : 0x8cd9ff,
          cloudColor: isDark ? 0x44B78B : 0xffffff,
          cloudShadowColor: isDark ? 0x092E20 : 0xd1d1d1,
          sunColor: isDark ? 0xF5DD5D : 0xffdd00,
          sunGlareColor: isDark ? 0xF5DD5D : 0xffaa00,
          sunlightColor: isDark ? 0xF5DD5D : 0xffdd00,
        });
      }
    };

    if (mounted) {
      loadVanta();
    }

    // Cleanup function
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, [mounted, isDark]);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleBack = () => {
    router.back();
  };

  const handleHome = () => {
    router.push('/');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.background }}
      >
        <div className="text-center">
          <Leaf className="h-12 w-12 animate-spin mx-auto mb-4"
            style={{ color: colors.secondary }}
          />
          <p style={{ color: colors.textMuted }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden transition-colors duration-300"
      style={{
        backgroundColor: colors.background,
        color: colors.text
      }}
    >
      {/* Hero Section with Vanta Clouds Background */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        {/* Vanta Clouds Background for all modes */}
        <div
          ref={vantaRef}
          className="absolute inset-0"
          style={{
            zIndex: 0,
          }}
        />

    

        {/* Subtle Django pattern overlay */}
        <div className="absolute inset-0 z-2"
          style={{
            opacity: isDark ? 0.03 : 0.02,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, ${colors.secondary} 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 z-10">
          {/* Header with Back Button, Logo, and Theme Toggle */}
          <header className="flex justify-between items-center mb-8 lg:mb-12">
            {/* Left: Back Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm"
                style={{
                  color: colors.text,
                  backgroundColor: isDark
                    ? `rgba(9, 46, 32, 0.7)`
                    : `rgba(255, 255, 255, 0.9)`,
                  padding: '0.5rem 1rem',
                  borderRadius: '0.75rem',
                  border: `1px solid ${colors.border}`,
                  boxShadow: `0 4px 12px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`
                }}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back</span>
              </button>

              <button
                onClick={handleHome}
                className="flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm"
                style={{
                  color: colors.text,
                  backgroundColor: isDark
                    ? `rgba(9, 46, 32, 0.7)`
                    : `rgba(255, 255, 255, 0.9)`,
                  padding: '0.5rem 1rem',
                  borderRadius: '0.75rem',
                  border: `1px solid ${colors.border}`,
                  boxShadow: `0 4px 12px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`
                }}
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </button>
            </div>

            {/* Right: Theme Toggle */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <ThemeToggle />
              </div>
            </div>
          </header>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <MiniTerminal />
            </div>



            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent transition-all duration-300"
                style={{
                  backgroundImage: `linear-gradient(to right, ${isDark ? colors.terminalText : colors.text}, ${colors.secondary})`,
                  WebkitTextStroke: isDark ? '0.5px rgba(255,255,255,0.1)' : '0.5px rgba(0,0,0,0.1)',
                }}
              >
                Master Django
              </span>
              <br />
              <span style={{
                color: colors.textMuted,
                textShadow: isDark ? '0 2px 4px rgba(0,0,0,0.5)' : '0 2px 4px rgba(255,255,255,0.5)'
              }}>
                Build Better Apps
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-8 sm:mb-12 transition-colors duration-300"
              style={{
                color: colors.textMuted,
                textShadow: isDark ? '0 1px 2px rgba(0,0,0,0.3)' : '0 1px 2px rgba(255,255,255,0.3)'
              }}
            >
              Explore tutorials, best practices, and insights for building
              scalable web applications with Django and Python.
            </p>

            {/* Search in Terminal Style */}
            <div className="max-w-xl mx-auto">
              <div className="rounded-xl sm:rounded-2xl border overflow-hidden shadow-lg transition-all duration-300 backdrop-blur-sm"
                style={{
                  backgroundColor: isDark
                    ? `rgba(15, 23, 42, 0.85)`
                    : `rgba(255, 255, 255, 0.95)`,
                  borderColor: colors.terminalBorder,
                  boxShadow: `0 8px 32px ${isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(68, 183, 139, 0.15)'}`
                }}
              >
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b"
                  style={{
                    backgroundColor: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(241, 245, 249, 0.9)',
                    borderColor: colors.terminalBorder
                  }}
                >
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: '#EF4444' }}
                    />
                    <div className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: '#F59E0B' }}
                    />
                    <div className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: '#10B981' }}
                    />
                  </div>
                  <span className="text-xs font-mono ml-2"
                    style={{ color: colors.terminalMuted }}
                  >
                    search.py
                  </span>
                </div>

                {/* Search Input */}
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono"
                      style={{ color: colors.terminalText }}
                    >
                      $
                    </span>
                    <Search className="h-4 w-4"
                      style={{ color: colors.terminalMuted }}
                    />
                    <input
                      type="text"
                      placeholder="find articles --query=''"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none font-mono text-sm placeholder:font-mono"
                      style={{
                        color: colors.terminalText
                      }}
                    />
                    {searchQuery && (
                      <span className="text-xs font-mono px-2 py-1 rounded"
                        style={{
                          backgroundColor: `${colors.terminalAccent}20`,
                          color: colors.terminalText
                        }}
                      >
                        {filteredPosts.length} results
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rest of your code remains exactly the same */}
      {/* Category Filter */}
      <section className="py-6 sm:py-8 border-y transition-colors duration-300"
        style={{
          borderColor: `${colors.secondary}${isDark ? '10' : '05'}`,
          backgroundColor: `${colors.secondary}${isDark ? '05' : '02'}`
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-300"
                style={activeCategory === category ? {
                  backgroundColor: colors.secondary,
                  color: '#FFFFFF', // Always white for active state
                  boxShadow: `0 8px 32px ${colors.secondary}${isDark ? '30' : '40'}`
                } : {
                  backgroundColor: `${colors.secondary}${isDark ? '10' : '05'}`,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                  boxShadow: 'none'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Featured Post */}
          {filteredPosts.length > 0 && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 md:mb-16"
            >
              <Link href={`/blog/${filteredPosts[0].id}`}>
                <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-500 hover:shadow-2xl"
                  style={{
                    borderColor: colors.border,
                    backgroundColor: colors.card,
                    boxShadow: `0 8px 40px ${isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(9, 46, 32, 0.1)'}`
                  }}
                >
                  {/* Terminal-style decoration */}
                  <div className="absolute top-4 left-4 flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: '#EF4444' }}
                    />
                    <div className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: '#F59E0B' }}
                    />
                    <div className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: '#10B981' }}
                    />
                  </div>

                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="relative h-48 sm:h-64 lg:h-auto overflow-hidden">
                      <img
                        src={filteredPosts[0].coverImage}
                        alt={filteredPosts[0].title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 lg:hidden"
                        style={{
                          background: `linear-gradient(to right, ${colors.card}${isDark ? '80' : '60'}, transparent)`
                        }}
                      />

                      {/* Featured Badge */}
                      <div className="absolute top-12 sm:top-14 left-4">
                        <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors duration-300"
                          style={{
                            backgroundColor: colors.accent,
                            color: colors.secondary
                          }}
                        >
                          <Sparkles className="h-3 w-3" />
                          Featured
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8 lg:p-8 flex flex-col justify-center">
                      {/* Code-style tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {filteredPosts[0].tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-mono font-medium border transition-colors duration-300"
                            style={{
                              backgroundColor: colors.codeBg,
                              color: colors.codeText,
                              borderColor: colors.codeBorder
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 transition-colors duration-300 group-hover:text-primary"
                        style={{
                          color: colors.text,
                          WebkitTextFillColor: colors.text
                        }}
                      >
                        {filteredPosts[0].title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-sm sm:text-base mb-4 sm:mb-6 line-clamp-3 transition-colors duration-300"
                        style={{ color: colors.textMuted }}
                      >
                        {filteredPosts[0].excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm mb-4 sm:mb-6 transition-colors duration-300"
                        style={{ color: colors.textSubtle }}
                      >
                        <div className="flex items-center gap-2">
                          <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color: colors.secondary }} />
                          <span>{filteredPosts[0].author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color: colors.secondary }} />
                          <span>{filteredPosts[0].date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color: colors.secondary }} />
                          <span>{filteredPosts[0].readTime} min read</span>
                        </div>
                      </div>

                      {/* CTA with code-style */}
                      <div className="flex items-center gap-2 font-mono font-medium group-hover:gap-4 transition-all duration-300"
                        style={{ color: colors.terminalText }}
                      >
                        <span className="text-sm">$ python manage.py read post</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          )}

          {/* Grid Posts */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
  {filteredPosts.slice(1).map((post, index) => (
    <motion.article
      key={post.id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group"
    >
      <Link href={`/blog/${post.id}`}>
        <div
          className="
            relative h-full flex flex-col overflow-hidden
            rounded-xl sm:rounded-2xl
            border backdrop-blur-xl
            transition-all duration-500
            group-hover:-translate-y-1
            group-hover:shadow-[0_0_40px_rgba(34,197,94,0.25)]
          "
          style={{
            background: isDark
              ? "linear-gradient(180deg, rgba(15,23,42,0.75), rgba(2,6,23,0.9))"
              : "linear-gradient(180deg, rgba(236,253,245,0.9), rgba(240,253,244,0.95))",
            borderColor: "rgba(34,197,94,0.25)",
          }}
        >
          {/* Glass overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-transparent" />

          {/* Terminal dots */}
          <div className="absolute top-4 left-4 flex gap-1.5 z-10">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            <span className="h-2 w-2 rounded-full bg-yellow-400" />
            <span className="h-2 w-2 rounded-full bg-green-500" />
          </div>

          {/* Image */}
          <div className="relative h-44 sm:h-48 mt-8 overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Category */}
            <span
              className="absolute top-4 right-4 px-2.5 py-1 text-xs font-mono rounded-full"
              style={{
                backgroundColor: "rgba(34,197,94,0.15)",
                color: "#4ADE80",
              }}
            >
              {post.category}
            </span>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6 flex flex-col flex-1 relative z-10">
            {/* Tags */}
            <div className="flex gap-1.5 mb-3 flex-wrap">
              {post.tags.slice(0, 2).map(tag => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs font-mono rounded"
                  style={{
                    backgroundColor: "rgba(34,197,94,0.15)",
                    color: "#86EFAC",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Title with animated underline */}
            <h3
              className="
                relative inline-block text-lg sm:text-xl font-semibold
                mb-2 line-clamp-2
                after:absolute after:left-0 after:-bottom-1
                after:h-[2px] after:w-full
                after:origin-left after:scale-x-0
                after:bg-emerald-400
                after:transition-transform after:duration-500
                group-hover:after:scale-x-100
              "
              style={{ color: colors.text }}
            >
              {post.title}
            </h3>

            {/* Excerpt */}
            <p
              className="text-sm mb-4 line-clamp-2 flex-1"
              style={{ color: colors.textMuted }}
            >
              {post.excerpt}
            </p>

            {/* Meta */}
            <div
              className="flex items-center justify-between text-xs pt-4 border-t"
              style={{
                borderColor: "rgba(34,197,94,0.15)",
                color: colors.textSubtle,
              }}
            >
              <div className="flex gap-3 font-mono">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-emerald-400" />
                  {post.readTime}m
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-emerald-400" />
                  {post.date}
                </span>
              </div>

              <div className="flex items-center gap-1 font-mono text-emerald-400 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                read
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  ))}
</div>


          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16 sm:py-20">
              <Terminal className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 transition-colors duration-300"
                style={{ color: `${colors.terminalText}30` }}
              />
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 transition-colors duration-300"
                style={{ color: colors.terminalText }}
              >
                No articles found
              </h3>
              <p className="font-mono text-sm transition-colors duration-300"
                style={{ color: colors.terminalMuted }}
              >
                $ python manage.py find_posts --query="{searchQuery}"
              </p>
              <p className="mt-2 transition-colors duration-300"
                style={{ color: colors.textMuted }}
              >
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>

      <BlogFooter />
    </div>
  );
}