import type { Transition, Variants } from "framer-motion"

export const EASE_OUT = [0.22, 1, 0.36, 1] as const

export const DURATION = {
  fast: 0.15,
  base: 0.2,
  enter: 0.4,
  slow: 0.6,
} as const

export const STAGGER = 0.06

export const VIEWPORT = { once: true, amount: 0.15 } as const

const enter: Transition = { duration: DURATION.enter, ease: EASE_OUT }

export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: enter },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE_OUT } },
}

export const overlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.base, ease: EASE_OUT } },
}

export const menuPanel: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION.base,
      ease: EASE_OUT,
      staggerChildren: STAGGER / 2,
      delayChildren: 0.05,
    },
  },
}

export function stagger(delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: STAGGER, delayChildren } },
  }
}
