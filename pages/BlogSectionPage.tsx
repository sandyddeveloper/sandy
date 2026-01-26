"use client"

import BlogTimelineSection from "@/components/sections/Blog"
import { blogPosts } from "@/types/blog"

export default function BlogSectionPage() {
    return (
        <section
            id="blogs"
            className="min-h-screen relative"
        >

            <BlogTimelineSection
                posts={blogPosts.map((post) => ({
                    id: post.id,
                    title: post.title,
                    excerpt: post.excerpt,
                    date: post.date,
                    readTime: post.readTime,
                    views: post.views ?? 0,
                    image: post.coverImage,
                    slug: post.id,          
                    category: post.category,
                }))}
            />

        </section>

    )

}
