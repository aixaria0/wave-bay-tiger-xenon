import { i as __toESM } from "./_runtime.mjs";
import { t as cn } from "./_ssr/utils-i9omAUsS.mjs";
import { c as require_react, s as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./_ssr/button-D1mxjGrP.mjs";
import { d as useRouterState, m as Outlet, v as Link, y as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as PanelLeft, c as LayoutDashboard, d as Cpu, i as SlidersHorizontal, n as Waypoints, o as Orbit, p as BookOpen, s as Menu, t as X, u as Flame } from "./_libs/lucide-react.mjs";
import { r as useArchive } from "./_ssr/store-DZpZNuye.mjs";
import { t as CHAPTERS } from "./_ssr/chapters-BxlCAlbu.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent, s as DialogTrigger, t as Dialog } from "./_libs/@radix-ui/react-dialog+[...].mjs";
import { t as _e } from "./_libs/cmdk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-DSD1oYXJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Sheet({ children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		...props,
		children
	});
}
var SheetTrigger = DialogTrigger;
function SheetContent({ className, children, side = "left", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-bg/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed z-50 flex h-full w-[min(20rem,92vw)] flex-col border-border bg-surface p-4 shadow-[var(--shadow-panel)]", side === "left" ? "inset-y-0 left-0 border-r" : "inset-y-0 right-0 border-l", className),
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "sr-only",
				children: "Menu"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
				className: "absolute top-3 right-3 rounded-sm p-2 text-muted hover:text-fg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			}),
			children
		]
	})] });
}
var NAV = [
	{
		to: "/",
		label: "Command",
		hint: "Overview",
		icon: LayoutDashboard
	},
	{
		to: "/archive",
		label: "Archive",
		hint: "Monologue",
		icon: BookOpen
	},
	{
		to: "/pqc",
		label: "PQC lab",
		hint: "Kyber · Dilithium · Falcon",
		icon: Cpu
	},
	{
		to: "/hawking",
		label: "Hawking",
		hint: "Spectra · power",
		icon: Flame
	},
	{
		to: "/pbh",
		label: "PBH observatory",
		hint: "DM · lensing",
		icon: Orbit
	},
	{
		to: "/holography",
		label: "Holography",
		hint: "QES · Page",
		icon: Waypoints
	},
	{
		to: "/controls",
		label: "Controls",
		hint: "Full custom",
		icon: SlidersHorizontal
	}
];
function Sidebar({ onNavigate }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const collapsed = useArchive((s) => s.sidebarCollapsed);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: cn("flex h-full flex-col border-r border-border bg-surface", collapsed ? "w-[4.5rem]" : "w-60"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("flex items-center gap-3 border-b border-border px-4 py-4", collapsed && "justify-center px-2"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-8 items-center justify-center rounded-sm border border-border bg-elevated font-display text-sm text-fg",
					children: "F"
				}), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate font-display text-base leading-tight",
						children: "Fracture Archive"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate font-mono text-[10px] uppercase tracking-[0.16em] text-subtle",
						children: "Research ops"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex flex-1 flex-col gap-0.5 p-2",
				children: NAV.map((item) => {
					const active = item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(item.to + "/");
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						onClick: onNavigate,
						className: cn("flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm transition-colors", active ? "bg-elevated text-fg" : "text-muted hover:bg-elevated/70 hover:text-fg", collapsed && "justify-center px-0"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0" }), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex min-w-0 flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate font-mono text-[10px] text-subtle",
								children: item.hint
							})]
						})]
					}, item.to);
				})
			}),
			!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-4 pb-4 font-mono text-[10px] uppercase tracking-widest text-subtle",
				children: "Local · no auth · no 403"
			})
		]
	});
}
function CommandPalette() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [q, setQ] = (0, import_react.useState)("");
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setOpen((v) => !v);
			}
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	const chapters = (0, import_react.useMemo)(() => {
		const s = q.trim().toLowerCase();
		return (s ? CHAPTERS.filter((c) => (c.title + c.dek + c.tags.join(" ")).toLowerCase().includes(s)) : CHAPTERS).slice(0, 8);
	}, [q]);
	if (!open) return null;
	const go = (to) => {
		setOpen(false);
		setQ("");
		navigate({ to });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[70] flex items-start justify-center bg-bg/70 px-4 pt-[12vh]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "absolute inset-0 cursor-default",
			"aria-label": "Close",
			onClick: () => setOpen(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e, {
			className: "relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--shadow-panel)]",
			shouldFilter: false,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
				autoFocus: true,
				value: q,
				onValueChange: setQ,
				placeholder: "Jump to a lab or chapter…",
				className: "h-12 w-full border-b border-border bg-transparent px-4 text-sm outline-none placeholder:text-subtle"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.List, {
				className: "max-h-80 overflow-y-auto p-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
						className: "px-3 py-6 text-center text-sm text-muted",
						children: "Nothing matches."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
						heading: "Labs",
						children: NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
							value: n.label,
							onSelect: () => go(n.to),
							className: "flex cursor-pointer items-center justify-between rounded-sm px-3 py-2 text-sm text-fg data-[selected=true]:bg-elevated",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: n.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] text-subtle",
								children: n.to
							})]
						}, n.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
						heading: "Chapters",
						children: chapters.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
							value: c.title,
							onSelect: () => go(`/archive/${c.id}`),
							className: "flex cursor-pointer items-center justify-between rounded-sm px-3 py-2 text-sm text-fg data-[selected=true]:bg-elevated",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								c.number,
								" · ",
								c.title
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] text-subtle",
								children: c.volume
							})]
						}, c.id))
					})
				]
			})]
		})]
	});
}
function AppShell() {
	const theme = useArchive((s) => s.theme);
	const density = useArchive((s) => s.density);
	const toggleSidebar = useArchive((s) => s.toggleSidebar);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		document.documentElement.dataset.theme = theme === "paper" ? "paper" : "ink";
	}, [theme]);
	const pad = density === "compact" ? "p-4" : density === "spacious" ? "p-8" : "p-6";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden md:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sticky top-0 h-dvh",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-40 flex h-14 items-center gap-2 border-b border-border bg-bg/90 px-3 backdrop-blur-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
							open,
							onOpenChange: setOpen,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "md:hidden",
									"aria-label": "Open navigation",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
								side: "left",
								className: "p-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, { onNavigate: () => setOpen(false) })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "hidden md:inline-flex",
							onClick: toggleSidebar,
							"aria-label": "Collapse sidebar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeft, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hidden font-mono text-[11px] uppercase tracking-[0.18em] text-subtle sm:block",
							children: NAV.find((n) => n.to === "/" ? pathname === "/" : pathname.startsWith(n.to))?.label ?? "Archive"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
								className: "hidden rounded-sm border border-border px-2 py-1 font-mono text-[10px] text-subtle sm:inline",
								children: "⌘K"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/controls",
									children: "Controls"
								})
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: cn("mx-auto w-full max-w-6xl flex-1", pad),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandPalette, {})
		]
	});
}
var SplitComponent = AppShell;
//#endregion
export { SplitComponent as component };
