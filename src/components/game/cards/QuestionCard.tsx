import { motion } from "framer-motion";
import type { Cell } from "@/data/cells";
import { CardShell } from "./CardShell";

export function QuestionCard({ cell, onAnswer }: { cell: Cell; onAnswer: (correct: boolean) => void }) {
  const alts = cell.alternatives ?? [];
  const cols = alts.length === 4 ? "grid-cols-2" : "grid-cols-3";
  return (
    <CardShell
      tone="sky"
      tag="Pergunta"
      cellId={cell.id}
      prompt={cell.prompt ?? cell.title}
      hint="Escolha a melhor opção!"
    >
      <div className={`grid ${cols} gap-4`}>
        {alts.map((alt, i) => (
          <OptionCard key={i} icon={alt.icon} text={alt.text} onClick={() => onAnswer(alt.correct)} />
        ))}
      </div>
    </CardShell>
  );
}

function OptionCard({ icon, text, onClick }: { icon?: string; text: string; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -4 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="bg-game-cream hover:bg-amber-50 border-[3px] border-game-sky-soft rounded-3xl p-5 text-center shadow-card-soft transition flex flex-col items-center justify-center min-h-[160px]"
    >
      <div className="text-[58px] leading-none">{icon}</div>
      <div className="mt-3 text-base font-display font-bold text-game-ink">{text}</div>
    </motion.button>
  );
}
