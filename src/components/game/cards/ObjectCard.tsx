import { useState } from "react";
import { motion } from "framer-motion";
import type { Cell } from "@/data/cells";

export function ObjectCard({
  cell,
  onAnswer,
}: {
  cell: Cell;
  onAnswer: (correct: boolean) => void;
}) {
  const alts = cell.alternatives ?? [];
  const correctCount = alts.filter((a) => a.correct).length;
  const isMulti = correctCount > 1;
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const confirm = () => {
    const correctSet = new Set(
      alts.map((a, i) => (a.correct ? i : -1)).filter((i) => i >= 0),
    );
    const ok =
      selected.size === correctSet.size &&
      [...selected].every((i) => correctSet.has(i));
    onAnswer(ok);
  };

  const gridCols = alts.length >= 6 ? "grid-cols-3" : alts.length >= 4 ? "grid-cols-4" : "grid-cols-3";

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-2xl p-7 shadow-2xl border-4 border-emerald-300 max-w-3xl w-full"
    >
      <div className="flex items-center gap-2 text-emerald-700 font-bold uppercase tracking-wide text-sm">
        <span className="px-2 py-0.5 bg-emerald-100 rounded-full">Cuidado do momento</span>
        <span>Casa {cell.id}</span>
      </div>
      <h3 className="mt-3 text-2xl font-bold text-slate-800">{cell.prompt}</h3>
      {isMulti && (
        <p className="mt-2 text-sm text-emerald-700 font-medium">
          Toque em todos os itens que ajudam nesse cuidado e depois clique em Confirmar.
        </p>
      )}
      <div className={`mt-5 grid ${gridCols} gap-3`}>
        {alts.map((alt, i) => {
          const isSelected = selected.has(i);
          return (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (isMulti ? toggle(i) : onAnswer(alt.correct))}
              className={`relative bg-emerald-50 hover:bg-emerald-100 border-2 rounded-xl p-4 text-center transition ${
                isSelected ? "border-emerald-600 ring-4 ring-emerald-200" : "border-emerald-300"
              }`}
            >
              {isMulti && isSelected && (
                <div className="absolute top-1 right-1 bg-emerald-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  ✓
                </div>
              )}
              <div className="text-5xl">{alt.icon}</div>
              <div className="mt-2 text-sm font-semibold text-slate-700">{alt.text}</div>
            </motion.button>
          );
        })}
      </div>
      {isMulti && (
        <div className="mt-5 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={selected.size === 0}
            onClick={confirm}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg transition"
          >
            Confirmar
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
