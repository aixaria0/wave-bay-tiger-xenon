import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Bookmark, FlaskConical } from "lucide-react";
import { CHAPTERS, getChapter } from "@/lib/content/chapters";
import { useArchive } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/archive/$chapterId")({
  component: ChapterPage,
});

const LAB_TO = {
  "/pqc": "/pqc",
  "/hawking": "/hawking",
  "/pbh": "/pbh",
  "/holography": "/holography",
} as const;

function ChapterPage() {
  const { chapterId } = Route.useParams();
  const chapter = getChapter(chapterId);
  const setLast = useArchive((s) => s.setLastChapter);
  const bookmarks = useArchive((s) => s.bookmarks);
  const toggleBookmark = useArchive((s) => s.toggleBookmark);

  useEffect(() => {
    if (chapter) setLast(chapter.id);
  }, [chapter, setLast]);

  if (!chapter) {
    throw notFound();
  }

  const idx = CHAPTERS.findIndex((c) => c.id === chapter.id);
  const prev = idx > 0 ? CHAPTERS[idx - 1] : null;
  const next = idx < CHAPTERS.length - 1 ? CHAPTERS[idx + 1] : null;
  const marked = bookmarks.includes(chapter.id);
  const labTo = chapter.lab && chapter.lab in LAB_TO ? LAB_TO[chapter.lab as keyof typeof LAB_TO] : null;

  return (
    <article className="mx-auto flex max-w-2xl flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/archive">
            <ArrowLeft className="size-4" /> Index
          </Link>
        </Button>
        <Badge>{chapter.volume}</Badge>
        <span className="font-mono text-[11px] text-subtle">{chapter.number}</span>
      </div>
      <header className="flex flex-col gap-3">
        <h1 className="font-display text-4xl tracking-tight">{chapter.title}</h1>
        <p className="text-muted">{chapter.dek}</p>
        <div className="flex flex-wrap gap-2">
          {chapter.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant={marked ? "secondary" : "outline"} size="sm" onClick={() => toggleBookmark(chapter.id)}>
            <Bookmark className={cn("size-4", marked && "fill-current")} />
            {marked ? "Bookmarked" : "Bookmark"}
          </Button>
          {labTo && (
            <Button variant="outline" size="sm" asChild>
              <Link to={labTo}>
                <FlaskConical className="size-4" /> Open lab
              </Link>
            </Button>
          )}
        </div>
      </header>
      <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-fg">
        {chapter.body.map((p, i) => (
          <p key={i} className="text-pretty">
            {p}
          </p>
        ))}
      </div>
      <nav className="mt-4 grid gap-2 sm:grid-cols-2">
        {prev ? (
          <Link
            to="/archive/$chapterId"
            params={{ chapterId: prev.id }}
            className="rounded-xl border border-border p-4 hover:bg-elevated"
          >
            <p className="flex items-center gap-1 font-mono text-[10px] uppercase text-subtle">
              <ArrowLeft className="size-3" /> Previous
            </p>
            <p className="font-display text-lg">{prev.title}</p>
          </Link>
        ) : (
          <div />
        )}
        {next && (
          <Link
            to="/archive/$chapterId"
            params={{ chapterId: next.id }}
            className="rounded-xl border border-border p-4 text-right hover:bg-elevated"
          >
            <p className="flex items-center justify-end gap-1 font-mono text-[10px] uppercase tracking-wide text-subtle">
              Next <ArrowRight className="size-3" />
            </p>
            <p className="font-display text-lg">{next.title}</p>
          </Link>
        )}
      </nav>
    </article>
  );
}
