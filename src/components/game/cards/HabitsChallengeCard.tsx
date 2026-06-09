import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { CardShell, PrimaryButton } from "./CardShell";

const OPTIONS = [
  { id: "a", text: "Lavar as mãos", icon: "🧼", good: true },
  { id: "b", text: "Escovar os dentes", icon: "🪥", good: true },
  { id: "c", text: "Tomar banho", icon: "🚿", good: true },
  { id: "d", text: "Usar lenço limpo", icon: "🧻", good: true },
  { id: "e", text: "Comer com as mãos sujas", icon: "🍞", good: false },
  { id: "f", text: "Limpar o nariz na camiseta", icon: "👕", good: false },
];

export function HabitsChallengeCard({
  onFinish,
}: {
  onFinish: (correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const confirm = () => {
    if (selected.size < 3) return;
    const goodCount = [...selected].filter(
      (id) => OPTIONS.find((o) => o.id === id)!.good,
    ).length;
    const badCount = selected.size - goodCount;
    onFinish(goodCount >= 3 && badCount === 0);
  };

  return (
    <CardShell
      tone="orange"
      tag="Desafio · Hábitos"
      cellId={0}
      prompt="Escolha três hábitos que ajudam a cuidar da saúde."
      footer={
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-game-ink-soft">
            Selecionados: {selected.size} de 3
          </span>
          <PrimaryButton disabled={selected.size < 3} onClick={confirm}>
            Confirmar
          </PrimaryButton>
        </div>
      }
    >
      <div className="grid grid-cols-3 gap-4">
        {OPTIONS.map((o) => {
          const on = selected.has(o.id);
          return (
            <motion.button
              key={o.id}
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => toggle(o.id)}
              className={`relative bg-game-cream hover:bg-emerald-50 rounded-3xl p-5 text-center shadow-card-soft transition border-[3px] min-h-[150px] flex flex-col items-center justify-center ${
                on
                  ? "border-game-green ring-4 ring-emerald-200"
                  : "border-amber-200"
              }`}
            >
              {on && (
                <span className="absolute top-2 right-2 w-7 h-7 rounded-full bg-game-green text-white flex items-center justify-center shadow">
                  <Check size={16} />
                </span>
              )}
              <div className="text-5xl">{o.icon}</div>
              <div className="mt-2 text-sm font-display font-bold text-game-ink">
                {o.text}
              </div>
            </motion.button>
          );
        })}
      </div>
    </CardShell>
  );
}
