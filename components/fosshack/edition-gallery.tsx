"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Camera, ExternalLink } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"

interface EditionGalleryProps {
  year: number
  title: string
  description: string
  photos: {
    src: string
    alt: string
    caption: string
    sourceUrl?: string
  }[]
}

function photoVisibility(index: number, page: number) {
  const mobileCount = page * 5
  const tabletCount = page * 8
  const desktopCount = page === 1 ? 7 : 7 + (page - 1) * 11

  return [
    index < mobileCount ? "block" : "hidden",
    index < tabletCount ? "sm:block" : "sm:hidden",
    index < desktopCount ? "lg:block" : "lg:hidden",
  ].join(" ")
}

function photoSpan(index: number) {
  const mobileWide = index % 5 === 0
  const tabletWide = index % 8 === 0
  const desktopWide = index === 0 || (index >= 7 && (index - 7) % 11 === 0)

  return [
    mobileWide ? "col-span-2" : "col-span-1",
    tabletWide ? "sm:col-span-2" : "sm:col-span-1",
    desktopWide ? "lg:col-span-2" : "lg:col-span-1",
  ].join(" ")
}

function photoShape(index: number) {
  const mobileWide = index % 5 === 0
  const tabletWide = index % 8 === 0
  const desktopWide = index === 0 || (index >= 7 && (index - 7) % 11 === 0)

  return [
    mobileWide ? "aspect-[2/1]" : "aspect-square",
    tabletWide ? "sm:aspect-[2/1]" : "sm:aspect-square",
    desktopWide ? "lg:aspect-[2/1]" : "lg:aspect-square",
  ].join(" ")
}

function MorePhotos({
  className,
  onClick,
}: {
  className: string
  onClick: () => void
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 z-10 items-end justify-center rounded-2xl bg-gradient-to-t from-black/90 via-black/40 to-transparent ${className}`}>
      <button
        type="button"
        onClick={onClick}
        className="pointer-events-auto mb-8 flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-6 py-3 font-semibold text-white backdrop-blur transition hover:border-accent-light-green hover:text-accent-light-green"
      >
        See more photos <ArrowDown className="h-4 w-4" />
      </button>
    </div>
  )
}

export default function EditionGallery({
  year,
  title,
  description,
  photos,
}: EditionGalleryProps) {
  const [activePhoto, setActivePhoto] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const selectedPhoto = activePhoto === null ? null : photos[activePhoto]
  const desktopCount = page === 1 ? 7 : 7 + (page - 1) * 11

  function movePhoto(direction: number) {
    setActivePhoto((current) => {
      if (current === null) return current
      return (current + direction + photos.length) % photos.length
    })
  }

  return (
    <section
      id="gallery"
      className="scroll-mt-28"
    >
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent-light-green">
            <Camera className="h-4 w-4" /> FOSS Hack {year} photos
          </p>
          <h2 className="text-3xl font-bold sm:text-5xl">Photo gallery</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/60 sm:text-lg">
            {description}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-foreground/10 bg-background/60 px-4 py-2 text-sm text-foreground/55">
          {photos.length} photos
        </span>
      </div>

      <div className="relative">
        <div className="grid grid-flow-dense grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {photos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setActivePhoto(index)}
              aria-label={`Open photo: ${photo.caption}`}
              className={`group relative min-h-0 overflow-hidden rounded-2xl border border-foreground/10 bg-background/60 text-left shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-accent-light-green/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light-green ${photoVisibility(index, page)} ${photoSpan(index)} ${photoShape(index)}`}
          >
            <Image
              src={photo.src}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 text-white sm:gap-3 sm:p-5">
              <span className="text-xs font-semibold leading-snug sm:text-base">{photo.caption}</span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur transition group-hover:border-accent-light-green group-hover:bg-accent-light-green group-hover:text-black sm:h-9 sm:w-9">
                <ArrowRight className="h-4 w-4" />
              </span>
            </span>
          </button>
          ))}
        </div>

        {photos.length > page * 5 && (
          <MorePhotos className="flex sm:hidden" onClick={() => setPage((current) => current + 1)} />
        )}
        {photos.length > page * 8 && (
          <MorePhotos className="hidden sm:flex lg:hidden" onClick={() => setPage((current) => current + 1)} />
        )}
        {photos.length > desktopCount && (
          <MorePhotos className="hidden lg:flex" onClick={() => setPage((current) => current + 1)} />
        )}
      </div>

      {page > 1 && (
        <button
          type="button"
          onClick={() => setPage(1)}
          className="mx-auto mt-8 flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm font-semibold text-foreground/70 transition hover:border-accent-light-green hover:text-accent-light-green"
        >
          Show Less <ArrowUp className="h-4 w-4" />
        </button>
      )}

      <Dialog
        open={activePhoto !== null}
        onOpenChange={(open) => !open && setActivePhoto(null)}
      >
        <DialogContent className="max-w-6xl overflow-hidden border-foreground/10 bg-background/95 p-0 backdrop-blur-xl">
          <DialogTitle className="sr-only">{selectedPhoto?.caption ?? title}</DialogTitle>
          {selectedPhoto && activePhoto !== null && (
            <div className="relative">
              <div className="relative flex min-h-[40vh] items-center justify-center bg-black/80 sm:min-h-[65vh]">
                <div className="relative h-[50vh] max-h-[70vh] w-full sm:h-[70vh]">
                  <Image
                    src={selectedPhoto.src}
                    alt={selectedPhoto.alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </div>
                {photos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => movePhoto(-1)}
                      aria-label="Previous photo"
                      className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-accent-light-green/50 bg-black/55 text-white backdrop-blur transition hover:bg-accent-light-green hover:text-black sm:left-5"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => movePhoto(1)}
                      aria-label="Next photo"
                      className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-accent-light-green/50 bg-black/55 text-white backdrop-blur transition hover:bg-accent-light-green hover:text-black sm:right-5"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
              <div className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center sm:px-7">
                <div>
                  <p className="font-semibold">{selectedPhoto.caption}</p>
                  <p className="mt-1 text-sm text-foreground/50">{activePhoto + 1} / {photos.length}</p>
                </div>
                {selectedPhoto.sourceUrl && (
                  <a
                    href={selectedPhoto.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent-light-green hover:underline"
                  >
                    Photo source <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
