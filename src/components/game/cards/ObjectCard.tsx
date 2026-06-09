import { motion } from "framer-motion";
import type { Cell } from "@/data/cells";

export function ObjectCard({
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
      className="bg-white rounded-2xl p-7 shadow-2xl border-4 border-emerald-300 max-w-3xl w-full"
    >
      <div className="flex items-center gap-2 text-emerald-700 font-bold uppercase tracking-wide text-sm">
        <span className="px-2 py-0.5 bg-emerald-100 rounded-full">Objeto certo</span>
        <span>Casa {cell.id}</span>
      </div>
      <h3 className="mt-3 text-2xl font-bold text-slate-800">{cell.prompt}</h3>
      <div className="mt-5 grid grid-cols-4 gap-3">
        {cell.alternatives?.map((alt, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAnswer(alt.correct)}
            className="bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-300 rounded-xl p-4 text-center transition"
          >
            <div className="text-5xl">{alt.icon}</div>
            <div className="mt-2 text-sm font-semibold text-slate-700">{alt.text}</div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
