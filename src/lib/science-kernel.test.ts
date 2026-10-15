import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  evaporationYears,
  hawkingTKelvin,
  normalizeSpectrum,
  spectrumSeries,
} from "./physics/hawking.ts";
import { generalizedEntropy, jonesIndexAllowed, pageCurve } from "./physics/holography.ts";
import { constraintSeries, fPbhUpper } from "./physics/pbh.ts";
import { nttForward, toySharedSecret } from "./pqc/params.ts";

describe("Fracture Archive science kernel", () => {
  it("Hawking temperature scales inversely with mass", () => {
    const t1 = hawkingTKelvin(1e14);
    const t2 = hawkingTKelvin(2e14);
    assert.ok(Number.isFinite(t1) && t1 > 0);
    assert.ok(Math.abs(t1 / t2 - 2) < 1e-12);
  });

  it("evaporation lifetime scales cubically at fixed gStar", () => {
    const a = evaporationYears(1e11, 10.75);
    const b = evaporationYears(2e11, 10.75);
    assert.ok(Math.abs(b / a - 8) < 1e-10);
  });

  it("normalized spectra never exceed one for enabled channels", () => {
    const fields = { scalar: true, fermion: true, photon: true, neutrino: true, vector: false, graviton: false } as const;
    const rows = normalizeSpectrum(spectrumSeries(80), fields);
    const peak = Math.max(...rows.flatMap((r) => [r.scalar, r.fermion, r.photon, r.neutrino]));
    assert.ok(Math.abs(peak - 1) < 1e-12);
  });

  it("Page fine-grained branch is exactly the lower saddle", () => {
    for (const p of pageCurve(64)) assert.equal(p.fine, Math.min(p.hawking, p.island));
  });

  it("generalized entropy and Jones-index boundary remain deterministic", () => {
    assert.equal(generalizedEntropy(4, 0.6), 1.6);
    assert.equal(jonesIndexAllowed(4), true);
    assert.equal(jonesIndexAllowed(3.5), false);
  });

  it("schematic PBH envelope stays bounded and normalized", () => {
    for (let x = 16; x <= 23; x += 0.1) {
      const v = fPbhUpper(x);
      assert.ok(v >= 4e-4 && v <= 1);
    }
    const rows = constraintSeries(100);
    assert.ok(Math.abs(Math.max(...rows.map((r) => r.dndlogm)) - 1) < 1e-12);
  });

  it("educational NTT is deterministic and remains in Z_q", () => {
    const a = nttForward([1, 2, 3, 4, 5, 6, 7, 8], 17, 3);
    const b = nttForward([1, 2, 3, 4, 5, 6, 7, 8], 17, 3);
    assert.deepEqual(a, b);
    assert.equal(a.length, 8);
    assert.ok(a.every((v) => Number.isInteger(v) && v >= 0 && v < 17));
  });

  it("toy encapsulation is deterministic but seed-sensitive", () => {
    assert.deepEqual(toySharedSecret("fracture"), toySharedSecret("fracture"));
    assert.notDeepEqual(toySharedSecret("fracture"), toySharedSecret("archive"));
  });
});
