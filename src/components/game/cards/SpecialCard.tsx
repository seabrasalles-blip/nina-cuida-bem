import { motion } from "framer-motion";
import type { Cell } from "@/data/cells";

export function SpecialCard({
  cell,
  onContinue,
}: {
  cell: Cell;
  onContinue: () => void;
}) {
  const isAdvance = cell.type === "advance";
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-2xl p-7 shadow-2xl border-4 border-orange-300 max-w-2xl w-full"
    >
      <div className="flex items-center gap-2 text-orange-700 font-bold uppercase tracking-wide text-sm">
        <span className="px-2 py-0.5 bg-orange-100 rounded-full">
          {isAdvance ? "Cuidado especial" : "Cuidado especial"}
        </span>
        <span>Casa {cell.id}</span>
      </div>
      <div className="mt-4 text-6xl text-center">{isAdvance ? "✨" : "🔄"}</div>
      <p className="mt-3 text-2xl text-slate-800 font-medium text-center leading-snug">
        {cell.body}
      </p>
      <div className="mt-6 flex justify-center">
        <button
          onClick={onContinue}
          className="px-8 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold shadow"
        >
          Continuar
        </button>
      </div>
    </motion.div>
  );
}
