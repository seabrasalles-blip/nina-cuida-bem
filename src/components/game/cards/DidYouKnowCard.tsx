import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Cell } from "@/data/cells";
import { Nina } from "../Nina";

export function DidYouKnowCard({
  cell,
  onDone,
}: {
  cell: Cell;
  onDone: () => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const alts = cell.alternatives ?? [];
  const correctIdx = alts.findIndex((a) => a.correct);
  const isCorrect = picked !== null && alts[picked]?.correct;
  const feedback = picked === null
    ? ""
    : isCorrect
      ? (cell.feedbackCorrect ?? "Muito bem!")
      : (cell.feedbackWrong ?? "Vamos tentar de novo.");

  return (
    <motion.div
      initial={{ scale: 0.92, opacity: 0, y: 8 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="bg-white rounded-[28px] p-6 shadow-toy border-[4px] border-violet-400 max-w-[860px] w-full"
    >
      <div className="flex items-center gap-2">
        <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full font-display text-sm font-bold uppercase tracking-wide">
          ✨ Você sabia?
        </span>
        <span className="px-2.5 py-1 bg-violet-50 text-violet-700 rounded-full text-xs font-bold uppercase">
          Casa {cell.id}
        </span>
      </div>

      {/* Curiosidade */}
      <div className="mt-4 bg-violet-50 border-[3px] border-violet-200 rounded-2xl p-5 flex items-center gap-4">
        <div className="shrink-0 w-20 h-20 rounded-2xl bg-white border-[3px] border-violet-300 flex items-center justify-center text-[44px] leading-none shadow-sm">
          {cell.infoIcon ?? "💡"}
        </div>
        <div className="flex-1">
          <h3 className="font-display text-[24px] leading-tight font-bold text-violet-900">
            {cell.infoTitle ?? cell.title}
          </h3>
          <p className="mt-1 text-[15px] text-game-ink font-semibold leading-snug">
            {cell.infoText ?? ""}
          </p>
        </div>
        <div className="shrink-0 hidden sm:block">
          <Nina size={76} mood="think" />
        </div>
      </div>

      {/* Microdesafio */}
      <p className="mt-5 font-display text-[18px] font-bold text-game-ink">
        {cell.prompt}
      </p>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {alts.map((alt, i) => {
          const isPicked = picked === i;
          const showAsCorrect = picked !== null && i === correctIdx;
          const showAsWrong = isPicked && !alt.correct;
          return (
            <motion.button
              key={i}
              whileHover={picked === null ? { scale: 1.04, y: -3 } : undefined}
              whileTap={picked === null ? { scale: 0.96 } : undefined}
              disabled={picked !== null}
              onClick={() => setPicked(i)}
              className={`rounded-2xl border-[3px] p-4 text-center min-h-[120px] flex flex-col items-center justify-center transition ${
                showAsCorrect
                  ? "bg-emerald-50 border-game-green"
                  : showAsWrong
                    ? "bg-amber-50 border-game-orange"
                    : "bg-white border-violet-200 hover:bg-violet-50"
              }`}
            >
              {alt.icon && (
                <div className="text-[36px] leading-none">{alt.icon}</div>
              )}
              <div className="mt-1.5 text-sm font-display font-bold text-game-ink leading-tight">
                {alt.text}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Feedback inline + Continuar */}
      <AnimatePresence>
        {picked !== null && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 rounded-2xl p-4 border-[3px] ${
              isCorrect
                ? "bg-emerald-50 border-game-green text-emerald-900"
                : "bg-amber-50 border-game-orange text-amber-900"
            }`}
          >
            <p className="text-[15px] font-semibold leading-snug">{feedback}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 flex justify-end">
        <motion.button
          whileHover={picked !== null ? { scale: 1.04 } : undefined}
          whileTap={picked !== null ? { scale: 0.96, translateY: 3 } : undefined}
          disabled={picked === null}
          onClick={onDone}
          className="font-display px-8 py-3 rounded-full bg-violet-600 text-white text-lg font-bold shadow-toy disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed"
        >
          Continuar
        </motion.button>
      </div>
    </motion.div>
  );
}
