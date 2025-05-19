'use client'

import { type ReactNode, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SectionRevealProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  className?: string
  once?: boolean
  amount?: number
}

export default function SectionReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  once = true,
  amount = 0.3,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount })

  const getVariants = () => {
    switch (direction) {
      case 'down':
        return {
          hidden: { y: -50, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }
      case 'left':
        return {
          hidden: { x: 50, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        }
      case 'right':
        return {
          hidden: { x: -50, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        }
      case 'up':
      default:
        return {
          hidden: { y: 50, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }
    }
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        variants={getVariants()}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  )
}
