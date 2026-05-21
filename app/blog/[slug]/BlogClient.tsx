"use client"

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import {
    ArrowLeft,
    Calendar,
    Clock,
    User,
    FileText,
    BookOpen,
    Bookmark,
    Share2,
    Printer,
    Heart,
    Eye,
    Copy,
    Check,
    Sparkles,
    Zap,
    Brain,
    Server,
    Database,
    Cpu,
    ShieldCheck,
    GitMerge,
    Tag,
    Layers,
    ExternalLink,
    Minimize2,
    ChevronRight,
    Leaf,
    FlaskConical,
    Award,
    Terminal,
    Home,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { toast, Toaster } from "sonner";
import { cn } from "@/utils/utils";
import BackToTop from "@/components/shared/BackToTop";
import { BlogContentBlock, getBlogPost, getRelatedPosts } from "@/types/blog";
import { useActiveSection } from "@/hooks/useActiveSection";
import CodeBlock from "@/components/blog/CodeBlock";
import Callout from "@/components/blog/Callout";
import Divider from "@/components/blog/Divider";
import ListBlock from "@/components/blog/ListBlock";
import TableBlock from "@/components/blog/TableBlock";
import TableOfContents from "@/components/blog/TableOfContents";
import AuthorCard from "@/components/blog/AuthorCard";
import RelatedPosts from "@/components/blog/RelatedPosts";
import BlogShareModal from "@/components/blog/BlogShareModal";
import BlogFooter from "@/components/blog/BlogFooter";
import ThemeToggle from "@/components/shared/ThemeToggle";

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
}

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

function AnimatedLeaf({ index }: { index: number }) {
    const [mounted, setMounted] = useState(false)
    const { theme, systemTheme } = useTheme();

    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = currentTheme === 'dark';
    const colors = isDark ? DJANGO_COLORS_DARK : DJANGO_COLORS_LIGHT;

    const basePosition = useMemo(() => {
        return {
            left: (index * 19) % 100,
            top: (index * 31) % 100,
        }
    }, [index])

    const motionValues = useMemo(() => {
        return {
            x: Math.random() * 80 - 40,
            y: Math.random() * 80 - 40,
            rotate: 360,
            duration: 12 + Math.random() * 8,
        }
    }, [])

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div
                className="absolute"
                style={{
                    left: `${basePosition.left}%`,
                    top: `${basePosition.top}%`,
                }}
            >
                <Leaf className="h-6 w-6 text-gray-300" />
            </div>
        )
    }

    return (
        <motion.div
            className="absolute"
            style={{
                left: `${basePosition.left}%`,
                top: `${basePosition.top}%`,
                color: `${colors.secondary}30`,
            }}
            animate={{
                x: [0, motionValues.x],
                y: [0, motionValues.y],
                rotate: [0, motionValues.rotate],
            }}
            transition={{
                duration: motionValues.duration,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "linear",
            }}
        >
            <Leaf className="h-6 w-6" />
        </motion.div>
    )
}

// Floating Navigation Component
function FloatingNav() {
    const router = useRouter();
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 100);
            setShowBackToTop(scrollY > 500);
            if (scrollY > 100 && scrollY < window.innerHeight) {
                setIsVisible(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!mounted) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = currentTheme === 'dark';
    const colors = isDark ? DJANGO_COLORS_DARK : DJANGO_COLORS_LIGHT;

    const handleBack = () => {
        router.back();
    };

    const handleHome = () => {
        router.push('/');
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: isVisible ? 0 : -100,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="fixed top-6 left-6 right-6 z-50 transition-all duration-300"
                style={{
                    backdropFilter: isScrolled ? 'blur(20px)' : 'none',
                    backgroundColor: isScrolled ? `${colors.card}CC` : 'transparent',
                    border: isScrolled ? `1px solid ${colors.border}` : 'none',
                    boxShadow: isScrolled ? `0 20px 60px ${isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(9, 46, 32, 0.1)'}` : 'none',
                    borderRadius: isScrolled ? '1rem' : '0',
                }}
            >
                <div className="p-4">
                    <div className="flex items-center justify-between">
                        {/* Left: Navigation Buttons */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleBack}
                                className="flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95"
                                style={{
                                    color: colors.text,
                                    backgroundColor: `${colors.secondary}${isDark ? '10' : '05'}`,
                                    padding: '0.5rem 1rem',
                                    borderRadius: '0.75rem',
                                    border: `1px solid ${colors.border}`
                                }}
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span className="hidden sm:inline">Back</span>
                            </button>

                            <button
                                onClick={handleHome}
                                className="flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95"
                                style={{
                                    color: colors.text,
                                    backgroundColor: `${colors.secondary}${isDark ? '10' : '05'}`,
                                    padding: '0.5rem 1rem',
                                    borderRadius: '0.75rem',
                                    border: `1px solid ${colors.border}`
                                }}
                            >
                                <Home className="h-4 w-4" />
                                <span className="hidden sm:inline">Home</span>
                            </button>
                        </div>

                        {/* Right: Theme Toggle */}
                        <div className="flex items-center gap-3">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </motion.nav>

            <AnimatePresence>{showBackToTop && <BackToTop />}</AnimatePresence>
        </>
    );
}

