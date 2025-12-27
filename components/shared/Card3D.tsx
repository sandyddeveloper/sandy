"use client"

import { motion, useMotionValue, useTransform } from "framer-motion"
import { useRef } from "react"

interface Card3DProps {
  children: React.ReactNode
  onClick?: () => void
}

export default function Card3D({ children, onClick }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-50, 50], [12, -12])
  const rotateY = useTransform(x, [-50, 50], [-12, 12])

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current || window.innerWidth < 768) return
    const rect = ref.current.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className="relative cursor-pointer rounded-2xl"
    >
      <div className="absolute inset-0 rounded-2xl bg-emerald-500/20 blur-xl opacity-0 hover:opacity-100 transition" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
