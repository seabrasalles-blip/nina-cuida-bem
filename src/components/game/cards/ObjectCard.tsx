import { useState } from "react";
import { motion } from "framer-motion";
import type { Cell } from "@/data/cells";
import { CardShell, PrimaryButton } from "./CardShell";

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

  const cols =
    alts.length >= 6 ? "grid-cols-3" : alts.length === 4 ? "grid-cols-2" : "grid-cols-3";

  return (
    <CardShell
      tone="green"
      tag="Cuidado do momento"
      cellId={cell.id}
      prompt={cell.prompt ?? cell.title}
      hint={
        isMulti
          ? "Toque em todos os cuidados que ajudam e depois confirme."
          : "Escolha o cuidado que combina com o momento."
      }
      footer={
        isMulti ? (
          <PrimaryButton disabled={selected.size === 0} onClick={confirm}>
            Confirmar
          </PrimaryButton>
        ) : undefined
      }
    >
      <div className={`grid ${cols} gap-4`}>
        {alts.map((alt, i) => {
          const isSelected = selected.has(i);
          return (
            <motion.button
              key={i}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => (isMulti ? toggle(i) : onAnswer(alt.correct))}
              className={`relative bg-game-cream hover:bg-emerald-50 rounded-3xl p-5 text-center shadow-card-soft transition flex flex-col items-center justify-center min-h-[160px] border-[3px] ${
                isSelected
                  ? "border-game-green ring-4 ring-emerald-200"
                  : "border-emerald-200"
              }`}
            >
              {isMulti && isSelected && (
                <div className="absolute top-2 right-2 bg-game-green text-white rounded-full w-7 h-7 flex items-center justify-center text-base font-bold shadow">
                  ✓
                </div>
              )}
              <div className="text-[58px] leading-none">{alt.icon}</div>
              <div className="mt-3 text-base font-display font-bold text-game-ink">
                {alt.text}
              </div>
            </motion.button>
          );
        })}
      </div>
    </CardShell>
  );
}
