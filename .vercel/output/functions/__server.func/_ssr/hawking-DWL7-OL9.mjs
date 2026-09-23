import { n as formatSci } from "./utils-i9omAUsS.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as useArchive, t as ALL_FIELDS } from "./store-DZpZNuye.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-C411NYug.mjs";
import { a as integratePower, c as solarMasses, i as hawkingTMeV, l as spectrumSeries, n as gStarOfTMeV, o as normalizeSpectrum, r as hawkingTKelvin, s as pageLuminosityW, t as evaporationYears } from "./hawking-FtNpduPM.mjs";
import { n as tooltipStyle, t as chartStroke } from "./theme-Be9A2PfC.mjs";
import { c as ResponsiveContainer, i as XAxis, l as Tooltip, n as LineChart, o as Line, r as YAxis, s as CartesianGrid } from "../_libs/recharts+[...].mjs";
import { t as Label } from "./label-cZrzalh1.mjs";
import { t as Slider } from "./slider-D2zuYyRn.mjs";
import { t as Switch } from "./switch-XVHdOxWS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hawking-DWL7-OL9.js
var import_jsx_runtime = require_jsx_runtime();
var FIELD_LABEL = {
	scalar: "Scalar",
	fermion: "Dirac fermion",
	photon: "Photon",
	neutrino: "Neutrino",
	vector: "Vector",
	graviton: "Graviton s=2"
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
		share: integratePower(raw, f)
	}));
	const sum = powers.reduce((a, b) => a + b.share, 0) || 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] uppercase tracking-[0.2em] text-subtle",
						children: "Volume IV"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl tracking-tight",
						children: "Hawking lab"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-2xl text-sm text-muted",
						children: "Bose and Fermi channels, graybody-inspired weights, total power, and lifetime. Mass is a logarithmic control shared with the rest of the desk."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Black hole mass" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Log₁₀(M / kg) from 10¹⁰ kg (rapid PBH) to 10¹⁸ kg (long-lived)." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					min: 10,
					max: 18,
					step: .05,
					value: [logMassKg],
					onValueChange: (v) => setLogMassKg(v[0] ?? logMassKg)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Mass",
							value: massLabel(massKg, units)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "T_H",
							value: `${formatSci(tK, 2)} K`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "T_H",
							value: `${formatSci(tMeV, 2)} MeV`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "g_*",
							value: gStar.toFixed(2)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Power",
							value: `${formatSci(pageLuminosityW(massKg, gStar), 2)} W`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Lifetime",
							value: `${formatSci(evaporationYears(massKg, gStar), 2)} yr`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "M / M_⊙",
							value: formatSci(solarMasses(massKg), 3)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "ω peak ~",
							value: `${(2.8 * tK).toExponential(2)} K eq.`
						})
					]
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Channels" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Enable species. Photon and neutrino dominate late evaporation." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-3",
				children: ALL_FIELDS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center justify-between gap-3 rounded-md border border-border bg-elevated px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm",
						children: FIELD_LABEL[f]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: fields[f],
						onCheckedChange: () => toggleField(f)
					})]
				}, f))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Normalized spectra" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "dΓ/dω versus ω / T_H. Log x, peak-normalized." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "h-80",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data: series,
						margin: {
							top: 8,
							right: 12,
							left: -16,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "var(--color-border)",
								strokeDasharray: "3 3"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "x",
								type: "number",
								scale: "log",
								domain: [.02, 20],
								tick: {
									fill: "var(--color-subtle)",
									fontSize: 11
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: {
								fill: "var(--color-subtle)",
								fontSize: 11
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
							ALL_FIELDS.filter((f) => fields[f]).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: f,
								stroke: chartStroke[f],
								dot: false,
								strokeWidth: 2,
								name: FIELD_LABEL[f]
							}, f))
						]
					})
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Channel power share" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Relative integral of the un-normalized toy spectra." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "flex flex-col gap-2",
				children: powers.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-28 text-sm",
							children: FIELD_LABEL[p.field]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-2 flex-1 overflow-hidden rounded-full bg-elevated",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-accent",
								style: { width: `${100 * p.share / sum}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "w-14 text-right font-mono text-xs tabular-nums text-muted",
							children: [(100 * p.share / sum).toFixed(1), "%"]
						})
					]
				}, p.field))
			})] })
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "font-mono text-sm tabular-nums",
		children: value
	})] });
}
function massLabel(massKg, units) {
	if (units === "astro") return `${formatSci(solarMasses(massKg), 3)} M_⊙`;
	if (units === "natural") return `${formatSci(massKg, 2)} kg`;
	return `${formatSci(massKg, 2)} kg`;
}
//#endregion
export { HawkingLab as component };
