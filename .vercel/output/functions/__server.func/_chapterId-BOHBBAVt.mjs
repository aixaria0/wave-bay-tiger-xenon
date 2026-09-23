import { i as __toESM } from "./_runtime.mjs";
import { t as cn } from "./_ssr/utils-i9omAUsS.mjs";
import { c as require_react, s as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./_ssr/button-D1mxjGrP.mjs";
import { v as Link, z as notFound } from "./_libs/@tanstack/react-router+[...].mjs";
import { f as Bookmark, g as ArrowLeft, h as ArrowRight, l as FlaskConical } from "./_libs/lucide-react.mjs";
import { r as Route } from "./_ssr/router-tr4TGu07.mjs";
import { r as useArchive } from "./_ssr/store-DZpZNuye.mjs";
import { r as getChapter, t as CHAPTERS } from "./_ssr/chapters-BxlCAlbu.mjs";
import { t as Badge } from "./_ssr/badge-B0fZrQZA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_chapterId-BOHBBAVt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LAB_TO = {
	"/pqc": "/pqc",
	"/hawking": "/hawking",
	"/pbh": "/pbh",
	"/holography": "/holography"
};
function ChapterPage() {
	const { chapterId } = Route.useParams();
	const chapter = getChapter(chapterId);
	const setLast = useArchive((s) => s.setLastChapter);
	const bookmarks = useArchive((s) => s.bookmarks);
	const toggleBookmark = useArchive((s) => s.toggleBookmark);
	(0, import_react.useEffect)(() => {
		if (chapter) setLast(chapter.id);
	}, [chapter, setLast]);
	if (!chapter) throw notFound();
	const idx = CHAPTERS.findIndex((c) => c.id === chapter.id);
	const prev = idx > 0 ? CHAPTERS[idx - 1] : null;
	const next = idx < CHAPTERS.length - 1 ? CHAPTERS[idx + 1] : null;
	const marked = bookmarks.includes(chapter.id);
	const labTo = chapter.lab && chapter.lab in LAB_TO ? LAB_TO[chapter.lab] : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto flex max-w-2xl flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/archive",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Index"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: chapter.volume }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[11px] text-subtle",
						children: chapter.number
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl tracking-tight",
						children: chapter.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: chapter.dek
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: chapter.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t }, t))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: marked ? "secondary" : "outline",
							size: "sm",
							onClick: () => toggleBookmark(chapter.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: cn("size-4", marked && "fill-current") }), marked ? "Bookmarked" : "Bookmark"]
						}), labTo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: labTo,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "size-4" }), " Open lab"]
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-4 text-[15px] leading-relaxed text-fg",
				children: chapter.body.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-pretty",
					children: p
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mt-4 grid gap-2 sm:grid-cols-2",
				children: [prev ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/archive/$chapterId",
					params: { chapterId: prev.id },
					className: "rounded-xl border border-border p-4 hover:bg-elevated",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-1 font-mono text-[10px] uppercase text-subtle",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3" }), " Previous"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg",
						children: prev.title
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}), next && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/archive/$chapterId",
					params: { chapterId: next.id },
					className: "rounded-xl border border-border p-4 text-right hover:bg-elevated",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center justify-end gap-1 font-mono text-[10px] uppercase tracking-wide text-subtle",
						children: ["Next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg",
						children: next.title
					})]
				})]
			})
		]
	});
}
//#endregion
export { ChapterPage as component };
