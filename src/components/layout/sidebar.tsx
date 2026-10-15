import { Link, useRouterState } from "@tanstack/react-router";
import { NAV } from "./nav";
import { cn } from "@/lib/utils";
import { useArchive } from "@/lib/store";

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const collapsed = useArchive((s) => s.sidebarCollapsed);

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-border bg-surface",
        collapsed ? "w-[4.5rem]" : "w-60",
      )}
    >
      <div className={cn("flex items-center gap-3 border-b border-border px-4 py-4", collapsed && "justify-center px-2")}>
        <div className="flex size-8 items-center justify-center rounded-sm border border-border bg-elevated font-display text-sm text-fg">
          F
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate font-display text-base leading-tight">Fracture Archive</p>
            <p className="truncate font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">
              Research ops
            </p>
          </div>
        )}
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 p-2">
        {NAV.map((item) => {
          const active =
            item.to === "/"
              ? pathname === "/"
              : pathname === item.to || pathname.startsWith(item.to + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm transition-colors",
                active ? "bg-elevated text-fg" : "text-muted hover:bg-elevated/70 hover:text-fg",
                collapsed && "justify-center px-0",
              )}
            >
              <Icon className="size-4 shrink-0" />
              {!collapsed && (
                <span className="flex min-w-0 flex-col">
                  <span>{item.label}</span>
                  <span className="truncate font-mono text-[10px] text-subtle">{item.hint}</span>
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      {!collapsed && (
        <p className="px-4 pb-4 font-mono text-[10px] uppercase tracking-widest text-subtle">
          LOCAL-FIRST · BROWSER STATE
        </p>
      )}
    </aside>
  );
}
