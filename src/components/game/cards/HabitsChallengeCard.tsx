import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

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
    const goodCount = [...selected].filter((id) => OPTIONS.find((o) => o.id === id)!.good).length;
    const badCount = selected.size - goodCount;
    onFinish(goodCount >= 3 && badCount === 0);
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-2xl p-6 shadow-2xl border-4 border-orange-300 max-w-3xl w-full"
    >
      <div className="text-orange-700 font-bold uppercase tracking-wide text-sm">
        <span className="px-2 py-0.5 bg-orange-100 rounded-full">Desafio • Hábitos</span>
      </div>
      <h3 className="mt-2 text-xl font-bold text-slate-800">
        Escolha três hábitos que ajudam a cuidar da saúde.
      </h3>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {OPTIONS.map((o) => {
          const on = selected.has(o.id);
          return (
            <button
              key={o.id}
              onClick={() => toggle(o.id)}
              className={`relative p-4 rounded-xl border-2 text-center transition ${
                on
                  ? "bg-emerald-100 border-emerald-500"
                  : "bg-slate-50 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {on && (
                <span className="absolute top-1 right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Check size={14} />
                </span>
              )}
              <div className="text-4xl">{o.icon}</div>
              <div className="mt-2 text-sm font-semibold text-slate-700">{o.text}</div>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm text-slate-500">Selecionados: {selected.size} de 3</span>
        <button
          disabled={selected.size < 3}
          onClick={confirm}
          className="px-8 py-3 rounded-full bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 text-white text-lg font-bold shadow"
        >
          Confirmar
        </button>
      </div>
    </motion.div>
  );
}
