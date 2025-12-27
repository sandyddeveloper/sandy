// components/navigation/NavItem.tsx - UPDATED
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import Tooltip from './Tooltip'

interface NavItemProps {
    label: string
    href: string
    icon: ReactNode
    color: string
    isActive: boolean
    onHover: (label: string | null) => void
}

export default function NavItem({ label, href, icon, color, isActive, onHover }: NavItemProps) {
    return (
        <motion.div
            className="relative"
            onHoverStart={() => onHover(label)}
            onHoverEnd={() => onHover(null)}
            whileHover={{ y: -2 }}
        >
            <Tooltip
                position="bottom"
                text={`Navigate to ${label}`}
                delay={0.3}
            />

            <a
                href={href}
                className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl group transition-all"
            >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 ${color} rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

                {/* Animated border */}
                <div className={`absolute inset-0 border rounded-xl border-transparent group-hover:border-white/30 transition-all duration-500 ${isActive ? 'border-white/50' : ''}`} />

                {/* Icon with gradient */}
                <div className={`relative p-1.5 rounded-lg ${color} bg-gradient-to-br`}>
                    <div className="text-white">
                        {icon}
                    </div>

                    {/* Icon glow */}
                    <div className={`absolute inset-0 ${color} rounded-lg blur-md opacity-0 group-hover:opacity-50 transition-opacity`} />
                </div>

                {/* Label with sliding underline */}
                <span className="font-medium text-sm text-gray-700 dark:text-white/90 relative">
                    {label}
                    <motion.span
                        className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isActive ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                    />
                </span>

                {/* Hover indicator dot */}
                <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-white ml-1.5"
                    initial={{ scale: 0 }}
                    animate={{ scale: isActive ? 1 : 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                />
            </a>

            {/* Floating particles on hover */}
            {isActive && (
                <>
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className={`absolute w-1 h-1 rounded-full ${color.split(' ')[1].replace('from-', 'bg-')}`}
                            initial={{ y: 0, x: 0, opacity: 0 }}
                            animate={{
                                y: [0, -15, 0],
                                x: Math.sin(i) * 8,
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                            style={{
                                left: `${30 + i * 20}%`,
                                bottom: -8,
                            }}
                        />
                    ))}
                </>
            )}
        </motion.div>
    )
}