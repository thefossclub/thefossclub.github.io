"use client"

export default function ScrollProgressIndicator() {
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[9999] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-green-500 via-green-400 to-emerald-500 will-change-transform origin-left scroll-progress-bar"
        style={{
          transform: "scaleX(0)",
        }}
      />
      <style jsx global>{`
        @supports (animation-timeline: scroll()) {
          @keyframes grow-progress {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
          }
          .scroll-progress-bar {
            animation: grow-progress auto linear forwards;
            animation-timeline: scroll(root);
          }
        }
      `}</style>
    </div>
  )
}
