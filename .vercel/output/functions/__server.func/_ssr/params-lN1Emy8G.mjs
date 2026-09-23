//#region node_modules/.nitro/vite/services/ssr/assets/params-lN1Emy8G.js
var KYBER = [
	{
		id: "mlkem512",
		name: "ML-KEM-512",
		nist: "Level 1",
		n: 256,
		k: 2,
		q: 3329,
		pk: 800,
		sk: 1632,
		ct: 768,
		ss: 32
	},
	{
		id: "mlkem768",
		name: "ML-KEM-768",
		nist: "Level 3",
		n: 256,
		k: 3,
		q: 3329,
		pk: 1184,
		sk: 2400,
		ct: 1088,
		ss: 32
	},
	{
		id: "mlkem1024",
		name: "ML-KEM-1024",
		nist: "Level 5",
		n: 256,
		k: 4,
		q: 3329,
		pk: 1568,
		sk: 3168,
		ct: 1568,
		ss: 32
	}
];
var DILITHIUM = [
	{
		id: "mldsa44",
		family: "ML-DSA",
		name: "ML-DSA-44",
		nist: "Level 2",
		pk: 1312,
		sk: 2560,
		sig: 2420,
		notes: "Module-LWE / Module-SIS"
	},
	{
		id: "mldsa65",
		family: "ML-DSA",
		name: "ML-DSA-65",
		nist: "Level 3",
		pk: 1952,
		sk: 4032,
		sig: 3309,
		notes: "Recommended balance"
	},
	{
		id: "mldsa87",
		family: "ML-DSA",
		name: "ML-DSA-87",
		nist: "Level 5",
		pk: 2592,
		sk: 4896,
		sig: 4627,
		notes: "Highest Dilithium level"
	}
];
var FALCON = [{
	id: "fn512",
	family: "FN-DSA",
	name: "Falcon-512",
	nist: "Level 1",
	pk: 897,
	sk: 1281,
	sig: 666,
	notes: "NTRU + FFT tree sampling"
}, {
	id: "fn1024",
	family: "FN-DSA",
	name: "Falcon-1024",
	nist: "Level 5",
	pk: 1793,
	sk: 2305,
	sig: 1280,
	notes: "Compact signatures"
}];
function bytes(n) {
	if (n < 1024) return `${n} B`;
	return `${(n / 1024).toFixed(2)} KiB`;
}
/** Educational NTT over Z_q, n a power of 2. Not a production Kyber NTT. */
function nttForward(a, q, psi) {
	const n = a.length;
	const out = a.map((x) => (x % q + q) % q);
	let m = 1;
	while (m < n) {
		2 * m % n;
		for (let start = 0; start < n; start += 2 * m) {
			let w = 1;
			for (let j = 0; j < m; j++) {
				const u = out[start + j];
				const v = out[start + j + m] * w % q;
				out[start + j] = (u + v) % q;
				out[start + j + m] = (u - v + q) % q;
				w = w * psi % q;
			}
		}
		m *= 2;
	}
	return out;
}
function toySharedSecret(seed) {
	let h = 2166136261;
	for (let i = 0; i < seed.length; i++) {
		h ^= seed.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	const hex = (n, len) => {
		let s = "";
		let x = n >>> 0;
		for (let i = 0; i < len; i++) {
			x = Math.imul(x ^ x >>> 15, 2246822519);
			x = Math.imul(x ^ x >>> 13, 3266489917);
			s += (x >>> 0).toString(16).padStart(8, "0");
		}
		return s.slice(0, len * 2);
	};
	return {
		pk: hex(h, 8),
		ct: hex(h ^ 2654435769, 8),
		ss: hex(h ^ 2246822507, 4)
	};
}
//#endregion
export { nttForward as a, bytes as i, FALCON as n, toySharedSecret as o, KYBER as r, DILITHIUM as t };