// Article Stats Component
function ArticleStats({
    readingTime,
    wordCount,
    difficulty,
    updatedAt,
    date,
    views,
}: {
    readingTime: number;
    wordCount: number;
    difficulty?: string;
    updatedAt?: string;
    date: string;
    views: number;
}) {
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = currentTheme === 'dark';
    const colors = isDark ? DJANGO_COLORS_DARK : DJANGO_COLORS_LIGHT;

    return (
        <div className="rounded-2xl border p-6 transition-colors duration-300"
            style={{
                background: `linear-gradient(135deg, ${colors.secondary}08, ${colors.primary}05)`,
                borderColor: colors.border
            }}
        >
            <h4 className="font-semibold mb-4 flex items-center gap-2"
                style={{ color: colors.text }}
            >
                <Brain className="h-5 w-5" />
                Article Stats
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                    <span className="text-xs"
                        style={{ color: colors.textMuted }}
                    >
                        Read time
                    </span>
                    <div className="font-semibold flex items-center gap-1"
                        style={{ color: colors.text }}
                    >
                        <Clock className="h-3.5 w-3.5" />
                        {readingTime} min
                    </div>
                </div>
                <div className="space-y-1">
                    <span className="text-xs"
                        style={{ color: colors.textMuted }}
                    >
                        Word count
                    </span>
                    <div className="font-semibold flex items-center gap-1"
                        style={{ color: colors.text }}
                    >
                        <FileText className="h-3.5 w-3.5" />
                        {wordCount.toLocaleString()}
                    </div>
                </div>
                <div className="space-y-1">
                    <span className="text-xs"
                        style={{ color: colors.textMuted }}
                    >
                        Complexity
                    </span>
                    <div className="font-semibold flex items-center gap-1"
                        style={{ color: colors.secondary }}
                    >
                        <Award className="h-3.5 w-3.5" />
                        {difficulty || "Intermediate"}
                    </div>
                </div>
                <div className="space-y-1">
                    <span className="text-xs"
                        style={{ color: colors.textMuted }}
                    >
                        Updated
                    </span>
                    <div className="font-semibold flex items-center gap-1"
                        style={{ color: colors.text }}
                    >
                        <Calendar className="h-3.5 w-3.5" />
                        {updatedAt || date}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Django Tech Stack Component
function DjangoTechStack() {
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = currentTheme === 'dark';
    const colors = isDark ? DJANGO_COLORS_DARK : DJANGO_COLORS_LIGHT;

    const techs = [
        { icon: FlaskConical, label: "Django", color: colors.text },
        { icon: Database, label: "PostgreSQL", color: colors.text },
        { icon: ShieldCheck, label: "DRF", color: colors.accent },
        { icon: Cpu, label: "Python", color: colors.secondary },
        { icon: GitMerge, label: "Git", color: colors.textMuted },
        { icon: Server, label: "Celery", color: colors.secondary },
    ];

    return (
        <div className="rounded-2xl border p-6 transition-colors duration-300"
            style={{
                background: `linear-gradient(135deg, ${colors.secondary}05, transparent)`,
                borderColor: colors.border
            }}
        >
            <h4 className="font-semibold mb-4 flex items-center gap-2"
                style={{ color: colors.text }}
            >
                <Terminal className="h-5 w-5" />
                Django Stack
            </h4>
            <div className="flex flex-wrap gap-2">
                {techs.map((tech, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors group"
                        style={{
                            backgroundColor: `${colors.card}80`,
                            borderColor: `${colors.secondary}10`
                        }}
                    >
                        <tech.icon
                            className="h-3.5 w-3.5 group-hover:scale-110 transition-transform"
                            style={{ color: tech.color }}
                        />
                        <span className="text-xs font-medium"
                            style={{ color: colors.text }}
                        >
                            {tech.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function BlogPostPage() {
    const params = useParams<{ slug?: string }>();
    const { theme, systemTheme } = useTheme();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    // ✅ params-safe + slug-safe
    const slug = params?.slug ?? "";
    const blog = slug ? getBlogPost(slug) : null;

    const heroRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // State - ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
    const [readingMode, setReadingMode] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [likes, setLikes] = useState(blog?.likes || 42);
    const [views] = useState(blog?.views || 1250);
    const [hasLiked, setHasLiked] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [readingTime, setReadingTime] = useState(blog?.readTime || 5);
    const [showTocMobile, setShowTocMobile] = useState(false);
    const [scrollYProgress, setScrollYProgress] = useState(0);
    const [refsReady, setRefsReady] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Set refs ready after a small delay to ensure hydration
        const timer = setTimeout(() => {
            setRefsReady(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // Setup scroll progress manually to avoid useScroll hydration issues
    useEffect(() => {
        const handleScroll = () => {
            if (!heroRef.current) return;

            const heroHeight = heroRef.current.clientHeight;
            const scrollTop = window.scrollY;
            const progress = Math.min(scrollTop / heroHeight, 1);
            setScrollYProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial calculation
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Table of Contents
    const toc = useMemo(() => {
        if (!blog) return [];
        const sections: Array<{ id: string; title: string; level: number }> = [];
        blog.content.forEach((block, i) => {
            if (block.type === "heading") {
                sections.push({
                    id: `section-${i}`,
                    title: block.value,
                    level: block.level || 2,
                });
            }
        });
        return sections;
    }, [blog]);

    // Only call useActiveSection when refs are ready and we have content
    const activeId = useActiveSection(refsReady ? toc.map((t) => t.id) : []);

    // Word count
    const wordCount = useMemo(
        () =>
            blog?.content
                .filter((b) => b.type === "text" || b.type === "heading")
                .reduce((a, b) => a + (b.value || "").split(" ").length, 0) || 0,
        [blog]
    );

    // Estimated reading time
    useEffect(() => {
        const wordsPerMinute = 200;
        const estimated = Math.ceil(wordCount / wordsPerMinute);
        setReadingTime(estimated);
    }, [wordCount]);

    // Related posts
    const relatedPosts = useMemo(
        () => (blog ? getRelatedPosts(blog, 4) : []),
        [blog]
    );

    // Show loading screen if not mounted yet
    if (!mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <Leaf className="h-12 w-12 animate-spin mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 dark:text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = currentTheme === 'dark';
    const colors = isDark ? DJANGO_COLORS_DARK : DJANGO_COLORS_LIGHT;

    // Hero parallax effects
    const bgY = `${scrollYProgress * 20}%`;
    const bgScale = 1 + (scrollYProgress * 0.1);

    // Handlers
    const handleLike = () => {
        if (!hasLiked) {
            setLikes((prev) => prev + 1);
            setHasLiked(true);
            toast.success("Thanks for your support!", {
                style: {
                    background: colors.secondary,
                    color: 'white',
                }
            });
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        toast.success("Link copied to clipboard!", {
            style: {
                background: colors.secondary,
                color: 'white',
            }
        });
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = () => {
        if (navigator.share && blog) {
            navigator.share({
                title: blog.title,
                text: blog.excerpt,
                url: window.location.href,
            });
        } else {
            setShowShareModal(true);
        }
    };

    // Render content blocks
    const renderContentBlock = (block: BlogContentBlock, index: number) => {
        switch (block.type) {
            case "image":
                return (
                    <motion.figure
                        key={index}
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="my-10 sm:my-20 group cursor-zoom-in"
                        onClick={() => window.open(block.value, "_blank")}
                    >
                        <div className="relative rounded-2xl overflow-hidden border transition-colors duration-300"
                            style={{
                                boxShadow: `0 20px 60px ${isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(9, 46, 32, 0.1)'}`,
                                borderColor: colors.border
                            }}
                        >
                            <img
                                src={block.value}
                                alt={block.alt || "Blog image"}
                                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: `linear-gradient(to top, ${colors.secondary}20, transparent, transparent)`
                                }}
                            />
                            {block.caption && (
                                <figcaption className="absolute bottom-0 left-0 right-0 p-6 text-white/90 text-sm"
                                    style={{
                                        background: `linear-gradient(to top, ${colors.secondary}80, transparent)`
                                    }}
                                >
                                    {block.caption}
                                </figcaption>
                            )}
                            <div className="absolute top-4 right-4 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{
                                    backgroundColor: `${colors.primary}80`
                                }}
                            >
                                <ExternalLink className="h-4 w-4 text-white" />
                            </div>
                        </div>
                    </motion.figure>
                );

            case "code":
                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease }}
                        viewport={{ once: true }}
                        className="my-8 sm:my-12"
                    >
                        <CodeBlock
                            code={block.value}
                            language={block.language || "python"}
                            filename={block.filename}
                            onCopy={() => {
                                navigator.clipboard.writeText(block.value);
                                toast.success("Code copied!", {
                                    style: {
                                        background: colors.secondary,
                                        color: 'white',
                                    }
                                });
                            }}
                        />
                    </motion.div>
                );

            case "heading":
                return (
                    <motion.h2
                        key={index}
                        id={`section-${index}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease }}
                        viewport={{ once: true }}
                        className="font-bold tracking-tight mt-12 sm:mt-20 mb-6 sm:mb-8 scroll-mt-32 group transition-colors duration-300"
                        style={{
                            fontSize: block.level === 2 ? '1.875rem' :
                                block.level === 3 ? '1.5rem' :
                                    block.level === 4 ? '1.25rem' : '1.875rem'
                        }}
                    >
                        <span className="relative">
                            <span className="bg-clip-text text-transparent"
                                style={{
                                    backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`
                                }}
                            >
                                {block.value}
                            </span>
                            <span className="absolute -bottom-2 left-0 w-0 group-hover:w-full h-0.5 transition-all duration-500"
                                style={{
                                    background: `linear-gradient(to right, ${colors.secondary}, ${colors.accent})`
                                }}
                            />
                        </span>
                    </motion.h2>
                );

            case "quote":
                return (
                    <motion.blockquote
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease }}
                        viewport={{ once: true }}
                        className="my-8 sm:my-12 pl-4 sm:pl-8 border-l-4 italic text-lg sm:text-xl p-4 sm:p-6 rounded-r-2xl transition-colors duration-300"
                        style={{
                            borderColor: `${colors.secondary}50`,
                            background: `linear-gradient(to right, ${colors.secondary}05, transparent)`
                        }}
                    >
                        <Sparkles className="inline h-5 w-5 mr-2"
                            style={{ color: colors.accent }}
                        />
                        <span style={{ color: colors.text }}>{block.value}</span>
                    </motion.blockquote>
                );

            case "callout":
                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease }}
                        viewport={{ once: true }}
                        className="my-6"
                    >
                        <Callout variant={block.variant}>{block.value}</Callout>
                    </motion.div>
                );

            case "divider":
                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.6, ease }}
                        viewport={{ once: true }}
                        className="my-8"
                    >
                        <Divider label={block.value} />
                    </motion.div>
                );

            case "list":
                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease }}
                        viewport={{ once: true }}
                        className="my-6"
                    >
                        <ListBlock title={block.value} items={block.items || []} />
                    </motion.div>
                );

            case "table":
                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease }}
                        viewport={{ once: true }}
                        className="my-8"
                    >
                        <TableBlock
                            title={block.value}
                            headers={block.headers || []}
                            rows={block.rows || []}
                            striped={true}
                            sortable={true}
                            searchable={true}
                            highlightImportant={[1, 2]}
                        />
                    </motion.div>
                );

            default:
                return (
                    <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease, delay: index * 0.02 }}
                        viewport={{ once: true }}
                        className="text-lg leading-relaxed mb-8 transition-colors duration-300"
                        style={{ color: colors.textMuted }}
                    >
                        {block.value}
                    </motion.p>
                );
        }
    };

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center transition-colors duration-300"
                style={{ backgroundColor: colors.background }}
            >
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4"
                        style={{
                            backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        Post Not Found
                    </h1>
                    <p className="mb-8 transition-colors duration-300"
                        style={{ color: colors.textMuted }}
                    >
                        The blog post you're looking for doesn't exist.
                    </p>
                    <button
                        onClick={() => router.push("/")}
                        className="px-6 py-3 rounded-xl transition-colors duration-300 hover:scale-105 active:scale-95"
                        style={{
                            backgroundColor: colors.secondary,
                            color: 'white'
                        }}
                    >
                        Back to Blog
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Toaster position="top-right" richColors closeButton />

            <FloatingNav />

            <main
                className="relative overflow-x-hidden transition-colors duration-300"
                style={{
                    backgroundColor: colors.background,
                    color: colors.text
                }}
            >
                {/* Banner Image Section */}
                <section
                    ref={heroRef}
                    className="relative h-[40vh] sm:h-[50vh] min-h-[300px] sm:min-h-[500px] max-h-[600px] overflow-hidden"
                >
                    {/* Banner Image with Parallax */}
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            transform: `translateY(${bgY}) scale(${bgScale})`,
                        }}
                    >
                        <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 transition-colors duration-300"
                            style={{
                                background: `linear-gradient(to bottom, transparent, ${colors.background})`
                            }}
                        />
                    </motion.div>

                    {/* Animated background effects */}
                    <div className="absolute inset-0 transition-colors duration-300"
                        style={{
                            background: `linear-gradient(135deg, ${colors.secondary}${isDark ? '05' : '10'}, transparent, transparent)`
                        }}
                    />

                    {/* Django pattern overlay */}
                    <div className="absolute inset-0 opacity-5 transition-colors duration-300">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `radial-gradient(circle at 1px 1px, ${colors.secondary} 1px, transparent 0)`,
                                backgroundSize: "40px 40px",
                            }}
                        />
                    </div>

                    {/* Floating leaves */}
                    <div className="absolute inset-0">
                        {[...Array(8)].map((_, i) => (
                            <AnimatedLeaf key={i} index={i} />
                        ))}
                    </div>

                    {/* Scroll indicator */}
                    <div
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="flex flex-col items-center gap-2"
                        >
                            <div className="w-[2px] h-16 transition-colors duration-300"
                                style={{
                                    background: `linear-gradient(to bottom, ${colors.secondary}, ${colors.secondary}80, transparent)`
                                }}
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="relative -mt-20 z-10">
                    <div className="max-w-4xl mx-auto px-6">
                        {/* Article Header Container */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease }}
                            className="relative"
                        >
                            {/* Content Card */}
                            <div className="rounded-2xl border p-5 sm:p-8 mb-8 sm:mb-12 transition-colors duration-300"
                                style={{
                                    backgroundColor: colors.card,
                                    borderColor: colors.border,
                                    boxShadow: `0 20px 60px ${isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(9, 46, 32, 0.1)'}`
                                }}
                            >
                                {/* Tags */}
                                <div className="mb-6 flex flex-wrap gap-3">
                                    {blog.tags?.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-4 py-1.5 rounded-full text-sm font-medium border transition-colors duration-300 group hover:scale-105"
                                            style={{
                                                backgroundColor: `${colors.secondary}10`,
                                                color: colors.text,
                                                borderColor: `${colors.secondary}20`
                                            }}
                                        >
                                            <Tag className="inline h-3 w-3 mr-1.5 group-hover:rotate-12 transition-transform" />
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Title */}
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight break-words">
                                    <span className="bg-clip-text text-transparent transition-all duration-300"
                                        style={{
                                            backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`
                                        }}
                                    >
                                        {blog.title}
                                    </span>
                                </h1>

                                {/* Excerpt */}
                                <p className="text-lg sm:text-xl mb-6 sm:mb-8 leading-relaxed transition-colors duration-300"
                                    style={{ color: colors.textMuted }}
                                >
                                    {blog.excerpt}
                                </p>

                                {/* Meta Information */}
                                <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 sm:gap-6 text-xs sm:text-sm transition-colors duration-300 pt-4 sm:pt-6 border-t"
                                    style={{ borderColor: colors.border }}
                                >
                                    <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                                        <div className="flex items-center gap-2"
                                            style={{ color: colors.text }}
                                        >
                                            <div className="p-2 rounded-full transition-colors duration-300"
                                                style={{ backgroundColor: `${colors.secondary}10` }}
                                            >
                                                <User className="h-4 w-4" />
                                            </div>
                                            <span className="font-semibold">{blog.author}</span>
                                        </div>
                                        <div className="flex items-center gap-2"
                                            style={{ color: colors.textMuted }}
                                        >
                                            <div className="p-2 rounded-full transition-colors duration-300"
                                                style={{ backgroundColor: `${colors.secondary}10` }}
                                            >
                                                <Calendar className="h-4 w-4" />
                                            </div>
                                            <span>{blog.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2"
                                            style={{ color: colors.secondary }}
                                        >
                                            <div className="p-2 rounded-full transition-colors duration-300"
                                                style={{ backgroundColor: `${colors.secondary}10` }}
                                            >
                                                <Clock className="h-4 w-4" />
                                            </div>
                                            <span>{readingTime} min read</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3 sm:gap-6 sm:ml-auto mt-2 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-none pt-4 sm:pt-0"
                                        style={{ borderColor: colors.border }}
                                    >
                                        <button
                                            onClick={handleLike}
                                            className="flex items-center gap-2 transition-all group"
                                            style={{
                                                color: hasLiked ? colors.destructive : colors.textMuted
                                            }}
                                        >
                                            <div className="p-2 rounded-full transition-all duration-300"
                                                style={{
                                                    backgroundColor: hasLiked ? `${colors.destructive}10` : `${colors.secondary}05`
                                                }}
                                            >
                                                <Heart
                                                    className="h-4 w-4 transition-all"
                                                    style={hasLiked ? { fill: colors.destructive } : {}}
                                                />
                                            </div>
                                            <span className="font-medium">{likes}</span>
                                        </button>

                                        <div className="flex items-center gap-2"
                                            style={{ color: colors.textMuted }}
                                        >
                                            <div className="p-2 rounded-full transition-colors duration-300"
                                                style={{ backgroundColor: `${colors.secondary}05` }}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </div>
                                            <span className="font-medium">{views.toLocaleString()}</span>
                                        </div>

                                        <div className="flex items-center gap-2"
                                            style={{ color: colors.textMuted }}
                                        >
                                            <div className="p-2 rounded-full transition-colors duration-300"
                                                style={{ backgroundColor: `${colors.secondary}05` }}
                                            >
                                                <FileText className="h-4 w-4" />
                                            </div>
                                            <span className="font-medium">
                                                {wordCount.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Body Section */}
                <section className="relative">
                    {/* Floating TOC for Mobile */}
                    <AnimatePresence>
                        {showTocMobile && !readingMode && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="fixed bottom-6 left-6 right-6 z-40 lg:hidden"
                            >
                                <div className="rounded-2xl border p-4 transition-colors duration-300"
                                    style={{
                                        backgroundColor: colors.card,
                                        borderColor: colors.border,
                                        boxShadow: `0 20px 60px ${isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(9, 46, 32, 0.2)'}`
                                    }}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-semibold flex items-center gap-2"
                                            style={{ color: colors.text }}
                                        >
                                            <Layers className="h-4 w-4" />
                                            Contents
                                        </h4>
                                        <button
                                            onClick={() => setShowTocMobile(false)}
                                            className="p-1 rounded-lg transition-colors duration-300 hover:scale-110"
                                            style={{
                                                backgroundColor: `${colors.secondary}05`
                                            }}
                                        >
                                            <Minimize2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div className="max-h-60 overflow-y-auto">
                                        {toc.slice(0, 5).map((item) => (
                                            <a
                                                key={item.id}
                                                href={`#${item.id}`}
                                                className="block py-2 px-3 rounded-lg text-sm transition-colors duration-300 hover:scale-105"
                                                style={activeId === item.id ? {
                                                    backgroundColor: `${colors.secondary}10`,
                                                    color: colors.text,
                                                    fontWeight: 500
                                                } : {
                                                    color: colors.textMuted,
                                                    backgroundColor: `${colors.secondary}05`
                                                }}
                                                onClick={() => setShowTocMobile(false)}
                                            >
                                                {item.title}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div
                        className={cn(
                            "mx-auto px-4 sm:px-6 py-8 sm:py-12 transition-all duration-300",
                            readingMode ? "max-w-4xl" : "max-w-7xl"
                        )}
                    >
                        <div
                            className={cn(
                                "grid gap-20",
                                readingMode ? "grid-cols-1" : "lg:grid-cols-[1fr_400px]"
                            )}
                        >
                            {/* Article Content */}
                            <article ref={contentRef} className="max-w-none">
                                {/* Mobile TOC Toggle */}
                                <button
                                    onClick={() => setShowTocMobile(true)}
                                    className="lg:hidden mb-8 w-full py-3 px-4 rounded-xl border transition-colors duration-300 hover:scale-105 flex items-center justify-center gap-2"
                                    style={{
                                        borderColor: colors.border,
                                        backgroundColor: `${colors.secondary}05`,
                                        color: colors.text
                                    }}
                                >
                                    <Layers className="h-4 w-4" />
                                    Show Table of Contents
                                    <ChevronRight className="h-4 w-4 ml-auto" />
                                </button>

                                {blog.content.map((block, index) =>
                                    renderContentBlock(block, index)
                                )}

                                {/* Article Tags */}
                                {blog.tags && blog.tags.length > 0 && (
                                    <div className="mt-12 pt-8 transition-colors duration-300"
                                        style={{
                                            borderTop: `1px solid ${colors.border}`
                                        }}
                                    >
                                        <h4 className="font-semibold mb-4 flex items-center gap-2"
                                            style={{ color: colors.text }}
                                        >
                                            <Tag className="h-5 w-5" />
                                            Tags
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {blog.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1.5 rounded-lg text-sm border transition-colors duration-300 cursor-pointer hover:scale-105"
                                                    style={{
                                                        backgroundColor: `${colors.secondary}10`,
                                                        color: colors.text,
                                                        borderColor: `${colors.secondary}20`
                                                    }}
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Article Actions */}
                                <div className="mt-20 pt-8 transition-colors duration-300"
                                    style={{
                                        borderTop: `1px solid ${colors.border}`
                                    }}
                                >
                                    <div className="flex flex-col xl:flex-row flex-wrap items-center justify-between gap-4 sm:gap-6">
                                        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-4 w-full xl:w-auto">
                                            <button
                                                onClick={handleLike}
                                                className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-xl flex items-center gap-2 transition-all border duration-300 hover:scale-105 flex-1 sm:flex-none justify-center"
                                                style={hasLiked ? {
                                                    backgroundColor: `${colors.destructive}10`,
                                                    color: colors.destructive,
                                                    borderColor: `${colors.destructive}20`
                                                } : {
                                                    backgroundColor: `${colors.secondary}10`,
                                                    color: colors.text,
                                                    borderColor: colors.border
                                                }}
                                            >
                                                <Heart
                                                    className="h-5 w-5"
                                                    style={hasLiked ? { fill: colors.destructive } : {}}
                                                />
                                                {hasLiked ? "Liked" : "Like"} ({likes})
                                            </button>

                                            <button
                                                onClick={handleShare}
                                                className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-xl border flex items-center gap-2 transition-colors duration-300 hover:scale-105 flex-1 sm:flex-none justify-center"
                                                style={{
                                                    backgroundColor: `${colors.secondary}10`,
                                                    color: colors.text,
                                                    borderColor: colors.border
                                                }}
                                            >
                                                <Share2 className="h-5 w-5" />
                                                Share
                                            </button>

                                            <button
                                                onClick={handleCopyLink}
                                                className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-xl flex items-center gap-2 transition-colors border duration-300 hover:scale-105 flex-1 sm:flex-none justify-center"
                                                style={copied ? {
                                                    backgroundColor: `${colors.success}10`,
                                                    color: colors.success,
                                                    borderColor: `${colors.success}20`
                                                } : {
                                                    backgroundColor: `${colors.secondary}10`,
                                                    color: colors.text,
                                                    borderColor: colors.border
                                                }}
                                            >
                                                {copied ? (
                                                    <>
                                                        <Check className="h-5 w-5" />
                                                        Copied
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="h-5 w-5" />
                                                        Copy Link
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-center gap-2 sm:gap-4 w-full xl:w-auto">
                                            <button
                                                onClick={() => window.print()}
                                                className="p-2 sm:p-3 rounded-xl border transition-colors duration-300 hover:scale-110"
                                                style={{
                                                    backgroundColor: `${colors.secondary}10`,
                                                    color: colors.text,
                                                    borderColor: colors.border
                                                }}
                                                title="Print article"
                                            >
                                                <Printer className="h-5 w-5" />
                                            </button>

                                            <button
                                                onClick={() => setIsBookmarked(!isBookmarked)}
                                                className="p-2 sm:p-3 rounded-xl transition-colors border duration-300 hover:scale-110"
                                                style={isBookmarked ? {
                                                    backgroundColor: `${colors.secondary}20`,
                                                    color: colors.text,
                                                    borderColor: `${colors.secondary}30`
                                                } : {
                                                    backgroundColor: `${colors.secondary}10`,
                                                    color: colors.text,
                                                    borderColor: colors.border
                                                }}
                                                title={
                                                    isBookmarked ? "Remove bookmark" : "Bookmark article"
                                                }
                                            >
                                                <Bookmark
                                                    className="h-5 w-5"
                                                    style={isBookmarked ? { fill: colors.text } : {}}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            {/* Sidebar - Only render when refs are ready */}
                            {!readingMode && refsReady && (
                                <aside className="hidden lg:block">
                                    <div className="sticky top-28 space-y-8">
                                        {/* Reading Mode Toggle */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="rounded-2xl border p-6 transition-colors duration-300"
                                            style={{
                                                background: `linear-gradient(135deg, ${colors.secondary}08, ${colors.primary}05)`,
                                                borderColor: colors.border
                                            }}
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="font-semibold flex items-center gap-2"
                                                    style={{ color: colors.text }}
                                                >
                                                    <Zap className="h-5 w-5" />
                                                    Reading Tools
                                                </h3>
                                                <button
                                                    onClick={() => setReadingMode(!readingMode)}
                                                    className="text-xs px-3 py-1.5 rounded-full transition-colors duration-300 flex items-center gap-2 hover:scale-105"
                                                    style={{
                                                        backgroundColor: colors.secondary,
                                                        color: 'white'
                                                    }}
                                                >
                                                    <BookOpen className="h-3.5 w-3.5" />
                                                    {readingMode ? "Exit Focus" : "Focus Mode"}
                                                </button>
                                            </div>
                                            <p className="text-sm transition-colors duration-300"
                                                style={{ color: colors.textMuted }}
                                            >
                                                Toggle focus mode for distraction-free reading experience
                                            </p>
                                        </motion.div>

                                        {/* Table of Contents - Only render when we have content */}
                                        {toc.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <TableOfContents
                                                    items={toc}
                                                    activeId={activeId}
                                                    onToggleReadingMode={() => setReadingMode(!readingMode)}
                                                    readingMode={readingMode}
                                                />
                                            </motion.div>
                                        )}

                                        {/* Author Card */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <AuthorCard author={blog.author} />
                                        </motion.div>

                                        {/* Article Stats */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            <ArticleStats
                                                readingTime={readingTime}
                                                wordCount={wordCount}
                                                difficulty={blog.difficulty}
                                                updatedAt={blog.updatedAt}
                                                date={blog.date}
                                                views={views}
                                            />
                                        </motion.div>

                                        {/* Django Tech Stack */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <DjangoTechStack />
                                        </motion.div>
                                    </div>
                                </aside>
                            )}
                        </div>
                    </div>
                </section>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <RelatedPosts posts={relatedPosts} currentPostId={blog.id} />
                )}

                {/* Share Modal */}
                <AnimatePresence>
                    {showShareModal && (
                        <BlogShareModal
                            title={blog.title}
                            url={window.location.href}
                            excerpt={blog.excerpt}
                            onClose={() => setShowShareModal(false)}
                        />
                    )}
                </AnimatePresence>

                <BlogFooter />
            </main>
        </>
    );
}