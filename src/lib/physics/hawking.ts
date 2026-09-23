import { C, G, HBAR, KB, M_SUN, MEV_J } from "./constants";
import type { RadiationField } from "@/lib/store";

export function hawkingTKelvin(massKg: number): number {
  return (HBAR * C ** 3) / (8 * Math.PI * G * massKg * KB);
}

export function hawkingTMeV(massKg: number): number {
  return (KB * hawkingTKelvin(massKg)) / MEV_J;
}

export function nBose(x: number): number {
  if (x > 40) return Math.exp(-x);
  const e = Math.exp(x);
  return 1 / (e - 1);
}

export function nFermi(x: number): number {
  if (x > 40) return Math.exp(-x);
  const e = Math.exp(x);
  return 1 / (e + 1);
}

export type SpectrumPoint = {
  x: number;
  scalar: number;
  fermion: number;
  photon: number;
  neutrino: number;
  vector: number;
  graviton: number;
};

const PRE: Record<RadiationField, { power: number; bose: boolean; extraOmega: number }> = {
  scalar: { power: 1, bose: true, extraOmega: 0 },
  fermion: { power: 0.67, bose: false, extraOmega: 0 },
  photon: { power: 2.1, bose: true, extraOmega: 0 },
  neutrino: { power: 1.8, bose: false, extraOmega: 0 },
  vector: { power: 2.0, bose: true, extraOmega: 0 },
  graviton: { power: 0.35, bose: true, extraOmega: 2 },
};

export function spectrumSeries(points: number): SpectrumPoint[] {
  const out: SpectrumPoint[] = [];
  const xmin = 1e-2;
  const xmax = 20;
  const n = Math.max(40, points);
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const x = xmin * Math.pow(xmax / xmin, t);
    const row: SpectrumPoint = {
      x,
      scalar: 0,
      fermion: 0,
      photon: 0,
      neutrino: 0,
      vector: 0,
      graviton: 0,
    };
    (Object.keys(PRE) as RadiationField[]).forEach((f) => {
      const cfg = PRE[f];
      const occ = cfg.bose ? nBose(x) : nFermi(x);
      const omegaPow = 3 + cfg.extraOmega;
      row[f] = cfg.power * Math.pow(x, omegaPow) * occ;
    });
    out.push(row);
  }
  return out;
}

export function normalizeSpectrum(
  series: SpectrumPoint[],
  fields: Record<RadiationField, boolean>,
): SpectrumPoint[] {
  let peak = 0;
  for (const p of series) {
    (Object.keys(PRE) as RadiationField[]).forEach((f) => {
      if (fields[f]) peak = Math.max(peak, p[f]);
    });
  }
  if (peak <= 0) return series;
  return series.map((p) => {
    const n = { ...p };
    (Object.keys(PRE) as RadiationField[]).forEach((f) => {
      n[f] = p[f] / peak;
    });
    return n;
  });
}

export function integratePower(
  series: SpectrumPoint[],
  field: RadiationField,
): number {
  if (series.length < 2) return 0;
  let acc = 0;
  for (let i = 1; i < series.length; i++) {
    const x0 = series[i - 1].x;
    const x1 = series[i].x;
    const y0 = series[i - 1][field];
    const y1 = series[i][field];
    acc += 0.5 * (y0 + y1) * (x1 - x0);
  }
  return acc;
}

/** Approximate luminosity in watts, Page 1976 scaling. */
export function luminosityWatts(massKg: number, gStar = 10.75): number {
  const t = hawkingTKelvin(massKg);
  const sigma = 5.670374419e-8;
  const rs = (2 * G * massKg) / C ** 2;
  const area = 4 * Math.PI * rs * rs;
  return 3.6e-29 * gStar * Math.pow(M_SUN / massKg, 2) + 1e-40 * sigma * area * t ** 4 * 0;
}

export function pageLuminosityW(massKg: number, gStar = 10.75): number {
  return 7.8e-29 * gStar * Math.pow(M_SUN / Math.max(massKg, 1e-6), 2);
}

export function evaporationYears(massKg: number, gStar = 10.75): number {
  const tauSec = (5120 * Math.PI * G * G * Math.pow(massKg, 3)) / (HBAR * C ** 4);
  return tauSec / (gStar / 10.75) / (365.25 * 24 * 3600);
}

export function gStarOfTMeV(tMeV: number): number {
  if (tMeV > 1e5) return 108.75;
  if (tMeV > 150) return 61.75;
  if (tMeV > 1) return 10.75;
  return 3.36;
}

export function solarMasses(massKg: number): number {
  return massKg / M_SUN;
}
