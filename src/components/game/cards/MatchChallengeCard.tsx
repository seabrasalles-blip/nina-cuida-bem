import { useState } from "react";
import { motion } from "framer-motion";
import { CardShell } from "./CardShell";

const SITUATIONS = [
  { id: "s1", text: "Antes de comer", icon: "🍽️", match: "c1" },
  { id: "s2", text: "Depois de comer", icon: "🍎", match: "c2" },
  { id: "s3", text: "Nariz escorrendo", icon: "🤧", match: "c3" },
  { id: "s4", text: "Depois de brincar", icon: "⚽", match: "c4" },
];
const CARES = [
  { id: "c1", text: "Lavar as mãos", icon: "🧼" },
  { id: "c2", text: "Escovar os dentes", icon: "🪥" },
  { id: "c3", text: "Usar lenço", icon: "🧻" },
  { id: "c4", text: "Tomar banho", icon: "🚿" },
];

export function MatchChallengeCard({
  onFinish,
}: {
  onFinish: (correct: boolean) => void;
}) {
  const [selectedSit, setSelectedSit] = useState<string | null>(null);
  const [pairs, setPairs] = useState<Record<string, string>>({});
  const [shuffledCares] = useState(() =>
    [...CARES].sort(() => Math.random() - 0.5),
  );

  const handleCare = (careId: string) => {
    if (!selectedSit) return;
    const newPairs = { ...pairs, [selectedSit]: careId };
    setPairs(newPairs);
    setSelectedSit(null);
    if (Object.keys(newPairs).length === SITUATIONS.length) {
      const allCorrect = SITUATIONS.every((s) => newPairs[s.id] === s.match);
      setTimeout(() => onFinish(allCorrect), 400);
    }
  };

  const usedCares = new Set(Object.values(pairs));

  return (
    <CardShell
      tone="orange"
      tag="Desafio · Associe"
      cellId={0}
      prompt="Em cada situação, qual é o cuidado certo?"
      hint="Toque em uma situação e depois no cuidado que combina."
    >
      <div className="grid grid-cols-2 gap-5">
        <div className="space-y-3">
          <p className="font-display text-sm text-game-ink-soft uppercase tracking-wide font-bold">
            Situação
          </p>
          {SITUATIONS.map((s) => {
            const done = !!pairs[s.id];
            const active = selectedSit === s.id;
            return (
              <motion.button
                key={s.id}
                whileHover={done ? undefined : { scale: 1.02 }}
                disabled={done}
                onClick={() => setSelectedSit(s.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl border-[3px] transition shadow-card-soft text-left ${
                  done
                    ? "bg-emerald-50 border-game-green opacity-80"
                    : active
                      ? "bg-game-sky-soft border-game-sky"
                      : "bg-game-cream border-amber-200 hover:bg-amber-50"
                }`}
              >
                <span className="text-3xl">{s.icon}</span>
                <span className="font-display font-bold text-game-ink text-lg">
                  {s.text}
                </span>
                {done && (
                  <span className="ml-auto text-xs text-emerald-700 font-bold">
                    → {CARES.find((c) => c.id === pairs[s.id])?.text}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
        <div className="space-y-3">
          <p className="font-display text-sm text-game-ink-soft uppercase tracking-wide font-bold">
            Cuidado
          </p>
          {shuffledCares.map((c) => {
            const used = usedCares.has(c.id);
            return (
              <motion.button
                key={c.id}
                whileHover={used || !selectedSit ? undefined : { scale: 1.02 }}
                disabled={used || !selectedSit}
                onClick={() => handleCare(c.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl border-[3px] transition shadow-card-soft text-left ${
                  used
                    ? "bg-slate-50 border-slate-200 opacity-40"
                    : selectedSit
                      ? "bg-emerald-50 border-game-green hover:bg-emerald-100"
                      : "bg-game-cream border-amber-200"
                }`}
              >
                <span className="text-3xl">{c.icon}</span>
                <span className="font-display font-bold text-game-ink text-lg">
                  {c.text}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </CardShell>
  );
}
