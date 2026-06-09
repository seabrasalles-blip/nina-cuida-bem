import { useState } from "react";
import { motion } from "framer-motion";

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
  const [shuffledCares] = useState(() => [...CARES].sort(() => Math.random() - 0.5));

  const handleCare = (careId: string) => {
    if (!selectedSit) return;
    const sit = SITUATIONS.find((s) => s.id === selectedSit)!;
    const newPairs = { ...pairs, [selectedSit]: careId };
    setPairs(newPairs);
    setSelectedSit(null);

    if (Object.keys(newPairs).length === SITUATIONS.length) {
      const allCorrect = SITUATIONS.every((s) => newPairs[s.id] === s.match);
      setTimeout(() => onFinish(allCorrect), 400);
    }
    void sit;
  };

  const usedCares = new Set(Object.values(pairs));

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-2xl p-6 shadow-2xl border-4 border-orange-300 max-w-3xl w-full"
    >
      <div className="text-orange-700 font-bold uppercase tracking-wide text-sm">
        <span className="px-2 py-0.5 bg-orange-100 rounded-full">Desafio • Associe</span>
      </div>
      <h3 className="mt-2 text-xl font-bold text-slate-800">
        Toque em uma situação e depois no cuidado certo.
      </h3>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-500 uppercase">Situação</p>
          {SITUATIONS.map((s) => {
            const done = !!pairs[s.id];
            const active = selectedSit === s.id;
            return (
              <button
                key={s.id}
                disabled={done}
                onClick={() => setSelectedSit(s.id)}
                className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition ${
                  done
                    ? "bg-emerald-50 border-emerald-300 opacity-70"
                    : active
                    ? "bg-sky-100 border-sky-500"
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <span className="text-2xl">{s.icon}</span>
                <span className="font-semibold text-slate-700">{s.text}</span>
                {done && (
                  <span className="ml-auto text-xs text-emerald-700">
                    → {CARES.find((c) => c.id === pairs[s.id])?.text}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-500 uppercase">Cuidado</p>
          {shuffledCares.map((c) => {
            const used = usedCares.has(c.id);
            return (
              <button
                key={c.id}
                disabled={used || !selectedSit}
                onClick={() => handleCare(c.id)}
                className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition ${
                  used
                    ? "bg-slate-100 border-slate-200 opacity-40"
                    : selectedSit
                    ? "bg-emerald-50 border-emerald-300 hover:bg-emerald-100"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <span className="text-2xl">{c.icon}</span>
                <span className="font-semibold text-slate-700">{c.text}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
