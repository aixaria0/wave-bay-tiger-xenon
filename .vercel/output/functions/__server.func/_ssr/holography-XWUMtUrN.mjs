//#region node_modules/.nitro/vite/services/ssr/assets/holography-XWUMtUrN.js
function pageCurve(n = 160) {
	const out = [];
	for (let i = 0; i < n; i++) {
		const t = i / (n - 1);
		const hawking = Math.min(1, .08 + 1.15 * t);
		const island = t < .48 ? 1.05 : Math.max(.04, 1.05 - 1.7 * (t - .48));
		const fine = Math.min(hawking, island);
		out.push({
			t,
			hawking,
			island,
			fine
		});
	}
	return out;
}
function generalizedEntropy(area, sBulk, G = 1) {
	return area / (4 * G) + sBulk;
}
function jonesIndexAllowed(index) {
	if (index >= 4) return true;
	for (let n = 3; n <= 24; n++) {
		const v = 4 * Math.cos(Math.PI / n) ** 2;
		if (Math.abs(index - v) < 1e-6) return true;
	}
	return false;
}
var JONES_DISCRETE = Array.from({ length: 10 }, (_, i) => {
	const n = i + 3;
	return {
		n,
		index: 4 * Math.cos(Math.PI / n) ** 2
	};
});
//#endregion
export { pageCurve as i, generalizedEntropy as n, jonesIndexAllowed as r, JONES_DISCRETE as t };
