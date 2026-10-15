# Fracture Archive

**A local-first interactive research desk for post-quantum cryptography, holographic gravity, Hawking radiation, and primordial cosmology.**

Fracture Archive combines a searchable field-note archive with small, inspectable research instruments. It is designed to make assumptions and approximations visible: standardized parameter tables stay separate from educational transforms, formula-based quantities stay separate from schematic envelopes, and browser controls never pretend to be live observational data.

## What is here

- **Archive** — searchable, bookmarkable field notes organized across compression, post-quantum systems, holography, microstates, and primordial cosmology.
- **PQC lab** — ML-KEM, ML-DSA, and Falcon size tables plus a deliberately educational NTT and deterministic toy encapsulation.
- **Hawking lab** — Hawking temperature, evaporation-time scaling, channel toggles, and graybody-inspired toy spectra.
- **Holography studio** — a schematic Page curve, generalized entropy control, and Jones-index explorer.
- **PBH observatory** — an illustrative asteroid-mass window, schematic constraint envelope, and simplified lensing-rate/timescale models.
- **Controls** — persistent local theme, density, units, plot resolution, field selection, and dashboard composition.

## Evidence and model boundaries

| Surface | Status | Boundary |
| --- | --- | --- |
| ML-KEM / ML-DSA parameter tables | Reference parameters | Tables are for inspection and budgeting; this app does not implement production cryptography. |
| NTT + encapsulation demo | Educational | Small deterministic demonstrations, explicitly not wire-compatible production primitives. |
| Hawking temperature / lifetime scaling | Formula-based | Uses compact analytical formulas and a simplified effective-degree-of-freedom schedule. |
| Emission spectra | Toy / qualitative | Graybody-inspired relative weights, not precision numerical graybody factors. |
| Page curve / QES controls | Schematic | Interactive conceptual model, not a gravity solver. |
| PBH limits and event forecasts | Schematic | Desk-work envelopes and simplified rates, not a substitute for current survey likelihoods. |

## Run locally

```bash
npm ci
npm run dev
```

The dev server listens on port `8080`.

## Verify

```bash
npm run verify
```

This runs the unit suite, TypeScript checks, ESLint, and a development production build. App-specific tests cover the science/PQC kernels in addition to the platform/runtime tests.

## Architecture

```text
TanStack Start / React
        |
        +-- archive + local reading state (Zustand)
        +-- PQC lab -------- src/lib/pqc
        +-- Hawking lab ---- src/lib/physics/hawking.ts
        +-- Holography ----- src/lib/physics/holography.ts
        +-- PBH ------------ src/lib/physics/pbh.ts
        +-- Controls ------- persistent browser settings
```

The default workspace is local-first. Optional deployment/auth/database scaffolding remains isolated from the research kernels.

## Repository discipline

- Keep educational and schematic models labeled as such in both code and UI.
- Add a regression test when changing a numerical kernel.
- Do not promote browser demonstrations into production-security or observational-science claims.
- Prefer deterministic, inspectable transforms over hidden state.
