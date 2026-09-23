import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { generalizedEntropy, JONES_DISCRETE, jonesIndexAllowed, pageCurve } from "@/lib/physics/holography";
import { chartStroke, tooltipStyle } from "@/components/charts/theme";
import { useArchive } from "@/lib/store";

export const Route = createFileRoute("/_app/holography")({ component: HolographyLab });

function HolographyLab() {
  const plotPoints = useArchive((s) => s.plotPoints);
  const page = pageCurve(plotPoints);
  const [area, setArea] = useState(4);
  const [sBulk, setSBulk] = useState(0.6);
  const sgen = generalizedEntropy(area, sBulk);
  const [idx, setIdx] = useState(4);
  const allowed = useMemo(() => jonesIndexAllowed(idx), [idx]);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">Volume III</p>
        <h1 className="font-display text-4xl tracking-tight">Holography studio</h1>
        <p className="max-w-2xl text-sm text-muted">
          Page curve from competing saddles, generalized entropy of a candidate QES, and the Jones
          index spectrum for II₁ subfactors.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Unitary Page curve</CardTitle>
          <CardDescription>
            Fine-grained entropy is the minimum of the Hawking (disconnected) and island
            (replica-wormhole) saddles.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={page} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
              <XAxis dataKey="t" tick={{ fill: "var(--color-subtle)", fontSize: 11 }} />
              <YAxis tick={{ fill: "var(--color-subtle)", fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="hawking" name="Hawking" stroke={chartStroke.hawking} dot={false} strokeDasharray="5 4" />
              <Line type="monotone" dataKey="island" name="Island" stroke={chartStroke.island} dot={false} strokeDasharray="2 3" />
              <Area type="monotone" dataKey="fine" name="Fine-grained" stroke={chartStroke.fine} fill={chartStroke.fine} fillOpacity={0.14} />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>S_gen of a candidate QES</CardTitle>
            <CardDescription>S_gen = Area / 4G + S_bulk. The true QES minimizes this.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <Label>Area / G</Label>
              <Slider min={0.2} max={12} step={0.1} value={[area]} onValueChange={(v) => setArea(v[0] ?? area)} />
            </div>
            <div>
              <Label>S_bulk</Label>
              <Slider min={0} max={3} step={0.05} value={[sBulk]} onValueChange={(v) => setSBulk(v[0] ?? sBulk)} />
            </div>
            <p className="font-display text-3xl tabular-nums">{sgen.toFixed(3)}</p>
            <p className="text-sm text-muted">
              After Page time the bulk term on the island wins over the growing Hawking area term,
              and the QES jumps behind the horizon.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Jones index</CardTitle>
            <CardDescription>Allowed values: 4 cos²(π/n) or ≥ 4.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Label>Trial index</Label>
            <Slider min={1} max={6} step={0.01} value={[idx]} onValueChange={(v) => setIdx(v[0] ?? idx)} />
            <div className="flex items-center gap-2">
              <p className="font-mono text-lg tabular-nums">{idx.toFixed(3)}</p>
              <Badge tone={allowed ? "ok" : "danger"}>{allowed ? "Allowed" : "Forbidden"}</Badge>
            </div>
            <ul className="grid grid-cols-2 gap-1 font-mono text-xs text-muted">
              {JONES_DISCRETE.map((j) => (
                <li key={j.n}>
                  n={j.n} → {j.index.toFixed(4)}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
