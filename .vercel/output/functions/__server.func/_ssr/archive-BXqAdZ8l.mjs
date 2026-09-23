import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-i9omAUsS.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Bookmark } from "../_libs/lucide-react.mjs";
import { i as Route$1 } from "./router-tr4TGu07.mjs";
import { r as useArchive } from "./store-DZpZNuye.mjs";
import { i as searchChapters, n as VOLUMES, t as CHAPTERS } from "./chapters-BxlCAlbu.mjs";
import { t as Badge } from "./badge-B0fZrQZA.mjs";
import { t as Input } from "./input-DNAf89cG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/archive-BXqAdZ8l.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ArchiveIndex() {
	const search = Route$1.useSearch();
	const [q, setQ] = (0, import_react.useState)(search.q ?? "");
	const [volume, setVolume] = (0, import_react.useState)(search.volume || "all");
	const bookmarks = useArchive((s) => s.bookmarks);
	const toggleBookmark = useArchive((s) => s.toggleBookmark);
	const list = (0, import_react.useMemo)(() => {
		let rows = searchChapters(q);
		if (volume !== "all") rows = rows.filter((c) => c.volume === volume);
		return rows;
	}, [q, volume]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] uppercase tracking-[0.2em] text-subtle",
						children: "Monologue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl tracking-tight",
						children: "Archive"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-2xl text-sm text-muted",
						children: "Full scientific spine from pruning through femtolensing. Search, filter by volume, bookmark locally."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Search titles, tags, body…",
				"aria-label": "Search archive"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilterChip, {
					active: volume === "all",
					onClick: () => setVolume("all"),
					children: ["All · ", CHAPTERS.length]
				}), VOLUMES.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilterChip, {
					active: volume === v.id,
					onClick: () => setVolume(v.id),
					children: [
						v.roman,
						" ",
						v.title
					]
				}, v.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2",
				children: list.map((c) => {
					const marked = bookmarks.includes(c.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-stretch gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/archive/$chapterId",
							params: { chapterId: c.id },
							className: "min-w-0 flex-1 rounded-xl border border-border bg-surface p-4 transition-colors hover:bg-elevated",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[11px] text-subtle",
											children: c.number
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: c.volume }),
										c.lab && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											tone: "ok",
											children: "lab"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-1 font-display text-xl",
									children: c.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted",
									children: c.dek
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: cn("rounded-xl border border-border px-3 text-muted hover:text-fg", marked && "text-fg"),
							"aria-label": marked ? "Remove bookmark" : "Bookmark",
							onClick: () => toggleBookmark(c.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: cn("size-4", marked && "fill-current") })
						})]
					}) }, c.id);
				})
			}),
			list.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-12 text-center text-sm text-muted",
				children: "No chapters match that query."
			})
		]
	});
}
function FilterChip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick,
		className: cn("rounded-full border px-3 py-1.5 text-xs", active ? "border-accent bg-elevated text-fg" : "border-border text-muted hover:text-fg"),
		children
	});
}
//#endregion
export { ArchiveIndex as component };
