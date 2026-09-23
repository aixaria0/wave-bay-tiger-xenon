import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  ALL_FIELDS,
  ALL_WIDGETS,
  useArchive,
  type Density,
  type RadiationField,
  type ThemeMode,
  type UnitSystem,
  type DashboardWidget,
} from "@/lib/store";

export const Route = createFileRoute("/_app/controls")({ component: ControlsPage });

const FIELD_LABEL: Record<RadiationField, string> = {
  scalar: "Scalar",
  fermion: "Fermion",
  photon: "Photon",
  neutrino: "Neutrino",
  vector: "Vector",
  graviton: "Graviton",
};

const WIDGET_LABEL: Record<DashboardWidget, string> = {
  kpis: "KPI strip",
  spectrum: "Hawking preview",
  pagecurve: "Page curve",
  constraints: "PBH constraints",
  archive: "Continue reading",
  pqc: "PQC sizes",
  labs: "Volume tiles",
};

function ControlsPage() {
  const s = useArchive();

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">Desk</p>
        <h1 className="font-display text-4xl tracking-tight">Controls</h1>
        <p className="max-w-2xl text-sm text-muted">
          Theme, density, units, dashboard widgets, radiation channels, plot resolution, and
          cosmology sliders. Everything persists in this browser. Nothing is gated.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Ink for night work. Paper for print-like reading.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Segment
              label="Theme"
              value={s.theme}
              options={[
                { id: "ink", label: "Ink" },
                { id: "paper", label: "Paper" },
              ]}
              onChange={(v) => s.setTheme(v as ThemeMode)}
            />
            <Segment
              label="Density"
              value={s.density}
              options={[
                { id: "compact", label: "Compact" },
                { id: "comfortable", label: "Comfortable" },
                { id: "spacious", label: "Spacious" },
              ]}
              onChange={(v) => s.setDensity(v as Density)}
            />
            <Segment
              label="Units"
              value={s.units}
              options={[
                { id: "si", label: "SI" },
                { id: "natural", label: "Natural" },
                { id: "astro", label: "Astro" },
              ]}
              onChange={(v) => s.setUnits(v as UnitSystem)}
            />
            <label className="flex items-center justify-between gap-3">
              <span className="text-sm">Collapsed sidebar</span>
              <Switch checked={s.sidebarCollapsed} onCheckedChange={s.toggleSidebar} />
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plot engine</CardTitle>
            <CardDescription>Shared sample count for spectra and cosmology curves.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Label>Points · {s.plotPoints}</Label>
            <Slider
              min={40}
              max={400}
              step={10}
              value={[s.plotPoints]}
              onValueChange={(v) => s.setPlotPoints(v[0] ?? s.plotPoints)}
            />
            <Label>Hawking log₁₀ M (kg) · {s.logMassKg.toFixed(2)}</Label>
            <Slider
              min={10}
              max={18}
              step={0.05}
              value={[s.logMassKg]}
              onValueChange={(v) => s.setLogMassKg(v[0] ?? s.logMassKg)}
            />
            <Label>PBH log₁₀ M (g) · {s.logMassG.toFixed(2)}</Label>
            <Slider
              min={16}
              max={23}
              step={0.05}
              value={[s.logMassG]}
              onValueChange={(v) => s.setLogMassG(v[0] ?? s.logMassG)}
            />
            <Label>f_PBH · {s.fPbh.toFixed(3)}</Label>
            <Slider
              min={0.001}
              max={1}
              step={0.001}
              value={[s.fPbh]}
              onValueChange={(v) => s.setFPbh(v[0] ?? s.fPbh)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Command widgets</CardTitle>
            <CardDescription>Show or hide modules on the command center.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {ALL_WIDGETS.map((w) => (
              <label key={w} className="flex items-center justify-between gap-3">
                <span className="text-sm">{WIDGET_LABEL[w]}</span>
                <Switch checked={s.widgets[w]} onCheckedChange={() => s.toggleWidget(w)} />
              </label>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Radiation fields</CardTitle>
            <CardDescription>Applies to the command preview and the Hawking lab.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {ALL_FIELDS.map((f) => (
              <label key={f} className="flex items-center justify-between gap-3">
                <span className="text-sm">{FIELD_LABEL[f]}</span>
                <Switch checked={s.fields[f]} onCheckedChange={() => s.toggleField(f)} />
              </label>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => s.reset()}>
          Reset all controls
        </Button>
      </div>
    </div>
  );
}

function Segment({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { id: string; label: string }[];
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-1 rounded-md border border-border bg-elevated p-1">
        {options.map((o) => (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            className={
              o.id === value
                ? "rounded-sm bg-accent px-3 py-1.5 text-xs text-accent-fg"
                : "rounded-sm px-3 py-1.5 text-xs text-muted hover:text-fg"
            }
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
