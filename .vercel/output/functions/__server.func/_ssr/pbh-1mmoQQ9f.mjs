import { n as formatSci } from "./utils-i9omAUsS.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as useArchive } from "./store-DZpZNuye.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-C411NYug.mjs";
import { n as tooltipStyle, t as chartStroke } from "./theme-Be9A2PfC.mjs";
import { a as lognormPdf, i as femtoHours, n as einsteinHours, o as microlensingGamma, r as expectedEvents, t as constraintSeries } from "./pbh-MLMAS2Nr.mjs";
import { a as Area, c as ResponsiveContainer, i as XAxis, l as Tooltip, n as LineChart, o as Line, r as YAxis, s as CartesianGrid, t as ComposedChart } from "../_libs/recharts+[...].mjs";
import { t as Label } from "./label-cZrzalh1.mjs";
import { t as Slider } from "./slider-D2zuYyRn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pbh-1mmoQQ9f.js
var import_jsx_runtime = require_jsx_runtime();
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
		const hours = 10 ** (-2 + 4 * i / 159);
		const muMicro = Math.log(Math.max(tE, 1e-6));
		const muFemto = Math.log(Math.max(tF, 1e-6));
		const muStar = Math.log(720);
		return {
			hours,
			pbh: lognormPdf(hours, muMicro, .4),
			femto: lognormPdf(hours, muFemto, .35),
			star: lognormPdf(hours, muStar, .45)
		};
	});
	const peak = Math.max(...tSeries.flatMap((p) => [
		p.pbh,
		p.femto,
		p.star
	]));
	const tNorm = tSeries.map((p) => ({
		hours: p.hours,
		pbh: p.pbh / peak,
		femto: p.femto / peak,
		star: p.star / peak
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] uppercase tracking-[0.2em] text-subtle",
						children: "Volume V"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl tracking-tight",
						children: "PBH observatory"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-2xl text-sm text-muted",
						children: "Asteroid-mass window, axion-minicluster mass function, microlensing rates, and femtolensing timescales. All limits are schematic 2026 envelopes for desk work."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Lens mass" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Log₁₀(M / g). Asteroid window ~ 17–22." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							min: 16,
							max: 23,
							step: .05,
							value: [logMassG],
							onValueChange: (v) => setLogMassG(v[0] ?? logMassG)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Mass",
							value: `${formatSci(massG, 2)} g`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "t_E (geo)",
							value: `${formatSci(tE, 2)} h`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "t_E (femto)",
							value: `${formatSci(tF, 2)} h`
						})
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Dark-matter fraction" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Assumed f_PBH for rate forecasts." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							min: .001,
							max: 1,
							step: .001,
							value: [fPbh],
							onValueChange: (v) => setFPbh(v[0] ?? fPbh)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "f_PBH",
							value: fPbh.toFixed(3)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Γ per star / yr",
							value: formatSci(gamma, 2)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "N_exp (10⁹ stars, 10 yr)",
							value: formatSci(nExp, 1)
						})
					]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Mass function vs limits" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Blue: example minicluster dN/dlogM. Red: f_PBH upper envelope." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "h-80",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComposedChart, {
						data: cons,
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
								dataKey: "logM",
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "dndlogm",
								name: "dN/dlogM",
								stroke: chartStroke.massfn,
								fill: chartStroke.massfn,
								fillOpacity: .16
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "fUpper",
								name: "f_PBH upper",
								stroke: chartStroke.limit,
								dot: false,
								strokeWidth: 2
							})
						]
					})
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Timescale distributions" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Geometric microlensing for the selected mass, femtolensing (wave limit), and a 0.3 M_⊙ stellar population." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "h-80",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data: tNorm,
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
								dataKey: "hours",
								type: "number",
								scale: "log",
								domain: ["auto", "auto"],
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "pbh",
								name: "PBH microlens",
								stroke: chartStroke.photon,
								dot: false,
								strokeWidth: 2
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "femto",
								name: "Femtolens",
								stroke: chartStroke.neutrino,
								dot: false,
								strokeWidth: 2
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "star",
								name: "Stellar",
								stroke: chartStroke.hawking,
								dot: false,
								strokeDasharray: "4 3"
							})
						]
					})
				})
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
//#endregion
export { PbhLab as component };
