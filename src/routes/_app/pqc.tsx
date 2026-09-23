import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { bytes, DILITHIUM, FALCON, KYBER, nttForward, toySharedSecret } from "@/lib/pqc/params";

export const Route = createFileRoute("/_app/pqc")({ component: PqcLab });

function PqcLab() {
  const [seed, setSeed] = useState("fracture-archive");
  const demo = useMemo(() => toySharedSecret(seed || "seed"), [seed]);
  const vector = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8], []);
  const ntt = useMemo(() => nttForward(vector, 17, 3), [vector]);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">Volume II</p>
        <h1 className="font-display text-4xl tracking-tight">Post-quantum lab</h1>
        <p className="max-w-2xl text-sm text-muted">
          Parameter tables for ML-KEM, ML-DSA, and Falcon, plus an educational NTT butterfly and a
          toy encapsulate demo. Not a production cryptosystem — sizes and structure only.
        </p>
      </header>

      <section>
        <h2 className="mb-3 font-display text-2xl">ML-KEM (Kyber)</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="bg-elevated font-mono text-[11px] uppercase tracking-wide text-subtle">
              <tr>
                {["Level", "NIST", "k", "q", "PK", "SK", "CT", "SS"].map((h) => (
                  <th key={h} className="px-3 py-2 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {KYBER.map((k) => (
                <tr key={k.id} className="border-t border-border">
                  <td className="px-3 py-2">{k.name}</td>
                  <td className="px-3 py-2 text-muted">{k.nist}</td>
                  <td className="px-3 py-2 font-mono tabular-nums">{k.k}</td>
                  <td className="px-3 py-2 font-mono tabular-nums">{k.q}</td>
                  <td className="px-3 py-2 font-mono tabular-nums">{bytes(k.pk)}</td>
                  <td className="px-3 py-2 font-mono tabular-nums">{bytes(k.sk)}</td>
                  <td className="px-3 py-2 font-mono tabular-nums">{bytes(k.ct)}</td>
                  <td className="px-3 py-2 font-mono tabular-nums">{k.ss} B</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-display text-2xl">Signatures</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="bg-elevated font-mono text-[11px] uppercase tracking-wide text-subtle">
              <tr>
                {["Scheme", "NIST", "PK", "SK", "Sig", "Notes"].map((h) => (
                  <th key={h} className="px-3 py-2 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...DILITHIUM, ...FALCON].map((s) => (
                <tr key={s.id} className="border-t border-border">
                  <td className="px-3 py-2">{s.name}</td>
                  <td className="px-3 py-2 text-muted">{s.nist}</td>
                  <td className="px-3 py-2 font-mono tabular-nums">{bytes(s.pk)}</td>
                  <td className="px-3 py-2 font-mono tabular-nums">{bytes(s.sk)}</td>
                  <td className="px-3 py-2 font-mono tabular-nums">{bytes(s.sig)}</td>
                  <td className="px-3 py-2 text-muted">{s.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Toy encapsulate</CardTitle>
            <CardDescription>
              Deterministic illustration of pk / ct / ss from a seed. Do not use as a key.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Label htmlFor="seed">Seed</Label>
            <Input id="seed" value={seed} onChange={(e) => setSeed(e.target.value)} />
            <Row label="Public key" value={demo.pk} />
            <Row label="Ciphertext" value={demo.ct} />
            <Row label="Shared secret" value={demo.ss} />
            <Badge tone="warn">Educational digest — not ML-KEM</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>NTT butterfly</CardTitle>
            <CardDescription>Length-8 transform over Z_17 with ψ = 3. Cooley–Tukey sketch.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-2 font-mono text-xs text-subtle">input</p>
            <p className="font-mono text-sm tabular-nums">{vector.join("  ")}</p>
            <p className="mt-4 mb-2 font-mono text-xs text-subtle">NTT</p>
            <p className="font-mono text-sm tabular-nums">{ntt.join("  ")}</p>
            <p className="mt-4 text-sm text-muted">
              Production Kyber uses n = 256, q = 3329, and a 512-th root of unity. Inverse bugs
              (wrong n⁻¹) fail decaps — that is the 3315 / 3303 class of fractures.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">{label}</p>
      <p className="break-all font-mono text-sm">{value}</p>
    </div>
  );
}
