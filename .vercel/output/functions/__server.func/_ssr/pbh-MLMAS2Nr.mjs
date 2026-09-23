import { s as M_SUN_G } from "./constants-DQ872Ajs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pbh-MLMAS2Nr.js
function axionMiniclusterDndlogm(logM) {
	const mu = 19.5;
	const sigma = 1.2;
	const gauss = Math.exp(-((logM - mu) ** 2) / (2 * sigma * sigma));
	const tail = Math.pow(10 ** logM / 1e22, -1) * Math.exp(-Math.sqrt(1e22 / 10 ** logM));
	return gauss + .22 * Math.min(tail, 4);
}
function fPbhUpper(logM) {
	let f = 1;
	if (logM >= 17 && logM <= 21.5) f = Math.min(f, .05 + .05 * ((logM - 17) / 4.5));
	if (logM >= 16.5 && logM <= 22.5) f = Math.min(f, .012 * Math.pow(10, (logM - 19.5) / 3));
	if (logM > 21) f = Math.min(f, .006 * Math.pow(10, (logM - 21) / 2));
	if (logM < 18.5) f = Math.min(f, .12 * Math.pow(10, (logM - 17) / 1.5));
	return Math.max(4e-4, Math.min(1, f));
}
function microlensingGamma(massG, fPbh) {
	return 25e-7 * fPbh * Math.sqrt(massG / 0x56bc75e2d63100000);
}
function expectedEvents(massG, fPbh, nStars = 1e9, years = 10) {
	return nStars * years * microlensingGamma(massG, fPbh);
}
function constraintSeries(n = 220) {
	const out = [];
	for (let i = 0; i < n; i++) {
		const logM = 16 + 7 * i / (n - 1);
		const massG = 10 ** logM;
		out.push({
			logM,
			massG,
			massSolar: massG / M_SUN_G,
			dndlogm: axionMiniclusterDndlogm(logM),
			fUpper: fPbhUpper(logM),
			gamma: microlensingGamma(massG, .1),
			nExp: expectedEvents(massG, .1)
		});
	}
	const peak = Math.max(...out.map((p) => p.dndlogm));
	return out.map((p) => ({
		...p,
		dndlogm: p.dndlogm / peak
	}));
}
function einsteinHours(massG, vRel = 200) {
	const mSun = massG / M_SUN_G;
	return 5.04 * Math.sqrt(Math.max(mSun, 1e-30)) * (200 / vRel);
}
function femtoHours(vRel = 200, dLKpc = 8, lambdaNm = 500) {
	return .1 * Math.sqrt(lambdaNm / 500 * (dLKpc / 1)) * (200 / vRel);
}
function lognormPdf(x, mu, sigma) {
	if (x <= 0) return 0;
	const l = Math.log(x);
	return 1 / (x * sigma * Math.sqrt(2 * Math.PI)) * Math.exp(-((l - mu) ** 2) / (2 * sigma * sigma));
}
//#endregion
export { lognormPdf as a, femtoHours as i, einsteinHours as n, microlensingGamma as o, expectedEvents as r, constraintSeries as t };
