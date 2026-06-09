import { motion } from "framer-motion";
import type { Cell } from "@/data/cells";
import { NinaSpeech } from "../NinaSpeech";

export function QuestionCard({
  cell,
  onAnswer,
}: {
  cell: Cell;
  onAnswer: (correct: boolean) => void;
}) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-2xl p-7 shadow-2xl border-4 border-sky-300 max-w-3xl w-full"
    >
      <div className="flex items-center gap-2 text-sky-700 font-bold uppercase tracking-wide text-sm">
        <span className="px-2 py-0.5 bg-sky-100 rounded-full">Pergunta</span>
        <span>Casa {cell.id}</span>
      </div>
      <h3 className="mt-3 text-2xl font-bold text-slate-800">{cell.prompt}</h3>
      <div className="mt-3">
        <NinaSpeech text="Escolha a melhor opção para ajudar a Nina." />
      </div>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {cell.alternatives?.map((alt, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onAnswer(alt.correct)}
            className="bg-sky-50 hover:bg-sky-100 border-2 border-sky-300 rounded-xl p-4 text-center transition"
          >
            <div className="text-4xl">{alt.icon}</div>
            <div className="mt-2 text-base font-semibold text-slate-700">{alt.text}</div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
