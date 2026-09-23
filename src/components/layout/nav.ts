import {
  BookOpen,
  Cpu,
  Flame,
  LayoutDashboard,
  Orbit,
  SlidersHorizontal,
  Waypoints,
} from "lucide-react";

export const NAV = [
  { to: "/", label: "Command", hint: "Overview", icon: LayoutDashboard },
  { to: "/archive", label: "Archive", hint: "Monologue", icon: BookOpen },
  { to: "/pqc", label: "PQC lab", hint: "Kyber · Dilithium · Falcon", icon: Cpu },
  { to: "/hawking", label: "Hawking", hint: "Spectra · power", icon: Flame },
  { to: "/pbh", label: "PBH observatory", hint: "DM · lensing", icon: Orbit },
  { to: "/holography", label: "Holography", hint: "QES · Page", icon: Waypoints },
  { to: "/controls", label: "Controls", hint: "Full custom", icon: SlidersHorizontal },
] as const;
