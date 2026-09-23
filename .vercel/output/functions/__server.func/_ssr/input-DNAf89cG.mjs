import "../_runtime.mjs";
import { t as cn } from "./utils-i9omAUsS.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("flex h-10 w-full rounded-sm border border-border bg-surface px-3 text-sm text-fg placeholder:text-subtle outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent/40", className),
		...props
	});
}
//#endregion
export { Input as t };
