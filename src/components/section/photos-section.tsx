import { ArrowRight } from "lucide-react";
import { DATA } from "@/data/resume";

function formatCollectionDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export default function PhotosSection() {
  const collections = [...DATA.photoCollections]
    .sort((first, second) => second.date.localeCompare(first.date))
    .slice(0, 3);

  return (
    <section id="photos" aria-labelledby="photography-heading">
      <div className="flex min-h-0 flex-col gap-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium text-primary">Beyond the screen</p>
            <h2 id="photography-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">
              {DATA.sections.photos.heading}
            </h2>
          </div>
          <a href="/photography/" className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            All collections <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>
        <div className="flex snap-x gap-4 overflow-x-auto pb-2">
          {collections.map((collection) => (
            <a
              key={collection.slug}
              href={`/photography/${collection.slug}/`}
              onContextMenu={(event) => event.preventDefault()}
              className="group min-w-[min(82vw,22rem)] snap-start overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40 sm:min-w-[20rem]"
            >
              <img
                src={collection.coverImage}
                alt={`${collection.title} photo collection cover`}
                loading="lazy"
                decoding="async"
                draggable={false}
                onDragStart={(event) => event.preventDefault()}
                className="image-gallery-image h-52 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="flex items-start justify-between gap-3 p-4">
                <div>
                  <h3 className="font-semibold group-hover:text-primary">{collection.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{collection.location} · {formatCollectionDate(collection.date)}</p>
                </div>
                <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                  {collection.photos.length} photos
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
