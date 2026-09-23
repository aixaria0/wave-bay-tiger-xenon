import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useArchive } from "@/lib/store";
import {
  constraintSeries,
  einsteinHours,
  expectedEvents,
  femtoHours,
  lognormPdf,
  microlensingGamma,
} from "@/lib/physics/pbh";
import { formatSci } from "@/lib/utils";
import { chartStroke, tooltipStyle } from "@/components/charts/theme";

export const Route = createFileRoute("/_app/pbh")({ component: PbhLab });

function PbhLab() {
  const logMassG = useArchive((s) => s.logMassG);
  const setLogMassG = useArchive((s) => s.setLogMassG);
  const fPbh = useArchive((s) => s.fPbh);
  const setFPbh = useArchive((s) => s.setFPbh);
  const plotPoints = useArchive((s) => s.plotPoints);

  const massG = 10 ** logMassG;
  const cons = constraintSeries(plotPoints);
  const tE = einsteinHours(massG);
  const tF = femtoHours();
  const gamma = microlensingGamma(massG, fPbh);
  const nExp = expectedEvents(massG, fPbh);

  const tSeries = Array.from({ length: 160 }, (_, i) => {
    const hours = 10 ** (-2 + (4 * i) / 159);
    const muMicro = Math.log(Math.max(tE, 1e-6));
    const muFemto = Math.log(Math.max(tF, 1e-6));
    const muStar = Math.log(30 * 24);
    return {
      hours,
      pbh: lognormPdf(hours, muMicro, 0.4),
      femto: lognormPdf(hours, muFemto, 0.35),
      star: lognormPdf(hours, muStar, 0.45),
    };
  });
  const peak = Math.max(...tSeries.flatMap((p) => [p.pbh, p.femto, p.star]));
  const tNorm = tSeries.map((p) => ({
    hours: p.hours,
    pbh: p.pbh / peak,
    femto: p.femto / peak,
    star: p.star / peak,
  }));

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">Volume V</p>
        <h1 className="font-display text-4xl tracking-tight">PBH observatory</h1>
        <p className="max-w-2xl text-sm text-muted">
          Asteroid-mass window, axion-minicluster mass function, microlensing rates, and femtolensing
          timescales. All limits are schematic 2026 envelopes for desk work.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lens mass</CardTitle>
            <CardDescription>Log₁₀(M / g). Asteroid window ~ 17–22.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Slider min={16} max={23} step={0.05} value={[logMassG]} onValueChange={(v) => setLogMassG(v[0] ?? logMassG)} />
            <Stat label="Mass" value={`${formatSci(massG, 2)} g`} />
            <Stat label="t_E (geo)" value={`${formatSci(tE, 2)} h`} />
            <Stat label="t_E (femto)" value={`${formatSci(tF, 2)} h`} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Dark-matter fraction</CardTitle>
            <CardDescription>Assumed f_PBH for rate forecasts.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Slider min={0.001} max={1} step={0.001} value={[fPbh]} onValueChange={(v) => setFPbh(v[0] ?? fPbh)} />
            <Stat label="f_PBH" value={fPbh.toFixed(3)} />
            <Stat label="Γ per star / yr" value={formatSci(gamma, 2)} />
            <Stat label="N_exp (10⁹ stars, 10 yr)" value={formatSci(nExp, 1)} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mass function vs limits</CardTitle>
          <CardDescription>Blue: example minicluster dN/dlogM. Red: f_PBH upper envelope.</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={cons} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
              <XAxis dataKey="logM" tick={{ fill: "var(--color-subtle)", fontSize: 11 }} />
              <YAxis tick={{ fill: "var(--color-subtle)", fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="dndlogm" name="dN/dlogM" stroke={chartStroke.massfn} fill={chartStroke.massfn} fillOpacity={0.16} />
              <Line type="monotone" dataKey="fUpper" name="f_PBH upper" stroke={chartStroke.limit} dot={false} strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Timescale distributions</CardTitle>
          <CardDescription>
            Geometric microlensing for the selected mass, femtolensing (wave limit), and a 0.3 M_⊙
            stellar population.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={tNorm} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
              <XAxis dataKey="hours" type="number" scale="log" domain={["auto", "auto"]} tick={{ fill: "var(--color-subtle)", fontSize: 11 }} />
              <YAxis tick={{ fill: "var(--color-subtle)", fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="pbh" name="PBH microlens" stroke={chartStroke.photon} dot={false} strokeWidth={2} />
              <Line type="monotone" dataKey="femto" name="Femtolens" stroke={chartStroke.neutrino} dot={false} strokeWidth={2} />
              <Line type="monotone" dataKey="star" name="Stellar" stroke={chartStroke.hawking} dot={false} strokeDasharray="4 3" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <p className="font-mono text-sm tabular-nums">{value}</p>
    </div>
  );
}
