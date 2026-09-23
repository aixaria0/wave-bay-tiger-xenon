import { createFileRoute } from "@tanstack/react-router";
import {
  CartesianGrid,
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
import { Switch } from "@/components/ui/switch";
import { ALL_FIELDS, useArchive, type RadiationField } from "@/lib/store";
import {
  evaporationYears,
  gStarOfTMeV,
  hawkingTKelvin,
  hawkingTMeV,
  integratePower,
  normalizeSpectrum,
  pageLuminosityW,
  solarMasses,
  spectrumSeries,
} from "@/lib/physics/hawking";
import { formatSci } from "@/lib/utils";
import { chartStroke, tooltipStyle } from "@/components/charts/theme";

export const Route = createFileRoute("/_app/hawking")({ component: HawkingLab });

const FIELD_LABEL: Record<RadiationField, string> = {
  scalar: "Scalar",
  fermion: "Dirac fermion",
  photon: "Photon",
  neutrino: "Neutrino",
  vector: "Vector",
  graviton: "Graviton s=2",
};

function HawkingLab() {
  const logMassKg = useArchive((s) => s.logMassKg);
  const setLogMassKg = useArchive((s) => s.setLogMassKg);
  const fields = useArchive((s) => s.fields);
  const toggleField = useArchive((s) => s.toggleField);
  const plotPoints = useArchive((s) => s.plotPoints);
  const units = useArchive((s) => s.units);

  const massKg = 10 ** logMassKg;
  const tK = hawkingTKelvin(massKg);
  const tMeV = hawkingTMeV(massKg);
  const gStar = gStarOfTMeV(tMeV);
  const series = normalizeSpectrum(spectrumSeries(plotPoints), fields);
  const raw = spectrumSeries(plotPoints);

  const powers = ALL_FIELDS.filter((f) => fields[f]).map((f) => ({
    field: f,
    share: integratePower(raw, f),
  }));
  const sum = powers.reduce((a, b) => a + b.share, 0) || 1;

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">Volume IV</p>
        <h1 className="font-display text-4xl tracking-tight">Hawking lab</h1>
        <p className="max-w-2xl text-sm text-muted">
          Bose and Fermi channels, graybody-inspired weights, total power, and lifetime. Mass is a
          logarithmic control shared with the rest of the desk.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Black hole mass</CardTitle>
          <CardDescription>Log₁₀(M / kg) from 10¹⁰ kg (rapid PBH) to 10¹⁸ kg (long-lived).</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Slider
            min={10}
            max={18}
            step={0.05}
            value={[logMassKg]}
            onValueChange={(v) => setLogMassKg(v[0] ?? logMassKg)}
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Mass" value={massLabel(massKg, units)} />
            <Stat label="T_H" value={`${formatSci(tK, 2)} K`} />
            <Stat label="T_H" value={`${formatSci(tMeV, 2)} MeV`} />
            <Stat label="g_*" value={gStar.toFixed(2)} />
            <Stat label="Power" value={`${formatSci(pageLuminosityW(massKg, gStar), 2)} W`} />
            <Stat label="Lifetime" value={`${formatSci(evaporationYears(massKg, gStar), 2)} yr`} />
            <Stat label="M / M_⊙" value={formatSci(solarMasses(massKg), 3)} />
            <Stat label="ω peak ~" value={`${(2.8 * tK).toExponential(2)} K eq.`} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Channels</CardTitle>
          <CardDescription>Enable species. Photon and neutrino dominate late evaporation.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {ALL_FIELDS.map((f) => (
            <label key={f} className="flex items-center justify-between gap-3 rounded-md border border-border bg-elevated px-3 py-2">
              <span className="text-sm">{FIELD_LABEL[f]}</span>
              <Switch checked={fields[f]} onCheckedChange={() => toggleField(f)} />
            </label>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Normalized spectra</CardTitle>
          <CardDescription>dΓ/dω versus ω / T_H. Log x, peak-normalized.</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={series} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
              <XAxis
                dataKey="x"
                type="number"
                scale="log"
                domain={[0.02, 20]}
                tick={{ fill: "var(--color-subtle)", fontSize: 11 }}
              />
              <YAxis tick={{ fill: "var(--color-subtle)", fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} />
              {ALL_FIELDS.filter((f) => fields[f]).map((f) => (
                <Line key={f} type="monotone" dataKey={f} stroke={chartStroke[f]} dot={false} strokeWidth={2} name={FIELD_LABEL[f]} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Channel power share</CardTitle>
          <CardDescription>Relative integral of the un-normalized toy spectra.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {powers.map((p) => (
            <div key={p.field} className="flex items-center gap-3">
              <span className="w-28 text-sm">{FIELD_LABEL[p.field]}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-elevated">
                <div
                  className="h-full bg-accent"
                  style={{ width: `${(100 * p.share) / sum}%` }}
                />
              </div>
              <span className="w-14 text-right font-mono text-xs tabular-nums text-muted">
                {((100 * p.share) / sum).toFixed(1)}%
              </span>
            </div>
          ))}
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

function massLabel(massKg: number, units: string) {
  if (units === "astro") return `${formatSci(solarMasses(massKg), 3)} M_⊙`;
  if (units === "natural") return `${formatSci(massKg, 2)} kg`;
  return `${formatSci(massKg, 2)} kg`;
}
