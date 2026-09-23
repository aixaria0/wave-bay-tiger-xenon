import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-i9omAUsS.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatSci(n, digits = 2) {
	if (!Number.isFinite(n) || n === 0) return "0";
	const abs = Math.abs(n);
	if (abs >= 1e4 || abs < .001) return n.toExponential(digits);
	return n.toLocaleString(void 0, { maximumFractionDigits: digits });
}
//#endregion
export { formatSci as n, cn as t };
