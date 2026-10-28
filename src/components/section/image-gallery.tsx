import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState, type TouchEvent } from "react";
import { createPortal } from "react-dom";

export type GalleryImage = {
  src: string;
  fullSizeSrc?: string;
  alt: string;
};

type ImageGalleryProps = {
  images: readonly GalleryImage[];
  label: string;
};

export default function ImageGallery({ images, label }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const isOpen = activeIndex !== null;

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") {
        setActiveIndex((index) => index === null ? null : (index - 1 + images.length) % images.length);
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((index) => index === null ? null : (index + 1) % images.length);
      }
      if (event.key === "Tab") {
        const buttons = dialogRef.current?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
        if (!buttons?.length) return;
        const firstButton = buttons[0];
        const lastButton = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === firstButton) {
          event.preventDefault();
          lastButton.focus();
        } else if (!event.shiftKey && document.activeElement === lastButton) {
          event.preventDefault();
          firstButton.focus();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      openerRef.current?.focus();
    };
  }, [isOpen, images.length]);

  function openImage(index: number) {
    openerRef.current = document.activeElement as HTMLElement;
    setActiveIndex(index);
  }

  function showPrevious() {
    setActiveIndex((index) => index === null ? null : (index - 1 + images.length) % images.length);
  }

  function showNext() {
    setActiveIndex((index) => index === null ? null : (index + 1) % images.length);
  }

  function handleTouchEnd(event: TouchEvent<HTMLElement>) {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < 50) return;
    if (distance > 0) showPrevious();
    else showNext();
  }

  const activeImage = activeIndex === null ? null : images[activeIndex];

  return (
    <>
      <div className="columns-2 gap-3 sm:columns-3 sm:gap-4" role="group" aria-label={label}>
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            aria-label={`Enlarge image ${index + 1} of ${images.length}`}
            onClick={() => openImage(index)}
            className="mb-3 block w-full break-inside-avoid overflow-hidden rounded-xl bg-muted text-left sm:mb-4"
          >
            <img
              src={image.src}
              alt={image.alt}
              loading={index < 3 ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
              onContextMenu={(event) => event.preventDefault()}
              onDragStart={(event) => event.preventDefault()}
              className="image-gallery-image h-auto w-full select-none transition-opacity hover:opacity-90"
            />
          </button>
        ))}
      </div>

      {activeImage && activeIndex !== null && typeof document !== "undefined" && createPortal(
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${label}, image ${activeIndex + 1} of ${images.length}`}
          tabIndex={-1}
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveIndex(null);
          }}
          onTouchStart={(event) => { touchStartX.current = event.touches[0].clientX; }}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
        >
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close enlarged image"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="size-6" aria-hidden />
          </button>

          {images.length > 1 && (
            <button
              type="button"
              aria-label="Previous image"
              onClick={showPrevious}
              className="absolute left-3 top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-6"
            >
              <ChevronLeft className="size-7" aria-hidden />
            </button>
          )}

          <figure className="flex max-h-full max-w-full flex-col items-center justify-center gap-3">
            <img
              src={activeImage.fullSizeSrc ?? activeImage.src}
              alt={activeImage.alt}
              decoding="async"
              draggable={false}
              onContextMenu={(event) => event.preventDefault()}
              onDragStart={(event) => event.preventDefault()}
              className="image-gallery-image max-h-[calc(100dvh-7rem)] max-w-full rounded object-contain select-none"
            />
            <figcaption className="text-sm text-white/80" aria-live="polite">
              {activeIndex + 1} / {images.length}
            </figcaption>
          </figure>

          {images.length > 1 && (
            <button
              type="button"
              aria-label="Next image"
              onClick={showNext}
              className="absolute right-3 top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6"
            >
              <ChevronRight className="size-7" aria-hidden />
            </button>
          )}
        </div>,
        document.body,
      )}
    </>
  );
}
