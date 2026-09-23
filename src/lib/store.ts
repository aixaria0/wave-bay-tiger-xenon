import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "ink" | "paper";
export type Density = "compact" | "comfortable" | "spacious";
export type UnitSystem = "si" | "natural" | "astro";

export type RadiationField =
  | "scalar"
  | "fermion"
  | "photon"
  | "neutrino"
  | "vector"
  | "graviton";

export const ALL_FIELDS: RadiationField[] = [
  "scalar",
  "fermion",
  "photon",
  "neutrino",
  "vector",
  "graviton",
];

export type DashboardWidget =
  | "kpis"
  | "spectrum"
  | "pagecurve"
  | "constraints"
  | "archive"
  | "pqc"
  | "labs";

export const ALL_WIDGETS: DashboardWidget[] = [
  "kpis",
  "spectrum",
  "pagecurve",
  "constraints",
  "archive",
  "pqc",
  "labs",
];

export type AppSettings = {
  theme: ThemeMode;
  density: Density;
  units: UnitSystem;
  sidebarCollapsed: boolean;
  fields: Record<RadiationField, boolean>;
  widgets: Record<DashboardWidget, boolean>;
  logMassKg: number;
  logMassG: number;
  plotPoints: number;
  fPbh: number;
  bookmarks: string[];
  lastChapterId: string | null;
};

type Actions = {
  setTheme: (theme: ThemeMode) => void;
  setDensity: (density: Density) => void;
  setUnits: (units: UnitSystem) => void;
  toggleSidebar: () => void;
  setSidebar: (v: boolean) => void;
  toggleField: (field: RadiationField) => void;
  setField: (field: RadiationField, on: boolean) => void;
  toggleWidget: (widget: DashboardWidget) => void;
  setLogMassKg: (v: number) => void;
  setLogMassG: (v: number) => void;
  setPlotPoints: (v: number) => void;
  setFPbh: (v: number) => void;
  toggleBookmark: (id: string) => void;
  setLastChapter: (id: string) => void;
  reset: () => void;
};

const defaults: AppSettings = {
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
    graviton: false,
  },
  widgets: {
    kpis: true,
    spectrum: true,
    pagecurve: true,
    constraints: true,
    archive: true,
    pqc: true,
    labs: true,
  },
  logMassKg: 15, // 1e15 kg
  logMassG: 19.5,
  plotPoints: 180,
  fPbh: 0.1,
  bookmarks: [],
  lastChapterId: null,
};

export const useArchive = create<AppSettings & Actions>()(
  persist(
    (set, get) => ({
      ...defaults,
      setTheme: (theme) => set({ theme }),
      setDensity: (density) => set({ density }),
      setUnits: (units) => set({ units }),
      toggleSidebar: () => set({ sidebarCollapsed: !get().sidebarCollapsed }),
      setSidebar: (v) => set({ sidebarCollapsed: v }),
      toggleField: (field) =>
        set({ fields: { ...get().fields, [field]: !get().fields[field] } }),
      setField: (field, on) =>
        set({ fields: { ...get().fields, [field]: on } }),
      toggleWidget: (widget) =>
        set({ widgets: { ...get().widgets, [widget]: !get().widgets[widget] } }),
      setLogMassKg: (v) => set({ logMassKg: v }),
      setLogMassG: (v) => set({ logMassG: v }),
      setPlotPoints: (v) => set({ plotPoints: v }),
      setFPbh: (v) => set({ fPbh: v }),
      toggleBookmark: (id) => {
        const cur = get().bookmarks;
        set({
          bookmarks: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
        });
      },
      setLastChapter: (id) => set({ lastChapterId: id }),
      reset: () => set({ ...defaults }),
    }),
    { name: "fracture-archive-v1" },
  ),
);
