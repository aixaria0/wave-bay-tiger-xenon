import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as useArchive } from "./store-DZpZNuye.mjs";
import { t as Badge } from "./badge-B0fZrQZA.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-C411NYug.mjs";
import { n as tooltipStyle, t as chartStroke } from "./theme-Be9A2PfC.mjs";
import { i as pageCurve, n as generalizedEntropy, r as jonesIndexAllowed, t as JONES_DISCRETE } from "./holography-XWUMtUrN.mjs";
import { a as Area, c as ResponsiveContainer, i as XAxis, l as Tooltip, o as Line, r as YAxis, s as CartesianGrid, t as ComposedChart } from "../_libs/recharts+[...].mjs";
import { t as Label } from "./label-cZrzalh1.mjs";
import { t as Slider } from "./slider-D2zuYyRn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/holography-OOYAlqxz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HolographyLab() {
	const plotPoints = useArchive((s) => s.plotPoints);
	const page = pageCurve(plotPoints);
	const [area, setArea] = (0, import_react.useState)(4);
	const [sBulk, setSBulk] = (0, import_react.useState)(.6);
	const sgen = generalizedEntropy(area, sBulk);
	const [idx, setIdx] = (0, import_react.useState)(4);
	const allowed = (0, import_react.useMemo)(() => jonesIndexAllowed(idx), [idx]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] uppercase tracking-[0.2em] text-subtle",
						children: "Volume III"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl tracking-tight",
						children: "Holography studio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-2xl text-sm text-muted",
						children: "Page curve from competing saddles, generalized entropy of a candidate QES, and the Jones index spectrum for II₁ subfactors."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Unitary Page curve" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Fine-grained entropy is the minimum of the Hawking (disconnected) and island (replica-wormhole) saddles." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "h-80",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComposedChart, {
						data: page,
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
								dataKey: "t",
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
								dataKey: "hawking",
								name: "Hawking",
								stroke: chartStroke.hawking,
								dot: false,
								strokeDasharray: "5 4"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "island",
								name: "Island",
								stroke: chartStroke.island,
								dot: false,
								strokeDasharray: "2 3"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "fine",
								name: "Fine-grained",
								stroke: chartStroke.fine,
								fill: chartStroke.fine,
								fillOpacity: .14
							})
						]
					})
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "S_gen of a candidate QES" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "S_gen = Area / 4G + S_bulk. The true QES minimizes this." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Area / G" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							min: .2,
							max: 12,
							step: .1,
							value: [area],
							onValueChange: (v) => setArea(v[0] ?? area)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "S_bulk" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							min: 0,
							max: 3,
							step: .05,
							value: [sBulk],
							onValueChange: (v) => setSBulk(v[0] ?? sBulk)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-3xl tabular-nums",
							children: sgen.toFixed(3)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "After Page time the bulk term on the island wins over the growing Hawking area term, and the QES jumps behind the horizon."
						})
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Jones index" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Allowed values: 4 cos²(π/n) or ≥ 4." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Trial index" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							min: 1,
							max: 6,
							step: .01,
							value: [idx],
							onValueChange: (v) => setIdx(v[0] ?? idx)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-lg tabular-nums",
								children: idx.toFixed(3)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: allowed ? "ok" : "danger",
								children: allowed ? "Allowed" : "Forbidden"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid grid-cols-2 gap-1 font-mono text-xs text-muted",
							children: JONES_DISCRETE.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								"n=",
								j.n,
								" → ",
								j.index.toFixed(4)
							] }, j.n))
						})
					]
				})] })]
			})
		]
	});
}
//#endregion
export { HolographyLab as component };
