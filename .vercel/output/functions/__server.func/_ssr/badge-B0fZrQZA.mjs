import { t as cn } from "./utils-i9omAUsS.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-B0fZrQZA.js
var import_jsx_runtime = require_jsx_runtime();
function Badge({ className, tone = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide", tone === "default" && "border-border text-muted", tone === "ok" && "border-ok/30 text-ok", tone === "warn" && "border-warn/30 text-warn", tone === "danger" && "border-danger/30 text-danger", className),
		...props
	});
}
//#endregion
export { Badge as t };
