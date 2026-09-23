import { n as formatSci } from "./_ssr/utils-i9omAUsS.mjs";
import { s as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./_ssr/button-D1mxjGrP.mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { m as ArrowUpRight } from "./_libs/lucide-react.mjs";
import { r as useArchive } from "./_ssr/store-DZpZNuye.mjs";
import { n as VOLUMES, t as CHAPTERS } from "./_ssr/chapters-BxlCAlbu.mjs";
import { t as Badge } from "./_ssr/badge-B0fZrQZA.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./_ssr/card-C411NYug.mjs";
import { l as spectrumSeries, o as normalizeSpectrum, r as hawkingTKelvin, s as pageLuminosityW } from "./_ssr/hawking-FtNpduPM.mjs";
import { n as tooltipStyle, t as chartStroke } from "./_ssr/theme-Be9A2PfC.mjs";
import { i as pageCurve } from "./_ssr/holography-XWUMtUrN.mjs";
import { t as constraintSeries } from "./_ssr/pbh-MLMAS2Nr.mjs";
import { n as FALCON, r as KYBER, t as DILITHIUM } from "./_ssr/params-lN1Emy8G.mjs";
import { a as Area, c as ResponsiveContainer, i as XAxis, l as Tooltip, o as Line, r as YAxis, s as CartesianGrid, t as ComposedChart } from "./_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-BYTv756l.js
var import_jsx_runtime = require_jsx_runtime();
function pairSize(row) {
	const second = row.ct ?? row.sig ?? 0;
	return `${row.pk} / ${second}`;
}
function Home() {
	const widgets = useArchive((s) => s.widgets);
	const fields = useArchive((s) => s.fields);
	const plotPoints = useArchive((s) => s.plotPoints);
	const logMassKg = useArchive((s) => s.logMassKg);
	const bookmarks = useArchive((s) => s.bookmarks);
	const lastChapterId = useArchive((s) => s.lastChapterId);
	const massKg = 10 ** logMassKg;
	const spec = normalizeSpectrum(spectrumSeries(Math.min(plotPoints, 80)), fields);
	const page = pageCurve(80);
	const cons = constraintSeries(80);
	const last = CHAPTERS.find((c) => c.id === lastChapterId) ?? CHAPTERS[0];
	const pqcRows = [
		...KYBER,
		...DILITHIUM,
		...FALCON
	].slice(0, 6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden rounded-xl border border-border bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid-veil pointer-events-none absolute inset-0 opacity-70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex flex-col gap-4 p-6 sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] uppercase tracking-[0.22em] text-subtle",
							children: "Volume set 52–145 · extended field notes"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "max-w-2xl font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl",
							children: "The complete fracture, under glass."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-xl text-sm leading-relaxed text-muted",
							children: "A local research desk for the monologue: compression, post-quantum primitives, holographic reconstruction, and primordial black holes. Every control is on-device. No remote gates, no 403s."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/archive",
										children: "Open archive"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/hawking",
										children: "Hawking lab"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/controls",
										children: "Custom controls"
									})
								})
							]
						})
					]
				})]
			}),
			widgets.kpis && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Chapters",
						value: String(CHAPTERS.length),
						hint: "Indexed monologue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Volumes",
						value: String(VOLUMES.length),
						hint: "Compression → cosmology"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "T_H",
						value: `${formatSci(hawkingTKelvin(massKg), 2)} K`,
						hint: `M = 10^${logMassKg.toFixed(1)} kg`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Luminosity",
						value: `${formatSci(pageLuminosityW(massKg), 2)} W`,
						hint: "Page scaling"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [
					widgets.spectrum && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Hawking channels" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Normalized dΓ/dω versus ω / T_H. Toggle fields in Controls." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "h-56",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComposedChart, {
								data: spec,
								margin: {
									top: 8,
									right: 8,
									left: -20,
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
									fields.photon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										type: "monotone",
										dataKey: "photon",
										stroke: chartStroke.photon,
										dot: false,
										strokeWidth: 2
									}),
									fields.neutrino && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										type: "monotone",
										dataKey: "neutrino",
										stroke: chartStroke.neutrino,
										dot: false,
										strokeWidth: 1.5
									}),
									fields.scalar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										type: "monotone",
										dataKey: "scalar",
										stroke: chartStroke.scalar,
										dot: false
									}),
									fields.fermion && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										type: "monotone",
										dataKey: "fermion",
										stroke: chartStroke.fermion,
										dot: false
									}),
									fields.vector && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										type: "monotone",
										dataKey: "vector",
										stroke: chartStroke.vector,
										dot: false
									}),
									fields.graviton && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										type: "monotone",
										dataKey: "graviton",
										stroke: chartStroke.graviton,
										dot: false
									})
								]
							})
						})
					})] }),
					widgets.pagecurve && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Page curve" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Hawking saddle versus island / replica-wormhole saddle." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "h-56",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComposedChart, {
								data: page,
								margin: {
									top: 8,
									right: 8,
									left: -20,
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
										stroke: chartStroke.hawking,
										dot: false,
										strokeDasharray: "4 4"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										type: "monotone",
										dataKey: "island",
										stroke: chartStroke.island,
										dot: false,
										strokeDasharray: "2 4"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "fine",
										stroke: chartStroke.fine,
										fill: chartStroke.fine,
										fillOpacity: .12
									})
								]
							})
						})
					})] }),
					widgets.constraints && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Asteroid-mass window" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Minicluster mass function against f_PBH upper limits." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "h-56",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComposedChart, {
								data: cons,
								margin: {
									top: 8,
									right: 8,
									left: -20,
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
										stroke: chartStroke.massfn,
										fill: chartStroke.massfn,
										fillOpacity: .15
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										type: "monotone",
										dataKey: "fUpper",
										stroke: chartStroke.limit,
										dot: false
									})
								]
							})
						})
					})] }),
					widgets.pqc && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "PQC sizes" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Public key + ciphertext / signature, bytes." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex flex-col gap-3 text-sm",
						children: [pqcRows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3 border-b border-border pb-2 last:border-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-muted tabular-nums",
								children: pairSize(row)
							})]
						}, row.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							className: "self-start",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/pqc",
								children: ["Open PQC lab ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
							})
						})]
					})] })
				]
			}),
			widgets.archive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Continue reading"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [bookmarks.length, " bookmarked"] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/archive/$chapterId",
					params: { chapterId: last.id },
					className: "rounded-xl border border-border bg-surface p-5 transition-colors hover:bg-elevated",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-[11px] uppercase tracking-widest text-subtle",
							children: [
								last.number,
								" · ",
								last.volume
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-xl",
							children: last.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: last.dek
						})
					]
				})]
			}),
			widgets.labs && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: VOLUMES.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/archive",
					search: { volume: v.id },
					className: "rounded-xl border border-border bg-surface p-4 transition-colors hover:bg-elevated",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] text-subtle",
							children: v.roman
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg",
							children: v.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: v.range
						})
					]
				}, v.id))
			})
		]
	});
}
function Kpi({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[10px] uppercase tracking-widest text-subtle",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-2xl tabular-nums leading-none",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted",
				children: hint
			})
		]
	});
}
//#endregion
export { Home as component };
