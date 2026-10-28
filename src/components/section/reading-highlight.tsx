import highlights from "@/data/reading-highlights.json";

function getKolkataDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function getDailyIndex(date: string, count: number) {
  const dateSeed = date.replaceAll("-", "");
  const seed = Number(dateSeed);
  return seed % count;
}

export default function ReadingHighlight() {
  const highlight = highlights[getDailyIndex(getKolkataDate(), highlights.length)];

  return (
    <section aria-labelledby="reading-highlight-title">
      <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
        <p className="text-sm font-medium text-primary">Highlight of the day</p>
        <h2 id="reading-highlight-title" className="mt-2 text-2xl font-bold tracking-tight">A passage to keep</h2>
        <blockquote className="mt-5 space-y-3 border-l-2 border-primary/50 pl-4">
          {highlight.language !== "EN" && <p lang={highlight.language.toLowerCase()} className="text-lg leading-relaxed">{highlight.original}</p>}
          <p className="text-muted-foreground leading-relaxed">{highlight.language === "EN" ? highlight.original : highlight.translation}</p>
        </blockquote>
        <p className="mt-5 text-sm font-medium">{highlight.work} <span className="text-muted-foreground">· {highlight.creator}</span></p>
        <p className="mt-1 text-xs text-muted-foreground">{[highlight.location, highlight.translator && `Translation: ${highlight.translator}`].filter(Boolean).join(" · ")}</p>
      </div>
    </section>
  );
}
