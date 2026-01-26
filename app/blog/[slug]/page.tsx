"use client"

import { Suspense, useEffect, useState } from "react"
import BlogPostPage from "./BlogClient"
import { Leaf } from "lucide-react"

// Simple loading component without theme dependencies
function BlogLoading() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Simple loading without theme colors
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="text-center">
        <Leaf className="h-12 w-12 animate-spin mx-auto mb-4 text-gray-400 dark:text-gray-600 transition-colors duration-300" />
        <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
          Loading article...
        </p>
      </div>
    </div>
  );
}

export default function TechStackPage() {
  return (
    <Suspense fallback={<BlogLoading />}>
      <BlogPostPage />
    </Suspense>
  )
}