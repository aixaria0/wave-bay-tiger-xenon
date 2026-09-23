import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { Bookmark } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CHAPTERS, VOLUMES, type VolumeId, searchChapters } from "@/lib/content/chapters";
import { useArchive } from "@/lib/store";
import { cn } from "@/lib/utils";
import { z } from "zod";

const searchSchema = z.object({
  volume: z.string().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/_app/archive/")({
  validateSearch: searchSchema,
  component: ArchiveIndex,
});

function ArchiveIndex() {
  const search = Route.useSearch();
  const [q, setQ] = useState(search.q ?? "");
  const [volume, setVolume] = useState<VolumeId | "all">((search.volume as VolumeId) || "all");
  const bookmarks = useArchive((s) => s.bookmarks);
  const toggleBookmark = useArchive((s) => s.toggleBookmark);

  const list = useMemo(() => {
    let rows = searchChapters(q);
    if (volume !== "all") rows = rows.filter((c) => c.volume === volume);
    return rows;
  }, [q, volume]);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">Monologue</p>
        <h1 className="font-display text-4xl tracking-tight">Archive</h1>
        <p className="max-w-2xl text-sm text-muted">
          Full scientific spine from pruning through femtolensing. Search, filter by volume, bookmark
          locally.
        </p>
      </header>

      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search titles, tags, body…"
        aria-label="Search archive"
      />

      <div className="flex flex-wrap gap-2">
        <FilterChip active={volume === "all"} onClick={() => setVolume("all")}>
          All · {CHAPTERS.length}
        </FilterChip>
        {VOLUMES.map((v) => (
          <FilterChip key={v.id} active={volume === v.id} onClick={() => setVolume(v.id)}>
            {v.roman} {v.title}
          </FilterChip>
        ))}
      </div>

      <ul className="flex flex-col gap-2">
        {list.map((c) => {
          const marked = bookmarks.includes(c.id);
          return (
            <li key={c.id}>
              <div className="flex items-stretch gap-1">
                <Link
                  to="/archive/$chapterId"
                  params={{ chapterId: c.id }}
                  className="min-w-0 flex-1 rounded-xl border border-border bg-surface p-4 transition-colors hover:bg-elevated"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] text-subtle">{c.number}</span>
                    <Badge>{c.volume}</Badge>
                    {c.lab && <Badge tone="ok">lab</Badge>}
                  </div>
                  <h2 className="mt-1 font-display text-xl">{c.title}</h2>
                  <p className="mt-1 text-sm text-muted">{c.dek}</p>
                </Link>
                <button
                  className={cn(
                    "rounded-xl border border-border px-3 text-muted hover:text-fg",
                    marked && "text-fg",
                  )}
                  aria-label={marked ? "Remove bookmark" : "Bookmark"}
                  onClick={() => toggleBookmark(c.id)}
                >
                  <Bookmark className={cn("size-4", marked && "fill-current")} />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      {list.length === 0 && (
        <p className="py-12 text-center text-sm text-muted">No chapters match that query.</p>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs",
        active ? "border-accent bg-elevated text-fg" : "border-border text-muted hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}
