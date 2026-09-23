import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-D1mxjGrP.mjs";
import { n as ALL_WIDGETS, r as useArchive, t as ALL_FIELDS } from "./store-DZpZNuye.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-C411NYug.mjs";
import { t as Label } from "./label-cZrzalh1.mjs";
import { t as Slider } from "./slider-D2zuYyRn.mjs";
import { t as Switch } from "./switch-XVHdOxWS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/controls-Bm3jp6hl.js
var import_jsx_runtime = require_jsx_runtime();
var FIELD_LABEL = {
	scalar: "Scalar",
	fermion: "Fermion",
	photon: "Photon",
	neutrino: "Neutrino",
	vector: "Vector",
	graviton: "Graviton"
};
var WIDGET_LABEL = {
	kpis: "KPI strip",
	spectrum: "Hawking preview",
	pagecurve: "Page curve",
	constraints: "PBH constraints",
	archive: "Continue reading",
	pqc: "PQC sizes",
	labs: "Volume tiles"
};
function ControlsPage() {
	const s = useArchive();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] uppercase tracking-[0.2em] text-subtle",
						children: "Desk"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl tracking-tight",
						children: "Controls"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-2xl text-sm text-muted",
						children: "Theme, density, units, dashboard widgets, radiation channels, plot resolution, and cosmology sliders. Everything persists in this browser. Nothing is gated."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Appearance" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Ink for night work. Paper for print-like reading." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex flex-col gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segment, {
								label: "Theme",
								value: s.theme,
								options: [{
									id: "ink",
									label: "Ink"
								}, {
									id: "paper",
									label: "Paper"
								}],
								onChange: (v) => s.setTheme(v)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segment, {
								label: "Density",
								value: s.density,
								options: [
									{
										id: "compact",
										label: "Compact"
									},
									{
										id: "comfortable",
										label: "Comfortable"
									},
									{
										id: "spacious",
										label: "Spacious"
									}
								],
								onChange: (v) => s.setDensity(v)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segment, {
								label: "Units",
								value: s.units,
								options: [
									{
										id: "si",
										label: "SI"
									},
									{
										id: "natural",
										label: "Natural"
									},
									{
										id: "astro",
										label: "Astro"
									}
								],
								onChange: (v) => s.setUnits(v)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: "Collapsed sidebar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: s.sidebarCollapsed,
									onCheckedChange: s.toggleSidebar
								})]
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Plot engine" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Shared sample count for spectra and cosmology curves." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex flex-col gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Points · ", s.plotPoints] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								min: 40,
								max: 400,
								step: 10,
								value: [s.plotPoints],
								onValueChange: (v) => s.setPlotPoints(v[0] ?? s.plotPoints)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Hawking log₁₀ M (kg) · ", s.logMassKg.toFixed(2)] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								min: 10,
								max: 18,
								step: .05,
								value: [s.logMassKg],
								onValueChange: (v) => s.setLogMassKg(v[0] ?? s.logMassKg)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["PBH log₁₀ M (g) · ", s.logMassG.toFixed(2)] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								min: 16,
								max: 23,
								step: .05,
								value: [s.logMassG],
								onValueChange: (v) => s.setLogMassG(v[0] ?? s.logMassG)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["f_PBH · ", s.fPbh.toFixed(3)] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								min: .001,
								max: 1,
								step: .001,
								value: [s.fPbh],
								onValueChange: (v) => s.setFPbh(v[0] ?? s.fPbh)
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Command widgets" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Show or hide modules on the command center." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "flex flex-col gap-3",
						children: ALL_WIDGETS.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: WIDGET_LABEL[w]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: s.widgets[w],
								onCheckedChange: () => s.toggleWidget(w)
							})]
						}, w))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Radiation fields" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Applies to the command preview and the Hawking lab." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "flex flex-col gap-3",
						children: ALL_FIELDS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: FIELD_LABEL[f]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: s.fields[f],
								onCheckedChange: () => s.toggleField(f)
							})]
						}, f))
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => s.reset(),
					children: "Reset all controls"
				})
			})
		]
	});
}
function Segment({ label, value, options, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-1 rounded-md border border-border bg-elevated p-1",
			children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => onChange(o.id),
				className: o.id === value ? "rounded-sm bg-accent px-3 py-1.5 text-xs text-accent-fg" : "rounded-sm px-3 py-1.5 text-xs text-muted hover:text-fg",
				children: o.label
			}, o.id))
		})]
	});
}
//#endregion
export { ControlsPage as component };
