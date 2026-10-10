"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface GalleryLightboxProps {
  images: { src: string; alt: string }[];
  activeIndex: number;
  onClose: () => void;
}

export default function GalleryLightbox({
  images,
  activeIndex,
  onClose,
}: GalleryLightboxProps) {
  const active = images[activeIndex];

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl border-foreground/10 bg-background/95 backdrop-blur-md p-0 overflow-hidden">
        <DialogTitle className="sr-only">{active?.alt ?? "Event photograph"}</DialogTitle>
        <div className="relative w-full">
          <Image
            src={active.src}
            alt={active.alt}
            width={1200}
            height={800}
            priority
            className="w-full h-auto max-h-[80vh] object-contain"
          />
          <div className="pb-4 px-4 text-center text-sm text-foreground/60">
            {active.alt}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
