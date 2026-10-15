import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CHAPTERS, VOLUMES } from "@/lib/content/chapters";
import { useArchive } from "@/lib/store";
import { normalizeSpectrum, pageLuminosityW, spectrumSeries, hawkingTKelvin } from "@/lib/physics/hawking";
import { pageCurve } from "@/lib/physics/holography";
import { constraintSeries } from "@/lib/physics/pbh";
import { chartStroke, tooltipStyle } from "@/components/charts/theme";
import { formatSci } from "@/lib/utils";
import { KYBER, DILITHIUM, FALCON } from "@/lib/pqc/params";

export const Route = createFileRoute("/_app/")({ component: Home });

function pairSize(row: { pk: number; ct?: number; sig?: number }) {
  const second = row.ct ?? row.sig ?? 0;
  return `${row.pk} / ${second}`;
}

function Home() {
  const widgets = useArchive((s) => s.widgets);
  const fields = useArchive((s) => s.fields);
  const plotPoints = useArchive((s) => s.plotPoints);
  const logMassKg = useArchive((s) => s.logMassKg);
  const bookmarks = useArchive((s) => s.bookmarks);
  const lastChapterId = useArchive((s) => s.lastChapterId);
  const massKg = 10 ** logMassKg;
  const spec = normalizeSpectrum(spectrumSeries(Math.min(plotPoints, 80)), fields);
  const page = pageCurve(80);
  const cons = constraintSeries(80);
  const last = CHAPTERS.find((c) => c.id === lastChapterId) ?? CHAPTERS[0];
  const pqcRows = [...KYBER, ...DILITHIUM, ...FALCON].slice(0, 6);

  return (
    <div className="flex flex-col gap-8">
      <section className="relative overflow-hidden rounded-xl border border-border bg-surface">
        <div className="grid-veil pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative flex flex-col gap-4 p-6 sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-subtle">
            FRACTURE ARCHIVE · INTERACTIVE RESEARCH DESK
          </p>
          <h1 className="max-w-2xl font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
            The complete fracture, under glass.
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-muted">
            A local-first research desk spanning compression, post-quantum primitives, holographic
            reconstruction, Hawking radiation, and primordial black holes. Controls and reading state
            persist in this browser; scientific toy models stay explicitly labeled.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <Link to="/archive">Open archive</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link to="/hawking">Hawking lab</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/controls">Custom controls</Link>
            </Button>
          </div>
        </div>
      </section>

      {widgets.kpis && (
        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Kpi label="Chapters" value={String(CHAPTERS.length)} hint="Indexed monologue" />
          <Kpi label="Volumes" value={String(VOLUMES.length)} hint="Compression → cosmology" />
          <Kpi
            label="T_H"
            value={`${formatSci(hawkingTKelvin(massKg), 2)} K`}
            hint={`M = 10^${logMassKg.toFixed(1)} kg`}
          />
          <Kpi
            label="Luminosity"
            value={`${formatSci(pageLuminosityW(massKg), 2)} W`}
            hint="Page scaling"
          />
        </section>
      )}

      <section className="grid gap-4 lg:grid-cols-2">
        {widgets.spectrum && (
          <Card>
            <CardHeader>
              <CardTitle>Hawking channels</CardTitle>
              <CardDescription>Normalized dΓ/dω versus ω / T_H. Toggle fields in Controls.</CardDescription>
            </CardHeader>
            <CardContent className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={spec} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                  <XAxis dataKey="x" type="number" scale="log" domain={[0.02, 20]} tick={{ fill: "var(--color-subtle)", fontSize: 11 }} />
                  <YAxis tick={{ fill: "var(--color-subtle)", fontSize: 11 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  {fields.photon && <Line type="monotone" dataKey="photon" stroke={chartStroke.photon} dot={false} strokeWidth={2} />}
                  {fields.neutrino && <Line type="monotone" dataKey="neutrino" stroke={chartStroke.neutrino} dot={false} strokeWidth={1.5} />}
                  {fields.scalar && <Line type="monotone" dataKey="scalar" stroke={chartStroke.scalar} dot={false} />}
                  {fields.fermion && <Line type="monotone" dataKey="fermion" stroke={chartStroke.fermion} dot={false} />}
                  {fields.vector && <Line type="monotone" dataKey="vector" stroke={chartStroke.vector} dot={false} />}
                  {fields.graviton && <Line type="monotone" dataKey="graviton" stroke={chartStroke.graviton} dot={false} />}
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
        {widgets.pagecurve && (
          <Card>
            <CardHeader>
              <CardTitle>Page curve</CardTitle>
              <CardDescription>Hawking saddle versus island / replica-wormhole saddle.</CardDescription>
            </CardHeader>
            <CardContent className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={page} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                  <XAxis dataKey="t" tick={{ fill: "var(--color-subtle)", fontSize: 11 }} />
                  <YAxis tick={{ fill: "var(--color-subtle)", fontSize: 11 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="hawking" stroke={chartStroke.hawking} dot={false} strokeDasharray="4 4" />
                  <Line type="monotone" dataKey="island" stroke={chartStroke.island} dot={false} strokeDasharray="2 4" />
                  <Area type="monotone" dataKey="fine" stroke={chartStroke.fine} fill={chartStroke.fine} fillOpacity={0.12} />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
        {widgets.constraints && (
          <Card>
            <CardHeader>
              <CardTitle>Asteroid-mass window</CardTitle>
              <CardDescription>Minicluster mass function against f_PBH upper limits.</CardDescription>
            </CardHeader>
            <CardContent className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={cons} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                  <XAxis dataKey="logM" tick={{ fill: "var(--color-subtle)", fontSize: 11 }} />
                  <YAxis tick={{ fill: "var(--color-subtle)", fontSize: 11 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="dndlogm" stroke={chartStroke.massfn} fill={chartStroke.massfn} fillOpacity={0.15} />
                  <Line type="monotone" dataKey="fUpper" stroke={chartStroke.limit} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
        {widgets.pqc && (
          <Card>
            <CardHeader>
              <CardTitle>PQC sizes</CardTitle>
              <CardDescription>Public key + ciphertext / signature, bytes.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm">
              {pqcRows.map((row) => (
                <div key={row.id} className="flex items-center justify-between gap-3 border-b border-border pb-2 last:border-0">
                  <span>{row.name}</span>
                  <span className="font-mono text-muted tabular-nums">{pairSize(row)}</span>
                </div>
              ))}
              <Button variant="outline" size="sm" className="self-start" asChild>
                <Link to="/pqc">
                  Open PQC lab <ArrowUpRight className="size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </section>

      {widgets.archive && (
        <section className="flex flex-col gap-3">
          <div className="flex items-end justify-between gap-3">
            <h2 className="font-display text-2xl">Continue reading</h2>
            <Badge>{bookmarks.length} bookmarked</Badge>
          </div>
          <Link
            to="/archive/$chapterId"
            params={{ chapterId: last.id }}
            className="rounded-xl border border-border bg-surface p-5 transition-colors hover:bg-elevated"
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-subtle">
              {last.number} · {last.volume}
            </p>
            <p className="mt-1 font-display text-xl">{last.title}</p>
            <p className="mt-2 text-sm text-muted">{last.dek}</p>
          </Link>
        </section>
      )}

      {widgets.labs && (
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {VOLUMES.map((v) => (
            <Link
              key={v.id}
              to="/archive"
              search={{ volume: v.id }}
              className="rounded-xl border border-border bg-surface p-4 transition-colors hover:bg-elevated"
            >
              <p className="font-mono text-[11px] text-subtle">{v.roman}</p>
              <p className="font-display text-lg">{v.title}</p>
              <p className="text-xs text-muted">{v.range}</p>
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}

function Kpi({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">{label}</p>
      <p className="mt-2 font-display text-2xl tabular-nums leading-none">{value}</p>
      <p className="mt-2 text-xs text-muted">{hint}</p>
    </div>
  );
}
