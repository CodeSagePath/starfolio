/* eslint-disable @next/next/no-img-element */

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown";

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return <div className="w-full h-48 bg-muted" />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-48 object-cover"
      onError={() => setImageError(true)}
    />
  );
}

function ProjectCover({ title }: { title: string }) {
  const accents: Record<string, string> = {
    AskZentic: "from-violet-600 via-indigo-600 to-cyan-500",
    AnantYatra: "from-emerald-600 via-teal-600 to-cyan-500",
    "Whisper Kit": "from-rose-600 via-orange-500 to-amber-400",
    "Parallel Timeline": "from-blue-600 via-indigo-600 to-violet-600",
    "Secure Nonce": "from-slate-700 via-slate-800 to-zinc-950",
    VividNotes: "from-fuchsia-600 via-pink-600 to-rose-500",
  };

  return (
    <div className={`flex h-48 w-full items-end bg-linear-to-br p-5 text-white ${accents[title] ?? "from-slate-600 to-slate-900"}`}>
      <div className="max-w-[80%]">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-white/70">Selected project</p>
        <p className="text-2xl font-semibold tracking-tight">{title}</p>
      </div>
    </div>
  );
}

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col h-full border border-border rounded-xl overflow-hidden hover:ring-2 cursor-pointer hover:ring-muted transition-all duration-200",
        className
      )}
    >
      <div className="relative shrink-0">
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="block">
            {video ? (
              <video src={video} autoPlay loop muted playsInline className="w-full h-48 object-cover" />
            ) : image ? (
              <ProjectImage src={image} alt={title} />
            ) : (
              <ProjectCover title={title} />
            )}
          </a>
        ) : (
          <ProjectCover title={title} />
        )}
        {links && links.length > 0 && (
          <div className="absolute top-2 right-2 flex flex-wrap gap-2">
            {links.map((link, idx) => (
              <a
                href={link.href}
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <Badge
                  className="flex items-center gap-1.5 text-xs bg-black text-white hover:bg-black/90"
                  variant="default"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">{title}</h3>
            <time className="text-xs text-muted-foreground">{dates}</time>
          </div>
          {href && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
              aria-label={`Open ${title}`}
            >
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          )}
        </div>
        <div className="text-xs flex-1 prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
          <Markdown>{description}</Markdown>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className="text-[11px] font-medium border border-border h-6 w-fit px-2"
                variant="outline"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
