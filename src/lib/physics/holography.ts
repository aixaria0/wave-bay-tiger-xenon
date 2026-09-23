export type PagePoint = {
  t: number;
  hawking: number;
  island: number;
  fine: number;
};

export function pageCurve(n = 160): PagePoint[] {
  const out: PagePoint[] = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const hawking = Math.min(1, 0.08 + 1.15 * t);
    const island = t < 0.48 ? 1.05 : Math.max(0.04, 1.05 - 1.7 * (t - 0.48));
    const fine = Math.min(hawking, island);
    out.push({ t, hawking, island, fine });
  }
  return out;
}

export function generalizedEntropy(area: number, sBulk: number, G = 1): number {
  return area / (4 * G) + sBulk;
}

export function jonesIndexAllowed(index: number): boolean {
  if (index >= 4) return true;
  for (let n = 3; n <= 24; n++) {
    const v = 4 * Math.cos(Math.PI / n) ** 2;
    if (Math.abs(index - v) < 1e-6) return true;
  }
  return false;
}

export const JONES_DISCRETE = Array.from({ length: 10 }, (_, i) => {
  const n = i + 3;
  return { n, index: 4 * Math.cos(Math.PI / n) ** 2 };
});
