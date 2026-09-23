import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "default",
  ...props
}: React.ComponentProps<"span"> & { tone?: "default" | "ok" | "warn" | "danger" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide",
        tone === "default" && "border-border text-muted",
        tone === "ok" && "border-ok/30 text-ok",
        tone === "warn" && "border-warn/30 text-warn",
        tone === "danger" && "border-danger/30 text-danger",
        className,
      )}
      {...props}
    />
  );
}
