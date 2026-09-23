import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-DZpZNuye.js
var ALL_FIELDS = [
	"scalar",
	"fermion",
	"photon",
	"neutrino",
	"vector",
	"graviton"
];
var ALL_WIDGETS = [
	"kpis",
	"spectrum",
	"pagecurve",
	"constraints",
	"archive",
	"pqc",
	"labs"
];
var defaults = {
	theme: "ink",
	density: "comfortable",
	units: "astro",
	sidebarCollapsed: false,
	fields: {
		scalar: true,
		fermion: true,
		photon: true,
		neutrino: true,
		vector: false,
		graviton: false
	},
	widgets: {
		kpis: true,
		spectrum: true,
		pagecurve: true,
		constraints: true,
		archive: true,
		pqc: true,
		labs: true
	},
	logMassKg: 15,
	logMassG: 19.5,
	plotPoints: 180,
	fPbh: .1,
	bookmarks: [],
	lastChapterId: null
};
var useArchive = create()(persist((set, get) => ({
	...defaults,
	setTheme: (theme) => set({ theme }),
	setDensity: (density) => set({ density }),
	setUnits: (units) => set({ units }),
	toggleSidebar: () => set({ sidebarCollapsed: !get().sidebarCollapsed }),
	setSidebar: (v) => set({ sidebarCollapsed: v }),
	toggleField: (field) => set({ fields: {
		...get().fields,
		[field]: !get().fields[field]
	} }),
	setField: (field, on) => set({ fields: {
		...get().fields,
		[field]: on
	} }),
	toggleWidget: (widget) => set({ widgets: {
		...get().widgets,
		[widget]: !get().widgets[widget]
	} }),
	setLogMassKg: (v) => set({ logMassKg: v }),
	setLogMassG: (v) => set({ logMassG: v }),
	setPlotPoints: (v) => set({ plotPoints: v }),
	setFPbh: (v) => set({ fPbh: v }),
	toggleBookmark: (id) => {
		const cur = get().bookmarks;
		set({ bookmarks: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id] });
	},
	setLastChapter: (id) => set({ lastChapterId: id }),
	reset: () => set({ ...defaults })
}), { name: "fracture-archive-v1" }));
//#endregion
export { ALL_WIDGETS as n, useArchive as r, ALL_FIELDS as t };
