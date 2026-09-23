//#region node_modules/.nitro/vite/services/ssr/assets/chapters-BxlCAlbu.js
var VOLUMES = [
	{
		id: "compression",
		roman: "I",
		title: "Compression",
		range: "52–55"
	},
	{
		id: "pqc",
		roman: "II",
		title: "Post-quantum",
		range: "63–122"
	},
	{
		id: "holography",
		roman: "III",
		title: "Holography",
		range: "AdS–QES"
	},
	{
		id: "microstates",
		roman: "IV",
		title: "Microstates",
		range: "SV–Hawking"
	},
	{
		id: "cosmology",
		roman: "V",
		title: "Primordial",
		range: "PBH–femto"
	}
];
var CHAPTERS = [
	{
		id: "52",
		number: "52",
		title: "Pruning",
		volume: "compression",
		dek: "Magnitude, gradient, structured, Wanda, SparseGPT, and dynamic sparse training.",
		tags: [
			"sparsity",
			"Wanda",
			"SparseGPT"
		],
		body: [
			"Neural pruning removes weights that contribute little to the loss so a dense network can run in less memory and at lower latency. Unstructured magnitude pruning zeros the smallest |w| entries; structured pruning drops channels, heads, or blocks so the remaining tensor still maps onto dense kernels.",
			"Wanda (Weights and Activations) ranks |W| ⊙ ||X||₂ per row and needs only a calibration set. SparseGPT solves a local least-squares problem with Hessian damping and remains accurate at 50%+ sparsity on GPT-scale models. Dynamic sparse training reallocates the mask during optimization so the live topology can recover from early mistakes.",
			"In practice, prune after a short dense warmup, recalibrate BatchNorm or RMSNorm, then optionally distill. The compression lab on the dashboard records target sparsity, mask structure, and expected quality drop before any export."
		]
	},
	{
		id: "53",
		number: "53",
		title: "Knowledge distillation",
		volume: "compression",
		dek: "Response, feature, and relation distillation; online, offline, and self-distillation.",
		tags: [
			"KD",
			"teacher",
			"student"
		],
		body: [
			"Distillation trains a student to match a teacher. Response-based KD copies softened logits (temperature τ). Feature-based KD matches hidden maps (FitNets, Attention Transfer). Relation-based KD preserves pairwise geometry (RKD, PKT).",
			"Offline KD freezes the teacher. Online KD trains an ensemble that teaches itself. Self-distillation uses earlier checkpoints or deeper layers of the same net. For language models, reverse-KL and on-policy sampling reduce the student’s tendency to over-copy low-probability tails.",
			"A working recipe for the archive stack: teacher logits at τ = 2, a hidden MSE term on the last two blocks, and a small task CE. That mix is what the compression controls expose as sliders."
		]
	},
	{
		id: "54",
		number: "54",
		title: "Feature-based distillation",
		volume: "compression",
		dek: "Attention Transfer, FitNets, MiniLM, and layer-wise adaptive matching.",
		tags: [
			"FitNets",
			"MiniLM",
			"attention"
		],
		body: ["FitNets regress student maps onto teacher maps through a thin adaptor. Attention Transfer matches spatial (or token) attention. MiniLM matches the last self-attention value-relation, which transfers surprisingly far down the size curve for BERT-class models.", "Layer-wise adaptive distillation learns a soft alignment so a shallow student need not clone every teacher block. The same idea appears later in holographic codes: a coarse boundary still reconstructs a bulk operator if the code distance holds."]
	},
	{
		id: "55",
		number: "55",
		title: "Compression pipeline",
		volume: "compression",
		dek: "Prune, distill, quantize, then deploy. Quality tables, not slogans.",
		tags: [
			"INT8",
			"QLoRA",
			"mobile"
		],
		lab: "/pqc",
		body: ["A durable pipeline is prune → distill → quantize, never the reverse. After the sparse student converges, PTQ (GPTQ, AWQ) or QAT lands INT8 / INT4. Unsloth-style QLoRA is the fine-tune step when the student must pick up a new domain without a full dense replay.", "Mobile budgets are memory first. A 7B Q4 model with 2:4 structured sparsity is often a better product than a dense 3B at the same RAM, because attention quality scales more cleanly than raw parameter count. The archive records that trade as a table, not a promise."]
	},
	{
		id: "63",
		number: "63",
		title: "Entropy and seeds",
		volume: "pqc",
		dek: "Harvest, von Neumann debias, BBS expand, SHA-3 condition.",
		tags: [
			"entropy",
			"BBS",
			"SHA-3"
		],
		lab: "/pqc",
		body: [
			"A post-quantum stack is only as honest as its seed. Raw jitter (timing, sensor, OS CSPRNG) is biased. Von Neumann’s extractor keeps 01→0 and 10→1 and drops 00/11, converting a Bernoulli-p source into an unbiased bit at the cost of rate.",
			"Blum–Blum–Shub expands a quadratic residue modulo N = pq (p, q = 3 mod 4) by iterating x ← x² mod N and emitting the LSB (or a few low bits). Security reduces to quadratic residuosity. SHA-3 / SHAKE then conditions the stream into keys of any length.",
			"Health tests (repetition count, adaptive proportion) sit in front of every use. The PQC lab surfaces a toy extractor so operators can see the rate drop, not a production RNG."
		]
	},
	{
		id: "66",
		number: "66",
		title: "Blum–Blum–Shub",
		volume: "pqc",
		dek: "x ← x² mod pq. Hardness from quadratic residuosity.",
		tags: [
			"BBS",
			"QR",
			"CSPRNG"
		],
		lab: "/pqc",
		body: ["Choose secret primes p, q ≡ 3 (mod 4), public N = pq, seed x₀ coprime to N. Iterate xᵢ₊₁ = xᵢ² mod N. The least significant bit of xᵢ is unpredictable if QR is hard.", "BBS is slow compared with AES-CTR or ChaCha20 and is not the workhorse of a modern stack. It is in the archive because it is a clean reduction and because hybrid designs still use number-theoretic expanders as diversification, not as the hot path."]
	},
	{
		id: "68",
		number: "68",
		title: "Goldwasser–Micali",
		volume: "pqc",
		dek: "Bit encryption from quadratic residuosity. The ancestor of modern lattice KEMs.",
		tags: [
			"GM",
			"homomorphic",
			"QR"
		],
		body: ["GM encrypts a bit b as a random quadratic residue (b = 0) or non-residue with Jacobi symbol +1 (b = 1). Decryption uses the factorization of N. The scheme is additively homomorphic modulo 2 and exponentially expanding, which is why it is a teaching object rather than a wire format.", "Kyber later replaces this quadratic story with Module-LWE, but the shape is the same: a computational problem that is easy with a trapdoor and hard without one, plus a FO transform to reach CCA."]
	},
	{
		id: "93",
		number: "93",
		title: "Number theoretic transform",
		volume: "pqc",
		dek: "NTT is the FFT of polynomial rings used by Kyber and Dilithium.",
		tags: [
			"NTT",
			"Kyber",
			"Cooley–Tukey"
		],
		lab: "/pqc",
		body: ["In R_q = Z_q[x]/(xⁿ + 1) with n a power of two and q a prime q ≡ 1 (mod 2n), multiplication is a pointwise product after an NTT. Cooley–Tukey butterflies with twiddles ψ (a 2n-th root of unity) run in O(n log n).", "The inverse uses the inverse twiddle and a modular inverse of n. Off-by-one inverses (the classic 3315 vs 3303 class of bugs) destroy decapsulation. The PQC lab runs a tiny n = 8 NTT so the butterfly is visible, not hidden behind AVX2."]
	},
	{
		id: "94",
		number: "94",
		title: "Kyber / ML-KEM",
		volume: "pqc",
		dek: "NIST FIPS 203. Module-LWE key encapsulation with NTT polynomials.",
		tags: [
			"ML-KEM",
			"FIPS 203",
			"LWE"
		],
		lab: "/pqc",
		body: ["ML-KEM (CRYSTALS-Kyber) is the standardized KEM. Secret s, error e, public t = A s + e over R_q^k. Encapsulation samples a second error vector, compresses u and v, and hashes to a 32-byte shared secret. Decapsulation inverts the compression and runs a FO re-encrypt check for CCA security.", "Parameters: n = 256, q = 3329, k ∈ {2,3,4} for levels 1/3/5. Compression of t, u, v is load-bearing — it is not cosmetic. The dashboard table lists public-key, ciphertext, and secret-key sizes so operators can budget datagrams."]
	},
	{
		id: "95",
		number: "95",
		title: "Dilithium / ML-DSA",
		volume: "pqc",
		dek: "NIST FIPS 204. Fiat–Shamir with aborts over Module-LWE/SIS.",
		tags: ["ML-DSA", "FIPS 204"],
		lab: "/pqc",
		body: ["ML-DSA signs by sampling a short y, committing to w = A y, hashing a challenge c, and opening z = y + c s. If z or the low bits of w fail the abort checks, resample. Verification recomputes w' and the challenge.", "Signatures are a few kilobytes. That is the cost of a lattice assumption that survives Shor. Hybrid certificates (ML-DSA || Ed25519) keep classical verifiers alive during migration."]
	},
	{
		id: "fn-dsa",
		number: "FN",
		title: "Falcon / FN-DSA",
		volume: "pqc",
		dek: "Compact NTRU signatures via FFT tree Gaussian sampling. Draft FIPS 206.",
		tags: [
			"Falcon",
			"NTRU",
			"FFT"
		],
		lab: "/pqc",
		body: ["Falcon samples a short lattice vector close to a hashed message using an FFT tree of Gram–Schmidt values. Public keys and signatures are smaller than Dilithium at the same NIST level; signing is more delicate (floating point, constant-time Gaussian).", "Use Falcon when bandwidth dominates (smart cards, DNS, firmware). Use Dilithium when implementation simplicity and integer-only code paths dominate. The archive treats both as first-class, not rivals."]
	},
	{
		id: "hybrid",
		number: "H1",
		title: "Hybrid certificates",
		volume: "pqc",
		dek: "Ed25519 + ML-DSA, X25519 + ML-KEM. Security if either primitive holds.",
		tags: [
			"hybrid",
			"X.509",
			"TLS"
		],
		lab: "/pqc",
		body: ["A hybrid handshake concatenates a classical share (X25519) with ML-KEM-768 (X25519MLKEM768 in TLS 1.3 drafts). Signatures concatenate Ed25519 and ML-DSA-65. Verifiers that understand only one half still interoperate during rollout; relying parties that require both get AND-security.", "The control plane stores algorithm identifiers, not slogans. If a library reports 403 or an unknown OID, that is a configuration error, not a cryptographic one — every route in this app is public and local."]
	},
	{
		id: "er-epr",
		number: "ER",
		title: "ER = EPR",
		volume: "holography",
		dek: "Entanglement and Einstein–Rosen bridges as the same object.",
		tags: [
			"ER=EPR",
			"wormhole",
			"AdS"
		],
		lab: "/holography",
		body: ["Maldacena and Susskind (2013) conjectured that an Einstein–Rosen bridge is the geometric dual of an EPR pair. Non-traversable wormholes do not signal, matching the no-communication theorem for entanglement.", "In AdS/CFT the thermofield-double state of two CFTs is dual to an eternal black hole. Reducing entanglement pinches the neck; a double-trace coupling can open a traversable throat and implement quantum teleportation through the bulk."]
	},
	{
		id: "ads-cft",
		number: "AdS",
		title: "AdS/CFT correspondence",
		volume: "holography",
		dek: "Quantum gravity in AdS_{d+1} dual to a CFT_d on the boundary.",
		tags: [
			"Maldacena",
			"holography",
			"CFT"
		],
		lab: "/holography",
		body: ["Type IIB string theory on AdS₅ × S⁵ is dual to 𝒩=4 SU(N) SYM in four dimensions. The radial direction is the RG scale. Weak coupling on one side is strong coupling on the other, which is why the duality is a calculator for QGP hydrodynamics and for strange-metal transport.", "The archive treats AdS/CFT as an operating assumption for the holography lab: RT surfaces, islands, and tensor-network codes are all read as dictionary entries, not as metaphors."]
	},
	{
		id: "qec",
		number: "QEC",
		title: "Holographic quantum error correction",
		volume: "holography",
		dek: "Bulk operators reconstructed from any sufficiently large boundary wedge.",
		tags: [
			"HaPPY",
			"Evenbly",
			"code"
		],
		lab: "/holography",
		body: ["Pastawski–Yoshida–Harlow–Preskill (HaPPY) encode logical qubits with perfect tensors on a hyperbolic tiling. Complementary recovery: a bulk point is reconstructible from any boundary region whose entanglement wedge contains it.", "Evenbly codes replace perfect tensors with CSS blocks plus Hadamards, remaining hyperinvariant enough to keep holographic complementary recovery while becoming implementable on qubit hardware. Infinite limits of these networks produce type II von Neumann algebras on the boundary."]
	},
	{
		id: "mera-peps",
		number: "TN",
		title: "MERA and PEPS",
		volume: "holography",
		dek: "Variational tensor networks as discrete AdS and as 2D ground-state ansatze.",
		tags: [
			"MERA",
			"PEPS",
			"RG"
		],
		lab: "/holography",
		body: ["MERA layers disentanglers and isometries so entanglement is renormalized scale by scale. The extra holographic direction is the RG time. Variational MERA minimizes ⟨H⟩ with QR/SVD projections to keep isometries honest.", "PEPS place a tensor on each vertex of a 2D lattice. Contraction is #P-hard; practical codes use boundary MPS or CTM. The holography lab plots a Page-like entropy curve from a toy MERA cut, not a 10⁵-site contraction."]
	},
	{
		id: "jones",
		number: "VI",
		title: "Jones index",
		volume: "holography",
		dek: "Possible indices of II₁ subfactors: 4 cos²(π/n) or ≥ 4.",
		tags: [
			"subfactor",
			"II₁",
			"Temperley–Lieb"
		],
		lab: "/holography",
		body: ["For N ⊂ M type II₁ factors, Jones constructed a tower with projections e_N satisfying Temperley–Lieb relations. The index [M:N] = 1/τ(e_N) cannot sit in (2,4) except at the discrete values 4 cos²(π/n).", "Those numbers reappear as bond dimensions and as quantum dimensions of anyons. In holographic codes they bound how much bulk a given boundary inclusion can carry."]
	},
	{
		id: "type-ii",
		number: "II",
		title: "Type II₁ versus II_∞",
		volume: "holography",
		dek: "Finite versus semifinite factors. Continuous dimension functions.",
		tags: [
			"von Neumann",
			"II_∞",
			"trace"
		],
		lab: "/holography",
		body: ["A II₁ factor has a unique normalized trace τ(1)=1 and a continuous dimension function on projections taking values in [0,1]. A II_∞ factor is M ⊗ B(H) for infinite-dimensional H; the trace is semifinite and τ(1)=∞.", "Infinite HaPPY-type networks assign type II_∞ algebras to boundary regions whose complementary entanglement is infinite. That is how holographic reconstruction avoids cloning a discrete bulk qubit onto two disjoint boundary pieces."]
	},
	{
		id: "wedge",
		number: "W",
		title: "Entanglement wedge reconstruction",
		volume: "holography",
		dek: "Operators in W_A are reconstructible on the boundary code subspace of A.",
		tags: [
			"RT",
			"HKLL",
			"wedge"
		],
		lab: "/holography",
		body: ["The entanglement wedge W_A is the bulk region bounded by A and its RT/QES surface. Dong–Harlow–Wall reconstruction says bulk operators supported in W_A have boundary representatives acting on A’s code subspace.", "In type II regimes the representative is an operator on a continuous-dimension factor. The holography lab’s Page-curve widget is the entropy dual of that reconstruction as the QES jumps."]
	},
	{
		id: "qes",
		number: "QES",
		title: "Quantum extremal surfaces",
		volume: "holography",
		dek: "S_gen = Area(X)/4G + S_bulk. Stationary points carve islands.",
		tags: [
			"island",
			"Page",
			"Engelhardt–Wall"
		],
		lab: "/holography",
		body: ["A quantum extremal surface extremizes generalized entropy S_gen(X) = Area(X)/4G + S_bulk(X). After the Page time of an evaporating black hole the minimal QES hugs an island behind the horizon, so S(R) follows the unitary Page curve.", "The replica trick computes S via ∂_n log Z_n at n=1. Connected replica-wormhole saddles dominate after Page time and are the Euclidean origin of the island term."]
	},
	{
		id: "replica",
		number: "RW",
		title: "Replica wormholes and JT gravity",
		volume: "holography",
		dek: "On-shell JT replica action reduces to the island formula.",
		tags: [
			"JT",
			"replica",
			"Schwarzian"
		],
		lab: "/holography",
		body: ["JT gravity has action Φ₀ χ + ½ ∫ Φ(R+2) + boundary dilaton terms. On-shell, R=−2 and the bulk vanishes. For n replicas a connected saddle with Zn fixed points at candidate QES locations yields I_n ≈ n I_ext + (n−1) Φ(X) plus matter.", "Differentiating at n=1 produces S = min_X [Φ(X) + S_matter(R ∪ I_X)], which is the 2D island rule. Higher-dimensional Einstein gravity has the same structure with Area/4G in place of the dilaton."]
	},
	{
		id: "sv",
		number: "SV",
		title: "Strominger–Vafa",
		volume: "microstates",
		dek: "D1-D5-P microstate counting matches S_BH = 2π √(Q₁ Q₅ n_p).",
		tags: [
			"D-brane",
			"Cardy",
			"5D"
		],
		lab: "/hawking",
		body: ["In type IIB on T⁴ × S¹, Q₅ D5-branes and Q₁ D1-branes form an effective string of length 2π R Q₁ Q₅ with c = 6 Q₁ Q₅. Left-moving momentum n_p sits at level N_L = n_p Q₁ Q₅.", "Cardy’s formula then gives S = 2π √(c N_L / 6) = 2π √(Q₁ Q₅ n_p), matching the 5D horizon area. That 1996 match is the foundation of the fuzzball program and of every later near-extremal emission calculation in the archive."]
	},
	{
		id: "fuzzball",
		number: "FB",
		title: "Fuzzball microstates",
		volume: "microstates",
		dek: "Horizonless, cap-off geometries as typical string microstates.",
		tags: [
			"Mathur",
			"horizonless",
			"cap"
		],
		lab: "/hawking",
		body: ["Mathur’s fuzzball proposal: typical microstates of a black hole are horizonless stringy geometries that cap off at r ∼ r_S. From afar they reproduce the black-hole potential; infalling observers meet structure, not a vacuum horizon.", "The Cardy count still holds. Islands and fuzzballs are complementary languages — islands are the semiclassical entropy dual, fuzzballs are the explicit microstate dual. The archive keeps both on the same shelf."]
	},
	{
		id: "near-ext",
		number: "NE",
		title: "Near-extremal extensions",
		volume: "microstates",
		dek: "Small right-movers give T_H > 0 and a Cardy correction linear in Δ.",
		tags: [
			"T_H",
			"Cardy",
			"right-movers"
		],
		lab: "/hawking",
		body: ["Add a small right-moving level N_R ≪ N_L. Then S = 2π (√(c N_L/6) + √(c N_R/6)). Expanding for Δ ≪ n_p recovers S_ext plus a term linear in the excitation energy, matching the supergravity near-extremal area.", "The Hawking temperature is essentially T_R. Emission rates follow from CFT two-point functions of the dual operator, which is the next chapter."]
	},
	{
		id: "hawking",
		number: "HK",
		title: "Hawking emission rates",
		volume: "microstates",
		dek: "Bogoliubov β coefficients and CFT correlators produce the same Planck spectrum.",
		tags: [
			"Bogoliubov",
			"graybody",
			"Page"
		],
		lab: "/hawking",
		body: [
			"Semiclassically, late-time modes mix creation and annihilation operators of the in-vacuum. |β_ω|² = 1/(e^{ω/T_H}−1) for bosons. The differential rate is (ω/2π) g_s Γ_{sℓ}(ω) n_s(ω).",
			"Microscopically, a minimal scalar couples to a (1,1) CFT operator. The thermal two-point function plus detailed balance reproduces Hawking’s spectrum including graybody factors from the AdS₃ throat. Fermions replace −1 with +1 (Fermi–Dirac).",
			"The Hawking lab integrates those spectra over ω, with independent toggles for scalar, fermion, photon, neutrino, vector, and graviton channels."
		]
	},
	{
		id: "pbh-evap",
		number: "PE",
		title: "Primordial black hole evaporation",
		volume: "cosmology",
		dek: "τ ∝ M³. M ∼ 10¹² kg evaporates today. g_*(T) steps through the SM.",
		tags: [
			"PBH",
			"lifetime",
			"g_*"
		],
		lab: "/pbh",
		body: ["Hawking temperature scales as 1/M. Lifetime τ ≈ 5120 π G² M³ / (ħ c⁴) times 1/g_*. A 10¹² kg hole has T_H ∼ 10¹¹ K and τ comparable to the age of the universe.", "g_* drops at the electroweak scale, the QCD crossover, and e⁺e⁻ annihilation. Late evaporation is photon + neutrino + graviton dominated. The PBH observatory exposes mass, T_H, g_*, power, and lifetime on one strip."]
	},
	{
		id: "pbh-dm",
		number: "DM",
		title: "PBH dark matter candidates",
		volume: "cosmology",
		dek: "Most mass windows are closed. Asteroid-mass remains the live slice.",
		tags: [
			"f_PBH",
			"HSC",
			"PTA"
		],
		lab: "/pbh",
		body: ["Combined HSC microlensing, Gaia wide binaries, PTA stochastic backgrounds, LIGO merger rates, and CMB spectral distortions exclude an all-PBH dark matter explanation in almost every decade of mass.", "The remaining slice is roughly 10¹⁷–10²² g (asteroid to Ceres). Even there, peaked mass functions are squeezed; extended functions from axion miniclusters still allow f_PBH ∼ 0.1–0.5 pending Rubin."]
	},
	{
		id: "asteroid",
		number: "AM",
		title: "Asteroid-mass signatures",
		volume: "cosmology",
		dek: "Microlensing, femtolensing, accretion, PTA, 21-cm — the 2026–2035 kill shots.",
		tags: [
			"Rubin",
			"LISA",
			"eROSITA"
		],
		lab: "/pbh",
		body: ["Short-timescale microlensing (hours) is the primary near-term probe. Rubin/LSST monitoring ∼10⁹ stars for a decade can push f_PBH below 10⁻² across the window. Femtolensing of GRBs and FRBs reaches lighter masses via wave optics.", "Accretion X-rays, 21-cm heating, and a LISA μHz background from binaries are the longer-cycle tests. The observatory plot stacks those upper limits against an example minicluster mass function."]
	},
	{
		id: "axion-mc",
		number: "AX",
		title: "Axion minicluster collapse",
		volume: "cosmology",
		dek: "Isocurvature overdensities → miniclusters → rare PBH seeds at 10¹⁷–10²² g.",
		tags: [
			"axion",
			"minicluster",
			"QCD"
		],
		lab: "/pbh",
		body: ["When the axion starts oscillating, misalignment fluctuations of order one collapse into miniclusters with M_mc ∼ 10⁻¹² (f_a / 10¹² GeV)^{1/2} M_⊙. Rare high-δ cores undergo direct collapse or axiton/bosenova instability and seed PBHs.", "The resulting mass function is log-normal with a high-mass tail — exactly the curve drawn on the constraint dashboard. It is currently the cleanest production channel still compatible with the asteroid-mass window."]
	},
	{
		id: "micro-t",
		number: "tE",
		title: "Microlensing timescale",
		volume: "cosmology",
		dek: "t_E = R_E / v_⊥ ∝ √M. Asteroid PBHs last hours, stars last weeks.",
		tags: [
			"Einstein",
			"t_E",
			"LSST"
		],
		lab: "/pbh",
		body: ["θ_E = √(4GM D_LS / (c² D_L D_S)). Crossing time t_E = R_E / v_⊥. For Galactic geometry and v_⊥ ∼ 200 km/s, t_E ≈ 0.21 day × √(M/M_⊙).", "A 10¹⁹ g hole yields t_E of order an hour. A 0.3 M_⊙ star yields tens of days. That separation is the discriminant Rubin will use. The distribution over distances and Maxwellian velocities is approximately log-normal with 0.3–0.5 dex scatter."]
	},
	{
		id: "femto-t",
		number: "tF",
		title: "Femtolensing timescale",
		volume: "cosmology",
		dek: "Wave-optics events when r_E ∼ λ. t_E set by the Fresnel scale, nearly mass-independent.",
		tags: [
			"Fresnel",
			"GRB",
			"FRB"
		],
		lab: "/pbh",
		body: ["When θ_E is smaller than the Fresnel angle, geometric microlensing yields to diffraction. The amplification is a Fresnel–Kirchhoff integral with Bessel fringes. Event duration tracks the Fresnel radius r_F = √(λ D_L D_LS / D_S) rather than r_E.", "Thus t_E ≈ 2 √(λ D_L) / v_⊥ — hours or less, and only weakly mass-dependent in the deep wave limit. p(t_E) inherits the Maxwellian of v_⊥: p(t) ∝ t⁻⁴ exp(−const / t²). High-cadence GRB and FRB afterglows are the practical search channel."]
	}
];
function getChapter(id) {
	return CHAPTERS.find((c) => c.id === id);
}
function searchChapters(q) {
	const s = q.trim().toLowerCase();
	if (!s) return CHAPTERS;
	return CHAPTERS.filter((c) => {
		return [
			c.title,
			c.dek,
			c.number,
			...c.tags,
			...c.body
		].join(" ").toLowerCase().includes(s);
	});
}
//#endregion
export { searchChapters as i, VOLUMES as n, getChapter as r, CHAPTERS as t };
