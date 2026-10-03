"use client"

import dynamic from "next/dynamic"

const Fosshack2026Recap = dynamic(() => import("@/app/fosshack2026/page"))

export default function Fosshack2026RecapLazy() {
  return <Fosshack2026Recap />
}
