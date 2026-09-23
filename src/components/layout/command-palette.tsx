import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Command } from "cmdk";
import { NAV } from "./nav";
import { CHAPTERS } from "@/lib/content/chapters";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const chapters = useMemo(() => {
    const s = q.trim().toLowerCase();
    const list = s
      ? CHAPTERS.filter((c) => (c.title + c.dek + c.tags.join(" ")).toLowerCase().includes(s))
      : CHAPTERS;
    return list.slice(0, 8);
  }, [q]);

  if (!open) return null;

  const go = (to: string) => {
    setOpen(false);
    setQ("");
    void navigate({ to });
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center bg-bg/70 px-4 pt-[12vh]">
      <button className="absolute inset-0 cursor-default" aria-label="Close" onClick={() => setOpen(false)} />
      <Command
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--shadow-panel)]"
        shouldFilter={false}
      >
        <Command.Input
          autoFocus
          value={q}
          onValueChange={setQ}
          placeholder="Jump to a lab or chapter…"
          className="h-12 w-full border-b border-border bg-transparent px-4 text-sm outline-none placeholder:text-subtle"
        />
        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center text-sm text-muted">
            Nothing matches.
          </Command.Empty>
          <Command.Group heading="Labs">
            {NAV.map((n) => (
              <Command.Item
                key={n.to}
                value={n.label}
                onSelect={() => go(n.to)}
                className="flex cursor-pointer items-center justify-between rounded-sm px-3 py-2 text-sm text-fg data-[selected=true]:bg-elevated"
              >
                <span>{n.label}</span>
                <span className="font-mono text-[10px] text-subtle">{n.to}</span>
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="Chapters">
            {chapters.map((c) => (
              <Command.Item
                key={c.id}
                value={c.title}
                onSelect={() => go(`/archive/${c.id}`)}
                className="flex cursor-pointer items-center justify-between rounded-sm px-3 py-2 text-sm text-fg data-[selected=true]:bg-elevated"
              >
                <span>
                  {c.number} · {c.title}
                </span>
                <span className="font-mono text-[10px] text-subtle">{c.volume}</span>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
