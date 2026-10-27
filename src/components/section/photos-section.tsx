import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export default function PhotosSection() {
  return (
    <section id="photos">
      <div className="flex min-h-0 flex-col gap-y-4">
        <div className="flex items-center w-full">
          <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
          <div className="border bg-primary z-10 rounded-xl px-4 py-1">
            <span className="text-background text-sm font-medium">Photography</span>
          </div>
          <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
        </div>
        <div className="flex flex-col gap-y-3 items-center justify-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{DATA.sections.photos.heading}</h2>
        </div>
        {DATA.photoCollections.map((collection, collectionIndex) => (
          <div key={collection.title} className="flex flex-col gap-y-4">
            <h3 className="text-center text-lg font-medium text-muted-foreground">{collection.title}</h3>
            <div className="columns-2 gap-2 sm:columns-3">
              {collection.photos.map((photo, photoIndex) => (
                <BlurFade
                  key={photo.src}
                  delay={BLUR_FADE_DELAY * 14 + (collectionIndex * collection.photos.length + photoIndex) * 0.05}
                  className="mb-2 break-inside-avoid"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full rounded-xl"
                  />
                </BlurFade>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
