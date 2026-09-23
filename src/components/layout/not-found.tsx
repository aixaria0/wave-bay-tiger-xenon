import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function AppNotFound() {
  return (
    <div className="flex min-h-[70dvh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Route miss · 200</p>
      <h1 className="font-display text-4xl text-fg">This shelf is empty</h1>
      <p className="max-w-md text-sm text-muted">
        No forbidden gate. The path is simply not in the archive. Return to the command
        center or open a lab.
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <Button asChild>
          <Link to="/">Command center</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link to="/archive">Archive</Link>
        </Button>
      </div>
    </div>
  );
}
