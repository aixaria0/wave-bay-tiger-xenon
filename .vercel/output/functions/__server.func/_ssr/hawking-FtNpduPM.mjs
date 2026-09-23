import { a as MEV_J, i as KB, n as G, o as M_SUN, r as HBAR, t as C } from "./constants-DQ872Ajs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hawking-FtNpduPM.js
function hawkingTKelvin(massKg) {
	return HBAR * C ** 3 / (8 * Math.PI * G * massKg * KB);
}
function hawkingTMeV(massKg) {
	return KB * hawkingTKelvin(massKg) / MEV_J;
}
function nBose(x) {
	if (x > 40) return Math.exp(-x);
	return 1 / (Math.exp(x) - 1);
}
function nFermi(x) {
	if (x > 40) return Math.exp(-x);
	return 1 / (Math.exp(x) + 1);
}
var PRE = {
	scalar: {
		power: 1,
		bose: true,
		extraOmega: 0
	},
	fermion: {
		power: .67,
		bose: false,
		extraOmega: 0
	},
	photon: {
		power: 2.1,
		bose: true,
		extraOmega: 0
	},
	neutrino: {
		power: 1.8,
		bose: false,
		extraOmega: 0
	},
	vector: {
		power: 2,
		bose: true,
		extraOmega: 0
	},
	graviton: {
		power: .35,
		bose: true,
		extraOmega: 2
	}
};
function spectrumSeries(points) {
	const out = [];
	const xmin = .01;
	const xmax = 20;
	const n = Math.max(40, points);
	for (let i = 0; i < n; i++) {
		const t = i / (n - 1);
		const x = xmin * Math.pow(xmax / xmin, t);
		const row = {
			x,
			scalar: 0,
			fermion: 0,
			photon: 0,
			neutrino: 0,
			vector: 0,
			graviton: 0
		};
		Object.keys(PRE).forEach((f) => {
			const cfg = PRE[f];
			const occ = cfg.bose ? nBose(x) : nFermi(x);
			const omegaPow = 3 + cfg.extraOmega;
			row[f] = cfg.power * Math.pow(x, omegaPow) * occ;
		});
		out.push(row);
	}
	return out;
}
function normalizeSpectrum(series, fields) {
	let peak = 0;
	for (const p of series) Object.keys(PRE).forEach((f) => {
		if (fields[f]) peak = Math.max(peak, p[f]);
	});
	if (peak <= 0) return series;
	return series.map((p) => {
		const n = { ...p };
		Object.keys(PRE).forEach((f) => {
			n[f] = p[f] / peak;
		});
		return n;
	});
}
function integratePower(series, field) {
	if (series.length < 2) return 0;
	let acc = 0;
	for (let i = 1; i < series.length; i++) {
		const x0 = series[i - 1].x;
		const x1 = series[i].x;
		const y0 = series[i - 1][field];
		const y1 = series[i][field];
		acc += .5 * (y0 + y1) * (x1 - x0);
	}
	return acc;
}
function pageLuminosityW(massKg, gStar = 10.75) {
	return 78e-30 * gStar * Math.pow(M_SUN / Math.max(massKg, 1e-6), 2);
}
function evaporationYears(massKg, gStar = 10.75) {
	return 5120 * Math.PI * G * G * Math.pow(massKg, 3) / (HBAR * C ** 4) / (gStar / 10.75) / 31557600;
}
function gStarOfTMeV(tMeV) {
	if (tMeV > 1e5) return 108.75;
	if (tMeV > 150) return 61.75;
	if (tMeV > 1) return 10.75;
	return 3.36;
}
function solarMasses(massKg) {
	return massKg / M_SUN;
}
//#endregion
export { integratePower as a, solarMasses as c, hawkingTMeV as i, spectrumSeries as l, gStarOfTMeV as n, normalizeSpectrum as o, hawkingTKelvin as r, pageLuminosityW as s, evaporationYears as t };
