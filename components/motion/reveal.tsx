"use client"

import { m, type HTMLMotionProps } from "framer-motion"
import { VIEWPORT, fadeRise, stagger } from "@/lib/motion"

type RevealTrigger = "view" | "mount"

interface RevealProps extends HTMLMotionProps<"div"> {
  trigger?: RevealTrigger
}

function triggerProps(trigger: RevealTrigger) {
  return trigger === "mount"
    ? { initial: "hidden", animate: "visible" }
    : { initial: "hidden", whileInView: "visible", viewport: VIEWPORT }
}

export function Reveal({ trigger = "view", ...props }: RevealProps) {
  return <m.div variants={fadeRise} {...triggerProps(trigger)} {...props} />
}

export function RevealGroup({
  trigger = "view",
  delay = 0,
  ...props
}: RevealProps & { delay?: number }) {
  return <m.div variants={stagger(delay)} {...triggerProps(trigger)} {...props} />
}

export function RevealItem(props: HTMLMotionProps<"div">) {
  return <m.div variants={fadeRise} {...props} />
}
