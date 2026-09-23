import { useEffect, useState } from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Menu, PanelLeft } from "lucide-react";
import { useArchive } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";
import { CommandPalette } from "./command-palette";
import { NAV } from "./nav";
import { cn } from "@/lib/utils";

export function AppShell() {
  const theme = useArchive((s) => s.theme);
  const density = useArchive((s) => s.density);
  const toggleSidebar = useArchive((s) => s.toggleSidebar);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme === "paper" ? "paper" : "ink";
  }, [theme]);

  const pad = density === "compact" ? "p-4" : density === "spacious" ? "p-8" : "p-6";

  return (
    <div className="flex min-h-dvh bg-bg text-fg">
      <div className="hidden md:block">
        <div className="sticky top-0 h-dvh">
          <Sidebar />
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-14 items-center gap-2 border-b border-border bg-bg/90 px-3 backdrop-blur-sm">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <Sidebar onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:inline-flex"
            onClick={toggleSidebar}
            aria-label="Collapse sidebar"
          >
            <PanelLeft />
          </Button>
          <p className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-subtle sm:block">
            {NAV.find((n) => (n.to === "/" ? pathname === "/" : pathname.startsWith(n.to)))?.label ??
              "Archive"}
          </p>
          <div className="ml-auto flex items-center gap-2">
            <kbd className="hidden rounded-sm border border-border px-2 py-1 font-mono text-[10px] text-subtle sm:inline">
              ⌘K
            </kbd>
            <Button variant="outline" size="sm" asChild>
              <Link to="/controls">Controls</Link>
            </Button>
          </div>
        </header>
        <main className={cn("mx-auto w-full max-w-6xl flex-1", pad)}>
          <Outlet />
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}
