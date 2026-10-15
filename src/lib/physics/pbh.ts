import { M_SUN_G, YEAR } from "./constants.ts";
import { evaporationYears, gStarOfTMeV, hawkingTMeV } from "./hawking.ts";

export type ConstraintPoint = {
  logM: number;
  massG: number;
  massSolar: number;
  dndlogm: number;
  fUpper: number;
  gamma: number;
  nExp: number;
};

export function axionMiniclusterDndlogm(logM: number): number {
  const mu = 19.5;
  const sigma = 1.2;
  const gauss = Math.exp(-((logM - mu) ** 2) / (2 * sigma * sigma));
  const tail = Math.pow(10 ** logM / 1e22, -1.0) * Math.exp(-Math.sqrt(1e22 / 10 ** logM));
  return gauss + 0.22 * Math.min(tail, 4);
}

export function fPbhUpper(logM: number): number {
  let f = 1;
  if (logM >= 17 && logM <= 21.5) {
    f = Math.min(f, 0.05 + 0.05 * ((logM - 17) / 4.5));
  }
  if (logM >= 16.5 && logM <= 22.5) {
    f = Math.min(f, 0.012 * Math.pow(10, (logM - 19.5) / 3));
  }
  if (logM > 21) {
    f = Math.min(f, 0.006 * Math.pow(10, (logM - 21) / 2));
  }
  if (logM < 18.5) {
    f = Math.min(f, 0.12 * Math.pow(10, (logM - 17) / 1.5));
  }
  return Math.max(4e-4, Math.min(1, f));
}

export function microlensingGamma(massG: number, fPbh: number): number {
  return 2.5e-6 * fPbh * Math.sqrt(massG / 1e20);
}

export function expectedEvents(
  massG: number,
  fPbh: number,
  nStars = 1e9,
  years = 10,
): number {
  return nStars * years * microlensingGamma(massG, fPbh);
}

export function constraintSeries(n = 220): ConstraintPoint[] {
  const out: ConstraintPoint[] = [];
  for (let i = 0; i < n; i++) {
    const logM = 16 + (7 * i) / (n - 1);
    const massG = 10 ** logM;
    out.push({
      logM,
      massG,
      massSolar: massG / M_SUN_G,
      dndlogm: axionMiniclusterDndlogm(logM),
      fUpper: fPbhUpper(logM),
      gamma: microlensingGamma(massG, 0.1),
      nExp: expectedEvents(massG, 0.1),
    });
  }
  const peak = Math.max(...out.map((p) => p.dndlogm));
  return out.map((p) => ({ ...p, dndlogm: p.dndlogm / peak }));
}

export function einsteinHours(massG: number, vRel = 200): number {
  const mSun = massG / M_SUN_G;
  return 0.21 * 24 * Math.sqrt(Math.max(mSun, 1e-30)) * (200 / vRel);
}

export function femtoHours(vRel = 200, dLKpc = 8, lambdaNm = 500): number {
  return 0.1 * Math.sqrt((lambdaNm / 500) * (dLKpc / 1)) * (200 / vRel);
}

export function pbhSnapshot(massKg: number) {
  const tMeV = hawkingTMeV(massKg);
  const g = gStarOfTMeV(tMeV);
  return {
    tMeV,
    gStar: g,
    tauYr: evaporationYears(massKg, g),
    tauSec: evaporationYears(massKg, g) * YEAR,
  };
}

export function lognormPdf(x: number, mu: number, sigma: number): number {
  if (x <= 0) return 0;
  const l = Math.log(x);
  return (
    (1 / (x * sigma * Math.sqrt(2 * Math.PI))) *
    Math.exp(-((l - mu) ** 2) / (2 * sigma * sigma))
  );
}
